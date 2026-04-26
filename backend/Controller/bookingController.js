const bookingModel = require("../model/bookingSchema");
const restaurantModel = require("../model/restaurantSchema");
const userModel = require("../model/userSchema");
const sendMail = require("../utils/mailer");

const getSlots = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { date } = req.query;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.json({ status: "FAILED", slots: [] });
        }

        const bookings = await bookingModel.find({
            restaurant: restaurantId,
            date,
            status: "confirmed"
        });

        const slots = (restaurant.slots || []).map(slot => {
            const booked = bookings
                .filter(b => b.time === slot.time)
                .reduce((sum, b) => sum + b.guests, 0);

            return {
                time: slot.time,
                available: Math.max(slot.capacity - booked, 0)
            };
        });

        res.json({ status: "SUCCESS", slots });

    } catch (err) {
        res.json({ status: "FAILED", slots: [] });
    }
};

const bookTable = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { restaurantId, date, time, guests } = req.body;

        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.json({ status: "FAILED", message: "Restaurant not found" });
        }

        const slot = (restaurant.slots || []).find(s => s.time === time);

        if (!slot) {
            return res.json({ status: "FAILED", message: "Invalid slot" });
        }

        const bookings = await bookingModel.find({
            restaurant: restaurantId,
            date,
            time,
            status: "confirmed"
        });

        const bookedSeats = bookings.reduce((sum, b) => sum + b.guests, 0);

        if (bookedSeats + guests > slot.capacity) {
            return res.json({ status: "FAILED", message: "Slot full" });
        }

        const booking = new bookingModel({
            user: userId,
            restaurant: restaurantId,
            date,
            time,
            guests
        });

        await booking.save();

        const user = await userModel.findById(userId);

        await sendMail({
            to: user.email,
            subject: "Table Booking Confirmed",
            html: `
                <h3>${restaurant.name}</h3>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Guests: ${guests}</p>
            `
        });

        res.json({
            status: "SUCCESS",
            message: "Booking confirmed",
            booking
        });

    } catch (err) {
        res.json({
            status: "FAILED",
            message: err.message
        });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.userId;

        const bookings = await bookingModel
            .find({ user: userId })
            .populate("restaurant", "name")
            .sort({ createdAt: -1 });

        res.json({
            status: "SUCCESS",
            bookings
        });

    } catch (err) {
        res.json({
            status: "FAILED",
            bookings: []
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const booking = await bookingModel.findById(id);

        if (!booking || booking.user.toString() !== userId) {
            return res.json({ status: "FAILED", message: "Not allowed" });
        }

        booking.status = "cancelled";
        await booking.save();

        res.json({ status: "SUCCESS", message: "Booking cancelled" });

    } catch (err) {
        res.json({ status: "FAILED", message: err.message });
    }
};

module.exports = {
    getSlots,
    bookTable,
    getMyBookings,
    cancelBooking
};