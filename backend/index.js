const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

//Restaurant by food category route
const restaurantRouter = require("./router/restaurantRouter")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/zomato-db")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/api/user", router);

app.use("/api/admin", adminRouter);

//restaurant by food category base url
app.use("/api",restaurantRouter);  // example : http://localhost:8000/api/restaurants/food-category/chicken

app.listen(8000, () => {
  console.log("App listening on port 8000");
});