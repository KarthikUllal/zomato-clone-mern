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

  const { category } = useParams();
  console.log("Category:", category);

  useEffect(() => {
    const fetchDeliveryRestaurant = async () => {
      try {
        let url = "/api/admin/restaurants";

        if (category) {
          url = `/api/restaurants/food-category/${category}`;
        }

        const res = await api.get(url);

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
