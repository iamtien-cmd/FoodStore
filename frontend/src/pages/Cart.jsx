import { useState } from "react";
import { createOrder } from "../services/orderService";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

export default function Cart({
  cart = [],
  user,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onOrderSuccess,
  onHome,
  onLogin,
}) {
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setShippingAddress((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!localStorage.getItem("token")) {
      setError("Vui lòng đăng nhập trước khi đặt hàng.");
      return;
    }

    if (user?.role && user.role !== "customer") {
      setError("Chỉ tài khoản khách hàng mới có thể đặt hàng.");
      return;
    }

    if (cart.length === 0) {
      setError("Giỏ hàng của bạn đang trống.");
      return;
    }

    const { street, city, postalCode } = shippingAddress;

    if (!street.trim() || !city.trim() || !postalCode.trim()) {
      setError("Vui lòng điền đầy đủ địa chỉ giao hàng.");
      return;
    }

    const hasInvalidItem = cart.some(
      (item) =>
        !item._id ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1
    );

    if (hasInvalidItem) {
      setError("Có sản phẩm không hợp lệ trong giỏ hàng.");
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        items: cart.map((item) => ({
          product: item._id,
          quantity: Number(item.quantity),
        })),
        deliveryAddress: `${street.trim()}, ${city.trim()}, ${postalCode.trim()}`,
      });

      setSuccess("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");

      setShippingAddress({
        street: "",
        city: "",
        postalCode: "",
      });

      onOrderSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Đặt hàng thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">
          🛒 Giỏ hàng của bạn
        </h1>

        <p className="mt-2 text-gray-500">
          Kiểm tra sản phẩm và điền địa chỉ để hoàn tất đơn hàng.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
          {!localStorage.getItem("token") && (
            <button
              type="button"
              onClick={onLogin}
              className="ml-2 font-semibold underline"
            >
              Đăng nhập
            </button>
          )}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {success}
          <button
            type="button"
            onClick={onHome}
            className="ml-2 font-semibold underline"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mb-4 text-5xl">🛍️</div>

          <h2 className="text-xl font-semibold text-gray-800">
            Giỏ hàng đang trống
          </h2>

          <p className="mt-2 text-gray-500">
            Hãy khám phá thực đơn và chọn món bạn yêu thích.
          </p>

          <button
            type="button"
            onClick={onHome}
            className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <article
                key={item._id}
                className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={
                    item.image ||
                    "https://placehold.co/160x120?text=Halal+Food"
                  }
                  alt={item.name || "Sản phẩm"}
                  className="h-28 w-full rounded-lg object-cover sm:w-36"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {item.name || "Sản phẩm"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Đơn giá: {formatPrice(item.price)}
                  </p>

                  <p className="mt-2 font-semibold text-emerald-700">
                    Thành tiền:{" "}
                    {formatPrice(Number(item.price || 0) * item.quantity)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        type="button"
                        aria-label={`Giảm số lượng ${item.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          onUpdateCartQuantity(
                            item._id,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-1.5 text-lg hover:bg-gray-50 disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Tăng số lượng ${item.name}`}
                        disabled={
                          item.quantity >= Number(item.stock ?? item.quantity)
                        }
                        onClick={() =>
                          onUpdateCartQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1.5 text-lg hover:bg-gray-50 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromCart(item._id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Xóa sản phẩm
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={onHome}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              ← Tiếp tục chọn món
            </button>
          </div>

          {/* Order summary and shipping address */}
          <aside className="h-fit rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Thông tin đặt hàng
            </h2>

            <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-600">Tổng cộng</span>
              <span className="text-xl font-bold text-emerald-700">
                {formatPrice(total)}
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="street"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Địa chỉ đường / số nhà
                </label>

                <input
                  id="street"
                  name="street"
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  placeholder="Số nhà, tên đường"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Thành phố
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder="Ví dụ: Ho Chi Minh City"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Mã bưu chính
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Ví dụ: 700000"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Đang đặt hàng..." : "Xác nhận đặt hàng"}
              </button>

              <p className="text-xs leading-5 text-gray-500">
                Giá trị đơn hàng được tính lại và xác thực bởi backend. Đơn
                hàng chỉ được xác nhận khi API trả về thành công.
              </p>
            </form>
          </aside>
        </div>
      )}
    </section>
  );
}