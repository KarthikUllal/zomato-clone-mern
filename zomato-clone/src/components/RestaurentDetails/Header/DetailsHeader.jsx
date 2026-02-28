import "./Header.css";

export default function DetailsHeader({ setActiveTab }) {
  return (
    <div className="header-sticky-wrapper">

      <div className="header-container">

        <div className="header-top">
          <div>
            <h1 className="rest-name">Pickle And Grains</h1>
            <p className="cuisine">
              Mangalorean, South Indian, Fast Food, Shake
            </p>
            <p className="address">
              Level 2, The Avatar Hotel, Attavar, Mangalore
            </p>
          </div>

          <div className="rating-section">
            <div className="rating-box">
              <span>3.8 ★</span>
              <small>Dining</small>
            </div>

            <div className="rating-box">
              <span>4.0 ★</span>
              <small>Delivery</small>
            </div>
          </div>
        </div>

        <div className="header-info">
          <span>Open now - 11 AM - 11 PM</span>
          <span>₹1000 for two</span>
          <span>+91 7865432112</span>
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