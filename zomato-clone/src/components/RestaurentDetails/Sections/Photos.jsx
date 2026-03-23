import "./Sections.css";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Photos({restaurent}) {
  return (
    <div className="section-container photos-container">

      <h2 className="photos-title">Pickle & Grain Photos</h2>

      <div className="photo-tabs">
        <button className="active">All (8)</button>
        <button>Ambience (8)</button>
      </div>

      <div className="photo-grid">
        {restaurent.gallery.map((gallery, index) =>(
          <img src={`${BASE_URL}/${gallery}`} key={index} />
        ))}
      </div>

    </div>
  );
}