# 🎛️ Hướng Dẫn Hệ Thống Admin - Halal Food

## Tổng Quan

Hệ thống Admin đã được nâng cấp với giao diện dashboard chuyên nghiệp, sidebar điều hướng, và các tính năng quản lý đầy đủ.

## 🎨 Tính Năng Mới

### 1. **AdminLayout - Sidebar Dashboard**
- ✅ Sidebar cố định bên trái (desktop)
- ✅ Menu responsive cho mobile (hamburger menu)
- ✅ Hiển thị thông tin user ở cuối sidebar
- ✅ Nút đăng xuất tích hợp
- ✅ Highlight trang đang active

**Component**: `frontend/src/components/AdminLayout.jsx`

### 2. **Trang Admin Dashboard**
- ✅ Thống kê tổng số sản phẩm, danh mục, đơn hàng
- ✅ Card điều hướng nhanh với hiệu ứng hover
- ✅ Thông báo trạng thái hệ thống
- ✅ Mẹo sử dụng cho admin

**Component**: `frontend/src/pages/AdminDashboard.jsx`

### 3. **Trang Quản Lý Sản Phẩm**
- ✅ Xem danh sách sản phẩm với hình ảnh
- ✅ Thêm sản phẩm mới
- ✅ Chỉnh sửa sản phẩm
- ✅ Xóa sản phẩm (có xác nhận)
- ✅ Tìm kiếm sản phẩm theo tên
- ✅ Chọn danh mục từ dropdown

**Component**: `frontend/src/pages/AdminProducts.jsx`

### 4. **Trang Quản Lý Danh Mục**
- ✅ Xem danh sách danh mục
- ✅ Thêm danh mục mới
- ✅ Chỉnh sửa danh mục
- ✅ Xóa danh mục (có xác nhận)
- ✅ Tìm kiếm danh mục

**Component**: `frontend/src/pages/AdminCategories.jsx`

### 5. **Trang Quản Lý Đơn Hàng**
- ✅ Xem tất cả đơn hàng
- ✅ Thông tin khách hàng
- ✅ Trạng thái đơn hàng (pending, shipping, delivered, cancelled)
- ✅ Tổng tiền và số lượng sản phẩm
- ✅ Tìm kiếm theo tên, email, hoặc mã đơn

**Component**: `frontend/src/pages/AdminOrders.jsx`

### 6. **Trang Thông Tin Tài Khoản Admin** ⭐ MỚI
- ✅ Xem thông tin cá nhân
- ✅ Avatar với chữ cái đầu tiên
- ✅ Hiển thị vai trò (Admin badge)
- ✅ Chi tiết tài khoản (tên, email, role, ID)
- ✅ Placeholder cho chức năng đổi mật khẩu (sắp có)

**Component**: `frontend/src/pages/AdminProfile.jsx`

## 📱 Navigation Menu

Sidebar bên trái bao gồm 5 mục chính:

1. **📊 Dashboard** - Tổng quan hệ thống
2. **📦 Sản phẩm** - Quản lý sản phẩm
3. **🗂️ Danh mục** - Quản lý danh mục
4. **🧾 Đơn hàng** - Xem đơn hàng
5. **👤 Tài khoản** - Thông tin admin

## 🎯 Cách Sử Dụng

### Đăng Nhập Admin
1. Truy cập trang đăng nhập
2. Đăng nhập với tài khoản có `role: "admin"`
3. Tự động chuyển đến Admin Dashboard

### Điều Hướng
- **Desktop**: Click vào menu sidebar bên trái
- **Mobile**: Nhấn icon hamburger (☰) để mở menu

### Quản Lý Sản Phẩm
1. Vào **Sản phẩm** từ sidebar
2. Điền form để thêm sản phẩm mới
3. Click **Sửa** để chỉnh sửa
4. Click **Xóa** để xóa (có xác nhận)

### Quản Lý Danh Mục
1. Vào **Danh mục** từ sidebar
2. Điền form để thêm danh mục
3. Thao tác Sửa/Xóa tương tự

### Xem Đơn Hàng
1. Vào **Đơn hàng** từ sidebar
2. Xem danh sách tất cả đơn hàng
3. Sử dụng ô tìm kiếm để lọc

### Xem Thông Tin Tài Khoản
1. Vào **Tài khoản** từ sidebar
2. Xem thông tin chi tiết
3. Các chức năng chỉnh sửa sẽ được bổ sung sau

## 🔐 Bảo Mật

- Tất cả trang admin yêu cầu đăng nhập với role `admin`
- Token JWT được gửi trong header Authorization
- Nếu không phải admin, tự động chuyển về trang login

## 🎨 Giao Diện

### Màu Sắc Chủ Đạo
- **Primary**: Emerald Green (#059669, #047857)
- **Background**: Gray-50 (#F9FAFB)
- **White**: #FFFFFF
- **Text**: Gray-900, Gray-700, Gray-500

### Responsive Design
- **Mobile**: < 768px - Menu hamburger
- **Tablet**: 768px - 1024px - Menu hamburger
- **Desktop**: > 1024px - Sidebar cố định

## 📂 Cấu Trúc File

```
frontend/src/
├── components/
│   ├── AdminLayout.jsx          ⭐ MỚI - Layout với sidebar
│   └── Navbar.jsx               (cho user thường)
├── pages/
│   ├── AdminDashboard.jsx       ✅ Cập nhật
│   ├── AdminProducts.jsx        ✅ Cập nhật
│   ├── AdminCategories.jsx      ✅ Cập nhật
│   ├── AdminOrders.jsx          ✅ Cập nhật
│   └── AdminProfile.jsx         ⭐ MỚI
├── services/
│   └── adminService.js
└── App.jsx                      ✅ Cập nhật logic routing
```

## 🚀 Các Tính Năng Sắp Có

- [ ] Đổi mật khẩu admin
- [ ] Cập nhật thông tin admin
- [ ] Thống kê biểu đồ (chart)
- [ ] Export dữ liệu ra Excel
- [ ] Quản lý user (thêm/sửa/xóa customer)
- [ ] Quản lý yêu cầu trả hàng (Return Requests)
- [ ] Notification system
- [ ] Dark mode

## 💡 Lưu Ý

1. **Thông tin user** được lưu trong localStorage
2. **Token** tự động gửi qua Axios interceptor
3. **Responsive** hoàn toàn trên mọi thiết bị
4. **Loading states** được xử lý ở tất cả các trang
5. **Error handling** hiển thị thông báo rõ ràng

## 🎯 So Sánh Trước & Sau

### ❌ Trước
- Không có sidebar cố định
- Dashboard đơn giản
- Không có trang profile admin
- Phải quay lại dashboard để chuyển trang
- Navigation qua props drilling

### ✅ Sau
- Sidebar chuyên nghiệp, luôn hiển thị
- Dashboard với thống kê và card đẹp
- Trang profile admin đầy đủ thông tin
- Chuyển trang trực tiếp từ sidebar
- Navigation tập trung trong AdminLayout
- Responsive hoàn hảo cho mobile

## 🎨 Screenshots Giao Diện

### Desktop View
```
┌─────────────┬──────────────────────────────┐
│             │                              │
│   SIDEBAR   │      DASHBOARD CONTENT       │
│             │                              │
│  📊 Dashboard│   ┌─────┐ ┌─────┐ ┌─────┐ │
│  📦 Sản phẩm │   │ 120 │ │  15 │ │  45 │ │
│  🗂️ Danh mục │   │ SP  │ │ DM  │ │ ĐH  │ │
│  🧾 Đơn hàng │   └─────┘ └─────┘ └─────┘ │
│  👤 Tài khoản│                              │
│             │                              │
│  ───────────│                              │
│  [Avatar]   │                              │
│  Admin Name │                              │
│  [Đăng xuất]│                              │
└─────────────┴──────────────────────────────┘
```

### Mobile View
```
┌──────────────────────────┐
│  ☰  Halal Food Admin     │
├──────────────────────────┤
│                          │
│   DASHBOARD CONTENT      │
│                          │
│   ┌──────────────────┐   │
│   │   120 Sản phẩm   │   │
│   └──────────────────┘   │
│                          │
│   ┌──────────────────┐   │
│   │   15 Danh mục    │   │
│   └──────────────────┘   │
│                          │
└──────────────────────────┘
```

---

**Phiên bản**: 2.0  
**Ngày cập nhật**: 2026-10-10  
**Developer**: Kiro AI Assistant
