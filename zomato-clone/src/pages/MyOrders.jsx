// MyOrders.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import Loader from "../utils/Loder";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const res = await api.get("/api/orders/myorders", {
          headers: { Authorization: token },
        });

        setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="my-orders">
      <h1>My Orders</h1>

      {loading ? (
        <div className="loader-container">
          <Loader loading={loading} />
        </div>
      ) : orders.length === 0 ? (
        <p className="empty">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
              onClick={() => navigate(`/order/${order._id}`)}
            >
              <div className="order-header">
                <h3>{order.restaurant?.name}</h3>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              <div className="items-list">
                {order.items.map((item) => (
                  <div key={item._id} className="item-row">
                    {item.food.image && (
                      <img
                        src={getImageUrl(item.food.image)}
                        alt={item.food.name}
                      />
                    )}

                    <div className="item-info">
                      <p className="item-name">{item.food?.name}</p>
                      <p className="item-qty">x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span>Subtotal: ₹{order.subtotal || order.totalAmount}</span>
                <span>GST: ₹{order.gst || 0}</span>
                <span>Delivery: ₹{order.deliveryCharge || 0}</span>

                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
