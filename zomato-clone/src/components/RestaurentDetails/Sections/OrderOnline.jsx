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
      } catch (err) {
        toast.error("Error fetching dishes", err);
      }
    };
    setTimeout(() => setLoading(false), 1000);



    if (restaurantId) {
      fetchFoods();
    }
  }, [restaurantId]);

  function add(foodId) {
    // prevent multiple restaurants
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
      <h2>Order Online</h2>

      {foods.map((food) => (
        <div className="simple-dish-card" key={food._id}>
          <div className="left">
            <span className={"veg-dot " + (food.isVeg ? "veg" : "non-veg")} />

            {food.image && (
              <img
                src={getImageUrl(food.image)}
                alt={food.name}
              />
            )}

            <div className="info">
              <h4>{food.name}</h4>
              <p className="desc">{food.description}</p>
              <p className="price">₹{food.price}</p>
            </div>
          </div>
          <div className="right">
            {!cart.items?.[food._id] ? (
              <button onClick={() => add(food._id)}>ADD</button>
            ) : (
              <button
                style={{ background: "#eee", color: "#333" }}
                onClick={() => remove(food._id)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      <h3>Total Items: {totalItems}</h3>

      {totalItems > 0 && (
        <button onClick={() => navigate("/cart")}>Go To Cart</button>
      )}
    </div>
  );
}
