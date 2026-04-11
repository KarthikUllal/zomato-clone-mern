import { useState, useEffect } from "react";
import "../styles/AdminView.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { getImageUrl } from "../../utils/imageHelper";
import Loader from "../../utils/Loder";

export default function AdminView() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (activeTab === "restaurant") {
          const url = searchTerm
            ? `/api/admin/restaurants/search?query=${searchTerm}`
            : `/api/admin/restaurants`;

          const res = await api.get(url);
          setRestaurants(res.data.restaurants);
        }

        if (activeTab === "food") {
          const url = searchTerm
            ? `/api/admin/foods/search?query=${searchTerm}`
            : `/api/admin/foods`;

          const res = await api.get(url);
          setFoods(res.data.foods);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error fetching data");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, [activeTab, searchTerm]);

  const handleDeleteRestaurant = async (id) => {
    try {
      await api.delete(`/api/admin/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
      toast.success("Restaurant Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await api.delete(`/api/admin/foods/${id}`);
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
        <div className="action-btns">
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

        <div className="search-container">
          <input
            type="text"
            placeholder={
              activeTab === "restaurant"
                ? "Search Restaurants"
                : "Search Foods"
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
          />
        </div>
      </div>

      {/* Restaurant Table */}
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
            {loading ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>
                  <Loader loading={loading} />
                </td>
              </tr>
            ) : restaurants.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>
                  No restaurants found
                </td>
              </tr>
            ) : (
              restaurants.map((restaurant) => (
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
                  <td>{restaurant.averageRating || 0}</td>
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
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteRestaurant(restaurant._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

     {/**Food Table */}
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
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  <Loader loading={loading} />
                </td>
              </tr>
            ) : foods.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No food found
                </td>
              </tr>
            ) : (
              foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>₹{food.price}</td>
                  <td>{food.description}</td>
                  <td>
                    {food.image && (
                      <img
                        src={getImageUrl(food.image)}
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
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/food/${food._id}`)
                        }
                      >
                        Edit
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}