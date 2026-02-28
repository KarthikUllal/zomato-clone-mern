const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, verifyToken } = require("../Controller/userController");

// router.post("/signin", registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/verify-token", verifyToken);

module.exports = router;