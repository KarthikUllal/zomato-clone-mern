import "./Sections.css";

export default function Overview({ restaurent }) {
  return (
    <div className="section-container">
      <h2>About this place</h2>

      <div className="overview-card">
        <div className="overview-description">
          <p>{restaurent.description}</p>
        </div>

        <div className="overview-divider"></div>

        <div className="overview-highlights">
          <h3>Cuisines</h3>
          <div className="cuisine-tags">
            {restaurent.cuisine?.split(",").map((item, index) => (
              <span key={index} className="cuisine-tag">
                {item.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="overview-divider"></div>

        <div className="overview-details">
          <div className="detail-item">
            <span className="detail-label">Average Cost</span>
            <span className="detail-value">₹{restaurent.averageCostForTwo} for two</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Hours</span>
            <span className="detail-value">{restaurent.hours}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Contact</span>
            <span className="detail-value">+91 {restaurent.contact}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Address</span>
            <span className="detail-value">{restaurent.location}</span>
          </div>
        </div>

        <div className="overview-divider"></div>

        <div className="overview-highlights">
          <h3>Highlights</h3>
          <div className="highlight-tags">
            <span className="highlight-tag">Indoor Seating</span>
            <span className="highlight-tag">Family Friendly</span>
            <span className="highlight-tag">Air Conditioned</span>
            <span className="highlight-tag">Live Music (Weekends)</span>
          </div>
        </div>
      </div>
    </div>
  );
}