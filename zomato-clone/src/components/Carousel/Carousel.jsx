  import "./Carousel.css";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Navigation } from "swiper/modules";

  import "swiper/css";
  import "swiper/css/navigation";

  const data = [
    {
      img: "https://plus.unsplash.com/premium_photo-1661609628958-e1fda53a87eb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Superb Seafood Places",
      places: 13,
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1692728813474-78971f64e877?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Blissful Breakfast Places",
      places: 10,
    },
    {
      img: "https://images.unsplash.com/photo-1564758565618-2a4706629d66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bG9jYWwlMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
      name: "Local Favourite Places",
      places: 7,
    },
    {
      img: "https://media.istockphoto.com/id/1148223648/photo/interior-of-a-pub.jpg?s=2048x2048&w=is&k=20&c=IfkyJXQEWJwM1sQ8OehAdvo2VGZqsoUXYQ7CwOFANNA=",
      name: "Best Bars & Pubs",
      places: 5,
    },
    {
      img: "https://images.unsplash.com/photo-1569929233287-f0565228c4d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvbWFudGljJTIwZGlubmVyfGVufDB8fDB8fHww",
      name: "Romantic Dining",
      places: 5,
    },
  ];

  export default function Carousel() {
    return (
      <div className="carousel-section">
        <div className="carousel-header">
          <h1>Collections</h1>

          <div className="carousel-middle">
            <div>
              Explore curated lists of top restaurants, cafes, pubs, and bars in
              Mangalore, based on trends
            </div>
            <div>
              <a href="#">All Collections in Mangalore →</a>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          speed={500}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card-items">
                <img src={item.img} alt={item.name} />
                <div className="content">
                  <h3>{item.name}</h3>
                  <a href="#">{item.places} places →</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
