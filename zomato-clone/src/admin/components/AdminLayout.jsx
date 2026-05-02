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
            <i className="fa-solid fa-home" aria-hidden="true" style={{marginRight : "10px", fontSize : "25px"}}></i>
            Dashboard
          </p>
          <p
            className={isActive("/admin/add") ? "active" : ""}
            onClick={() => navigate("/admin/add")}
          >
            <i className="fa-solid fa-plus" aria-hidden="true" style={{marginRight : "10px", fontSize : "25px"}}></i>
            Add Restaurant & Food
          </p>
          <p
            className={isActive("/admin/view") ? "active" : ""}
            onClick={() => navigate("/admin/view")}
          >
            <i className="fa-solid fa-eye" aria-hidden="true" style={{marginRight : "10px", fontSize : "15px"}}></i>
            Manage Restaurants & Food
          </p>

          <p
            className={isActive("/admin/orders") ? "active" : ""}
            onClick={() => navigate("/admin/orders")}
          >
            <i className="fa-solid fa-shopping-cart" aria-hidden="true" style={{marginRight : "10px", fontSize : "25px"}}></i>
            Orders
          </p>

          <p
            className={isActive("/admin/users") ? "active" : ""}
            onClick={() => navigate("/admin/users")}
          >
            <i className="fa-solid fa-user" aria-hidden="true" style={{marginRight : "10px", fontSize : "25px"}}></i>
            Users
          </p>

          <p
            className={isActive("/admin/bookings") ? "active" : ""}
            onClick={() => navigate("/admin/bookings")}
          >
              <i className="fa-solid fa-chair" aria-hidden="true" style={{marginRight : "10px" , fontSize : "25px"}}></i>
            Bookings
          </p>

          <p
            className={isActive("/admin/manage-slots") ? "active" : ""}
            onClick={() => navigate("/admin/manage-slots")}
          >
            <i className="fa-solid fa-clock" aria-hidden="true" style={{marginRight : "10px",
              fontSize : "25px"
            }}></i>
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
