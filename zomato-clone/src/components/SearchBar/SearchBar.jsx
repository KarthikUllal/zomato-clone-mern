import "../../components/Navbar/Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <div className="nav-middle">
      <div className="location">
        <i className="fa-solid fa-location-dot"></i>
      </div>

      <div className="bar"></div>

      <div className="search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          onKeyDown={handleSearch}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
    </div>
  );
}