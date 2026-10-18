export default function AdminProfile({ user }) {
  if (!user) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">Không tìm thấy thông tin người dùng.</p>
        </div>
      </section>
    );
  }

  const infoItems = [
    { label: "Họ và tên", value: user.name || "—" },
    { label: "Email", value: user.email || "—" },
    { label: "Vai trò", value: user.role === "admin" ? "Quản trị viên" : user.role || "—" },
    { label: "ID", value: user._id || user.id || "—" },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Admin / Profile
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Thông tin tài khoản
        </h1>
        <p className="mt-2 text-gray-500">
          Xem thông tin cá nhân của tài khoản Admin.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Avatar section */}
        <div className="border-b border-gray-100 px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
              {user.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name || "Admin User"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{user.email || "—"}</p>
              <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                {user.role === "admin" ? "Quản trị viên" : user.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="px-6 py-6 sm:px-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Chi tiết tài khoản
          </h3>
          <dl className="space-y-4">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-b border-gray-50 pb-4 last:border-0 sm:flex-row sm:gap-8"
              >
                <dt className="w-full text-sm font-medium text-gray-500 sm:w-40">
                  {item.label}
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Actions section */}
        <div className="border-t border-gray-100 px-6 py-6 sm:px-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Hành động
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Đổi mật khẩu (Sắp có)
            </button>
            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cập nhật thông tin (Sắp có)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Lưu ý:</strong> Thông tin tài khoản được lưu trong
          localStorage. Các chức năng chỉnh sửa sẽ được bổ sung trong phiên bản
          tiếp theo.
        </p>
      </div>
    </section>
  );
}
