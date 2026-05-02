import "./Filters.css";

export default function Filters({
  selectedFilter,
  setSelectedFilter,
  rating,
  setRating,
}) {
  return (
    <div className="filter-section">

      <button
        className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
        onClick={() => setSelectedFilter("all")}
      >
        All
      </button>

      <button
        className={`filter-btn ${selectedFilter === "biryani" ? "active" : ""}`}
        onClick={() => setSelectedFilter("biryani")}
      >
        Biryani
      </button>

      <button
        className={`filter-btn ${selectedFilter === "veg" ? "active" : ""}`}
        onClick={() => setSelectedFilter("veg")}
      >
        Pure Veg
      </button>

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Rating</option>
        <option value="4">4+ Rating</option>
        <option value="3">3+ Rating</option>
      </select>

    </div>
  );
}