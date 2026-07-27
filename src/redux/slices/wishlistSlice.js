import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      // check for duplicates before adding
      const alreadyExists = state.wishlistItems.some((item) => item.id === product.id);
      if (!alreadyExists) {
        state.wishlistItems.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== idToRemove);
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;
      const alreadyExists = state.wishlistItems.some((item) => item.id === product.id);
      if (alreadyExists) {
        state.wishlistItems = state.wishlistItems.filter((item) => item.id !== product.id);
      } else {
        state.wishlistItems.push(product);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
