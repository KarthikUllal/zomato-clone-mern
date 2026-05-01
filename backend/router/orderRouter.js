//orderRouter.js

const express = require("express")
const orderRouter = express.Router()

const {placeOrder, getOrderById, getAllOrders, getMyOrders, cancelOrder}  = require("../Controller/orderController")
const {verifyUserToken} = require("../middleware/authMiddleware")

orderRouter.post("/orders", verifyUserToken, placeOrder)
//to get all order of a user
orderRouter.get("/orders/myorders", verifyUserToken, getMyOrders)

orderRouter.get("/orders/:id", verifyUserToken, getOrderById)

orderRouter.put("/orders/:id", verifyUserToken, cancelOrder)


module.exports = orderRouter