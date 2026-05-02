import CategorySlider from "../components/Delivery/CategorySlider";
import BrandSlider from "../components/Delivery/BrandSlider";
import Filters from "../components/Delivery/Filters";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import api from "../api";

import "./Delivery.css";

export default function Delivery() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [rating, setRating] = useState("");

  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = `/api/restaurants/filter?`;

        if (selectedFilter !== "all") {
          url += `type=${selectedFilter}&`;
        } else if (category) {
          url += `type=${category}&`;
        }

        if (rating) {
          url += `rating=${rating}&`;
        }

        const res = await api.get(url);

        setRestaurants(res.data.restaurants || []);
      } catch {
        toast.error("Error fetching restaurant data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter, rating, category]);

  return (
    <div className="delivery-page">

      <Filters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        rating={rating}
        setRating={setRating}
      />

      <CategorySlider />
      <BrandSlider />

      <RestaurentSection
        title="Food Delivery Restaurants in Mangalore"
        data={restaurants}
        loading={loading}
      />
    </div>
  );
}