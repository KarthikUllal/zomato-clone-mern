const orderModel = require("../model/orderSchema")
const foodModel = require("../model/foodSchema")
const userModel = require("../model/userSchema")
const transporter = require("../utils/mailer");

const placeOrder = async (req, res) => {

    const { restaurantId, items, address, paymentMethod } = req.body;
    const userId = req.user.userId;

    let totalAmount = 0;
    const orderItems = [];

    console.log("Request Body:", req.body);

    try {

        for (const item of items) {

            const food = await foodModel.findById(item.food);

            if (!food) continue;

            totalAmount += food.price * item.quantity;

            orderItems.push({
                food: food._id,
                quantity: item.quantity,
                price: food.price
            });

        }

        const order = new orderModel({
            user: userId,
            restaurant: restaurantId,
            items: orderItems,
            totalAmount,
            address,
            paymentMethod
        });

        await order.save();

        const user = await userModel.findById(userId);
        const orderRestaurant = await orderModel.findById(order._id).populate("restaurant", "name");

        //sending confirmation email to user
        transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Order Confirmation",
            html: `
                <h2>Order Confirmation</h2>
                <p>Hello ${user.fullname},</p>
                <p>Your order has been placed successfully!</p>
                <p>Total Amount: Rs${totalAmount}</p>
                <p>Restaurant: ${orderRestaurant.restaurant.name}</p>
                <p>Status: ${order.status}</p>
                <p>Thank you for your order!</p>
            `
        })

        res.json({
            status: "SUCCESS",
            message: "Order placed successfully",
            order
        });

    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error placing order",
            error: err.message
        });
    }

}

//to get specificorder details of a perticular user
const getOrderById = async (req, res) => {

    try {

        const id = req.params.id;

        const order = await orderModel
            .findById(id)
            .populate("restaurant", "name")
            .populate("items.food", "name price image");

        if (!order) {
            return res.json({
                status: "FAILED",
                message: "Order not found"
            });
        }

        res.json({
            status: "SUCCESS",
            message: "Order Found",
            order: order
        });

    }
    catch (err) {

        res.json({
            status: "FAILED",
            message: "Error fetching order",
            error: err.message
        });

    }

};

//to get all orders of a user 
const getMyOrders = async (req, res) =>{
    const userId = req.user.userId;
    try{
        const orders = await orderModel.find({user: userId}).populate("restaurant", "name").populate("items.food", "name price image").sort({ createdAt: -1 });
        res.json({
            status: "SUCCESS",
            message: "Orders found",
            orders
        });
    }
    catch(err){
        res.json({
            status: "FAILED",
            message: "Error fetching orders",
            error: err.message
        });
    }
}


module.exports = { placeOrder, getOrderById, getMyOrders}