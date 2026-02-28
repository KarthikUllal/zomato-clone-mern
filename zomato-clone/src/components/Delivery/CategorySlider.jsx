import "./DeliveryCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyaXlhbml8ZW58MHx8MHx8fDA%3D",
    name: "Biryani",
  },
  {
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
    name: "Chicken",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6YWF8ZW58MHx8MHx8fDA%3D",
    name: "Pizza",
  },
  {
    img: "https://images.unsplash.com/photo-1742281258189-3b933879867a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGhhbGl8ZW58MHx8MHx8fDA%3D",
    name: "Thali",
  },
  {
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
    name: "Burger",
  },
  {
    img :"https://images.unsplash.com/photo-1742281257687-092746ad6021?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVnJTIwbWVhbHN8ZW58MHx8MHx8fDA%3D",
    name : "Veg Meals"
  },
  {
    img:"https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww",
    name : "Fried Rice"
  }
];

export default function CategorySlider() {
  return (
    <div className="delivery-slider category-slider">
      <h2>Inspiration for your first order</h2>

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
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="circle-card">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
