import { useParams, useNavigate } from "react-router-dom";
import { dummyFoods, dummyRestaurants } from "../data/dummyData";
import "../styles/AdminDetails.css";

export default function AdminFoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const food = dummyFoods.find((f) => f._id === id);

  if (!food) return <h2>Food Not Found</h2>;

  const restaurant = dummyRestaurants.find((r) => r._id === food.restaurantId);

  return (
    <div className="admin-food-details-wrapper">
      <div className="back-btn-section">
        <button className="back-btn" onClick={() => navigate("/admin/view")}>
          <i className="fi fi-ss-left" style={{ marginRight: "20px" }}></i>Back
        </button>
      </div>

      <h1>Food Details</h1>

      <table className="admin-food-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{food.name}</td>
          </tr>

          <tr>
            <th>Image</th>
            <td>
              <img src={food.img} alt={food.name} className="food-image" />
            </td>
          </tr>

          <tr>
            <th>Price</th>
            <td>₹{food.price}</td>
          </tr>

          <tr>
            <th>Type</th>
            <td>{food.type}</td>
          </tr>

          <tr>
            <th>Restaurant</th>
            <td>{restaurant?.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
