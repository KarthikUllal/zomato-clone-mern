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
  const [foods, setFoods] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch address + foods
  useEffect(() => {
    const fetchData = async () => {
      try {
        const addr = await api.get("/api/user/address", {
          headers: { Authorization: token },
        });
        setAddresses(addr.data.addresses);

        const ids = Object.keys(cart.items || {});
        if (ids.length > 0) {
          const res = await api.post("/api/foods/by-ids", { ids });
          setFoods(res.data.foods);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // COD ORDER
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
          paymentMethod: "COD",
        },
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Order Placed Successfully");

      setCart({ restaurantId: null, items: {} });
      localStorage.removeItem("cart");

      navigate(`/order/${res.data.order._id}`);
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  // STRIPE PAYMENT
  const handleOnlinePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    localStorage.setItem("selectedAddress", selectedAddress);

    const items = [];

    for (let foodId in cart.items) {
      const food = foods.find((f) => f._id === foodId);

      items.push({
        food: food,
        quantity: cart.items[foodId],
      });
    }

    try {
      const res = await api.post(
        "/api/payment/create-checkout-session",
        { items }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
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
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
        </div>

        <button
          className="place-order-btn"
          onClick={() => {
            if (paymentMethod === "COD") {
              placeOrder();
            } else {
              handleOnlinePayment();
            }
          }}
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay & Order"}
        </button>
      </div>
    </div>
  );
}