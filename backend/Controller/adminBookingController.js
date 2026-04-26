const bookingModel = require("../model/bookingSchema");
const restaurantModel = require("../model/restaurantSchema");

const getAllBookings = async (req, res) => {
    const bookings = await bookingModel
        .find()
        .populate("user", "fullname email")
        .populate("restaurant", "name");

    res.json({ bookings });
};


//update slots ..
const updateSlots = async (req, res) => {
  const { slots } = req.body;

  const restaurant = await restaurantModel.findByIdAndUpdate(
    req.params.restaurantId,
    { slots },
    { new: true }
  );

  res.json({ restaurant });
};



module.exports = { getAllBookings, updateSlots };
