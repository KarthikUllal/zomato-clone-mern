const restaurantModel = require("../model/restaurantSchema");
const foodModel = require("../model/foodSchema");

const filterRestaurants = async (req, res) => {
    try {
        const { type, rating } = req.query;

        let restaurantMatch = { category: "delivery" };

        if (type && type !== "all") {
            let foodMatch = {};

            if (type === "veg") {
                foodMatch = { isVeg: true };
            } else {
                foodMatch = {
                    foodCategory: { $regex: type, $options: "i" },
                };
            }

            const foods = await foodModel.find(foodMatch).select("restaurant");
            const restaurantIds = foods.map((f) => f.restaurant);

            restaurantMatch._id = { $in: restaurantIds };
        }

        if (rating) {
            restaurantMatch.averageRating = { $gte: Number(rating) };
        }

        const restaurants = await restaurantModel.find(restaurantMatch);

        res.json({
            status: "SUCCESS",
            restaurants,
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: err.message,
        });
    }
};

module.exports = { filterRestaurants };