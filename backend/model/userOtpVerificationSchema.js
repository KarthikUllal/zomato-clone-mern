const mongoose = require("mongoose");

const userOtpVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
});

const userOtpVerificationModel = mongoose.model(
    "userOtpVerification",
    userOtpVerificationSchema
);

module.exports = userOtpVerificationModel;