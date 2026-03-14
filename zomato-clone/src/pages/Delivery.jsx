import CategorySlider from "../components/Delivery/CategorySlider";
import BrandSlider from "../components/Delivery/BrandSlider";
import Filters from "../components/Delivery/Filters";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import "./Delivery.css";

export default function Delivery() {
  const [restaurants, setRestaurants] = useState([]);

  const { category } = useParams();
  console.log("Category:", category);

  useEffect(() => {
    const fetchDeliveryRestaurant = async () => {
      try {
        let url = "http://localhost:8000/api/admin/restaurants";

        if (category) {
          url = `http://localhost:8000/api/restaurants/food-category/${category}`;
        }

        const res = await axios.get(url);

        setRestaurants(res.data.restaurants);
      } catch (err) {
        toast.error("Error fetching restaurant data", err);
      }
    };

    fetchDeliveryRestaurant();
  }, [category]);

  
  let deliveryRestaurents = restaurants;
  if (!category) {
    deliveryRestaurents = restaurants.filter(
      (item) => item.category === "delivery",
    );
  }

  return (
    <div className="delivery-page">
      <Filters />
      <CategorySlider />
      <BrandSlider />

      <RestaurentSection
        title="Food Delivery Restaurants in Mangalore"
        data={deliveryRestaurents}
      />
    </div>
  );
}
