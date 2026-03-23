//restaurantRouter.js

const express = require("express")
const { getRestaurantByFoodCategory } = require("../Controller/adminRestaurantController")
const restaurantRouter = express.Router()


restaurantRouter.get("/restaurants/food-category/:category",getRestaurantByFoodCategory)

module.exports = restaurantRouter