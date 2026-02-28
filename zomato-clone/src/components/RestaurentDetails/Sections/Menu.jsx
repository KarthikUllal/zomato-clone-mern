import "./Sections.css";

export default function Menu() {
  return (
    <div className="section-container">
      <h2>Full Menu</h2>

      <div className="card">
        <h3>Starters</h3>
        <p>Chicken 65 - ₹180</p>
        <p>Paneer Tikka - ₹150</p>
      </div>

      <div className="card">
        <h3>Main Course</h3>
        <p>Chicken Biryani - ₹250</p>
        <p>Veg Thali - ₹200</p>
      </div>
    </div>
  );
}