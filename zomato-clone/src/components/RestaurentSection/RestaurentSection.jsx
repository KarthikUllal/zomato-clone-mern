import "./RestaurentSection.css";
import RestaurentCard from "../RestaurentCards/RestaurentCards";

export default function RestaurentSection({ title, data }) {
  return (
    <section className="restaurent-section">

      {title && (
        <div className="restaurent-section-heading">
          <h1>{title}</h1>
        </div>
      )}

      <div className="restaurent-cards">
        {data.map((item) => (
          <RestaurentCard key={item._id} restaurent={item} />
        ))}
      </div>

    </section>
  );
}