import { createSlice } from "@reduxjs/toolkit";

// "All" means no filter applied
const initialState = {
  selectedCategory: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearFilter: (state) => {
      state.selectedCategory = "All";
    },
  },
});

export const { setCategory, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
