import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // each item = { ...product, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      // check if item already in cart
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        // already there, just bump the quantity
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = item.quantity + 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        // don't let it go below 1
        if (item.quantity > 1) {
          item.quantity = item.quantity - 1;
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
