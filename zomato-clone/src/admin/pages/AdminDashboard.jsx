import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import OrderCharts from "./OrderCharts";
import Loader from "../../utils/Loder";
import OrderStatusPieCharts from "./OrderStatusPieCharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRestaurants: 0,
    totalFoods: 0,
    totalRevenueAmount: 0,
  });

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/dashboard");
        setStats({
          totalUsers: res.data.totalUsers,
          totalOrders: res.data.totalOrders,
          totalRestaurants: res.data.totalRestaurants,
          totalFoods: res.data.totalFoods,
          totalRevenueAmount: res.data.totalRevenueAmount,
        });
      } catch (err) {
        toast.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    getDashboardStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  useEffect(() => {
    const getRecentOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/orders");
        setOrderList(res.data.orders);
      } catch (err) {
        toast.error("Error fetching recent orders", err);
      } finally {
        setLoading(false);
      }
    };
    getRecentOrders();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="logo">
          <h1>Zomato Admin</h1>
        </div>
        <button className="logout-btn-top" onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalRestaurants}</h3>
          <p>Total Restaurants</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h3>₹{stats.totalRevenueAmount}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div
            className="dashboard-card red"
            onClick={() => navigate("/admin/add")}
          >
            <h2>Add</h2>
            <p>Restaurant & Food</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>

          <div
            className="dashboard-card orange"
            onClick={() => navigate("/admin/view")}
          >
            <h2>Manage</h2>
            <p>Restaurant & Food</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>

          <div
            className="dashboard-card blue"
            onClick={() => navigate("/admin/orders")}
          >
            <h2>Orders</h2>
            <p>Track Orders</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>

          <div
            className="dashboard-card green"
            onClick={() => navigate("/admin/users")}
          >
            <h2>Users</h2>
            <p>Manage Users</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>

          <div
            className="dashboard-card purple"
            onClick={() => navigate("/admin/bookings")}
          >
            <h2>Bookings</h2>
            <p>Table Reservations</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>

          <div
            className="dashboard-card teal"
            onClick={() => navigate("/admin/manage-slots")}
          >
            <h2>Slots</h2>
            <p>Manage Table Slots</p>
            <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
          </div>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card">
          <h2>Order Analysis (Last 7 Days)</h2>
          <div className="line-chart-container">
            <OrderCharts orders={orderList} />
          </div>
        </div>
        <div className="analysis-card">
          <h2>Order Status Analysis</h2>
          <OrderStatusPieCharts orders={orderList} />
        </div>
      </div>
      <div className="recent-orders">
          <div className="header-section">
            <h2>Recent Orders</h2>
            <h2
              className="view-all-orders pointer"
              onClick={() => navigate("/admin/orders")}
            >
              View All Orders
              <i className="fas fa-arrow-right" style={{ marginLeft: 5 }}></i>
            </h2>
          </div>

          <div className="order-list">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Restaurant Name</th>
                  <th>Customer Name</th>
                  <th>Order Status</th>
                  <th>Order Amount</th>
                  <th>Order Date</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="center">
                      <Loader loading={loading} />
                    </td>
                  </tr>
                ) : (
                  orderList
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .slice(0, 5)
                    .map((orders) => (
                      <tr key={orders._id}>
                        <td>{orders._id}</td>
                        <td>{orders.restaurant?.name}</td>
                        <td>{orders.user?.fullname}</td>
                        <td>{orders.status}</td>
                        <td>₹{orders.totalAmount}</td>
                        <td>
                          {new Date(orders.createdAt).toLocaleDateString(
                            "en-IN",
                          )}
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
