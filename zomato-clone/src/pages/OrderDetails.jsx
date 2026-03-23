import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderDetails.css";
import api from "../api";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


export default function OrderDetails() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get(
          `/api/orders/${id}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        setOrder(res.data.order);

      } catch (err) {
        console.log(err);
      }

    };

    fetchOrder();

  }, [id]);

  if (!order) return <h3 className="loading">Loading Order...</h3>;

  return (

    <div className="order-container">

      <div className="order-card">

        <h2 className="success">Order Placed Successfully</h2>

        <div className="order-info">
          <p><b>Restaurant:</b> {order.restaurant.name}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Address:</b> {order.address}</p>
        </div>

        <h3 className="items-title">Items Ordered</h3>

        <div className="items-list">

          {order.items.map((item) => (

            <div className="item" key={item._id}>

              <img
                src={`${BASE_URL}/${item.food.image}`}
                alt={item.food.name}
              />

              <div className="item-details">

                <h4>{item.food.name}</h4>

                <p>₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>

              </div>

              <div className="item-total">
                ₹{item.price * item.quantity}
              </div>

            </div>

          ))}

        </div>

        <div className="total-box">
          Total Amount: ₹{order.totalAmount}
        </div>

      </div>

    </div>

  );
}