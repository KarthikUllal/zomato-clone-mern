import "../../components/Navbar/Navbar.css";

export default function SearchBar() {
  return (
    <div className="nav-middle">
      <div className="location">
        <i className="fa-solid fa-location-dot"></i>
        <select>
          <option>Mangalore</option>
          <option>Udupi</option>
          <option>Bangalore</option>
        </select>
      </div>

      <div className="bar"></div>

      <div className="search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
        />
      </div>
    </div>
  );
}