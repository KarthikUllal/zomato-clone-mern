import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:8000/api/orders/myorders",
          {
            headers: { Authorization: token }
          }
        );

        setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="my-orders">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
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
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <div className="items-list">

                {order.items.map((item) => (

                  <div key={item._id} className="item-row">

                    <img
                      src={
                        item.food?.image
                          ? `http://localhost:8000/${item.food.image}`
                          : "/default-food.png"
                      }
                      alt={item.food?.name}
                    />

                    <div className="item-info">
                      <p className="item-name">{item.food?.name}</p>
                      <p className="item-qty">x {item.quantity}</p>
                    </div>

                  </div>

                ))}

              </div>

              <div className="order-footer">
                <span>₹{order.totalAmount}</span>
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyOrders;