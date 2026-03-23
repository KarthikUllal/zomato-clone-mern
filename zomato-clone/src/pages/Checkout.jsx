import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { toast } from "react-toastify";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const Navigate = useNavigate();

  const placeOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    const items = [];

    for (let foodId in cart.items) {
      items.push({
        food: foodId,
        quantity: cart.items[foodId],
      });
    }
    console.log(items);     

    try {
      const token = localStorage.getItem("token");

    const res = await api.post(
        "/api/orders",
        {
          restaurantId: cart.restaurantId,
          items,
          address,
          paymentMethod,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Order Placed Successfully");

      setAddress("");
      setPaymentMethod("COD");

      setCart({
        restaurantId: null,
        items: {},
      });
      
      //after successfully placing order, remove cart from localStorage and navigate to order details page
      localStorage.removeItem("cart");

      //navigate to order details page
      const orderId = res.data.order._id
      Navigate(`/order/${orderId}`)


    } catch (err) {
      toast.error("Order failed", err);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-box">
        <h3>Enter Address</h3>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Delivery Address"
        />

        <h3>Select Payment Method</h3>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>

          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI Payment
          </label>
        </div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
