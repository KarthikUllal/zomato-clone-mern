import "./Header.css";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function DetailsBanner({restaurent}) {
  return (
    <div className="details-banner">
      <img
        src={`${BASE_URL}/${restaurent.banner}`}
        alt={restaurent.name}
      />
    </div>
  );
}