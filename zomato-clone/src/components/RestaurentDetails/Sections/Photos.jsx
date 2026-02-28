import "./Sections.css";

export default function Photos() {
  return (
    <div className="section-container photos-container">

      <h2 className="photos-title">Pickle & Grain Photos</h2>

      <div className="photo-tabs">
        <button className="active">All (8)</button>
        <button>Ambience (8)</button>
      </div>

      <div className="photo-grid">
        <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" />
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" />
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" />
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" />
        <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" />
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" />
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" />
        <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" />
      </div>

    </div>
  );
}