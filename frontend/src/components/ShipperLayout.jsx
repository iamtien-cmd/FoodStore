import { useState } from "react";

export default function ShipperLayout({
  children,
  user,
  currentPage,
  onNavigate,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "orders",
      name: "Đơn hàng",
      icon: "📦",
      page: "shipper-orders",
    },
    {
      id: "profile",
      name: "Tài khoản",
      icon: "👤",
      page: "shipper-profile",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex-shrink-0 border-b border-gray-200 px-6 py-5">
            <h1 className="text-xl font-bold text-blue-800">🍃 Halal Food</h1>
            <p className="mt-1 text-xs text-gray-500">Shipper Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.page)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  currentPage === item.page
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
            {user && (
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user?.name || "Shipper"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h1 className="text-xl font-bold text-blue-800">
                🍃 Halal Food
              </h1>
              <p className="mt-1 text-xs text-gray-500">Shipper Panel</p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.page);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  currentPage === item.page
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
            {user && (
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user?.name || "Shipper"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-blue-800">🍃 Halal Food</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
