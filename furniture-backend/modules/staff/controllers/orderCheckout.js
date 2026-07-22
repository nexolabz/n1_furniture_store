const db_connection = require('../../../config/db_config')
const bcrypt = require('bcrypt')

const handleCheckOut = async (req, res) => {
    const {
        user_email,
        customer_email,
        customer_name,
        customer_phone,
        customer_details,
        user_id,
        customer_id,
        staff_id,
        booked_by_staff_id,
        products,
        checkout_items,
        items,
        coupon_code,
        delivery_mode,
        delivery_address,
        landmark,
        pin_code,
        order_placement_channel
    } = req.body;

    const promiseDb = db_connection.promise();

    // Required fields check
    const itemsList = products || checkout_items || items;
    if (!itemsList || !Array.isArray(itemsList) || itemsList.length === 0) {
        return res.status(400).json({ message: "Products should be a non-empty array" });
    }

    const effectiveStaffId = staff_id || booked_by_staff_id || req.userId || null;
    const effectiveDeliveryMode = delivery_mode || 'HOME_DELIVERY';
    const effectiveChannel = 'IN_STORE';

    try {
        // 1. Validate Staff User if staffId is provided
        if (effectiveStaffId) {
            const [staffResult] = await promiseDb.query("SELECT id FROM users WHERE id = ?", [effectiveStaffId]);
            if (!staffResult || staffResult.length === 0) {
                return res.status(404).json({ message: "Staff not found" });
            }
        }

        // 2. Resolve Customer User ID
        // Take user_email if exists -> use existing user_id. If not exist -> create new user & get user_id.
        let finalUserId = user_id || customer_id || null;
        const emailToUse = user_email || customer_email || customer_details?.email;
        const nameToUse = customer_name || customer_details?.full_name || customer_details?.name || (emailToUse ? emailToUse.split('@')[0] : 'Customer');

        if (emailToUse) {
            const [existingUsers] = await promiseDb.query("SELECT id FROM users WHERE email = ?", [emailToUse]);
            if (existingUsers && existingUsers.length > 0) {
                finalUserId = existingUsers[0].id;
            } else {
                // User does not exist, create new customer user
                const rawPassword = nameToUse + "@123";
                const defaultPassword = await bcrypt.hash(rawPassword, 10);
                const [newUserResult] = await promiseDb.query(
                    "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, 'CUSTOMER')",
                    [nameToUse, emailToUse, defaultPassword]
                );
                finalUserId = newUserResult.insertId;
            }
        }

        if (!finalUserId) {
            return res.status(400).json({ message: "Customer email or user_id is required" });
        }

        // 3. Validate products stock & calculate subtotal
        let subtotalAmount = 0;
        const processedItems = [];

        for (const item of itemsList) {
            const productId = item.product_id;
            const quantity = Number(item.quantity) || 1;

            if (!productId || quantity <= 0) {
                return res.status(400).json({ message: "Invalid product_id or quantity" });
            }

            const [productResult] = await promiseDb.query(
                "SELECT product_id, product_name, price, stock_count FROM products WHERE product_id = ?",
                [productId]
            );

            if (!productResult || productResult.length === 0) {
                return res.status(404).json({ message: `Product not found: ${productId}` });
            }

            const product = productResult[0];
            if (product.stock_count < quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.product_name || productId}` });
            }

            const itemPrice = Number(item.price_snapshot) || Number(product.price) || 0;
            const itemSubtotal = itemPrice * quantity;
            subtotalAmount += itemSubtotal;

            processedItems.push({
                product_id: productId,
                quantity: quantity,
                price_snapshot: itemPrice
            });
        }

        // 4. Calculate Discount & Tax
        let discountApplied = Number(req.body.discount_applied) || 0.00;
        if (coupon_code) {
            const [couponRows] = await promiseDb.query(
                "SELECT * FROM coupons WHERE coupon_code = ? AND is_active = TRUE AND valid_from <= NOW() AND valid_until >= NOW()",
                [coupon_code]
            );
            if (couponRows && couponRows.length > 0) {
                const discountPercentage = Number(couponRows[0].discount_percentage) || 0;
                discountApplied = Math.round((subtotalAmount * (discountPercentage / 100)) * 100) / 100;
            }
        }

        const taxableAmount = Math.max(0, subtotalAmount - discountApplied);
        const gstTaxAmount = req.body.gst_tax_amount !== undefined 
            ? Number(req.body.gst_tax_amount) 
            : Math.round((taxableAmount * 0.18) * 100) / 100;
        const grandTotal = Math.round((taxableAmount + gstTaxAmount) * 100) / 100;
        const orderStatus = req.body.order_status || 'CONFIRMED';

        // 5. Insert into `orders` table
        const orderInsertQuery = `
            INSERT INTO orders (
                user_id,
                booked_by_staff_id,
                order_placement_channel,
                subtotal_amount,
                discount_applied,
                gst_tax_amount,
                grand_total,
                order_status,
                delivery_mode,
                delivery_address,
                landmark,
                pin_code
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [orderResult] = await promiseDb.query(orderInsertQuery, [
            finalUserId,
            effectiveStaffId,
            effectiveChannel,
            subtotalAmount,
            discountApplied,
            gstTaxAmount,
            grandTotal,
            orderStatus,
            effectiveDeliveryMode,
            delivery_address || null,
            landmark || null,
            pin_code || null
        ]);

        const orderId = orderResult.insertId;

        // 6. Insert items into `order_items` & Update stock count in `products`
        const orderItemsInsertQuery = `
            INSERT INTO order_items (order_id, product_id, quantity, price_snapshot) 
            VALUES (?, ?, ?, ?)
        `;

        for (const item of processedItems) {
            await promiseDb.query(orderItemsInsertQuery, [
                orderId,
                item.product_id,
                item.quantity,
                item.price_snapshot
            ]);

            await promiseDb.query(
                "UPDATE products SET stock_count = stock_count - ? WHERE product_id = ?",
                [item.quantity, item.product_id]
            );
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order_id: orderId,
            id: finalUserId,
            user_id: finalUserId,
            booked_by_staff_id: effectiveStaffId,
            financials: {
                subtotal_amount: subtotalAmount,
                discount_applied: discountApplied,
                gst_tax_amount: gstTaxAmount,
                grand_total: grandTotal
            },
            order_status: orderStatus,
            delivery_mode: effectiveDeliveryMode
        });

    } catch (err) {
        console.error("Error during checkout:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Error processing checkout"
        });
    }
};

module.exports = {
    handleCheckOut
};