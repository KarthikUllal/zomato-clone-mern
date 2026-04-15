import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/AdminOrders.css";
import api from "../../api";
import Loader from "../../utils/Loder";
import AdminBackButton from "../components/AdminBackButton";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/orders");
      setOrders(res.data.orders);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);

      await api.put(`/api/admin/orders/${orderId}`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h2>Manage Orders</h2>
        <AdminBackButton />
      </div>

      <div className="orders-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="center">
                    <Loader loading={loading} />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="center">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">{order._id}</td>

                    <td>{order.user?.fullname || "N/A"}</td>

                    <td>{order.restaurant?.name || "N/A"}</td>

                    <td className="items">
                      {order.items
                        ?.map(
                          (item) =>
                            `${item.food?.name} x${item.quantity}`
                        )
                        .join(", ") || "N/A"}
                    </td>

                    <td className="amount">₹{order.totalAmount}</td>

                    <td className="status-cell">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="placed">Placed</option>
                        <option value="accepted">Accepted</option>
                        <option value="preparing">Preparing</option>
                        <option value="out-for-delivery">
                          Out for Delivery
                        </option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;