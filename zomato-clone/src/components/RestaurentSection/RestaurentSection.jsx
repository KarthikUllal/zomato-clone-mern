import "./RestaurentSection.css";
import RestaurentCard from "../RestaurentCards/RestaurentCards";
import Loader from "../../utils/Loder";

export default function RestaurentSection({ title, data, loading  }) {
  if (loading) {
    return <Loader loading={loading} />;
  }
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