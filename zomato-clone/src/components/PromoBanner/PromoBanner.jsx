import "./PromoBanner.css";
import { useNavigate } from "react-router-dom";




export default function PromoBanner() {
  const navigate = useNavigate();
  
  return (
    <section className="promo-section">
      <div className="promo-content">
        <h2>Get up to</h2>
        <h1>50% <span>OFF</span></h1>
        <p>on your dining bills with Zomato</p>
        <button className="promo-btn" onClick={() => navigate("/dining")}>
          Check out all the restaurants
        </button>
      </div>
    </section>
  );
}