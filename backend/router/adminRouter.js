const express = require("express");
const adminRouter = express.Router();


const upload = require("../middleware/upload");

const {addRestaurant,getRestaurants} = require("../Controller/adminRestaurantController");
const {addFood} = require("../Controller/adminFoodController");

adminRouter.post(
  "/restaurant",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  addRestaurant
);

adminRouter.post(
  "/food",
  upload.single("image"),
  addFood
);

adminRouter.get("/restaurants", getRestaurants)

module.exports = adminRouter;
