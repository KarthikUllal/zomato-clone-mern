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

        const banner = req.files["banner"]
            ? req.files["banner"][0].path
            : "";

        const gallery = req.files["gallery"]
            ? req.files["gallery"].map(file => file.path)
            : [];

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
        if(restaurant.banner && fs.existsSync(restaurant.banner)){
            fs.unlinkSync(restaurant.banner)
        }

        //delete list of gallery images
        if(restaurant.gallery && restaurant.gallery.length > 0){
            restaurant.gallery.forEach(galleryImage => {
                if(fs.existsSync(galleryImage)){
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

