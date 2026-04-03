const userModel = require("../model/userSchema");
const userOtpVerificationModel = require("../model/userOtpVerificationSchema");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const restaurantModel = require("../model/restaurantSchema");
const foodModel = require("../model/foodSchema");
require("dotenv").config();
const sendMail = require("../utils/mailer");
const reviewModel = require("../model/reviewSchema");


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
    // await transporter.sendMail({
    //   from: process.env.USER_EMAIL,
    //   to: email,
    //   subject: "Your OTP for Login",
    //   text: `Your OTP is ${otp}. It expires in 10 minutes`,
    // });
    // console.log("OTP:", otp);

    //send mail using resend
    await sendMail({
      to: email,
      subject: "Your OTP for Login",
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes</p>`,
    });
    console.log("OTP:", otp);
    console.log("OTP sent to:", email);


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
      user,
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

//get restaurant by brandname like KFC etc

const getRestaurantByBrandName = async (req, res) => {
  try {
    let name = req.params.name;

    if (!name || typeof name !== "string") {
      return res.json({
        status: "FAILED",
        message: "Invalid brand name"
      });
    }


    name = name.trim()

    const restaurants = await restaurantModel.findOne({
      name: { $regex: name, $options: "i" }
    })

    res.json({
      status: "SUCCESS",
      message: "Restaurants Found",
      restaurant: restaurants
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}


//get user profile details 

const getUserProfile = async (req, res) => {


  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      status: "FAILED",
      message: "No token provided"
    })
  }
  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(checkUser.userId).select("-__v");
    if (!user) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      })
    }
    res.json({
      status: "SUCCESS",
      message: "User Profile Found",
      user: user
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}


//add address to user profile
const addAddress = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!checkUser) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      })
    }
    const { street, city, pincode } = req.body
    if (!street || !city || !pincode) {
      return res.json({
        status: "FAILED",
        message: "Please provide all the details"
      })
    }
    const user = await userModel.findById(checkUser.userId);
    user.addresses.push({
      street,
      city,
      pincode
    })
    await user.save();
    res.json({
      status: "SUCCESS",
      message: "Address Added",
      addresses: user.addresses
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}

//get address from user profile
const getAddress = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!checkUser) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      })
    }
    const user = await userModel.findById(checkUser.userId);
    if (!user) {
      return res.json({
        status: "FAILED",
        message: "Address found",
      })
    }
    res.json({
      status: "SUCCESS",
      message: "Address Found",
      addresses: user.addresses
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }

}


//edit address from user profile

const editAddress = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!checkUser) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      })
    }
    const { id, street, city, pincode } = req.body
    if (!id || !street || !city || !pincode) {
      return res.json({
        status: "FAILED",
        message: "Please provide all the details"
      })
    }
    const user = await userModel.findById(checkUser.userId);
    if (!user) {
      return res.json({
        status: "FAILED",
        message: "Address not found",
      })
    }

    //find address by id
    const address = user.addresses.id(id)
    if (!address) {
      return res.json({
        status: "FAILED",
        message: "Address not found",
      })
    }

    //update address
    address.street = street
    address.city = city
    address.pincode = pincode

    await user.save();

    res.json({
      status: "SUCCESS",
      message: "Address Edited",
      addresses: user.addresses
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}

//add review functionality
const addRestaurantReview = async (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.json({
      status: "FAILED",
      message: "No token provided"
    })
  }
  try {
    const checkUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!checkUser) {
      return res.json({
        status: "FAILED",
        message: "User not found"
      })
    }

    const { rating, comment, restaurantId } = req.body
    if (!rating || !comment || !restaurantId) {
      return res.json({
        status: "FAILED",
        message: "Please provide all the details"
      })
    }

    //check if user already reviewed the restaurant
    const checkReviewAlreadyExist = await reviewModel.findOne({
      user: checkUser.userId,
      restaurant: restaurantId
    })
    if (checkReviewAlreadyExist) {
      return res.json({
        status: "FAILED",
        message: "You have already reviewed this restuarant"
      })
    }

    //find user 
    const user = await userModel.findById(checkUser.userId)

    //add user review to reviewModel
    const review = new reviewModel({
      user: checkUser.userId,
      username: user.fullname,
      rating,
      comment,
      restaurant: restaurantId
    })
    await review.save();
    res.json({
      status: "SUCCESS",
      message: "Review Added",
      review
    })

  }
  catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
  }
}
module.exports = { sendOtp,
   verifyOtp, verifyToken, searchRestaurantsAndFoods, getRestaurantByBrandName,
  getUserProfile, addAddress, getAddress, editAddress, addRestaurantReview, };
