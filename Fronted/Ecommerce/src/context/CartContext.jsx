import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const fetchCart = async (userId) => {
    if (userId) {
      const res = await axios.get(
        `https://shopnow-3-gz50.onrender.com/cartRoutes/get/${userId}`
      );
      const { data: { data = [] } = {} } = res || {};
      console.log({ data });
      setCart(data);
    } else {
      setCart([]);
    }
  };
  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem("user")) || {};
    let userId = userDetail._id;
    fetchCart(userId);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isProductExist = cart.find(({ productId } = {}) => {
        return productId === product.productId;
      });
      console.log({ isProductExist });
      if (isProductExist) {
        return prevCart;
      }
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };
  const removeFromCart = (product) => {
    const remainingCart = cart.filter(({ productId } = {}) => {
      return productId !== product.productId;
    });

    setCart(remainingCart);
  };
  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, fetchCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
