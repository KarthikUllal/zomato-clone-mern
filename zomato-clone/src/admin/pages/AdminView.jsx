import { useState } from "react";
import "../styles/AdminView.css";
import { dummyRestaurants, dummyFoods } from "../data/dummyData";

export default function AdminView() {
  const [activeTab, setActiveTab] = useState("restaurant");

  return (
    <div className="admin-view-wrapper">
      <h1 className="admin-view-title">Admin View</h1>

      <div className="view-tabs">
        <button
          className={activeTab === "restaurant" ? "active" : ""}
          onClick={() => setActiveTab("restaurant")}
        >
          View Restaurant
        </button>

        <button
          className={activeTab === "food" ? "active" : ""}
          onClick={() => setActiveTab("food")}
        >
          View Food Items
        </button>
      </div>

      {/* restaurent table */}
      {activeTab === "restaurant" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyRestaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant._id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.category}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.rating}</td>
                <td>
                  <div className="action-btn">
                    <button className="view-btn">View</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* food table*/}
      {activeTab === "food" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyFoods.map((food) => {
              // finding restaurant name using restaurent id
              const restaurant = dummyRestaurants.find(
                (r) => r._id === food.restaurantId
              );

              return (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>₹{food.price}</td>
                  <td>{food.type}</td>
                  <td>{restaurant ? restaurant.name : "Unknown"}</td>
                  <td>
                    <div className="action-btn">
                      <button className="view-btn">View</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}