import { useState } from "react";

const food = {
  _id: "food001",
  name: "Vietnamese Grilled Beef Rice",
  price: 65000,
  image:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1000",
  category: "Rice Dishes",
  description:
    "Delicious Vietnamese grilled beef served with fragrant steamed rice, fresh vegetables, cucumber, and our homemade special sauce.",
  isHalal: true,
  stock: 15,
};

const formatPrice = (price) =>
  `${Number(price).toLocaleString("vi-VN")} ₫`;

export default function FoodDetail({ product = food, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  if (!product) {
    return <div className="p-10 text-center">Food not found.</div>;
  }

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    if (product.stock < 1) {
      setMessage("This food is out of stock.");
      return;
    }

    if (onAddToCart) {
      onAddToCart(product, quantity);
    }

    setMessage(`Added ${quantity} item(s) to your cart!`);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          Home <span className="mx-2">/</span>
          {product.category}
          <span className="mx-2">/</span>
          <span className="text-emerald-700">{product.name}</span>
        </nav>

        {/* Product details */}
        <div className="grid gap-10 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-10">
          {/* Food image */}
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full min-h-72 max-h-[500px] w-full object-cover"
            />
          </div>

          {/* Food information */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-emerald-700">
              {formatPrice(product.price)}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {product.isHalal && (
                <span className="rounded-full bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                  ✓ Halal Certified
                </span>
              )}

              <span
                className={`rounded-full px-3 py-2 text-sm font-medium ${
                  product.stock > 0
                    ? "bg-blue-50 text-blue-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `In stock (${product.stock})`
                  : "Out of stock"}
              </span>
            </div>

            <div className="my-7 border-t border-gray-100" />

            <h2 className="text-lg font-semibold text-gray-900">
              Description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Quantity selector */}
            <div className="mt-8">
              <label className="mb-3 block text-sm font-semibold text-gray-800">
                Quantity
              </label>

              <div className="flex items-center gap-5">
                <div className="flex items-center rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-3 text-lg hover:bg-gray-50 disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="min-w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-4 py-3 text-lg hover:bg-gray-50 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm text-gray-500">
                  Total:{" "}
                  <strong className="text-gray-900">
                    {formatPrice(product.price * quantity)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="mt-8 w-full rounded-xl bg-emerald-700 px-6 py-4 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              🛒 Add to Cart
            </button>

            {message && (
              <p
                role="status"
                className="mt-4 text-sm font-medium text-emerald-700"
              >
                {message}
              </p>
            )}

            <p className="mt-4 text-center text-sm text-gray-500">
              Fresh ingredients · Quality food · Great taste
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}