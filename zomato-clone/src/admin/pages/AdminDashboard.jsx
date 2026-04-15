import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

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

      <div className="dashboard-content">

        <div className="dashboard-grid">
          <div className="dashboard-card red" onClick={() => navigate("/admin/add")}>
            <h2>Add</h2>
            <p>Restaurant & Food</p>
          </div>

          <div className="dashboard-card orange" onClick={() => navigate("/admin/view")}>
            <h2>Manage</h2>
            <p>Restaurant & Food</p>
          </div>

          <div className="dashboard-card blue" onClick={() => navigate("/admin/orders")}>
            <h2>Orders</h2>
            <p>Track Orders</p>
          </div>

          <div className="dashboard-card green" onClick={() => navigate("/admin/users")}>
            <h2>Users</h2>
            <p>Manage Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}