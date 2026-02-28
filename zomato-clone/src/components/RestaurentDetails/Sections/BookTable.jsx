import "./Sections.css";

export default function BookTable() {
  return (
    <div className="section-container booking-container">

      <h2>Select your booking details</h2>

      {/* Real Dropdowns */}
      <div className="booking-options">

        <div className="booking-dropdown">
          <i className="fa fa-calendar"></i>
          <select>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Saturday</option>
          </select>
        </div>

        <div className="booking-dropdown">
          <i className="fa fa-user"></i>
          <select>
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
          </select>
        </div>

        <div className="booking-dropdown">
          <i className="fa fa-clock-o"></i>
          <select>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </div>

      </div>

      {/* Slot Section */}
      <div className="slot-section">
        <div className="slot-header">
          <h3>Select slot</h3>
        </div>

        <div className="slot-grid">
          <div className="slot-card">
            <p>11:15 AM</p>
            <span>2 offers</span>
          </div>

          <div className="slot-card">
            <p>11:30 AM</p>
            <span>2 offers</span>
          </div>

          <div className="slot-card">
            <p>11:45 AM</p>
            <span>2 offers</span>
          </div>
        </div>
      </div>

      <button className="proceed-btn" disabled>
        Proceed to cart
      </button>

    </div>
  );
}