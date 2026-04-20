import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
import "./CollectionDetails.css";
import { toast } from "react-toastify";

export default function CollectionDetails() {
  const { category } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get(`/api/restaurants/cuisine/${category}`);

        setRestaurants(res.data.restaurants);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [category]);
  console.log("Restaurants:", restaurants);
  return (
    <div className="collection-details">
      <h1>{category} places in Mangalore</h1>

      <RestaurentSection data={restaurants} loading={loading} />
    </div>
  );
}
