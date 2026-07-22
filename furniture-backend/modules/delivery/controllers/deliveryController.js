const db_connection = require('../../../config/db_config')

const getDeliveryAssignments = async (req, res) => {
    const deliveryStaffId = req.userId
    console.log("Fetching delivery assignments for staff ID:", deliveryStaffId);
    try {
        const promiseDb = db_connection.promise();
        const [deliveries] = await promiseDb.query("SELECT d.delivery_id,  o.order_id, u.full_name, u.phone, o.delivery_address, o.landmark, o.pin_code, d.delivery_status FROM deliveries d JOIN orders o ON d.order_id = o.order_id JOIN users u ON o.user_id = u.id WHERE d.assigned_driver_user_id = ?", [deliveryStaffId]);
        return res.status(200).json({
            success: true,
            count: deliveries.length,
            assignments: deliveries
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const handleUpdateDeliveryStatus = async (req,res) =>{
    const {delivery_id, delivery_status} = req.body

    try{
        const promiseDb = db_connection.promise();
        if(!delivery_id || !delivery_status){
            return res.status(400).json({message:"delivery_id and delivery_status are required"})
        }
        const updateStatusQuery = "UPDATE deliveries SET delivery_status = ? WHERE delivery_id = ?"
        const [updateResult] = await promiseDb.query(updateStatusQuery, [delivery_status, delivery_id])
        if(updateResult.affectedRows === 0){
            return res.status(404).json({message:"Delivery assignment not found"})
        }
        return res.status(200).json({message:"Delivery status updated successfully"})
    } catch (err) {
        return res.status(500).json({message:"Error updating delivery status"})
    }
}

module.exports = {
    getDeliveryAssignments,
    handleUpdateDeliveryStatus
};