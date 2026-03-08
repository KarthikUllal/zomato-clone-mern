const express = require("express");
const adminRouter = express.Router();


const {foodUpload, restaurantUpload} = require("../middleware/upload");

const {addRestaurant,getRestaurants, deleteRestaurant} = require("../Controller/adminRestaurantController");
const {addFood, getFoods, deleteFoods} = require("../Controller/adminFoodController");

const {getAllUsers, deleteUser, getUserById} = require("../Controller/adminUserController")


//Restaurant routes
adminRouter.post(
  "/restaurant",
  restaurantUpload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  addRestaurant
);
adminRouter.get("/restaurants", getRestaurants)
adminRouter.delete("/restaurants/:id", deleteRestaurant)


//Food routes
adminRouter.post(
  "/food",
  foodUpload.single("image"),
  addFood
);
adminRouter.get("/foods", getFoods)
adminRouter.delete("/foods/:id", deleteFoods)

module.exports = adminRouter;



//Admin User manage routes
adminRouter.get("/users", getAllUsers)
adminRouter.get("/users/:id", getUserById)
adminRouter.delete("/users/:id", deleteUser)