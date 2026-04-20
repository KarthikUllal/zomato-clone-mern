import "./Carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

import "swiper/css";
import "swiper/css/navigation";

export default function Carousel() {
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

            if (!key) return;

            if (!grouped[key]) {
              grouped[key] = [];
            }

            grouped[key].push(r);
          });
        });

        const result = Object.keys(grouped)
          .map((key) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            places: grouped[key].length,
            img: grouped[key][0]?.banner,
            key: key,
          }))
          .sort((a, b) => b.places - a.places)
          .slice(0, 6); // top 6

        setCollections(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h1>Collections</h1>

        <div className="carousel-middle">
          <div>
            Explore curated lists of top restaurants in Mangalore
          </div>

          <div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/collections")}
            >
              All Collections →
            </span>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        speed={500}
        slidesPerView={4}  
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {collections.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="card-items"
              onClick={() => navigate(`/collections/${item.key}`)}
            >
              <img src={item.img} alt={item.name} />

              <div className="content">
                <h3>{item.name}</h3>
                <a>
                  {item.places}{" "}
                  {item.places === 1 ? "place" : "places"} →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}