const express=require("express")
const staffRouter=express.Router();

const {handleLookUpProduct}=require("../controllers/productLookUp")
const {handleCheckOut}=require("../controllers/orderCheckout.js")
const {handleGetInvoice}=require("../controllers/orderInvoice.js")

staffRouter.get('/products/lookup', handleLookUpProduct)
staffRouter.post('/orders/assisted-checkout', handleCheckOut)
staffRouter.post('/assisted-checkout', handleCheckOut)
staffRouter.get('/orders/:id/invoice', handleGetInvoice)

module.exports = staffRouter