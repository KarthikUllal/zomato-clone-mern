const foodModel = require("../model/foodSchema");
const restaurantModel = require("../model/restaurantSchema");
const fs = require("fs")

//Add Restaurant
exports.addRestaurant = async (req, res) => {

    try {
        const {
            name,
            category,
            cuisine,
            location,
            averageCostForTwo,
            description,
            hours,
            contact
        } = req.body;

        // const banner = req.files["banner"]
        //     ? req.files["banner"][0].path
        //     : "";

        // const gallery = req.files["gallery"]
        //     ? req.files["gallery"].map(file => file.path)
        //     : [];

        const bannerFile = req.files.find(file => file.fieldname === "banner");
        const galleryFiles = req.files.filter(file => file.fieldname === "gallery");

        const banner = bannerFile ? bannerFile.path : "";
        const gallery = galleryFiles.map(file => file.path);


        const newRestaurant = new restaurantModel({
            name,
            category,
            cuisine,
            location,
            averageCostForTwo,
            banner,
            gallery,
            description,
            hours,
            contact
        })

        await newRestaurant.save();

        res.status(201).json({
            status: "SUCCESS",
            message: "Restaurant added successfully",
            restaurant: newRestaurant
        });


    }
    catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: "Error adding restaurant",
            error: error.message
        });
    }
}


//get restaurant

exports.getRestaurants = async (req, res) => {
    try {

        const restaurants = await restaurantModel.find()

        res.json({
            status: "SUCCESS",
            restaurants: restaurants
        })


    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error fetching restaurants",
            error: err.message

        })
    }
}

//get restaurant by id
exports.getRestaurantById = async (req, res) => {
    try {

        const restaurant = await restaurantModel.findById(req.params.id)
        if (!restaurant) {
            return res.json({
                status: "FAILED",
                message: "Restaurant not found"
            })
        }
        res.json({
            status: "SUCCESS",
            restaurant: restaurant
        })

    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error fetching restaurant",
            error: err.message

        })
    }
}

//delete individual restaurant data
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id)

        if (!restaurant) {
            return res.json({
                status: "FAILED",
                message: "Restaurant not found"
            })
        }

        //delete banner image
        if (restaurant.banner && fs.existsSync(restaurant.banner)) {
            fs.unlinkSync(restaurant.banner)
        }

        //delete list of gallery images
        if (restaurant.gallery && restaurant.gallery.length > 0) {
            restaurant.gallery.forEach(galleryImage => {
                if (fs.existsSync(galleryImage)) {
                    fs.unlinkSync(galleryImage)
                }
            })
        }


        // delete restaurant foods
        await foodModel.deleteMany({ restaurant: req.params.id })

        // delete restaurant
        await restaurantModel.findByIdAndDelete(req.params.id)
        res.json({
            status: "SUCCESS",
            message: "Restaurant and Food data deleted successfully"
        })


    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error deleting restaurant data",
            error: err.message
        })
    }
}


//Editing or updating restaurant data

exports.updateRestaurant = async (req, res) => {
    try {

        const restaurant = await restaurantModel.findById(req.params.id)

        if (!restaurant) {
            return res.json({
                status: "FAILED",
                message: "No Restaurant Found",
            })
        }

        // //handling banner image separately since it is a file 
        // if (req.files && req.files["banner"]) {
        //     req.body.banner = req.files["banner"][0].path

        // } else {
        //     req.body.banner = restaurant.banner
        // }

        // //handling gallery images separately ..
        // if (req.files && req.files["gallery"]) {
        //     req.body.gallery = req.files["gallery"].map((file) => file.path)

        // }
        // else {
        //     req.body.gallery = restaurant.gallery
        // }


        const bannerFile = req.files.find(file => file.fieldname === "banner");
        const galleryFiles = req.files.filter(file => file.fieldname === "gallery");

        if (bannerFile) {
            req.body.banner = bannerFile.path;
        } else {
            req.body.banner = restaurant.banner;
        }

        if (galleryFiles.length > 0) {
            req.body.gallery = galleryFiles.map(file => file.path);
        } else {
            req.body.gallery = restaurant.gallery;
        }

        

        //update the database 
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        res.json({
            status: "SUCCESS",
            message: "Restaurant updated successfully",
            data: updatedRestaurant
        });

    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error updating restaurant",
            error: err.message
        })
    }
}


//get restaurant by food category 

exports.getRestaurantByFoodCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase().trim()

        const restaurantIds = await foodModel.distinct("restaurant", {
            foodCategory: category
        });

        // const foods = await foodModel.find({ foodCategory: category }).populate("restaurant")
        // const restaurants = foods.map(food => food.restaurant)

        const restaurants = await restaurantModel.find({
            _id: { $in: restaurantIds }
        });


        res.json({
            status: "SUCCESS",
            restaurants: restaurants
        })
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: "Error fetching restaurants by food category",
            error: err.message
        })
    }
}
