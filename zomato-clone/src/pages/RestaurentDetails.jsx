import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

import DetailsHeader from "../components/RestaurentDetails/Header/DetailsHeader";
import DetailsBanner from "../components/RestaurentDetails/Header/DetailsBanner";
import DetailsTabs from "../components/RestaurentDetails/Tabs/DetailsTabs";

import Overview from "../components/RestaurentDetails/Sections/Overview";
import OrderOnline from "../components/RestaurentDetails/Sections/OrderOnline";
import Reviews from "../components/RestaurentDetails/Sections/Reviews";
import Photos from "../components/RestaurentDetails/Sections/Photos";
import Menu from "../components/RestaurentDetails/Sections/Menu";
import BookTable from "../components/RestaurentDetails/Sections/BookTable";
import Loader from "../utils/Loder";

export default function RestaurentDetails({ cart, setCart }) {
  const { id } = useParams();

  const [restaurent, setRestaurent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/admin/restaurants/${id}`
        );

        setRestaurent(res.data.restaurant);
      } catch (err) {
        console.error("Error fetching restaurant", err);
      }
      setTimeout(() => setLoading(false), 1000);
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurent || loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div>
      <DetailsHeader setActiveTab={setActiveTab} restaurent={restaurent} />
      <DetailsBanner restaurent={restaurent} />
      <DetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        {activeTab === "overview" && <Overview restaurent={restaurent} />}

        {activeTab === "order" && (
          <OrderOnline
            cart={cart}
            setCart={setCart}
            restaurent={restaurent}
          />
        )}

        {activeTab === "reviews" && <Reviews  restaurantId = {id}/>}

        {activeTab === "photos" && <Photos restaurent={restaurent} />}

        {activeTab === "menu" && <Menu />}

        {activeTab === "book" && <BookTable  restaurantId={id} />}
      </div>
    </div>
  );
}