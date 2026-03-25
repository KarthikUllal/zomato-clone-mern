const userModel = require("../model/userSchema");
const userOtpVerificationModel = require("../model/userOtpVerificationSchema");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer");
const restaurantModel = require("../model/restaurantSchema");
const foodModel = require("../model/foodSchema");
require("dotenv").config();

// // nodemail object to use email
// const transporter = nodemailer.createTransport({
//   secure: true,
//   host: "smtp.gmail.com",
//   port: 465,
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASSWORD,
//   },
// });

//send otp
const sendOtp = async (req, res) => {
  const { email, fullname } = req.body;

  try {
    if (!email) {
      return res.json({
        status: "FAILED",
        message: "Email is Required",
      });
    }

    // checking is user exists
    const existingUser = await userModel.findOne({ email });

    // if user is new and fullname not provided
    if (!existingUser && !fullname) {
      return res.json({
        status: "NEW_USER",
        message: "Fullname required",
      });
    }

    // To Generate otp
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      digits: true,
      specialChars: false,
    });

    const hashedOtp = await bcrypt.hash(otp, 10);

    // remove previous otp's
    await userOtpVerificationModel.deleteMany({ email });

    // Save new otp
    await new userOtpVerificationModel({
      email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000,
    }).save();

    // send email
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is ${otp}. It expires in 10 minutes`,
    });
    console.log("OTP:", otp);

    res.json({
      status: "PENDING",
      message: "OTP Sent successfully",
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

//verify otp
const verifyOtp = async (req, res) => {
  const { email, otp, fullname } = req.body;

  try {
    if (!email || !otp) {
      return res.json({
        status: "FAILED",
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await userOtpVerificationModel.findOne({ email });

    if (!otpRecord) {
      return res.json({
        status: "FAILED",
        message: "OTP not found or expired",
      });
    }

    if (otpRecord.expiresAt < Date.now()) {
      await userOtpVerificationModel.deleteMany({ email });
      return res.json({
        status: "FAILED",
        message: "OTP Expired",
      });
    }

    const validOtp = await bcrypt.compare(otp, otpRecord.otp);

    if (!validOtp) {
      return res.json({
        status: "FAILED",
        message: "Invalid OTP",
      });
    }

    let user = await userModel.findOne({ email });

    // if user is new then create account
    if (!user) {
      user = new userModel({
        email,
        fullname,
      });
      await user.save();
    }

    user.isVerified = true;
    await user.save();

    await userOtpVerificationModel.deleteMany({ email });

    // Generate jwt token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      status: "SUCCESS",
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};


//To verify token to check if user is logged in or not
const verifyToken = async (req, res) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      status: "FAILED",
      message: "No token provided"
    });
  }

  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(checkUser.userId);

    if (!user) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      });
    }

    res.json({
      status: "SUCCESS",
      message: "User already logged in"
    });

  } catch (error) {
    res.json({
      status: "FAILED",
      message: "Invalid or expired token"
    });
  }
};


//Search Restaurant Api
const searchRestaurantsAndFoods = async (req, res) => {
  try {
    const { query } = req.query || " "
    const restaurant = await restaurantModel.find({
      name: { $regex: query, $options: "i" }
    })

    const foods = await foodModel.find({
      name: { $regex: query, $options: "i" }
    }).populate("restaurant")

    //extract restaurant from foods
    const foodRestaurants = foods.map(food => food.restaurant)

    const allRestaurants = [...restaurant, ...foodRestaurants];

    //remove duplicates properly
    const uniqueRestaurants = Array.from(
      new Map(allRestaurants.map(r => [r._id.toString(), r])).values()
    );

    res.json({
      status: "SUCCESS",
      message: "Restaurant Found",
      restaurants: uniqueRestaurants,
    })
  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}

module.exports = { sendOtp, verifyOtp, verifyToken, searchRestaurantsAndFoods };

