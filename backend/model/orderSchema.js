const mongoose = require("mongoose")
const { use } = require("react")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            }
        }
    ],
    totalAmount: Number,
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "UPI"],
        default: "COD"
    },
    status: {
        type: String,
        enum: ["placed", "accepted", "preparing", "out-for-delivery", "delivered", "cancelled"],
        default: "placed",
    }
},
    { timestamps: true }

)

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel