import { createContext, useEffect, useReducer } from "react";

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

const CART_ACTION_TYPES = {
  CART_ITEMS: "CART_ITEMS",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartCount, cartItems, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    const newCartTotal = newCartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartCount: newCartCount,
        cartItems: newCartItems,
        cartTotal: newCartTotal,
      },
    });
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.IS_CART_OPEN, payload: bool });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    clearItemFromCart,
    isCartOpen,
    removeItemFromCart,
    updateCartItemsReducer,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
