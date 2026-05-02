import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Sections.css";
import { toast } from "react-toastify";
import { CartContext } from "../../../context/CartContext";
import api from "../../../api"
import { getImageUrl } from "../../../utils/imageHelper";
import Loader from "../../../utils/Loder";

export default function OrderOnline({ restaurent }) {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const restaurantId = restaurent._id;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/admin/foods/restaurant/${restaurantId}`,
        );
        setFoods(res.data.foods);
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching dishes", err);
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchFoods();
    }
  }, [restaurantId]);

  function add(foodId) {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      alert("Please clear the cart first");
      return;
    }

    let newItems = { ...cart.items };
    newItems[foodId] = 1;
    setCart({
      restaurantId: restaurantId,
      items: newItems,
    });
  }

  function remove(foodId) {
    let newItems = { ...cart.items };
    delete newItems[foodId];
    setCart({
      restaurantId: cart.restaurantId,
      items: newItems,
    });
  }

  const totalItems = Object.values(cart.items || {}).reduce((a, b) => a + b, 0);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="section-container">
      <div className="order-header-section">
        <h2>Order Online</h2>
        {totalItems > 0 && (
          <div className="cart-button" onClick={() => navigate("/cart")}>
            Cart ({totalItems})
          </div>
        )}
      </div>

      <div className="food-items-list">
        {foods.map((food) => (
          <div className="food-item-card" key={food._id}>
            <div className="food-item-left">
              <span className={"veg-dot " + (food.isVeg ? "veg" : "non-veg")} />
              <div className="food-item-info">
                <h4>{food.name}</h4>
                <p className="food-item-desc">{food.description}</p>
                <p className="food-item-price">₹{food.price}</p>
              </div>
            </div>
            <div className="food-item-right">
              {food.image && (
                <img
                  className="food-item-image"
                  src={getImageUrl(food.image)}
                  alt={food.name}
                />
              )}
              {!cart.items?.[food._id] ? (
                <button className="add-button" onClick={() => add(food._id)}>ADD</button>
              ) : (
                <button className="remove-button" onClick={() => remove(food._id)}>Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="cart-footer">
          <span>Total Items: {totalItems}</span>
          <button className="goto-cart-btn" onClick={() => navigate("/cart")}>Go To Cart</button>
        </div>
      )}
    </div>
  );
}