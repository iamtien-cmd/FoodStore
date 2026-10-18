import { useState } from "react";

import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import ShipperLayout from "./components/ShipperLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AboutUs from "./pages/AboutUs";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOrders from "./pages/AdminOrders";
import AdminProfile from "./pages/AdminProfile";

import ShipperOrders from "./pages/ShipperOrders";
import ShipperProfile from "./pages/ShipperProfile";
import FoodDetail from "./pages/FoodDetail";
import { logoutUser } from "./services/authService";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const savedUser = getSavedUser();
  const [user, setUser] = useState(savedUser);
  
  // Determine initial page based on user role
  const getInitialPage = () => {
    if (!savedUser) return "home";
    if (savedUser.role === "admin") return "admin";
    if (savedUser.role === "shipper") return "shipper-orders";
    return "home";
  };
  
 const [page, setPage] = useState(getInitialPage());
const [cart, setCart] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);

  const isAdmin = user?.role === "admin";
  const isShipper = user?.role === "shipper";
const openFoodDetail = (product) => {
  setSelectedProduct(product);
  setPage("food-detail");
};

  const addToCart = (product) => {
    if (!product?._id) {
      alert("Không tìm thấy thông tin sản phẩm.");
      return;
    }

    if (Number(product.stock ?? 0) < 1) {
      alert("Sản phẩm hiện đã hết hàng.");
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        if (existingItem.quantity >= Number(product.stock)) {
          alert("Số lượng trong giỏ đã đạt mức tồn kho.");
          return currentCart;
        }

        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item._id !== productId) return item;

        return {
          ...item,
          quantity: Math.min(
            nextQuantity,
            Number(item.stock ?? nextQuantity)
          ),
        };
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogin = (loginResult) => {
    const loggedInUser = loginResult?.user ?? null;

    setUser(loggedInUser);

    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("user");
    }

    // Redirect based on role
    if (loggedInUser?.role === "admin") {
      setPage("admin");
    } else if (loggedInUser?.role === "shipper") {
      setPage("shipper-orders");
    } else {
      setPage("home");
    }
  };

  const handleLogout = () => {
    const wasAdmin = user?.role === "admin";
    const wasShipper = user?.role === "shipper";
    logoutUser();
    setUser(null);
    setCart([]);
    
    // Admin and Shipper go to login, customers go to home
    if (wasAdmin || wasShipper) {
      setPage("login");
    } else {
      setPage("home");
    }
  };

  const handleRegisterSuccess = () => {
    setPage("login");
  };

  const openAdminPage = (nextPage) => {
    if (!isAdmin) {
      setPage("login");
      return;
    }

    setPage(nextPage);
  };

  const isAdminPage =
    page === "admin" ||
    page === "admin-products" ||
    page === "admin-categories" ||
    page === "admin-orders" ||
    page === "admin-profile";

  const isShipperPage = page === "shipper-orders" || page === "shipper-profile";

  // Shipper Layout
  if (isShipper && isShipperPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShipperLayout
          user={user}
          currentPage={page}
          onNavigate={(nextPage) => setPage(nextPage)}
          onLogout={handleLogout}
        >
          {page === "shipper-orders" && <ShipperOrders />}
          {page === "shipper-profile" && <ShipperProfile user={user} />}
        </ShipperLayout>
      </div>
    );
  }

  // Admin Layout
  if (isAdmin && isAdminPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminLayout
          user={user}
          currentPage={page}
          onNavigate={(nextPage) => setPage(nextPage)}
          onLogout={handleLogout}
        >
          {page === "admin" && (
            <AdminDashboard
              onManageProducts={() => openAdminPage("admin-products")}
              onManageCategories={() => openAdminPage("admin-categories")}
              onManageOrders={() => openAdminPage("admin-orders")}
            />
          )}

          {page === "admin-products" && <AdminProducts />}

          {page === "admin-categories" && <AdminCategories />}

          {page === "admin-orders" && <AdminOrders />}

          {page === "admin-profile" && <AdminProfile user={user} />}
        </AdminLayout>
      </div>
    );
  }

  // Normal user layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onHome={() => setPage("home")}
        onLogin={() => setPage("login")}
        onRegister={() => setPage("register")}
        onProfile={() => setPage("profile")}
        onCart={() => setPage("cart")}
        onAbout={() => setPage("about")}
        onLogout={handleLogout}
        cartCount={cartCount}
        onAdmin={() => openAdminPage("admin")}
      />

      <main>
        {page === "home" && (
          <Home onAddToCart={addToCart} />
        )}

        {page === "login" && (
          <Login
            onLogin={handleLogin}
            onRegister={() => setPage("register")}
            onHome={() => setPage("home")}
          />
        )}

        {page === "register" && (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onLogin={() => setPage("login")}
            onHome={() => setPage("home")}
          />
        )}

        {page === "profile" && (
          <Profile
            user={user}
            onHome={() => setPage("home")}
            onLogin={() => setPage("login")}
            onMyOrders={() => setPage("orders")}
          />
        )}
       { page === "about" && <AboutUs />}
        {page === "cart" && (
          <Cart
            cart={cart}
            user={user}
            onUpdateCartQuantity={updateCartQuantity}
            onRemoveFromCart={removeFromCart}
            onOrderSuccess={() => setCart([])}
            onHome={() => setPage("home")}
            onLogin={() => setPage("login")}
          />
        )}

        {page === "orders" && (
          <MyOrders
            onHome={() => setPage("home")}
            onLogin={() => setPage("login")}
          />
        )}
      </main>

      <footer className="mt-12 border-t border-emerald-100 bg-white px-4 py-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Halal Food. All rights reserved.
        </p>
        <p className="mt-1">
          Fresh food, quality service, and a better shopping experience.
        </p>
      </footer>
    </div>
  );
}
