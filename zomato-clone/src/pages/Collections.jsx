import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Collections.css";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await api.get("/api/admin/restaurants");
        const restaurants = res.data.restaurants;

        const grouped = {};

        restaurants.forEach((r) => {
          const cuisines = r.cuisine?.split(",") || [];

          cuisines.forEach((c) => {
            const key = c.trim().toLowerCase();

            if (!grouped[key]) {
              grouped[key] = [];
            }

            grouped[key].push(r);
          });
        });

        const result = Object.keys(grouped).map((key) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          places: grouped[key].length,
          img: grouped[key][0]?.banner,
          key: key,
        }));

        setCollections(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="collections-page">
      <h1>All Collections in Mangalore</h1>

      <div className="collections-grid">
        {collections.map((item, index) => (
          <div
            key={index}
            className="collection-card"
            onClick={() => navigate(`/collections/${item.key}`)}
          >
            <img src={item.img} alt={item.name} />

            <div className="overlay">
              <h3>{item.name}</h3>
              <p>{item.places} places →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}