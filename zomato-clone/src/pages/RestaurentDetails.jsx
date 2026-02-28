import { useState } from "react";

import DetailsHeader from "../components/RestaurentDetails/Header/DetailsHeader";
import DetailsBanner from "../components/RestaurentDetails/Header/DetailsBanner";
import DetailsTabs from "../components/RestaurentDetails/Tabs/DetailsTabs";

import Overview from "../components/RestaurentDetails/Sections/Overview";
import OrderOnline from "../components/RestaurentDetails/Sections/OrderOnline";
import Reviews from "../components/RestaurentDetails/Sections/Reviews";
import Photos from "../components/RestaurentDetails/Sections/Photos";
import Menu from "../components/RestaurentDetails/Sections/Menu";
import BookTable from "../components/RestaurentDetails/Sections/BookTable";

export default function RestaurentDetails({cart, setCart}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>

      <DetailsHeader setActiveTab={setActiveTab} />
      <DetailsBanner />
      <DetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        {activeTab === "overview" && <Overview />}
        {activeTab === "order" && <OrderOnline cart = {cart} setCart = {setCart} />}
        {activeTab === "reviews" && <Reviews />}
        {activeTab === "photos" && <Photos />}
        {activeTab === "menu" && <Menu />}
        {activeTab === "book" && <BookTable />}
      </div>

    </div>
  );
}