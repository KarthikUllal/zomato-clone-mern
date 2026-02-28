import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sections.css";


const sampleDishes = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 250,
    desc: "Aromatic basmati rice layered with spicy chicken.",
    isVeg: false,
    bestseller: true,
  },
  {
    id: 2,
    name: "Masala Dosa",
    price: 120,
    desc: "Crispy dosa served with sambar and chutney.",
    isVeg: true,
    bestseller: false,
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    price: 280,
    desc: "Creamy tomato gravy with soft paneer cubes.",
    isVeg: true,
    bestseller: true,
  },
  {
    id: 4,
    name: "Chilli Chicken",
    price: 280,
    desc: "Tangy and spicy Indo-Chinese chicken.",
    isVeg: false,
    bestseller: false,
  },
];

export default function OrderOnline({cart, setCart}) {
  const navigate = useNavigate();

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

      {sampleDishes.map((dish) => (
        <div className="simple-dish-card" key={dish.id}>
          <div className="left">
            <span className={"veg-dot " + (dish.isVeg ? "veg" : "non-veg")} />

            <div className="info">
              <h4>
                {dish.name}
                {dish.bestseller && (
                  <span className="bestseller">Bestseller</span>
                )}
              </h4>
              <p className="desc">{dish.desc}</p>
              <p className="price">₹{dish.price}</p>
            </div>
          </div>

          <div className="right">
            {!cart[dish.id] ? (
              <button onClick={() => add(dish.id)}>ADD</button>
            ) : (
              <div className="qty-box">
                <button onClick={() => remove(dish.id)}>-</button>
                <span>{cart[dish.id]}</span>
                <button onClick={() => add(dish.id)}>+</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <h3>Total Items: {Object.values(cart).reduce((a, b) => a + b, 0)}</h3>

      {Object.values(cart).length > 0 && (<button onClick={() => navigate("/cart")}>Go To Cart</button>)}
    </div>
  );
}
