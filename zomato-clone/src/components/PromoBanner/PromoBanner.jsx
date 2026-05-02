import "./PromoBanner.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function PromoBanner({ redirectPath, targetId }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = () => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    if (location.pathname === redirectPath) {
      scrollToSection();
    } else {
      navigate(redirectPath);

      setTimeout(() => {
        scrollToSection();
      }, 500);
    }
  };

  return (
    <section className="promo-section">
      <div className="promo-content">
        <h2>Get up to</h2>
        <h1>50% <span>OFF</span></h1>
        <p>on your dining bills with Zomato</p>

        <button className="promo-btn" onClick={handleClick}>
          Check out all the restaurants
        </button>
      </div>
    </section>
  );
}