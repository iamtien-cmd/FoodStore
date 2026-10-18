import { useCallback, useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

const formatDate = (date) => {
  if (!date) return "Chưa có thông tin";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Chưa có thông tin";
  }

  return parsedDate.toLocaleString("vi-VN");
};

const statusLabels = {
  pending: "Đang chờ xử lý",
  confirmed: "Đã xác nhận",
  processing: "Đang chuẩn bị",
  shipped: "Đang giao hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
  completed: "Hoàn thành",
};

export default function MyOrders({ onHome, onLogin }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getMyOrders();
      setOrders(result);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể tải lịch sử đơn hàng. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-800">
            📦 Lịch sử đơn hàng
          </h1>
          <p className="mt-2 text-gray-500">
            Theo dõi những đơn hàng bạn đã đặt tại Halal Food.
          </p>
        </div>

        <button
          type="button"
          onClick={onHome}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Tiếp tục mua sắm
        </button>
      </div>

      {loading && (
        <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm">
          Đang tải đơn hàng...
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
        >
          <p>{error}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadOrders}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Thử lại
            </button>

            <button
              type="button"
              onClick={onLogin}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold hover:bg-red-100"
            >
              Đăng nhập lại
            </button>
          </div>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mb-4 text-5xl">🛍️</div>

          <h2 className="text-xl font-semibold text-gray-800">
            Bạn chưa có đơn hàng nào
          </h2>

          <p className="mt-2 text-gray-500">
            Hãy chọn những món yêu thích và đặt đơn hàng đầu tiên nhé.
          </p>

          <button
            type="button"
            onClick={onHome}
            className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Khám phá sản phẩm
          </button>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="space-y-5">
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const items = Array.isArray(order.items) ? order.items : [];

            const total =
              order.totalAmount ??
              order.totalPrice ??
              order.total ??
              0;

            const status = String(order.status || "pending").toLowerCase();

            return (
              <article
                key={orderId}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="mt-1 break-all font-semibold text-gray-800">
                      {orderId || "Chưa có mã đơn"}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Ngày đặt:{" "}
                      {formatDate(
                        order.createdAt || order.orderDate || order.date
                      )}
                    </p>
                  </div>

                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                    {statusLabels[status] || status}
                  </span>
                </div>

                <div className="space-y-3 py-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      Không có chi tiết sản phẩm trong dữ liệu đơn hàng.
                    </p>
                  ) : (
                    items.map((item, index) => {
                      const product =
                        typeof item.product === "object"
                          ? item.product
                          : null;

                      const name =
                        product?.name ||
                        item.name ||
                        `Sản phẩm ${index + 1}`;

                      const quantity = Number(item.quantity || 0);
                      const price = Number(
                        item.price ?? product?.price ?? 0
                      );

                      return (
                        <div
                          key={item._id || `${orderId}-${index}`}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {name}
                            </p>
                            <p className="mt-1 text-gray-500">
                              Số lượng: {quantity}
                            </p>
                          </div>

                          <p className="shrink-0 font-medium text-gray-700">
                            {formatPrice(price * quantity)}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {order.shippingAddress && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-medium text-gray-700">
                      Địa chỉ giao hàng
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {[
                        order.shippingAddress.street,
                        order.shippingAddress.city,
                        order.shippingAddress.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Chưa có thông tin"}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-medium text-gray-600">
                    Tổng đơn hàng
                  </span>

                  <span className="text-lg font-bold text-emerald-700">
                    {formatPrice(total)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}