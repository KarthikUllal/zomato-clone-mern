import CategorySlider from "../components/Delivery/CategorySlider";
import BrandSlider from "../components/Delivery/BrandSlider";
import Filters from "../components/Delivery/Filters";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
import { restaurents } from "../data/restaurentData";

import "./Delivery.css";

export default function Delivery() {

  const deliveryRestaurents = restaurents.filter(
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