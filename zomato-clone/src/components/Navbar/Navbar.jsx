import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import CategoryTabs from "../CategoryTabs/CategoryTabs";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailsPage = location.pathname.startsWith("/restaurent/");

  const token = localStorage.getItem("token");
   const userName = localStorage.getItem("userName");
  const isLoggedIn = !!token;
 
  const profileLetter = userName ? userName.charAt(0).toUpperCase() : "";



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="upper">
        <div className="logo">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="Zomato Logo"
          />
        </div>

        <SearchBar />

        <div className="nav-right">
          {isLoggedIn ? (
            <div className="profile-section">
              <div className="profile-circle">{profileLetter}</div>

              <span className="my-order" onClick={() => navigate("/my-orders")}>My Orders</span>
              <span className="user-profile" onClick={() => navigate("/user-profile")}>User Profile</span>  
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </div>

      <div className="middle">
        <span>Home</span>
        <span>/</span>
        <span>India</span>
        <span>/</span>
        <span id="specific-city">Mangalore Restaurant</span>
      </div>

      {/*Conditional rendering or category tab to avoid apperence in restaurent details tab */}
      {!isDetailsPage && <CategoryTabs />}
    </header>
  );
}
