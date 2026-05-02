import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2 className="logo">Zomato Admin</h2>

        <div className="nav-links">
          <p
            className={isActive("/admin") ? "active" : ""}
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </p>
          <p
            className={isActive("/admin/add") ? "active" : ""}
            onClick={() => navigate("/admin/add")}
          >
            Add Restaurant & Food
          </p>
          <p
            className={isActive("/admin/view") ? "active" : ""}
            onClick={() => navigate("/admin/view")}
          >
            Manage Restaurants & Food
          </p>

          <p
            className={isActive("/admin/orders") ? "active" : ""}
            onClick={() => navigate("/admin/orders")}
          >
            Orders
          </p>

          <p
            className={isActive("/admin/users") ? "active" : ""}
            onClick={() => navigate("/admin/users")}
          >
            Users
          </p>

          <p
            className={isActive("/admin/bookings") ? "active" : ""}
            onClick={() => navigate("/admin/bookings")}
          >
            Bookings
          </p>

          <p
            className={isActive("/admin/manage-slots") ? "active" : ""}
            onClick={() => navigate("/admin/manage-slots")}
          >
            Slots
          </p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
