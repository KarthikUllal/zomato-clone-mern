const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    userName: {
        type: String,
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
    }

},
    { timestamps: true }
)

const reviewModel = mongoose.model("Review", reviewSchema)

module.exports = reviewModel
