import Carousel from "../components/Carousel/Carousel";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import RestaurentSection from "../components/RestaurentSection/RestaurentSection";
import { restaurents } from "../data/restaurentData";

import "./Nightlife.css";

export default function Nightlife() {

  const nightlifeRestaurents = restaurents.filter(
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