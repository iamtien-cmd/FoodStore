import api from "./api";

// ==================== PRODUCTS ====================

// Get all products
export const getAdminProducts = async () => {
  const response = await api.get("/products");
  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.products)) return result.products;

  return [];
};

// Create product
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Update product
export const updateProduct = async (productId, productData) => {
  const response = await api.put(
    `/products/${productId}`,
    productData
  );
  return response.data;
};

// Delete product
export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

// ==================== CATEGORIES ====================

// Get all categories
export const getAdminCategories = async () => {
  const response = await api.get("/categories");
  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.categories)) return result.categories;

  return [];
};

// Create category
export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

// Update category
export const updateCategory = async (categoryId, categoryData) => {
  const response = await api.put(
    `/categories/${categoryId}`,
    categoryData
  );
  return response.data;
};

// Delete category
export const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};

// ==================== ORDERS ====================

// Get all orders (Admin only)
export const getAdminOrders = async () => {
  const response = await api.get("/orders");
  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.orders)) return result.orders;

  return [];
};
