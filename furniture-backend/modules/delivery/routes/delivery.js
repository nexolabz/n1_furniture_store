const express=require("express")
const deliveryRouter=express.Router();
const { verifyToken } = require("../../../middleware/authMiddleware");
const {getDeliveryAssignments, handleUpdateDeliveryStatus}=require("../controllers/deliveryController.js")

deliveryRouter.get('/assignments', verifyToken, getDeliveryAssignments)
deliveryRouter.post('/status', verifyToken, handleUpdateDeliveryStatus)

module.exports = deliveryRouter