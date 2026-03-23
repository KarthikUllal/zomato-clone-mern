import { getImageUrl } from "../../utils/imageHelper";
import "./RestaurentCards.css";
import { useNavigate } from "react-router-dom";

export default function RestaurentCard({ restaurent }) {
  const navigate = useNavigate();

  return (
    <div
      className="restaurent-card"
      onClick={() => navigate(`/restaurent/${restaurent._id}`)}
    >
      <img
        src={getImageUrl(restaurent.banner)}
        alt={restaurent.name}
      />

      <div className="restaurent-content">
        <div className="top">
          <h3>{restaurent.name}</h3>
          <span className="rating">{restaurent.rating} ★</span>
        </div>

        <div className="bottom">
          <p>{restaurent.cuisine}</p>
          <p className="location">{restaurent.location}</p>
        </div>
      </div>
    </div>
  );
}