import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsAsyncThunk = createAsyncThunk("fetch/products", async () => {
  try {
    let response = await axios.get("/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export default productsAsyncThunk;
