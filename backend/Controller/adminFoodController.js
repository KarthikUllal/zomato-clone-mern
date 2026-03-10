const foodModel = require("../model/foodSchema");
const fs = require("fs")

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

//get all foods 

exports.getFoods = async (req, res) => {
    try {
        const foods = await foodModel.find().populate("restaurant", "name")
        res.json({
            status: "SUCCESS",
            message: "Food Data Retrieved Successfully",
            foods: foods
        })
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error While Fetching Food Data",
            error: err.message
        })
    }
}

//get food by id
exports.getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id).populate("restaurant", "name")
        if (!food) {
            return res.json({
                status: "FAILED",
                message: "Food not found"
            })
        }
        res.json({
            status: "SUCCESS",
            message: "Food Data Retrieved Successfully",
            food: food
        })
    }
    catch (err) {
        res.json({

            status: "FAILED",
            message: "Error While Fetching Food Data",
            error: err.message
        })
    }
}


//deleting food and it images.
exports.deleteFoods = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id)
        if (!food) {
            return res.json({
                status: "FAILED",
                message: "Food not found"
            })
        }
        //delete image from local storage 
        if (food.image && fs.existsSync(food.image)) {
            fs.unlinkSync(food.image)
        }

        //deleting food from db.
        await foodModel.findByIdAndDelete(req.params.id)
        res.json({
            status: "SUCCESS",
            message: "Food Deleted Successfully"
        })

    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error While Deleting Food Data",
            error: err.message
        })
    }
}


//updating food data 

exports.updateFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id)
        if (!food) {
            return res.json({
                status: "FAILED",
                message: "Food not found"
            })
        }
        //handle food image
        if (req.file && req.file["image"]) {
            req.body.image = req.file.path
        }
        else {
            req.body.image = food.image
        }
        const updatedFood = await foodModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        res.json({
            status: "SUCCESS",
            message: "Food updated successfully",
            data: updatedFood
        })
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error While Updating Food Data",
            error: err.message
        })
    }
}