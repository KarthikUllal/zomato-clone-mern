import "./DeliveryCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import api from "../../api";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const brands = [
  {
    img: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png",
    name: "KFC",
    time: "24 min",
  },
  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/5caf38856d23347b351bb7abf97134d3_1550060292.png",
    name: "Domino's",
    time: "27 min",
  },
  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/a6927d83d9185b7788814049b4a9fc8c_1726606857.png",
    name: "Burger King",
    time: "20 min",
  },
  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/685a8bc8df94d6dcc58c1d20d4ac97ae1735904675.png",
    name: "Work And Fork",
    time: "20 min",
  },

  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/76ec7f87e02f9e39575254a58ee769ee_1700392019.png",
    name: "Cochin Village Restaurant",
    time: "19 min",
  },

  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/3d80cb89fca9e212f7dab2c1914ebd8f_1643983885.png",
    name: "McDonald's",
    time: "20 min",
  },

  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/f125054c3c2ebac00325c23bdc864dd7_1762157779.png",
    name: "Pizza Hut",
    time: "20 min",
  },

  {
    img: "https://b.zmtcdn.com/data/brand_creatives/logos/cb356dca5717dc819a3c601cc4340009_1762946334.png",
    name: "Polar Bear Ice Cream Sundes",
    time: "20 min",
  },

];
export default function BrandSlider() {
  const navigate = useNavigate();
  
  const handleBrandClick = (brandName) => {
    try{
      const res = api.get(`/api/user/restaurant/brand/${brandName}`);

      const restaurants = res.data.restaurant;
      if(restaurants){
        navigate(`/restaurants/${restaurants._id}`); 
      }else{
          alert("No restaurant found for this brand");
      }

    }
    catch(err){
        console.log("Error Fetching restaurant:", err);
    }
      
    }
    
  return (
    <div className="delivery-slider">
      <h2>Top brands for you</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1400: { slidesPerView: 5 },
        }}
      >
        {brands.map((item, index) => (
          <SwiperSlide key={index} onClick={() => handleBrandClick(item.name)}>
            <div className="brand-card">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.time}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
