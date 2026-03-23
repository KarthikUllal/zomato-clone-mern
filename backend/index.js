//index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

//food router to send list of foods to server
const foodRouter = require("./router/foodRouter");

//Restaurant by food category route
const restaurantRouter = require("./router/restaurantRouter")

//order router

const orderRouter = require("./router/orderRouter")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const dburl = process.env.MONGODB_URI || "mongodb://localhost:27017/zomato-db";
mongoose
  .connect(dburl)
  .then(() => console.log("Connected to database \n DB URL:", process.env.MONGODB_URI))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", router);

app.use("/api/admin", adminRouter);

//restaurant by food category base url
app.use("/api", restaurantRouter);  // example : http://localhost:8000/api/restaurants/food-category/chicken

//food router
app.use("/api", foodRouter); //example : http://localhost:8000/api/foods/by-ids


app.use("/api", orderRouter) //example : http://localhost:8000/api/order


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});