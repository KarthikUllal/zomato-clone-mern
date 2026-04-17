import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function PaymentSuccess() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      const token = localStorage.getItem("token");
      const selectedAddress = localStorage.getItem("selectedAddress");

      const items = [];

      for (let foodId in cart.items) {
        items.push({
          food: foodId,
          quantity: cart.items[foodId],
        });
      }

      const res = await api.post(
        "/api/orders",
        {
          restaurantId: cart.restaurantId,
          items,
          address: selectedAddress,
          paymentMethod: "ONLINE",
        },
        {
          headers: { Authorization: token },
        }
      );

      setCart({ restaurantId: null, items: {} });

      localStorage.removeItem("cart");
      localStorage.removeItem("selectedAddress");

      navigate(`/order/${res.data.order._id}`);
    };

    placeOrder();
  }, []);

  return <h1>Payment Successful 🎉</h1>;
}