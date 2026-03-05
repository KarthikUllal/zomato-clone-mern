import { useNavigate } from "react-router-dom";
import "../styles/AdminLayout.css"

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <button onClick={() => navigate("/admin/dashboard")}>
        Dashboard
      </button>

      <button onClick={() => navigate("/admin/add")}>
        Add Restaurant And Food
      </button>

      <button onClick={() => navigate("/admin/view")}>
        Manage Restaurant And Food
      </button>

      <button onClick={() => navigate("/admin/orders")}>
        Manage Orders
      </button>

      <button onClick={() => navigate("/admin/users")}>
        Manage Users
      </button>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}