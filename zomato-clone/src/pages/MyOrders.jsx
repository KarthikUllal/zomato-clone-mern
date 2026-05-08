import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import Loader from "../utils/Loder";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const token = localStorage.getItem("token");

  const fetchMyOrders = async () => {
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

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      await api.put(
        `/api/orders/${id}`,
        {},
        { headers: { Authorization: token } },
      );

      toast.success("Order cancelled successfully");

      // fetchMyOrders(); // refresh list
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (err) {
      toast.error("Cancel failed", err);
    }
  };

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
          {currentOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div
                className="clickable-area"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                <div className="order-header">
  <h3>{order.restaurant?.name}</h3>

  <div className="order-statuses">
    
    <span className={`payment-status ${order.paymentStatus}`}>
      {order.paymentStatus}
    </span>

    <span className={`status ${order.status}`}>
      {order.status}
    </span>

  </div>
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

              {order.status === "placed" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    <div className="pagination">
      <button className="prev-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
      <span className="page-info">Page {currentPage} of {totalPages}</span>
      <button className="next-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
      </div>  
    </div>
  );
}

export default MyOrders;
