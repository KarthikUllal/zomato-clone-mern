import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
      const res = await axios.get("http://localhost:8000/api/admin/orders");
      setOrders(res.data.orders);
    };
  useEffect(() => {
    fetchOrders();
  }, []);

  //update status of order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/orders/${orderId}`, {
        status: newStatus,
      });
      // Update the orders state to reflect the changed status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="admin-orders">
      <div className="header">
        <h2>Manage Orders</h2>

        <span className="refresh" onClick={fetchOrders}>
          <i className="fa fa-refresh"></i>
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Delivery Address</th>
            <th>Restaurant</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.fullname || "N/A"}</td>
              <td>{order.address || "N/A"}</td>
              <td>{order.restaurant?.name || "N/A"}</td>
              <td>
                {order.items
                  ?.map((item) => `${item.food?.name} x ${item.quantity}`)
                  .join(", ") || "N/A"}
              </td>
              <td>{order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="placed">Placed</option>
                  <option value="accepted">Accepted</option>
                  <option value="preparing">Preparing</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className={`status ${order.status}`}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
