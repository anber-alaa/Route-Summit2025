import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const cartContext = createContext({
  cartItems: [],
  addProductToCart: () => {},
  clearCart: () => {},
  loading: false,
  error: null,
})

export default function CartContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  //cart count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [error, setError] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      console.log('Loaded from localStorage:', savedCart);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error parsing localStorage cart:', err);
      setCartItems([]);
      setError('فشل تحميل السلة من التخزين المحلي.');
    }
  }, []);

  // Save cartItems to localStorage with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Saving to localStorage:', cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, 500);
    return () => clearTimeout(timeout);
  }, [cartItems]);

  // Add or update product in cart
  async function addProductToCart(productId, quantity = 1) {
    if (quantity < 0) {
      setError('quantity must be >= 0');
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const originalCartItems = [...cartItems];
      const newCartItems = [...cartItems];
      const existingItemIndex = newCartItems.findIndex((item) => item.id === productId);

      if (existingItemIndex > -1) {
        if (quantity === 0) {
          newCartItems.splice(existingItemIndex, 1);
        } else {
          newCartItems[existingItemIndex].quantity = quantity;
        }
        setCartItems(newCartItems);
      } else {
        const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        newCartItems.push({
          id: res.data.id,
          title: res.data.title,
          price: res.data.price,
          image: res.data.image,
          category: res.data.category,
          rating: res.data.rating,
          quantity,
        });
        setCartItems(newCartItems);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('product is not found');
      } else {
        setError('Error in server');
      }
      setCartItems(originalCartItems);
      console.error('Error in addProductToCart:', err);
    } finally {
      setLoading(false);
    }
  }

  // Clear cart
  function clearCart() {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }

  return (
    <cartContext.Provider value={{ cartItems,cartCount, addProductToCart, clearCart, loading, error }}>
      {children}
    </cartContext.Provider>
  );
}