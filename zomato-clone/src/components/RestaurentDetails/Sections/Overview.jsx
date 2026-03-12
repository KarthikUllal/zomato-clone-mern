import "./Sections.css";

export default function Overview({restaurent}) {
  return (
    <div className="section-container">
      <h2>About this place</h2>

      <div className="card">
        <p>
         {restaurent.description}.
        </p>
      </div>

      <div className="card">
        <h3>Highlights</h3>
        <ul>
          <li>Indoor Seating</li>
          <li>Family Friendly</li>
          <li>Air Conditioned</li>
          <li>Live Music (Weekends)</li>
        </ul>
      </div>
    </div>
  );
}