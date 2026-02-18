import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI, fetchCategoriesAPI, fetchProductsByCategoryAPI } from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip }) => {
    return await fetchProductsAPI(limit, skip);
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    return await fetchCategoriesAPI();
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    return await fetchProductsByCategoryAPI(category);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    categories: [],
    loading: false,
    loading: false,
    currentCategory: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.currentCategory = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.currentCategory = action.meta.arg;
      });
  },
});

export default productSlice.reducer;
