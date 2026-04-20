//restaurantRouter.js

const express = require("express")
const { getRestaurantByFoodCategory } = require("../Controller/adminRestaurantController")
const { getRestaurantByCuisine } = require("../Controller/userController")
const restaurantRouter = express.Router()


restaurantRouter.get("/restaurants/food-category/:category",getRestaurantByFoodCategory)

//get restaurants by cuisine route (used in carousel to fetch restaurants by cuisine)
restaurantRouter.get("/restaurants/cuisine/:category", getRestaurantByCuisine)

module.exports = restaurantRouter