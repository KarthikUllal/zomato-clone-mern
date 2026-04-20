const orderModel = require("../model/orderSchema")
const foodModel = require("../model/foodSchema")
const userModel = require("../model/userSchema")
const sendMail = require("../utils/mailer");
const generateInvoice = require("../utils/generateInvoice");

const placeOrder = async (req, res) => {

    const { restaurantId, items, address, paymentMethod } = req.body;
    const userId = req.user.userId;


    let subtotal = 0;
    const gst_rate = 0.05
    const delivery = 40

    const orderItems = [];

    console.log("Request Body:", req.body);

    try {

        for (const item of items) {

            const food = await foodModel.findById(item.food);

            if (!food) continue;

            const itemTotal = food.price * item.quantity;

            subtotal += itemTotal;

            orderItems.push({
                food: food._id,
                quantity: item.quantity,
                price: food.price
            });

        }

        const gst = subtotal * gst_rate;
        const deliveryCharge = subtotal > 0 ? delivery : 0;
        const totalAmount = subtotal + gst + delivery;

        const order = new orderModel({
            user: userId,
            restaurant: restaurantId,
            items: orderItems,
            subtotal,
            gst,
            deliveryCharge,
            totalAmount,
            address,
            paymentMethod
        });

        await order.save();

        const user = await userModel.findById(userId);
        const orderRestaurant = await orderModel.findById(order._id).populate("restaurant", "name");

        const invoiceUrl = await generateInvoice(order, user, orderRestaurant.restaurant.name);

        //sending confirmation email to user
        await sendMail({
            to: user.email,
            subject: "Order Confirmation",
            html: `
            <h2>Order Confirmed 🎉</h2>
            <p>Hello ${user.fullname}</p>

            <p>Your order has been placed successfully.</p>

            <h3>Bill Summary</h3>
            <p>Subtotal: ₹${order.subtotal}</p>
            <p>GST: ₹${order.gst}</p>
            <p>Delivery: ₹${order.deliveryCharge}</p>
            <h3>Total: ₹${order.totalAmount}</h3>

            <br/>

            <a href="${invoiceUrl}" download="${orderRestaurant.restaurant.name}-invoice.pdf"   
            style="padding:10px 20px;background:#ff4d4f;color:white;text-decoration:none;border-radius:5px;">
                Download Invoice
            </a>

            <br/><br/>
            <p>Thank you for ordering ❤️</p>            
        `
        });

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
const getMyOrders = async (req, res) => {
    const userId = req.user.userId;
    try {
        const orders = await orderModel.find({ user: userId }).populate("restaurant", "name").populate("items.food", "name price image").sort({ createdAt: -1 });
        res.json({
            status: "SUCCESS",
            message: "Orders found",
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


module.exports = { placeOrder, getOrderById, getMyOrders }