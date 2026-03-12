import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sections.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrderOnline({ cart, setCart, restaurent }) {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  const restaurantId = restaurent._id;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/admin/foods/restaurant/${restaurantId}`
        );

        setFoods(res.data.foods);
      } catch (err) {
        toast.error("Error fetching dishes", err);
      }
    };

    if (restaurantId) {
      fetchFoods();
    }
  }, [restaurantId]);

  function add(id) {
    let newCart = { ...cart };

    if (newCart[id]) {
      newCart[id] += 1;
    } else {
      newCart[id] = 1;
    }

    setCart(newCart);
  }

  function remove(id) {
    let newCart = { ...cart };

    if (newCart[id]) {
      newCart[id] -= 1;
    }

    if (newCart[id] === 0) {
      delete newCart[id];
    }

    setCart(newCart);
  }

  return (
    <div className="section-container">
      <h2>Order Online</h2>

      {foods.map((food) => (
        <div className="simple-dish-card" key={food._id}>
          <div className="left">
            <span className={"veg-dot " + (food.isVeg ? "veg" : "non-veg")} />

            <div className="info">
              <h4>{food.name}</h4>
              <p className="desc">{food.description}</p>
              <p className="price">₹{food.price}</p>
            </div>
          </div>

          <div className="right">
            {!cart[food._id] ? (
              <button onClick={() => add(food._id)}>ADD</button>
            ) : (
              <div className="qty-box">
                <button onClick={() => remove(food._id)}>-</button>
                <span>{cart[food._id]}</span>
                <button onClick={() => add(food._id)}>+</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <h3>Total Items: {Object.values(cart).reduce((a, b) => a + b, 0)}</h3>

      {Object.values(cart).length > 0 && (
        <button onClick={() => navigate("/cart")}>Go To Cart</button>
      )}
    </div>
  );
}