import { useEffect, useState } from "react";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/adminService";

const emptyForm = {
  name: "",
  description: "",
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const categoryData = await getAdminCategories();
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
        const categoryData = await getAdminCategories();
        if (!cancelled) {
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

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name || "",
      description: category.description || "",
    });

    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Vui lòng nhập tên danh mục.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateCategory(editingId, payload);
        setSuccess("Cập nhật danh mục thành công.");
      } else {
        await createCategory(payload);
        setSuccess("Thêm danh mục thành công.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể lưu danh mục. Vui lòng kiểm tra dữ liệu và quyền Admin."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa danh mục "${category.name}" không?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteCategory(category._id);
      setCategories((current) =>
        current.filter((item) => item._id !== category._id)
      );

      if (editingId === category._id) {
        resetForm();
      }

      setSuccess("Xóa danh mục thành công.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Không thể xóa danh mục. Hãy kiểm tra quyền Admin."
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    (category.name || "")
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())
  );

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Admin / Categories
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Quản lý danh mục
        </h1>
        <p className="mt-2 text-gray-500">
          Thêm, cập nhật, tìm kiếm và xóa danh mục của Halal Food.
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
          {editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Tên danh mục *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600"
              placeholder="Ví dụ: Đồ uống"
            />
          </div>

          <div>
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
              placeholder="Mô tả danh mục..."
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {saving
                ? "Đang lưu..."
                : editingId
                  ? "Lưu thay đổi"
                  : "Thêm danh mục"}
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
              Danh sách danh mục
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredCategories.length} danh mục
            </p>
          </div>

          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm theo tên danh mục..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-emerald-600 sm:max-w-xs"
          />
        </div>

        {loading ? (
          <p className="py-8 text-center text-gray-500">Đang tải danh mục...</p>
        ) : filteredCategories.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            Không tìm thấy danh mục.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-3 font-medium">Tên danh mục</th>
                  <th className="px-3 py-3 font-medium">Mô tả</th>
                  <th className="px-3 py-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-4 font-medium text-gray-800">
                      {category.name}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {category.description || "—"}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-md border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
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
      </div>
    </section>
  );
}
