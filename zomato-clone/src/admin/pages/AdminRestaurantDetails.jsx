import { useParams, useNavigate } from "react-router-dom";
import { dummyRestaurants, dummyFoods } from "../data/dummyData";
import "../styles/AdminDetails.css";

export default function AdminRestaurantDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = dummyRestaurants.find(
    r => r._id === id
  );

  const foods = dummyFoods.filter(
    f => f.restaurantId === id
  );

  if (!restaurant) return <h2>Restaurant Not Found</h2>;

  return (
    <div className="admin-restaurant-details-wrapper">

      <div className="back-btn-section">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/view")}
        >
          Back
        </button>
      </div>

      {/* Banner */}
      <div className="restaurant-banner">
        <img src={restaurant.banner} alt={restaurant.name} />
      </div>

      {/* Restaurant Info */}
      <div className="restaurant-card">

        <h1>{restaurant.name}</h1>

        <div className="restaurant-info">

          <p><strong>Category:</strong> {restaurant.category}</p>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Cost:</strong> {restaurant.averageCostForTwo}</p>
          <p><strong>Rating:</strong> {restaurant.rating}</p>
          <p><strong>Reviews:</strong> {restaurant.reviewCount}</p>
          <p><strong>Hours:</strong> {restaurant.hours}</p>
          <p><strong>Contact:</strong> {restaurant.contact}</p>

        </div>

        <p style={{ marginTop: "10px" }}>
          <strong>Description:</strong> {restaurant.description}
        </p>

      </div>

      {/* Gallery */}

      <h2 className="section-title">Gallery</h2>

      <div className="gallery-grid">

        {restaurant.gallery?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="gallery"
          />
        ))}

      </div>

      {/* Foods */}

      <h2 className="section-title">Foods</h2>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>

          {foods.map(food => (

            <tr key={food._id}>

              <td onClick={() => navigate(`/admin/food/${food._id}`)}>
                <img
                  src={food.img}
                  alt={food.name}
                  className="food-image"
                />
              </td>

              <td>{food.name}</td>

              <td>₹{food.price}</td>

              <td>{food.type}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}