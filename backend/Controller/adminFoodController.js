const foodModel = require("../model/foodSchema");

exports.addFood = async (req, res) => {

     console.log(req.body);
  console.log(req.files);
    try {
        const {
            name,
            price,
            description,
            foodCategory,
            isVeg,
            restaurant
        } = req.body;
        const image = req.file ? req.file.path : "";

        const food = new foodModel({
            name,
            price,
            description,
            foodCategory,
            isVeg,
            restaurant,
            image
        });
        await food.save();

        res.status(201).json({
            success: true,
            message: "Food added successfully",
            food
        });



    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding food",
            error: error.message
        });
    }
}