const orderModel = require("../model/orderSchema")
const userModel = require("../model/userSchema")
const transporter = require("../utils/mailer");
require("dotenv").config();



//get all orders by admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("user", "fullname email").populate("restaurant", "name").populate("items.food", "name price");

        res.json({
            status: "SUCCESS",
            message: "Orders fetched successfully",
            orders
        });
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error fetching orders",
            error: err.message
        });
    }
}



//controller to update order status by admin

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )

        if (!updatedOrder) {
            return res.status(404).json({
                status: "FAILED",
                message: "Order not found"
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Order status updated",
            order: updatedOrder
        });
        // send email to user
        setTimeout(async () => {
            try {
                const user = await userModel.findById(updatedOrder.user);
                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: user.email,
                    subject: "Order Status Updated",
                    text: `Your order status has been updated to "${status}".`
                };
                await transporter.sendMail(mailOptions);
            }
            catch (err) {
                console.error("Error sending email:", err);
            }
        }, 1000)

    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error updating order status",
            error: err.message
        })
    }
}

module.exports = { updateOrderStatus, getAllOrders }
