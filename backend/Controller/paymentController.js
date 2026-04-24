require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    // Calculate GST and delivery charges
    const GST_RATE = 0.05;
    const DELIVERY_CHARGE = 40;

    // Calculate subtotal
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.food.price * item.quantity;
    }

    const gst = subtotal * GST_RATE;
    const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
    const totalAmount = subtotal + gst + deliveryCharge;

    // Create line items for Stripe
    const line_items = [];

    // Add food items 
    for (const item of items) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.food.name,
          },
          unit_amount: Math.round(item.food.price * 100), // Show original price
        },
        quantity: item.quantity,
      });
    }

    // Add GST as a separate line item
    if (gst > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: `GST (5%)`,
          },
          unit_amount: Math.round(gst * 100),
        },
        quantity: 1,
      });
    }

    // Add delivery charge as a separate line item
    if (deliveryCharge > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: Math.round(deliveryCharge * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({
      status: "SUCCESS",
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = { createCheckoutSession };