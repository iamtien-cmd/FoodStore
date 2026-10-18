import api from "./api";

// Create a new order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get orders belonging to the logged-in customer
export const getMyOrders = async () => {
  const response = await api.get("/orders/my");

  const result = response.data?.data ?? response.data;

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.orders)) {
    return result.orders;
  }

  return [];
};