//adminRouter.js

const express = require("express");
const adminRouter = express.Router();


const { foodUpload, restaurantUpload } = require("../middleware/upload");

const { addRestaurant, getRestaurants, deleteRestaurant, updateRestaurant, getRestaurantById, adminSearchRestaurants } = require("../Controller/adminRestaurantController");
const { addFood, getFoods, deleteFoods, updateFood, getFoodById, getFoodsByRestaurant, adminSearchFood } = require("../Controller/adminFoodController");

const { getAllUsers, deleteUser, getUserById } = require("../Controller/adminUserController");
const { updateOrderStatus, getAllOrders } = require("../Controller/adminOrderController");
const { getAdminStats } = require("../Controller/adminStatsController");
const { getAllBookings, updateSlots } = require("../Controller/adminBookingController");


//Restaurant routes
adminRouter.post(
  "/restaurant",
  restaurantUpload.any(),
  addRestaurant
);

adminRouter.get("/restaurants", getRestaurants)

//admin search route for restuarant
adminRouter.get("/restaurants/search", adminSearchRestaurants)

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

//admin search route for food
adminRouter.get("/foods/search", adminSearchFood)

adminRouter.get("/foods/restaurant/:restaurantId", getFoodsByRestaurant)

adminRouter.get("/foods/:id", getFoodById)
adminRouter.delete("/foods/:id", deleteFoods)
adminRouter.put("/foods/:id", foodUpload.single("image"), updateFood)



//Admin Stats routes
adminRouter.get("/dashboard", getAdminStats)


//Admin User manage routes
adminRouter.get("/users", getAllUsers)
adminRouter.get("/users/:id", getUserById)
adminRouter.delete("/users/:id", deleteUser)


//Order Routes
adminRouter.put("/orders/:orderId", updateOrderStatus) //example : http://localhost:8000/api/admin/orders/123456789
adminRouter.get("/orders", getAllOrders) //example : http://localhost:8000/api/admin/orders  


//Booking Routes
adminRouter.get("/bookings", getAllBookings);
adminRouter.put("/restaurants/:restaurantId/slots", updateSlots);






module.exports = adminRouter;