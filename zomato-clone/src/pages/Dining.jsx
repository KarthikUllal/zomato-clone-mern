import Carousel from "../components/Carousel/Carousel";
// import FilterButtons from "../components/FilterButtons/FilterButtons";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
// import { restaurents } from "../data/restaurentData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";


export default function Dining() {

  //Managing state for restuarant data coming from backend
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetching restaurant data when page loads
  useEffect(() =>{
    const fetchDinningRestaurant =async () =>{
      try{
        setLoading(true);
        const res = await api.get("/api/admin/restaurants")
        setRestaurants(res.data.restaurants)

      }
      catch(err){
        toast.error("Error fetching restaurant data", err)
      }
      setTimeout(() => setLoading(false), 1000);
    } 
    fetchDinningRestaurant()
  },[])

  const diningRestaurants = restaurants.filter(
    (item) => item.category === "dining"
  );

  console.log(diningRestaurants)

  return (
    <>
      <Carousel />
      {/* <FilterButtons /> */}
      <PromoBanner />

      <RestaurentSection
        title="Restaurants in Mangalore"
        data={diningRestaurants}
        loading={loading}
      />
    </>
  );
}