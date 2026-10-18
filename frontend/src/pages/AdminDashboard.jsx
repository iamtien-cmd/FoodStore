import { useEffect, useState } from "react";
import {
  getAdminProducts,
  getAdminCategories,
  getAdminOrders,
} from "../services/adminService";

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("vi-VN");

export default function AdminDashboard({
  onManageProducts,
  onManageCategories,
  onManageOrders,
}) {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [products, categories, orders] = await Promise.all([
          getAdminProducts(),
          getAdminCategories(),
          getAdminOrders(),
        ]);

        if (active) {
          setStats({
            products: products.length,
            categories: categories.length,
            orders: orders.length,
          });
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Không thể tải dữ liệu tổng quan. Hãy kiểm tra quyền Admin và backend."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      title: "Tổng sản phẩm",
      value: stats.products,
      icon: "📦",
      description: "Quản lý thực đơn",
      onClick: onManageProducts,
    },
    {
      title: "Danh mục",
      value: stats.categories,
      icon: "🗂️",
      description: "Phân loại sản phẩm",
      onClick: onManageCategories,
    },
    {
      title: "Đơn hàng",
      value: stats.orders,
      icon: "🧾",
      description: "Theo dõi đơn hàng",
      onClick: onManageOrders,
    },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng trở lại! 👋
        </h1>
        <p className="mt-2 text-gray-500">
          Tổng quan về hệ thống quản lý Halal Food.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          Đang tải dữ liệu tổng quan...
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={card.onClick}
                disabled={!card.onClick}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg disabled:cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {card.title}
                  </span>
                  <span className="text-3xl transition group-hover:scale-110">
                    {card.icon}
                  </span>
                </div>

                <p className="mt-5 text-4xl font-bold text-emerald-800">
                  {formatNumber(card.value)}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {card.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-emerald-700 transition group-hover:translate-x-1">
                  Mở quản lý →
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <h2 className="flex items-center gap-2 font-semibold text-emerald-900">
                <span>✨</span>
                <span>Hệ thống hoạt động tốt</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Dữ liệu được đồng bộ từ API backend. Bạn có quyền quản trị đầy
                đủ để thêm, sửa, xóa sản phẩm và danh mục.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="flex items-center gap-2 font-semibold text-blue-900">
                <span>💡</span>
                <span>Mẹo sử dụng</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-blue-800">
                Sử dụng menu bên trái để điều hướng nhanh giữa các trang quản lý.
                Thông tin tài khoản hiển thị ở cuối sidebar.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
