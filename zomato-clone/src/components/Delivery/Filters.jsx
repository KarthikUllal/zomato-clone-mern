import "./Filters.css";

export default function Filters() {
  return (
    <div className="filter-section">
      <button className="filter-btn">
        <i className="fa-solid fa-filter"></i>
        <span>Filters</span>
      </button>

      <button className="filter-btn">Biryani</button>
      <button className="filter-btn">Pure Veg</button>
    </div>
  );
}