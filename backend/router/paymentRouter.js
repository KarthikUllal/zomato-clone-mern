const express = require("express");
const { createCheckoutSession } = require("../Controller/paymentController");
const paymentRouter = express.Router();


paymentRouter.post("/payment/create-checkout-session", createCheckoutSession);

module.exports = paymentRouter;
