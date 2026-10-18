# Tài Liệu API Backend - Halal Food Website

## Base URL
```
http://localhost:5000
```

## Authentication
Hầu hết các endpoints yêu cầu token JWT trong header:
```
Authorization: Bearer <token>
```

---

## 1. 🔐 Authentication APIs (`/api/auth`)

### 1.1 Đăng Ký
- **Endpoint**: `POST /api/auth/register`
- **Public**: ✅ Không cần xác thực
- **Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "customer|admin|shipper"
}
```

### 1.2 Đăng Nhập
- **Endpoint**: `POST /api/auth/login`
- **Public**: ✅ Không cần xác thực
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**: Token JWT

---

## 2. 🏷️ Category APIs (`/api/categories`)

### 2.1 Lấy Danh Sách Categories
- **Endpoint**: `GET /api/categories`
- **Auth**: ✅ Public - Không cần xác thực
- **Query Params**: Không có

### 2.2 Lấy Category Theo ID
- **Endpoint**: `GET /api/categories/:id`
- **Auth**: ✅ Public - Không cần xác thực
- **Params**: `id` - Category ID

### 2.3 Tạo Category Mới
- **Endpoint**: `POST /api/categories`
- **Auth**: 🔒 Admin only
- **Body**:
```json
{
  "name": "string",
  "description": "string"
}
```

### 2.4 Cập Nhật Category
- **Endpoint**: `PUT /api/categories/:id`
- **Auth**: 🔒 Admin only
- **Params**: `id` - Category ID
- **Body**: Các trường cần update

### 2.5 Xóa Category
- **Endpoint**: `DELETE /api/categories/:id`
- **Auth**: 🔒 Admin only
- **Params**: `id` - Category ID

---

## 3. 🛍️ Product APIs (`/api/products`)

### 3.1 Lấy Danh Sách Sản Phẩm
- **Endpoint**: `GET /api/products`
- **Auth**: 🔒 Customer, Admin
- **Query Params**: Có thể có filter

### 3.2 Lấy Sản Phẩm Theo ID
- **Endpoint**: `GET /api/products/:id`
- **Auth**: 🔒 Customer, Admin
- **Params**: `id` - Product ID

### 3.3 Tạo Sản Phẩm Mới
- **Endpoint**: `POST /api/products`
- **Auth**: 🔒 Admin only
- **Body**:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "categoryId",
  "stock": "number",
  "image": "string"
}
```

### 3.4 Cập Nhật Sản Phẩm
- **Endpoint**: `PUT /api/products/:id`
- **Auth**: 🔒 Admin only
- **Params**: `id` - Product ID
- **Body**: Các trường cần update

### 3.5 Xóa Sản Phẩm
- **Endpoint**: `DELETE /api/products/:id`
- **Auth**: 🔒 Admin only
- **Params**: `id` - Product ID

---

## 4. 📦 Order APIs (`/api/orders`)

### 4.1 Tạo Đơn Hàng
- **Endpoint**: `POST /api/orders`
- **Auth**: 🔒 Customer only
- **Body**:
```json
{
  "items": [
    {
      "product": "productId",
      "quantity": "number"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "postalCode": "string"
  }
}
```

### 4.2 Lấy Đơn Hàng Của Tôi
- **Endpoint**: `GET /api/orders/my`
- **Auth**: 🔒 Customer only
- **Description**: Lấy danh sách đơn hàng của khách hàng đang đăng nhập

### 4.3 Lấy Tất Cả Đơn Hàng
- **Endpoint**: `GET /api/orders`
- **Auth**: 🔒 Admin only
- **Description**: Lấy tất cả đơn hàng trong hệ thống

### 4.4 Lấy Đơn Hàng Đang Chờ
- **Endpoint**: `GET /api/orders/pending`
- **Auth**: 🔒 Shipper only
- **Description**: Lấy danh sách đơn hàng chưa được giao

### 4.5 Lấy Đơn Hàng Của Tôi (Shipper)
- **Endpoint**: `GET /api/orders/my-deliveries`
- **Auth**: 🔒 Shipper only
- **Description**: Lấy danh sách đơn hàng mà shipper đã nhận

### 4.6 Chấp Nhận Đơn Hàng
- **Endpoint**: `PATCH /api/orders/:id/accept`
- **Auth**: 🔒 Shipper only
- **Params**: `id` - Order ID
- **Description**: Shipper chấp nhận giao đơn hàng

### 4.7 Hoàn Thành Giao Hàng
- **Endpoint**: `PATCH /api/orders/:id/deliver`
- **Auth**: 🔒 Shipper only
- **Params**: `id` - Order ID
- **Description**: Đánh dấu đơn hàng đã giao thành công

---

## 5. 🔄 Return Request APIs (`/api/returns`)

### 5.1 Tạo Yêu Cầu Trả Hàng
- **Endpoint**: `POST /api/returns`
- **Auth**: 🔒 Customer only
- **Body**:
```json
{
  "order": "orderId",
  "reason": "string",
  "description": "string"
}
```

### 5.2 Lấy Yêu Cầu Trả Hàng Của Tôi
- **Endpoint**: `GET /api/returns/my`
- **Auth**: 🔒 Customer only
- **Description**: Lấy danh sách yêu cầu trả hàng của khách hàng

### 5.3 Lấy Tất Cả Yêu Cầu Trả Hàng
- **Endpoint**: `GET /api/returns`
- **Auth**: 🔒 Admin only
- **Description**: Lấy tất cả yêu cầu trả hàng trong hệ thống

### 5.4 Cập Nhật Trạng Thái Yêu Cầu Trả Hàng
- **Endpoint**: `PATCH /api/returns/:id/status`
- **Auth**: 🔒 Admin only
- **Params**: `id` - Return Request ID
- **Body**:
```json
{
  "status": "pending|approved|rejected|completed"
}
```

---

## 6. 🧪 Test APIs (`/api/test`)

### 6.1 Test Customer Access
- **Endpoint**: `GET /api/test/customer`
- **Auth**: 🔒 Customer only
- **Description**: Kiểm tra quyền truy cập của customer

### 6.2 Test Admin Access
- **Endpoint**: `GET /api/test/admin`
- **Auth**: 🔒 Admin only
- **Description**: Kiểm tra quyền truy cập của admin

### 6.3 Test Shipper Access
- **Endpoint**: `GET /api/test/shipper`
- **Auth**: 🔒 Shipper only
- **Description**: Kiểm tra quyền truy cập của shipper

---

## Roles & Permissions

### Customer (Khách hàng)
- ✅ Xem categories và products
- ✅ Tạo đơn hàng
- ✅ Xem đơn hàng của mình
- ✅ Tạo yêu cầu trả hàng
- ✅ Xem yêu cầu trả hàng của mình

### Admin (Quản trị viên)
- ✅ Tất cả quyền của Customer
- ✅ Quản lý categories (CRUD)
- ✅ Quản lý products (CRUD)
- ✅ Xem tất cả đơn hàng
- ✅ Xem và xử lý yêu cầu trả hàng

### Shipper (Người giao hàng)
- ✅ Xem đơn hàng đang chờ giao
- ✅ Chấp nhận đơn hàng
- ✅ Hoàn thành giao hàng

---

## Error Responses

Tất cả endpoints có thể trả về các mã lỗi sau:

- **400** - Bad Request (Dữ liệu không hợp lệ)
- **401** - Unauthorized (Chưa đăng nhập hoặc token không hợp lệ)
- **403** - Forbidden (Không có quyền truy cập)
- **404** - Not Found (Không tìm thấy tài nguyên)
- **500** - Internal Server Error (Lỗi server)

## Tổng Kết

**Tổng số endpoints**: 27 APIs

**Phân loại theo module**:
- Authentication: 2 endpoints
- Categories: 5 endpoints
- Products: 5 endpoints
- Orders: 7 endpoints
- Return Requests: 4 endpoints
- Test: 3 endpoints

**Phân loại theo quyền truy cập**:
- Public: 2 endpoints
- Customer only: 5 endpoints
- Admin only: 9 endpoints
- Shipper only: 5 endpoints
- Customer + Admin: 4 endpoints
