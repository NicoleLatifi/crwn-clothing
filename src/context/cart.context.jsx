import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => {
      return item.id !== cartItemToRemove.id;
    });
  }

  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
  }
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => {
    return item.id !== cartItemToClear.id;
  });
};

export const CartContext = createContext({
  addItemToCart: () => null,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  clearItemFromCart: () => null,
  isCartOpen: false,
  removeItemFromCart: () => null,
  setIsCartOpen: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    clearItemFromCart,
    isCartOpen,
    removeItemFromCart,
    setCartItems,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
