//adminRouter.js

const express = require("express");
const adminRouter = express.Router();


const {foodUpload, restaurantUpload} = require("../middleware/upload");

const {addRestaurant,getRestaurants, deleteRestaurant, updateRestaurant, getRestaurantById} = require("../Controller/adminRestaurantController");
const {addFood, getFoods, deleteFoods, updateFood, getFoodById, getFoodsByRestaurant} = require("../Controller/adminFoodController");

const {getAllUsers, deleteUser, getUserById} = require("../Controller/adminUserController");
const { updateOrderStatus, getAllOrders } = require("../Controller/adminOrderController");


//Restaurant routes
adminRouter.post(
  "/restaurant",
  restaurantUpload.any(),
  addRestaurant
);

adminRouter.get("/restaurants", getRestaurants)
adminRouter.get("/restaurants/:id", getRestaurantById)

adminRouter.delete("/restaurants/:id", deleteRestaurant)

adminRouter.put(
  "/restaurants/:id",
  restaurantUpload.any(),
  updateRestaurant
);




//Food routes
adminRouter.post(
  "/food",
  foodUpload.single("image"),
  addFood
);
adminRouter.get("/foods", getFoods)
adminRouter.get("/foods/:id", getFoodById)
adminRouter.delete("/foods/:id", deleteFoods)
adminRouter.put("/foods/:id",foodUpload.single("image"), updateFood)
adminRouter.get("/foods/restaurant/:restaurantId", getFoodsByRestaurant)





//Admin User manage routes
adminRouter.get("/users", getAllUsers)
adminRouter.get("/users/:id", getUserById)
adminRouter.delete("/users/:id", deleteUser)


//Order Routes
adminRouter.put("/orders/:orderId", updateOrderStatus) //example : http://localhost:8000/api/admin/orders/123456789
adminRouter.get("/orders", getAllOrders)            //example : http://localhost:8000/api/admin/orders  

module.exports = adminRouter;