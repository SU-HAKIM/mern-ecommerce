import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../ts/types";
import productsAsyncThunk from "../asyncThunks/productsAsyncThunk";

const initialState: ProductsState = {
  loading: false,
  products: [],
  cart: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(productsAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productsAsyncThunk.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
export const { addToCart, removeFromCart } = productsSlice.actions;
