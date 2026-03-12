import Carousel from "../components/Carousel/Carousel";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
// import { restaurents } from "../data/restaurentData";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./Nightlife.css";

export default function Nightlife() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() =>{
    const fetchNightlifeRestaurant =async () =>{
      try{
        const res = await axios.get("http://localhost:8000/api/admin/restaurants")
        setRestaurants(res.data.restaurants)
      }
      catch(err){
        toast.error("Error fetching restaurant data", err)
      }
    }
      fetchNightlifeRestaurant()
  },[])

  const nightlifeRestaurents = restaurants.filter(
    (item) => item.category === "nightlife"
  );

  return (
    <div className="nightlife-page">

      <Carousel />
      <PromoBanner />

      <section className="nightlife-heading">
        <h2>Nightlife: Night clubs, pubs and bar in Mangalore</h2>
      </section>

      <RestaurentSection
        data={nightlifeRestaurents}
      />

    </div>
  );
}