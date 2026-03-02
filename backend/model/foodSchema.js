const mongoose = require("mongoose")

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },

    image: {
        type: String
    },

    isVeg: {
        type: Boolean,
        default: true
    },

    foodCategory: {
        type: String
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
},
    { timestamps: true }
)

const foodModel = mongoose.model("Food", foodSchema)
module.exports = foodModel
