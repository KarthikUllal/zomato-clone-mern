import "./Header.css";

export default function DetailsHeader({ setActiveTab, restaurent }) {
  return (
    <div className="header-sticky-wrapper">

      <div className="header-container">

        <div className="header-top">
          <div>
            <h1 className="rest-name">{restaurent.name}</h1>
            <p className="cuisine">
              {restaurent.cuisine}
            </p>
            <p className="address">
              {restaurent.location}
            </p>
          </div>

          <div className="rating-section">
            <div className="rating-box">
              <span>{restaurent.averageRating} ⭐</span>
              <small>Dining</small>
            </div>

            {/* <div className="rating-box">
              <span>4.0 ★</span>
              <small>Delivery</small>
            </div> */}
          </div>
        </div>

        <div className="header-info">
          <span>Open now - {restaurent.hours}</span>
          <span>₹{restaurent.averageCostForTwo} for two</span>
          <span>+91 {restaurent.contact}</span>
        </div>

        <div className="header-buttons">
          <button>Directions</button>
          <button>Share</button>

          <button onClick={() => setActiveTab("reviews")}>
            Reviews
          </button>

          <button
            className="book-btn"
            onClick={() => setActiveTab("book")}
          >
            Book a Table
          </button>
        </div>

      </div>

    </div>
  );
}