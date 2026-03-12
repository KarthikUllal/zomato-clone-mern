import CategorySlider from "../components/Delivery/CategorySlider";
import BrandSlider from "../components/Delivery/BrandSlider";
import Filters from "../components/Delivery/Filters";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./Delivery.css";

export default function Delivery() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() =>{
    const fetchDeliveryRestaurant =async () =>{
      try{
        const res = await axios.get("http://localhost:8000/api/admin/restaurants")
        setRestaurants(res.data.restaurants)
      }
      catch(err){
        toast.error("Error fetching restaurant data", err)
      }
    }
      fetchDeliveryRestaurant()
  },[])

  const deliveryRestaurents = restaurants.filter(
    (item) => item.category === "delivery"
  );

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