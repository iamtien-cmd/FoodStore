import api from "./api";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");

  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.products)) {
    return result.products;
  }

  return [];
};

// Get all categories
export const getCategories = async () => {
  const response = await api.get("/categories");

  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.categories)) {
    return result.categories;
  }

  return [];
};