import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() =>{
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : {restaurantId : null, items : {}};
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
