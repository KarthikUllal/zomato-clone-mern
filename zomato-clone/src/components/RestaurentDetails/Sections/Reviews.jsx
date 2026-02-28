import "./Sections.css";

export default function Reviews() {
  return (
    <div className="section-container">
      <h2>Customer Reviews</h2>

      <div className="review-card">
        <h4>Rahul ★★★★☆</h4>
        <p>Great food and quick service. Loved the ambiance.</p>
      </div>

      <div className="review-card">
        <h4>Sneha ★★★★★</h4>
        <p>Best South Indian food in Mangalore!</p>
      </div>
    </div>
  );
}