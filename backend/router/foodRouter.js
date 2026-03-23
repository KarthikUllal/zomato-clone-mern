//foodRouter.js
const { getFoodByIds } = require( "../Controller/adminFoodController")

const express = require("express")
const foodRouter = express.Router();

//this will be used in cart page to get foods by ids
foodRouter.post("/foods/by-ids", getFoodByIds)

module.exports = foodRouter;
