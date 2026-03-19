import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ import card + styles
import RestaurentCard from "../components/RestaurentCards/RestaurentCards";
import "../components/RestaurentCards/RestaurentCards.css";

export default function SearchResults() {
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/user/search?query=${query}`
        );

        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        toast.error("Error fetching search results");
        console.log(err);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [location.search]);


  return (
    <div style={{ padding: "20px" }}>
      {restaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        <div className="restaurent-cards">
          {restaurants.map((r) => (
            <RestaurentCard key={r._id} restaurent={r} />
          ))}
        </div>
      )}
    </div>
  );
}