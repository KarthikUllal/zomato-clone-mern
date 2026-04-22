import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRestaurants: 0,
    totalFoods: 0,
    totalRevenueAmount: 0,
  });

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
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
      }
    };
    getDashboardStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

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
          </div>

          <div
            className="dashboard-card orange"
            onClick={() => navigate("/admin/view")}
          >
            <h2>Manage</h2>
            <p>Restaurant & Food</p>
          </div>

          <div
            className="dashboard-card blue"
            onClick={() => navigate("/admin/orders")}
          >
            <h2>Orders</h2>
            <p>Track Orders</p>
          </div>

          <div
            className="dashboard-card green"
            onClick={() => navigate("/admin/users")}
          >
            <h2>Users</h2>
            <p>Manage Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
