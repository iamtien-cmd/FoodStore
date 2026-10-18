export default function Navbar({
  user,
  onLogin,
  onRegister,
  onLogout,
  onHome,
  onProfile,
  onCart,
  onAbout,
  onAdmin,
  cartCount = 0,
}) {
  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={onHome}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="text-2xl">🌙</span>
          <span className="text-xl font-bold text-emerald-800">
            Halal Food
          </span>
        </button>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onHome}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            Homepage
          </button>

          <button
            type="button"
            onClick={onCart}
            className="relative rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
             <button
            type="button"
            onClick={onAbout}
            className="relative rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            About Us
          </button>
          {user ? (
            <>
              {isAdmin && (
                <button
                  type="button"
                  onClick={onAdmin}
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  ⚙️ Quản trị
                </button>
              )}

              <button
                type="button"
                onClick={onProfile}
                className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                Account
              </button>

              <span className="hidden text-sm text-gray-600 lg:inline">
                Xin chào,{" "}
                {user.name || user.fullName || user.email || "bạn"}!
              </span>

              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onLogin}
                className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                Log in
              </button>

              <button
                type="button"
                onClick={onRegister}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
