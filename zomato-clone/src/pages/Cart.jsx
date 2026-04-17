import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const ids = Object.keys(cart.items || {});

      if (ids.length === 0) {
        setFoods([]);
        return;
      }

      try {
        const res = await api.post("/api/foods/by-ids", { ids });
        setFoods(res.data.foods);

        if (cart.restaurantId) {
          const r = await api.get(
            `/api/admin/restaurants/${cart.restaurantId}`
          );
          setRestaurant(r.data.restaurant);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cart]);

  function increase(foodId) {
    let newItems = { ...cart.items };
    newItems[foodId] += 1;

    setCart({
      ...cart,
      items: newItems,
    });
  }

  function decrease(foodId) {
    let newItems = { ...cart.items };

    if (!newItems[foodId]) return;

    newItems[foodId] -= 1;

    if (newItems[foodId] <= 0) {
      delete newItems[foodId];
    }

    setCart({
      ...cart,
      items: newItems,
    });
  }

  const totalItems = Object.values(cart.items || {}).reduce(
    (a, b) => a + b,
    0
  );

  const totalPrice = foods.reduce((total, food) => {
    return total + food.price * (cart.items?.[food._id] || 0);
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-wrapper">
        <h2>Your Cart</h2>

        {restaurant && (
          <p className="restaurant-name">
            Ordering from <b>{restaurant.name}</b>
          </p>
        )}

        {totalItems === 0 && <p className="empty">Cart is empty</p>}

        <div className="cart-items">
          {foods
            .filter((food) => cart.items?.[food._id])
            .map((food) => (
              <div className="cart-card" key={food._id}>
                <div className="cart-row">
                  {food.image && (
                    <img
                      src={getImageUrl(food.image)}
                      alt={food.name}
                    />
                  )}

                  <div className="cart-info">
                    <h4>{food.name}</h4>
                    <p>₹{food.price}</p>

                    <div className="cart-bottom">
                      <div className="qty-box">
                        <button onClick={() => decrease(food._id)}>
                          -
                        </button>

                        <span>{cart.items?.[food._id]}</span>

                        <button onClick={() => increase(food._id)}>
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        ₹{food.price * cart.items[food._id]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {totalItems > 0 && (
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}