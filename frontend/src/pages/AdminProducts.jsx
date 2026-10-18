
import { useEffect, useState } from "react";
import {
  getAdminProducts,
  getAdminCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminService";
import Pagination from "../components/Pagination";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: "",
};

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} ₫`;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const ITEMS_PER_PAGE = 10;

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [productData, categoryData] = await Promise.all([
        getAdminProducts(),
        getAdminCategories(),
      ]);

      setProducts(productData);
      setCategories(categoryData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể tải dữ liệu. Hãy kiểm tra quyền Admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [productData, categoryData] = await Promise.all([
          getAdminProducts(),
          getAdminCategories(),
        ]);

        if (!cancelled) {
          setProducts(productData);
          setCategories(categoryData);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price ?? ""),
      category:
        typeof product.category === "object"
          ? product.category?._id || ""
          : product.category || "",
      stock: String(product.stock ?? ""),
      image: product.image || "",
    });

    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim()) {
      setError("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Giá sản phẩm không hợp lệ.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Số lượng tồn kho phải là số nguyên không âm.");
      return;
    }

    if (!form.category) {
      setError("Vui lòng chọn danh mục.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      category: form.category,
      stock,
      image: form.image.trim(),
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateProduct(editingId, payload);
        setSuccess("Cập nhật sản phẩm thành công.");
      } else {
        await createProduct(payload);
        setSuccess("Thêm sản phẩm thành công.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể lưu sản phẩm. Vui lòng kiểm tra dữ liệu và quyền Admin."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteProduct(product._id);
      setProducts((current) =>
        current.filter((item) => item._id !== product._id)
      );

      if (editingId === product._id) {
        resetForm();
      }

      setSuccess("Xóa sản phẩm thành công.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể xóa sản phẩm. Hãy kiểm tra quyền Admin."
      );
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.name || "")
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search keyword changes
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Admin / Products
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Quản lý sản phẩm
        </h1>
        <p className="mt-2 text-gray-500">
          Thêm, cập nhật, tìm kiếm và xóa sản phẩm của Halal Food.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-5 text-xl font-bold text-gray-800">
          {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Tên sản phẩm *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="Ví dụ: Mango Smoothie"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
              Danh mục *
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-emerald-600"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
              Giá (VND) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1000"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="45000"
            />
          </div>

          <div>
            <label htmlFor="stock" className="mb-1 block text-sm font-medium text-gray-700">
              Số lượng tồn kho *
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="20"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">
              URL hình ảnh
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="Mô tả sản phẩm..."
            />
          </div>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {saving
                ? "Đang lưu..."
                : editingId
                  ? "Lưu thay đổi"
                  : "Thêm sản phẩm"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Hủy chỉnh sửa
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Danh sách sản phẩm
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredProducts.length} sản phẩm
              {totalPages > 1 && ` · Trang ${currentPage}/${totalPages}`}
            </p>
          </div>

          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 sm:max-w-xs"
          />
        </div>

        {loading ? (
          <p className="py-8 text-center text-gray-500">Đang tải sản phẩm...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            Không tìm thấy sản phẩm.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-3 font-medium">Sản phẩm</th>
                  <th className="px-3 py-3 font-medium">Danh mục</th>
                  <th className="px-3 py-3 font-medium">Giá</th>
                  <th className="px-3 py-3 font-medium">Tồn kho</th>
                  <th className="px-3 py-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "https://placehold.co/80x80?text=Food"}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-800">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {typeof product.category === "object"
                        ? product.category?.name || "Chưa phân loại"
                        : categories.find(
                            (category) => category._id === product.category
                          )?.name || "Chưa phân loại"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 font-medium text-emerald-700">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-3 py-4">{product.stock ?? 0}</td>
                    <td className="px-3 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-md border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          className="rounded-md border border-red-200 px-3 py-1.5 font-medium text-red-600 hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
