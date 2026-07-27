import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";

// just loading the products from the json file we made
const initialState = {
  items: productsData,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // not really changing products for now, but keeping this here
    // in case we want to add more products later
  },
});

export default productSlice.reducer;
