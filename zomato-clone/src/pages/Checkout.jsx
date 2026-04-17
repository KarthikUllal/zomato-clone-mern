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
        toast.error("Failed to load data", err.message);
      }
    };

    fetchData();
  }, []);

  const getFullAddress = () => {
    const selectedAddrObj = addresses.find(
      (addr) => addr._id.toString() === selectedAddress
    );

    if (!selectedAddrObj) return "";

    return `${selectedAddrObj.street}, ${selectedAddrObj.city}, ${selectedAddrObj.pincode}`;
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    const fullAddress = getFullAddress();

    if (!fullAddress) {
      toast.error("Invalid address");
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
      const res = await api.post(
        "/api/orders",
        {
          restaurantId: cart.restaurantId,
          items,
          address: fullAddress,
          paymentMethod: "COD",
        },
        {
          headers: { Authorization: token },
        }
      );

      setCart({ restaurantId: null, items: {} });
      localStorage.removeItem("cart");

      navigate(`/order/${res.data.order._id}`);
    } catch {
      toast.error("Order failed");
    }
  };

  const handleOnlinePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    const fullAddress = getFullAddress();

    if (!fullAddress) {
      toast.error("Invalid address");
      return;
    }

    localStorage.setItem("selectedAddress", fullAddress);

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
    } catch {
      toast.error("Payment failed");
    }
  };

  const totalItems = Object.values(cart.items || {}).reduce(
    (a, b) => a + b,
    0
  );

  const totalPrice = foods.reduce((total, food) => {
    return total + food.price * (cart.items?.[food._id] || 0);
  }, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        <div className="checkout-left">
          <h2>Checkout</h2>

          <div className="section">
            <h3>Delivery Address</h3>

            <select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="address-select"
            >
              <option value="">Select Address</option>

              {addresses.map((addr) => (
                <option key={addr._id} value={addr._id.toString()}>
                  {addr.street}, {addr.city}, {addr.pincode}
                </option>
              ))}
            </select>
          </div>

          <div className="section">
            <h3>Payment Method</h3>

            <div className="payment-options">
              <label className="radio-card">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash On Delivery
              </label>

              <label className="radio-card">
                <input
                  type="radio"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <h3>Order Summary</h3>

          <div className="summary-box">
            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="checkout-btn"
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

      </div>
    </div>
  );
}