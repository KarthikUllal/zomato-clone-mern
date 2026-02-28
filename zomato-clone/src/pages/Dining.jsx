import Carousel from "../components/Carousel/Carousel";
import FilterButtons from "../components/FilterButtons/FilterButtons";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
import { restaurents } from "../data/restaurentData";

export default function Dining() {

  const diningRestaurents = restaurents.filter(
    (item) => item.category === "dining"
  );

  return (
    <>
      <Carousel />
      <FilterButtons />
      <PromoBanner />

      <RestaurentSection
        title="Restaurants in Mangalore"
        data={diningRestaurents}
      />
    </>
  );
}