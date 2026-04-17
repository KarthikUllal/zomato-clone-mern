require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.food.name,
        },
        unit_amount: item.food.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
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