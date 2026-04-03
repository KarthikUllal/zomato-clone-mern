const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

},
    { timestamps: true }
)

const reviewModel = mongoose.model("Review", reviewSchema)

module.exports = reviewModel
