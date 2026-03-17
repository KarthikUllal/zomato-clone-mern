const express = require("express")
const orderRouter = express.Router()

const {placeOrder, getOrderById}  = require("../Controller/orderController")
const {verifyUserToken} = require("../middleware/authMiddleware")

orderRouter.post("/orders", verifyUserToken, placeOrder)
orderRouter.get("/orders/:id", verifyUserToken, getOrderById)

module.exports = orderRouter