import { useEffect, useState } from "react";
import { getAdminOrders } from "../services/adminService";

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

const getStatusLabel = (status) => {
  const statusMap = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    shipped: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
};

const getStatusColor = (status) => {
  const colorMap = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colorMap[status] || "bg-gray-100 text-gray-700";
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const orderData = await getAdminOrders();
        if (!cancelled) {
          setOrders(orderData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Không thể tải dữ liệu. Hãy kiểm tra quyền Admin."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchTerm = keyword.trim().toLowerCase();
    const userName = order.user?.name?.toLowerCase() || "";
    const userEmail = order.user?.email?.toLowerCase() || "";
    const orderId = order._id?.toLowerCase() || "";

    return (
      userName.includes(searchTerm) ||
      userEmail.includes(searchTerm) ||
      orderId.includes(searchTerm)
    );
  });

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Admin / Orders
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Quản lý đơn hàng
        </h1>
        <p className="mt-2 text-gray-500">
          Xem và theo dõi tất cả đơn hàng trong hệ thống.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Danh sách đơn hàng
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredOrders.length} đơn hàng
            </p>
          </div>

          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm theo tên, email hoặc ID..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 sm:max-w-xs"
          />
        </div>

        {loading ? (
          <p className="py-8 text-center text-gray-500">Đang tải đơn hàng...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            Không tìm thấy đơn hàng.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-3 font-medium">Mã đơn</th>
                  <th className="px-3 py-3 font-medium">Khách hàng</th>
                  <th className="px-3 py-3 font-medium">Tổng tiền</th>
                  <th className="px-3 py-3 font-medium">Trạng thái</th>
                  <th className="px-3 py-3 font-medium">Ngày đặt</th>
                  <th className="px-3 py-3 font-medium">Sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-4 font-mono text-xs text-gray-600">
                      {order._id?.substring(0, 8)}...
                    </td>
                    <td className="px-3 py-4">
                      <div>
                        <div className="font-medium text-gray-800">
                          {order.user?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.user?.email || "—"}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 font-medium text-emerald-700">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {order.items?.length || 0} sản phẩm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
