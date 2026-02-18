import axios from "axios";

export const fetchProductsAPI = async (limit, skip) => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return res.data;
};

export const fetchCategoriesAPI = async () => {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;
};

export const fetchProductsByCategoryAPI = async (category) => {
  const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return res.data;
};
