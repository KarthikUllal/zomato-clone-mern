import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "./Cart.css";
import {useNavigate} from "react-router-dom"

export default function Cart() {

  const { cart, setCart } = useContext(CartContext);

  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {

      const ids = Object.keys(cart.items || {});

      if (ids.length === 0) {
        setFoods([]);
        return;
      }

      try {

        // fetch food items
        const res = await axios.post(
          "http://localhost:8000/api/foods/by-ids",
          { ids }
        );

        setFoods(res.data.foods);

        // fetch restaurant
        if (cart.restaurantId) {

          const r = await axios.get(
            `http://localhost:8000/api/admin/restaurants/${cart.restaurantId}`
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
      items: newItems
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
      items: newItems
    });

  }



  const totalItems = Object.values(cart.items || {})
    .reduce((a, b) => a + b, 0);



  const totalPrice = foods.reduce((total, food) => {
    return total + food.price * (cart.items?.[food._id] || 0);
  }, 0);



  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      {restaurant && (
        <h3 className="restaurant-name">
          Ordering from: {restaurant.name}
        </h3>
      )}


      {totalItems === 0 && (
        <p>Cart is empty</p>
      )}


      {foods
        .filter(food => cart.items?.[food._id])   // removes deleted foods instantly
        .map((food) => (

        <div className="cart-item" key={food._id}>

          <div className="cart-left">

            {food.image && (
              <img
                src={`http://localhost:8000/${food.image}`}
                alt={food.name}
              />
            )}

            <div>
              <h4>{food.name}</h4>
              <p>₹{food.price}</p>
            </div>

          </div>


          <div className="cart-right">

            <div className="qty-box">

              <button onClick={() => decrease(food._id)}>
                -
              </button>

              <span>
                {cart.items?.[food._id] || 0}
              </span>

              <button onClick={() => increase(food._id)}>
                +
              </button>

            </div>

            <p>
              ₹{food.price * (cart.items?.[food._id] || 0)}
            </p>

          </div>

        </div>

      ))}


      <hr />
      
      <h3>Total Items: {totalItems}</h3>
      <h3>Total Price: ₹{totalPrice}</h3>


      {totalItems > 0  && (
        <button className="place-order " onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      )}

    </div>
  );
}