import { useState } from "react";
import { createOrder } from "../services/orderService";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

export default function Checkout({ cart, onOrderSuccess }) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!cart.length) {
      setError("Giỏ hàng đang trống.");
      return;
    }

    if (!localStorage.getItem("token")) {
      setError("Bạn cần đăng nhập trước khi đặt hàng.");
      return;
    }

    setLoading(true);

    try {
      const result = await createOrder({
        items: cart.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          postalCode: postalCode.trim(),
        },
      });

      onOrderSuccess?.(result);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Không thể đặt hàng. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return <p>Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Checkout
      </h1>

      <div className="mb-6 space-y-3">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between gap-4 border-b pb-3"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}

        <p className="text-right text-lg font-bold">
          Total: {formatPrice(total)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Street address</label>
          <input
            className="w-full rounded border p-3"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block">City</label>
          <input
            className="w-full rounded border p-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block">Postal code</label>
          <input
            className="w-full rounded border p-3"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-green-700 p-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}
