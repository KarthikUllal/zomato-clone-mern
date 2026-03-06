const restaurantModel = require("../model/restaurantSchema");

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
            status : "SUCCESS",
            message: "Restaurant added successfully",
            restaurant: newRestaurant
        });


    }
    catch (error) {
        res.status(500).json({
            status : "FAILED",
            message: "Error adding restaurant",
            error: error.message
        });
    }
}


//get restaurant

exports.getRestaurants = async (req, res) =>{
    try{

        const restaurants = await restaurantModel.find()

        res.json({
            status : "SUCCESS",
            restaurants : restaurants
        })


    }
    catch(err){
        res.json({
            status : "FAILED",
            message : "Error fetching restaurants",
            error : err.message

        })
    }
}

