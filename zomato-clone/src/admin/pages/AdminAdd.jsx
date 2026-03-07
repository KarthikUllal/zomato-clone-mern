import { useState, useEffect } from "react";
import "../styles/AdminAdd.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAdd() {

  const [activeTab, setActiveTab] = useState("restaurant");

  const [restaurants, setRestaurants] = useState([]);

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


  // fetch restaurants for dropdown
  useEffect(() => {

    const fetchRestaurants = async () => {

      try {

        const res = await axios.get(
          "http://localhost:8000/api/admin/restaurants"
        );

        if (res.data.status === "SUCCESS") {
          setRestaurants(res.data.restaurants);
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchRestaurants();

  }, []);



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

      // if restaurant is added successfully then add it to restaurant state so that it can be used in dropdown while adding food without refreshing the page
      if (res.data.restaurant) {
        setRestaurants((prev) => [...prev, res.data.restaurant]);
      }

      setRestaurantData({
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

      toast.success(res.data.message || "Restaurant added");

    }

    catch (error) {

      console.log(error);
      toast.error("Error adding restaurant");

    }

  };



  const handleFoodChange = (e) => {

    const { name, value } = e.target;

    setFoodData({
      ...foodData,
      [name]: name === "isVeg" ? value === "true" : value
    });

  };



  const handleFoodImage = (e) => {

    if (e.target.files.length > 0) {

      setFoodData({
        ...foodData,
        image: e.target.files[0],
      });

    }

  };



  const submitFood = async () => {

    const formData = new FormData();

    for (let key in foodData) {
      formData.append(key, foodData[key]);
    }

    try {

      const res = await axios.post(
        "http://localhost:8000/api/admin/food",
        formData
      );

      setFoodData({
        name: "",
        price: "",
        description: "",
        foodCategory: "",
        isVeg: true,
        restaurant: "",
        image: null,
      });

      toast.success(res.data.message || "Food added");

    }

    catch (error) {

      console.log(error);
      toast.error("Error adding food");

    }

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
            value={restaurantData.name}
            onChange={handleRestaurantChange}
          />

          <select
            name="category"
            value={restaurantData.category}
            onChange={handleRestaurantChange}
          >

            <option value="">Select Category</option>
            <option value="dining">Dining</option>
            <option value="delivery">Delivery</option>
            <option value="nightlife">Nightlife</option>

          </select>

          <input
            name="cuisine"
            placeholder="Cuisine"
            value={restaurantData.cuisine}
            onChange={handleRestaurantChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={restaurantData.location}
            onChange={handleRestaurantChange}
          />

          <input
            name="averageCostForTwo"
            placeholder="Average Cost For Two"
            value={restaurantData.averageCostForTwo}
            onChange={handleRestaurantChange}
          />

          <label>Banner Image</label>
          <input type="file" onChange={handleBanner} />

          <label>Gallery Images</label>
          <input type="file" multiple onChange={handleGallery} />

          <input
            name="hours"
            placeholder="Opening Hours"
            value={restaurantData.hours}
            onChange={handleRestaurantChange}
          />

          <input
            name="contact"
            placeholder="Contact Number"
            value={restaurantData.contact}
            onChange={handleRestaurantChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={restaurantData.description}
            onChange={handleRestaurantChange}
          ></textarea>

          <button
            className="submit-btn"
            onClick={submitRestaurant}
          >
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
            value={foodData.name}
            onChange={handleFoodChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={foodData.price}
            onChange={handleFoodChange}
          />

          <input
            type="file"
            onChange={handleFoodImage}
          />

          <input
            name="foodCategory"
            placeholder="Food Category"
            value={foodData.foodCategory}
            onChange={handleFoodChange}
          />

          <select
            name="isVeg"
            value={foodData.isVeg}
            onChange={handleFoodChange}
          >

            <option value="">Select Veg/Non-Veg</option>
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>

          </select>

          <select
            name="restaurant"
            value={foodData.restaurant}
            onChange={handleFoodChange}
          >

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
            value={foodData.description}
            onChange={handleFoodChange}
          ></textarea>

          <button
            className="submit-btn"
            onClick={submitFood}
          >
            Add Food
          </button>

        </div>

      )}

    </div>

  );
}