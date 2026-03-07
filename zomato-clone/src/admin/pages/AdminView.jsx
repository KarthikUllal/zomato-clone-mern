import { useState, useEffect } from "react";
import "../styles/AdminView.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminView() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const navigate = useNavigate();

  //state to contain restaurant and food data which will be fetched from backend
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);

  //to fetch restaurant and food data when page loads
  useEffect(() => {
    if (activeTab === "restaurant") {
      const fetchRestaurants = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/admin/restaurants",
          );
          setRestaurants(res.data.restaurants);
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Error fetching restaurants",
          );
        }
      };

      fetchRestaurants();
    }

    if (activeTab === "food") {
      const fetchFoods = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/admin/foods");
          setFoods(res.data.foods);
        } catch (err) {
          toast.error(err.response?.data?.message || "Error fetching foods");
        }
      };

      fetchFoods();
    }
  }, [activeTab]);
  //function to delete a restaurant
  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
      toast.success("Restaurant Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  //function to delete food
  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/foods/${id}`);
      setFoods((prev) => prev.filter((f) => f._id !== id));
      toast.success("Food Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

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
              <th>cuisine</th>
              <th>Location</th>
              <th>averageCostForTwo</th>
              <th>Description</th>
              <th>Hours</th>
              <th>Contact</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant._id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.category}</td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.averageCostForTwo}</td>
                <td>{restaurant.description}</td>
                <td>{restaurant.hours}</td>
                <td>{restaurant.contact}</td>
                <td>{restaurant.rating}</td>
                <td>
                  <div className="action-btn">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/restaurant/${restaurant._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/admin/restaurant/${restaurant._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteRestaurant(restaurant._id)}
                    >
                      Delete
                    </button>
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
              <th>Description</th>
              <th>Image</th>
              <th>Veg OR Non-Veg</th>
              <th>Food Category</th>
              <th>Restaurant Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => {
              return (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>₹{food.price}</td>
                  <td>{food.description}</td>
                  <td>
                    {food.image && (
                      <img
                        src={`http://localhost:8000/${food.image}`}
                        alt={food.name}
                        className="food-image"
                      />
                    )}
                  </td>
                  <td>{food.isVeg ? "Veg" : "Non-Veg"}</td>
                  <td>{food.foodCategory}</td>
                  <td>{food.restaurant?.name}</td>
                  <td>
                    <div className="action-btn">
                      <button className="edit-btn">Edit</button>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/admin/food/${food._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteFood(food._id)}
                      >
                        Delete
                      </button>
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
