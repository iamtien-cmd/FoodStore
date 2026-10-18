
import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "../services/productService";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

export default function Home({ onAddToCart, onViewDetail }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, categoriesResponse] =
          await Promise.all([getProducts(), getCategories()]);

        const productList = Array.isArray(productsResponse)
          ? productsResponse
          : productsResponse?.products ??
            productsResponse?.data ??
            [];

        const categoryList = Array.isArray(categoriesResponse)
          ? categoriesResponse
          : categoriesResponse?.categories ??
            categoriesResponse?.data ??
            [];

        setProducts(productList);
        setCategories(categoryList);
      } catch (err) {
        console.error("Error loading FoodStore:", err);
        setError(
          "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối hoặc thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = searchTerm.trim().toLowerCase();

      const matchesSearch =
        (product.name || "").toLowerCase().includes(keyword) ||
        (product.description || "").toLowerCase().includes(keyword);

      const categoryId =
        typeof product.category === "object"
          ? product.category?._id
          : product.category;

      const matchesCategory =
        selectedCategory === "all" ||
        String(categoryId) === String(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#fffdf8] text-gray-800">
      {/* Hero */}
      <section className="bg-[#123d2b] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 md:grid-cols-2 md:px-10 md:py-20">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-green-100">
              🌙 Fresh • Delicious • Halal
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Delicious Food,
              <span className="block text-[#f6c453]">
                Trusted Halal.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-green-50/80">
              Khám phá những món ăn Halal thơm ngon, chất lượng
              và phù hợp cho bữa ăn mỗi ngày của bạn.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("food-menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 rounded-full bg-[#f6c453] px-7 py-3 font-bold text-[#123d2b] transition hover:bg-yellow-300"
            >
              Order Now →
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
              alt="Delicious food"
              className="h-72 w-full object-cover md:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-3 md:px-10">
        {[
          {
            icon: "☪️",
            title: "Halal Focused",
            description: "Ưu tiên lựa chọn thực phẩm Halal",
          },
          {
            icon: "🥗",
            title: "Delicious Food",
            description: "Đa dạng món ăn cho bạn lựa chọn",
          },
          {
            icon: "🛵",
            title: "Easy Ordering",
            description: "Đặt món tiện lợi ngay trên website",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5"
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Menu */}
      <section
        id="food-menu"
        className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14"
      >
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-green-700">
            Our Menu
          </p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Explore Our Foods
          </h2>
          <p className="mt-3 text-gray-500">
            Tìm món ăn yêu thích của bạn ngay hôm nay.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-green-700">
            <span>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm kiếm món ăn..."
              className="w-full bg-transparent text-sm outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              selectedCategory === "all"
                ? "bg-[#123d2b] text-white"
                : "border border-gray-200 bg-white hover:border-green-700"
            }`}
          >
            All Foods
          </button>

          {categories.map((category) => {
            const id = category._id;
            const active = String(selectedCategory) === String(id);

            return (
              <button
                key={id}
                onClick={() => setSelectedCategory(String(id))}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[#123d2b] text-white"
                    : "border border-gray-200 bg-white hover:border-green-700"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Product list */}
        <div className="mt-10">
          {loading ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold">
                Đang tải thực đơn...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Vui lòng đợi một chút.
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 p-8 text-center">
              <p className="font-medium text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-[#123d2b] px-5 py-2 text-white"
              >
                Thử lại
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl">🍽️</p>
              <h3 className="mt-4 text-xl font-bold">
                Không tìm thấy món ăn
              </h3>
              <p className="mt-2 text-gray-500">
                Hãy thử từ khóa hoặc danh mục khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const outOfStock = Number(product.stock) <= 0;

                return (
                  <article
                    key={product._id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/600x450?text=FoodStore"
                        }
                        alt={product.name}
                        loading="lazy"
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-800 shadow-sm">
                        ☪ Halal
                      </span>

                      {outOfStock && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                          Hết hàng
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold">
                        {product.name}
                      </h3>

                      <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
                        {product.description ||
                          "Món ăn thơm ngon dành cho bạn."}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-lg font-extrabold text-green-800">
                          {formatPrice(product.price)}
                        </span>

                        <span className="text-xs text-gray-500">
                          Còn {product.stock ?? 0}
                        </span>
                      </div>

                      <button
                        disabled={outOfStock}
                        onClick={() => onAddToCart?.(product)}
                        className="mt-5 w-full rounded-xl bg-[#123d2b] py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        {outOfStock
                          ? "Out of Stock"
                          : "+ Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#f4f0e5] px-6 py-14 text-center">
        <p className="font-semibold uppercase tracking-[0.25em] text-green-800">
          Welcome to FoodStore
        </p>
        <h2 className="mt-3 text-3xl font-extrabold">
          Good Food, Good Moments.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
          Cảm ơn bạn đã lựa chọn FoodStore. Hãy khám phá thực đơn
          và tìm món ăn phù hợp với mình.
        </p>
      </section>
    </main>
  );
}
