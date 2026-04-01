const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  addresses: [
    {
      street: String,
      city: String,
      pincode: String,
    }
  ]
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;