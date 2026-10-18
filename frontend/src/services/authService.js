import api from "./api";

// Register a new customer
export const registerUser = async ({ name, email, password }) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    role: "customer",
  });

  return response.data;
};

// Login
export const loginUser = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  // Support common response formats from the backend.
  const result = response.data?.data ?? response.data;

  const token =
    typeof result === "string"
      ? result
      : result?.token ?? result?.accessToken ?? result?.jwt;

  if (!token || typeof token !== "string") {
    throw new Error(
      "Không tìm thấy JWT token trong phản hồi đăng nhập. Hãy kiểm tra response của API /api/auth/login."
    );
  }

  localStorage.setItem("token", token);

  const user = result?.user ?? result?.customer ?? null;

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }

  return { token, user };
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};