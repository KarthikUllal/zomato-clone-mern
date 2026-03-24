import { useState, useEffect } from "react";
import "../styles/AdminAdd.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../../api";


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

  const { id } = useParams();
  const location = useLocation();

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
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get(
          "/api/admin/restaurants",
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

  //fetch restaurant when editing
  useEffect(() => {
    if (!id) return;
    if (!location.pathname.includes("restaurant")) return;

    const fetchRestaurant = async () => {
      try {
        const res = await api.get(
          `/api/admin/restaurants/${id}`,
        );

        if (res.data.restaurant) {
          const data = res.data.restaurant;

          setRestaurantData({
            name: data.name || "",
            category: data.category || "dining",
            cuisine: data.cuisine || "",
            location: data.location || "",
            averageCostForTwo: data.averageCostForTwo || "",
            description: data.description || "",
            hours: data.hours || "",
            contact: data.contact || "",
            banner: null,
            gallery: [],
          });

          setActiveTab("restaurant");
        }
      } catch (err) {
        toast.error("Error loading restaurant data", err);
      }
    };

    fetchRestaurant();
  }, [id, location.pathname]);

  //fetch food when editing
  useEffect(() => {
    if (!id) return;
    if (!location.pathname.includes("food")) return;

    const fetchFood = async () => {
      try {
        const res = await api.get(
          `/api/admin/foods/${id}`,
        );

        if (res.data.food) {
          const data = res.data.food;

          setFoodData({
            name: data.name || "",
            price: data.price || "",
            description: data.description || "",
            foodCategory: data.foodCategory || "",
            isVeg: data.isVeg,
            restaurant: data.restaurant?._id || "",
            image: null,
          });

          setActiveTab("food");
        }
      } catch (err) {
        toast.error("Error loading food data", err);
      }
    };

    fetchFood();
  }, [id, location.pathname]);

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
      let res;

      if (id) {
        res = await api.put(
          `/api/admin/restaurants/${id}`,
          formData,
        );
      } else {
        res = await api.post(
          "/api/admin/restaurant",
          formData,
        );
      }

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

      toast.success(
        res.data.message || (id ? "Restaurant edited" : "Restaurant added"),
      );
    } catch (error) {
      console.log(error);
      toast.error("Error adding restaurant");
    }
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;

    setFoodData({
      ...foodData,
      [name]: name === "isVeg" ? value === "true" : value,
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
      if (id) {
        await api.put(
          `/api/admin/foods/${id}`,
          formData,
        );

        toast.success("Food edited successfully");
      } else {
        await api.post("/api/admin/food", formData);

        toast.success("Food added");
      }

      setFoodData({
        name: "",
        price: "",
        description: "",
        foodCategory: "",
        isVeg: true,
        restaurant: "",
        image: null,
      });
    } catch (error) {
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
          <h2>{id ? "Edit Restaurant" : "Add Restaurant"}</h2>

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

          <button className="submit-btn" onClick={submitRestaurant}>
            {id ? "Edit Restaurant" : "Add Restaurant"}
          </button>
        </div>
      )}

      {activeTab === "food" && (
        <div className="form-box">
          <h2>{id ? "Edit Food" : "Add Food"}</h2>

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

          <input type="file" onChange={handleFoodImage} />

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

          <button className="submit-btn" onClick={submitFood}>
            {id ? "Edit Food" : "Add Food"}
          </button>
        </div>
      )}
    </div>
  );
}
