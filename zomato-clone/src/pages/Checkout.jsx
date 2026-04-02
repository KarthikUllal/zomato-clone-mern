import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { toast } from "react-toastify";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //fetch address from user profile
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await api.get("/api/user/address", {
          headers: { Authorization: token },
        });

        setAddresses(res.data.addresses);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load addresses");
      }
    };

    fetchAddress();
  }, []);

  //place order 
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    const items = [];

    for (let foodId in cart.items) {
      items.push({
        food: foodId,
        quantity: cart.items[foodId],
      });
    }

    try {
      const selectedAddrObj = addresses.find(
        (addr) => addr._id === selectedAddress
      );

      const res = await api.post(
        "/api/orders",
        {
          restaurantId: cart.restaurantId,
          items,
          address: `${selectedAddrObj.street}, ${selectedAddrObj.city}, ${selectedAddrObj.pincode}`,
          paymentMethod,
        },
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Order Placed Successfully");

      // clear cart
      setCart({
        restaurantId: null,
        items: {},
      });

      localStorage.removeItem("cart");

      // redirect to order page
      const orderId = res.data.order._id;
      navigate(`/order/${orderId}`);

    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-box">
        <h3>Select Address</h3>

        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="address-select"
        >
          <option value="">Select Address</option>

          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.street}, {addr.city}, {addr.pincode}
            </option>
          ))}
        </select>

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