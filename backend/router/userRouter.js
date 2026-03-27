//userRouter.js
const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, verifyToken, searchRestaurantsAndFoods, getRestaurantByBrandName, getUserProfile } = require("../Controller/userController");


// router.post("/signin", registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/verify-token", verifyToken);


//search restaurant route 
router.get("/search", searchRestaurantsAndFoods)
//get restaurant by brandname like KFC etc
router.get("/restaurant/brand/:name", getRestaurantByBrandName)


//get user profile route
router.get("/profile", getUserProfile)

module.exports = router;