const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["dining", "delivery", "nightlife"],
        required: true,

    },
    cuisine: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    averageCostForTwo: {
        type: String,
        required: true
    },

    banner: {
        type: String,
        required: true
    },

    gallery: [
        {
            type: String
        }
    ],

    description: {
        type: String
    },

    hours: {
        type: String
    },

    contact: {
        type: String
    },

    rating: {
        type: Number,
        default: 0
    },

    reviewCount: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }

)

const restaurantModel = mongoose.model("Restaurant", restaurantSchema)

module.exports = restaurantModel