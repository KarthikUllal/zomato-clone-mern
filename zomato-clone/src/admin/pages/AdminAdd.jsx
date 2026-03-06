import { useState } from "react";
import "../styles/AdminAdd.css";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminAdd() {
  const [activeTab, setActiveTab] = useState("restaurant");

  const [restaurants, setRestaurants] = useState([])

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    category: "dining",
    cuisine: "",
    location: "",
    averageCostForTwo: "",
    description: "",
    hours: "",
    contact: "",
    banner: null,
    gallery: [],
  });

  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    description: "",
    foodCategory: "",
    isVeg: true,
    restaurant: "",
    image: null,
  });

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;

    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleBanner = (e) => {
    setRestaurantData({
      ...restaurantData,
      banner: e.target.files[0],
    });
  };

  const handleGallery = (e) => {
    setRestaurantData({
      ...restaurantData,
      gallery: e.target.files,
    });
  };

  //to fetch restaurant so that it can show dropdown with restuarant name in food add form
  useEffect(() =>{
    axios.get("http://localhost:8000/api/admin/restaurants").then(
      (res) =>{
        if(res.data.status == "SUCCESS"){
          setRestaurants(res.data.restaurants);
        }
      }
    ).catch((err) =>{
      console.log(err);
    })
  }, [])

  const submitRestaurant = async () => {

  const formData = new FormData();

  for (let key in restaurantData) {

    if (key === "gallery") {

      for (let i = 0; i < restaurantData.gallery.length; i++) {
        formData.append("gallery", restaurantData.gallery[i]);
      }

    } else {

      formData.append(key, restaurantData[key]);

    }

  }

  try {

    const res = await axios.post(
      "http://localhost:8000/api/admin/restaurant",
      formData
    );

    toast.success(res.data.message || "Restaurant added");

  } catch (error) {

    console.log(error);
    toast.error("Error adding restaurant");

  }

};

  const handleFoodChange = (e) => {
    const { name, value } = e.target;

    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleFoodImage = (e) => {
    setFoodData({
      ...foodData,
      image: e.target.files[0],
    });
  };

  const submitFood = async () => {
    const formData = new FormData();

    for (let key in foodData) {
      formData.append(key, foodData[key]);
    }

    await fetch("http://localhost:8000/api/admin/food", {
      method: "POST",
      body: formData,
    });

    alert("Food added");
  };

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

          <input
            name="name"
            placeholder="Restaurant Name"
            onChange={handleRestaurantChange}
          />

          <select name="category" onChange={handleRestaurantChange}>
            <option value="dining">Dining</option>
            <option value="delivery">Delivery</option>
            <option value="nightlife">Nightlife</option>
          </select>

          <input
            name="cuisine"
            placeholder="Cuisine"
            onChange={handleRestaurantChange}
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleRestaurantChange}
          />

          <input
            name="averageCostForTwo"
            placeholder="Average Cost For Two"
            onChange={handleRestaurantChange}
          />

          <label>Banner Image</label>
          <input type="file" onChange={handleBanner} />

          <label>Gallery Images</label>
          <input type="file" multiple onChange={handleGallery} />

          <input
            name="hours"
            placeholder="Opening Hours"
            onChange={handleRestaurantChange}
          />

          <input
            name="contact"
            placeholder="Contact Number"
            onChange={handleRestaurantChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleRestaurantChange}
          ></textarea>

          <button className="submit-btn" onClick={submitRestaurant}>
            Add Restaurant
          </button>
        </div>
      )}

      {activeTab === "food" && (
        <div className="form-box">
          <h2>Add Food</h2>

          <input
            name="name"
            placeholder="Food Name"
            onChange={handleFoodChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleFoodChange}
          />

          <input type="file" onChange={handleFoodImage} />

          <input
            name="foodCategory"
            placeholder="Food Category"
            onChange={handleFoodChange}
          />

          <select name="isVeg" onChange={handleFoodChange}>
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </select>

          {/* <input
            name="restaurant"
            placeholder="Restaurant ID"
            onChange={handleFoodChange}
          /> */}
          <select name="restaurant" onChange={handleFoodChange}>
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Food Description"
            onChange={handleFoodChange}
          ></textarea>

          <button className="submit-btn" onClick={submitFood}>
            Add Food
          </button>
        </div>
      )}
    </div>
  );
}
