import { useEffect, useState } from "react";
import api from "../services/api";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ShipperOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      // Get pending orders
      const pendingResponse = await api.get("/orders/pending");
      setPendingOrders(pendingResponse.data || []);

      // Get my accepted orders (shipper's deliveries)
      const myResponse = await api.get("/orders/my-deliveries");
      setMyOrders(myResponse.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không thể tải danh sách đơn hàng. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    setError("");
    setSuccess("");

    try {
      await api.patch(`/orders/${orderId}/accept`);
      setSuccess("Đã nhận đơn hàng thành công!");
      await loadOrders();
      setActiveTab("my-orders");
    } catch (err) {
      setError(
        err.response?.data?.message || "Không thể nhận đơn hàng. Vui lòng thử lại."
      );
    }
  };

  const handleDeliverOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Xác nhận đã giao hàng thành công?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await api.patch(`/orders/${orderId}/deliver`);
      setSuccess("Đã xác nhận giao hàng thành công!");
      await loadOrders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không thể xác nhận giao hàng. Vui lòng thử lại."
      );
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">
          🚚 Quản lý giao hàng
        </h1>
        <p className="mt-2 text-gray-500">
          Nhận đơn hàng và cập nhật trạng thái giao hàng.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "pending"
              ? "border-b-2 border-emerald-600 text-emerald-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Đơn hàng chờ nhận ({pendingOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("my-orders")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "my-orders"
              ? "border-b-2 border-emerald-600 text-emerald-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Đơn của tôi ({myOrders.length})
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          Đang tải đơn hàng...
        </div>
      ) : (
        <>
          {/* Pending Orders Tab */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
                  <div className="mb-4 text-5xl">📦</div>
                  <p className="text-gray-500">
                    Hiện không có đơn hàng chờ nhận.
                  </p>
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <article
                    key={order._id}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-800">
                            Đơn hàng #{order._id?.substring(0, 8)}...
                          </h3>
                          <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                            Chờ nhận
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>Khách hàng:</strong>{" "}
                            {order.customer?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Địa chỉ:</strong>{" "}
                            {order.deliveryAddress || "—"}
                          </p>
                          <p>
                            <strong>Số lượng:</strong> {order.items?.length || 0}{" "}
                            sản phẩm
                          </p>
                          <p>
                            <strong>Tổng tiền:</strong>{" "}
                            <span className="font-semibold text-emerald-700">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            Đặt lúc: {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAcceptOrder(order._id)}
                        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        Nhận đơn
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {/* My Orders Tab */}
          {activeTab === "my-orders" && (
            <div className="space-y-4">
              {myOrders.length === 0 ? (
                <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
                  <div className="mb-4 text-5xl">🚚</div>
                  <p className="text-gray-500">
                    Bạn chưa nhận đơn hàng nào.
                  </p>
                </div>
              ) : (
                myOrders.map((order) => (
                  <article
                    key={order._id}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-800">
                            Đơn hàng #{order._id?.substring(0, 8)}...
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              order.status === "shipping"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "delivered"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status === "shipping"
                              ? "Đang giao"
                              : order.status === "delivered"
                                ? "Đã giao"
                                : order.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <p>
                            <strong>Khách hàng:</strong>{" "}
                            {order.customer?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Địa chỉ:</strong>{" "}
                            {order.deliveryAddress || "—"}
                          </p>
                          <p>
                            <strong>Số lượng:</strong> {order.items?.length || 0}{" "}
                            sản phẩm
                          </p>
                          <p>
                            <strong>Tổng tiền:</strong>{" "}
                            <span className="font-semibold text-emerald-700">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {order.status === "shipping" && (
                        <button
                          type="button"
                          onClick={() => handleDeliverOrder(order._id)}
                          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          Đã giao hàng
                        </button>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
