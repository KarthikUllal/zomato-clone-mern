import { useState } from "react";
import "../styles/AdminAdd.css";

export default function AdminAdd() {
  const [activeTab, setActiveTab] = useState("restaurant");

  return (
    <div className="admin-add-wrapper">
      <h1 className="admin-title">Admin Add Panel</h1>

      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("restaurant")}
          className={activeTab === "restaurant" ? "active" : ""}
        >
          Add Restaurant
        </button>

        <button
          onClick={() => setActiveTab("food")}
          className={activeTab === "food" ? "active" : ""}
        >
          Add Food
        </button>
      </div>

      {activeTab === "restaurant" && (
        <div className="form-box">
          <h2>Add Restaurant</h2>

          <input placeholder="Restaurant Name" />

          <select>
            <option>Dining</option>
            <option>Delivery</option>
            <option>Nightlife</option>
          </select>

          <input placeholder="Cuisine" />
          <input placeholder="Location" />
          <input placeholder="Average Cost For Two (₹1200 for two)" />
          <input placeholder="Banner Image URL" />
          <textarea placeholder="Gallery Image URLs (one per line)" rows={6}></textarea>
          <input placeholder="Opening Hours (10 AM - 11 PM)" />
          <input placeholder="Contact Number" />
          <textarea placeholder="Description" rows={6}></textarea>

          <button className="submit-btn">Add Restaurant</button>
        </div>
      )}

      {activeTab === "food" && (
        <div className="form-box">
          <h2>Add Food</h2>

          <input placeholder="Food Name" />
          <input type="number" placeholder="Price" />
          <input placeholder="Food Image URL" />
          <input placeholder="Food Category (Biryani, Pizza etc.)" />

          <select>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>

          <input placeholder="Restaurant ID" />
          <textarea placeholder="Food Description"></textarea>

          <button className="submit-btn">Add Food</button>
        </div>
      )}
    </div>
  );
}
