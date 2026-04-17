import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const selectedAddress = localStorage.getItem("selectedAddress");

        if (!selectedAddress) {
          toast.error("Address missing");
          return navigate("/checkout");
        }

        if (!cart.items || Object.keys(cart.items).length === 0) {
          toast.error("Cart is empty");
          return navigate("/cart");
        }

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

        // clear cart AFTER success
        setCart({ restaurantId: null, items: {} });
        localStorage.removeItem("cart");
        localStorage.removeItem("selectedAddress");

        toast.success("Order placed successfully");

        
        navigate(`/order/${res.data.order._id}`);

      } catch (err) {
        console.log(err);
        toast.error("Order creation failed");
        navigate("/checkout");
      }
    };

    placeOrder();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Processing your order...</h2>
    </div>
  );
}