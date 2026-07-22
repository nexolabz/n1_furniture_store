const db_connection = require('../../../config/db_config')

const handleGetInvoice = async (req, res) => {
    const orderId = req.params.id;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    const promiseDb = db_connection.promise();

    try {
        // 1. Fetch Order & Customer Information
        const orderQuery = `
            SELECT 
                o.order_id,
                o.user_id,
                o.booked_by_staff_id,
                o.order_placement_channel,
                o.subtotal_amount,
                o.discount_applied,
                o.gst_tax_amount,
                o.grand_total,
                o.delivery_mode,
                o.order_status,
                o.created_at,
                u.full_name AS customer_name,
                u.email AS customer_email
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.order_id = ?
        `;

        const [orderRows] = await promiseDb.query(orderQuery, [orderId]);

        if (!orderRows || orderRows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const order = orderRows[0];

        // 2. Fetch Line Items
        const itemsQuery = `
            SELECT 
                oi.product_id,
                oi.quantity,
                oi.price_snapshot AS unit_price,
                p.product_name
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = ?
        `;

        const [itemRows] = await promiseDb.query(itemsQuery, [orderId]);

        const lineItems = (itemRows || []).map(item => {
            const unitPrice = Number(item.unit_price) || 0;
            const quantity = Number(item.quantity) || 1;
            return {
                product_id: item.product_id,
                product_name: item.product_name || `Product #${item.product_id}`,
                quantity: quantity,
                unit_price: unitPrice,
                line_total: Math.round((unitPrice * quantity) * 100) / 100
            };
        });

        // 3. Fetch Payment Details if exists
        let paymentMethod = "IN_STORE_CASH";
        let paymentStatus = "COMPLETED";

        const [paymentRows] = await promiseDb.query(
            "SELECT payment_method, payment_status FROM payments WHERE order_id = ?",
            [orderId]
        );

        if (paymentRows && paymentRows.length > 0) {
            paymentMethod = paymentRows[0].payment_method || paymentMethod;
            paymentStatus = paymentRows[0].payment_status || paymentStatus;
        }

        const createdDate = new Date(order.created_at || Date.now());
        const year = createdDate.getFullYear();
        const invoiceNumber = `INV-${order.order_id}-${year}`;

        return res.status(200).json({
            invoice_number: invoiceNumber,
            order_id: Number(order.order_id),
            booked_by_staff_id: order.booked_by_staff_id,
            customer_name: order.customer_name || "Guest Customer",
            customer_email: order.customer_email || null,
            order_placement_channel: order.order_placement_channel || "IN_STORE",
            line_items: lineItems,
            financials: {
                subtotal_amount: Number(order.subtotal_amount) || 0,
                discount_applied: Number(order.discount_applied) || 0,
                gst_tax_amount: Number(order.gst_tax_amount) || 0,
                grand_total: Number(order.grand_total) || 0
            },
            delivery_mode: order.delivery_mode,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            issued_at: order.created_at
        });

    } catch (err) {
        console.error("Error generating invoice:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Error generating invoice"
        });
    }
};

module.exports = {
    handleGetInvoice
};
