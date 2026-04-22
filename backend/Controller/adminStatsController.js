const foodModel = require("../model/foodSchema");
const userModel = require("../model/userSchema");
const orderModel = require("../model/orderSchema");
const restaurantModel = require("../model/restaurantSchema");

const getAdminStats = async (req, res) => {
    try{

        const totalUsers = await userModel.countDocuments();
        const totalRestaurants = await restaurantModel.countDocuments();
        const totalFoods = await foodModel.countDocuments();
        const totalOrders = await orderModel.countDocuments();

        //revenue count

        const revenueData = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);
        const totalRevenueAmount = revenueData[0].totalRevenue;

        res.json({
            status : "SUCCESS",
            message : "Admin stats fetched successfully",
            totalUsers,
            totalRestaurants,
            totalFoods,
            totalOrders,
            totalRevenueAmount,
        })
    }
    catch(err){
        res.json({
            status : "SUCCESS",
            message : err.message,
        })
    }
}

module.exports = {
    getAdminStats,
}
