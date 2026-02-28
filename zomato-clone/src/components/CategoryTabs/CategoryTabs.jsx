import { NavLink } from "react-router-dom";
import "../../components/Navbar/Navbar.css";

export default function CategoryTabs() {
  return (
    <div className="lower">
      <div className="link-container">
        <NavLink
          to="/dining"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <i className="fa-solid fa-utensils"></i>
          Dining
        </NavLink>

        <NavLink
          to="/delivery"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <i className="fa-solid fa-motorcycle"></i>
          Delivery
        </NavLink>

        <NavLink
          to="/nightlife"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <i className="fa-solid fa-martini-glass-empty"></i>
          Nightlife
        </NavLink>
      </div>
    </div>
  );
}
