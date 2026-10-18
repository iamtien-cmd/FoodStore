export default function Profile({ user, onHome, onLogin, onMyOrders }) {
  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">👤</div>

          <h1 className="text-2xl font-bold text-gray-800">
            Bạn chưa đăng nhập
          </h1>

          <p className="mt-2 text-gray-500">
            Đăng nhập để xem thông tin tài khoản của bạn.
          </p>

          <button
            type="button"
            onClick={onLogin}
            className="mt-6 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={onHome}
            className="ml-3 mt-6 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Trang chủ
          </button>
        </div>
      </section>
    );
  }

  const displayName = user.name || user.fullName || "Chưa cập nhật";
  const displayEmail = user.email || "Chưa cập nhật";
  const displayRole = user.role || "customer";

  const roleLabels = {
    customer: "Khách hàng",
    admin: "Quản trị viên",
    shipper: "Nhân viên giao hàng",
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-6 py-8 text-white sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
              👤
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Tài khoản của tôi
              </h1>

              <p className="mt-1 text-sm text-emerald-50">
                Chào mừng bạn đến với Halal Food!
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            Thông tin cá nhân
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Họ và tên</p>
              <p className="mt-1 font-medium text-gray-800">
                {displayName}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 break-all font-medium text-gray-800">
                {displayEmail}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Vai trò</p>
              <p className="mt-1 font-medium text-emerald-700">
                {roleLabels[displayRole] || displayRole}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onMyOrders}
              className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              📦 Lịch sử đơn hàng
            </button>

            <button
              type="button"
              onClick={onHome}
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}