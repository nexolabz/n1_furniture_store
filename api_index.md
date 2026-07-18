# FURNI. API Index

Quick-reference index for all endpoints documented in [`api_doc.md`](./api_doc.md), cross-checked against the PRD schema and functional requirements in [`Furni_PRD.docx`](./Furni_PRD.docx).

**Auth model:** Only customers self-register. Store Owner provisions staff and delivery partners via admin APIs and shares login credentials with them.

| Metric | Count |
|--------|------:|
| Endpoints in `api_doc.md` | **73** |
| Endpoints implemented in backend | **2** |
| Tables defined in PRD schema (§5) | **17** |
| PRD schema gaps vs API doc | **13 items** |
| API doc internal inconsistencies | **Resolved** (see §4) |
| API doc minor polish items | **Resolved** (see §4) |

---

## 1. Documented APIs (`api_doc.md`)

### 1.1 Customer — Authentication & Profile (6)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/auth/signup` | Customer self-registration only |
| `POST` | `/api/auth/login` | Sign in for all roles (staff use owner-issued credentials) |
| `POST` | `/api/auth/forgot-password` | Initiate OTP password reset |
| `POST` | `/api/auth/verify-otp` | Verify OTP and set new password |
| `GET` | `/api/customer/profile` | Fetch profile and order totals |
| `PATCH` | `/api/customer/profile` | Update profile fields |

### 1.2 Customer — Catalog & Discovery (8)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/home` | Homepage curated product lists |
| `GET` | `/api/categories` | Active categories with product counts |
| `GET` | `/api/products` | Paginated, filterable product list |
| `GET` | `/api/products/search` | Full-text product search |
| `GET` | `/api/products/sale` | Active sale / discounted products |
| `GET` | `/api/products/:id` | Product detail, reviews, related items |
| `GET` | `/api/collections` | Design theme collections |
| `GET` | `/api/collections/:id/products` | Products within a collection |

> **Route order:** `/search` and `/sale` must be registered before `/:id` (see `api_doc.md` §0.1).

### 1.3 Customer — Cart, Wishlist & Reviews (12)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/cart` | Fetch cart with GST/fee summary |
| `POST` | `/api/cart` | Add item to cart |
| `POST` | `/api/cart/sync` | Bulk sync localStorage cart to DB |
| `PATCH` | `/api/cart` | Update cart item quantity |
| `DELETE` | `/api/cart` | Remove cart item |
| `GET` | `/api/wishlist` | Fetch saved wishlist |
| `POST` | `/api/wishlist` | Add product to wishlist |
| `DELETE` | `/api/wishlist` | Remove product from wishlist |
| `GET` | `/api/reviews/:product_id` | List reviews for a product |
| `POST` | `/api/reviews` | Submit a product review |
| `PATCH` | `/api/reviews` | Edit own review |
| `DELETE` | `/api/reviews` | Delete own review |

### 1.4 Customer — Checkout, Orders & Delivery (11)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/checkout/summary` | Validate stock/coupon and compute totals |
| `POST` | `/api/orders` | Create order from cart |
| `POST` | `/api/orders/:id/delivery-mode` | Set home delivery or pickup |
| `POST` | `/api/payments/process` | Process payment and confirm order |
| `GET` | `/api/payments/:order_id` | Payment status lookup |
| `GET` | `/api/orders/history` | List past orders for customer |
| `GET` | `/api/orders/:id` | Single order detail |
| `PATCH` | `/api/orders/cancel` | Cancel a pending order |
| `GET` | `/api/orders/:id/refund-status` | Refund pipeline status |
| `GET` | `/api/deliveries/track/:order_id` | Track delivery status |
| `POST` | `/api/contact` | Submit contact / support message |

> **Route order:** `/history` and `/cancel` must be registered before `/:id` (see `api_doc.md` §0.1).

### 1.5 In-Store Sales Executive (3)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/staff/products/lookup` | Inventory lookup with floor-sample info |
| `POST` | `/api/staff/orders/assisted-checkout` | Staff-assisted in-store checkout (supports `coupon_code`) |
| `GET` | `/api/staff/orders/:id/invoice` | Printable showroom invoice |

### 1.6 Delivery Partner (2)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/delivery/assignments` | List assigned shipments |
| `PATCH` | `/api/delivery/status` | Update delivery status |

### 1.7 Store Owner / Admin (31)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/admin/dashboard/metrics` | Cross-channel analytics snapshot |
| `POST` | `/api/admin/products` | Create product |
| `GET` | `/api/admin/products` | Paginated admin product list |
| `GET` | `/api/admin/products/:id` | Admin product detail (includes `images[]`) |
| `PATCH` | `/api/admin/products/:id` | Update product |
| `DELETE` | `/api/admin/products/:id` | Soft-delete / remove product |
| `POST` | `/api/admin/products/:id/images` | Add product gallery image |
| `DELETE` | `/api/admin/products/:id/images/:image_id` | Remove product gallery image |
| `POST` | `/api/admin/collections` | Create design collection |
| `PATCH` | `/api/admin/collections/:id` | Update collection |
| `DELETE` | `/api/admin/collections/:id` | Remove collection |
| `POST` | `/api/admin/collections/:id/products` | Assign product to collection |
| `DELETE` | `/api/admin/collections/:id/products/:product_id` | Remove product from collection |
| `GET` | `/api/admin/coupons` | List promo codes |
| `POST` | `/api/admin/coupons` | Create promo code |
| `PATCH` | `/api/admin/coupons/:id` | Update promo code |
| `DELETE` | `/api/admin/coupons/:id` | Deactivate promo code |
| `GET` | `/api/admin/orders` | Filter global order ledger |
| `GET` | `/api/admin/orders/:id` | Full order detail (includes `coupon_applied`) |
| `PATCH` | `/api/admin/orders/dispatch` | Dispatch order and assign driver |
| `PATCH` | `/api/admin/orders/refund` | Process order refund |
| `GET` | `/api/admin/deliveries` | List all deliveries |
| `GET` | `/api/admin/payments` | Payment audit list |
| `GET` | `/api/admin/users` | List users by role |
| `POST` | `/api/admin/users` | Owner provisions staff / delivery partner (issues login credentials) |
| `PATCH` | `/api/admin/users/:id` | Update staff profile or reset password |
| `DELETE` | `/api/admin/users/:id` | Deactivate user account |
| `GET` | `/api/admin/reviews` | List all reviews for moderation |
| `DELETE` | `/api/admin/reviews/:id` | Remove review from public view |
| `GET` | `/api/admin/contact` | List contact form submissions |
| `PATCH` | `/api/admin/contact/:id` | Update contact ticket status |

> **Total:** 6 + 8 + 12 + 11 + 3 + 2 + 31 = **73 endpoints**

---

## 2. PRD Schema Coverage (updated)

The PRD now defines **17 tables** (§5.1–§5.17). Two tables share the number **5.16** in the doc — `review_images` should be renumbered to **5.17**.

| PRD Table | API coverage | Status |
|-----------|-------------|--------|
| `users` | Auth, profile, admin user CRUD | **Gap — missing `is_active` for deactivation** |
| `products` | Catalog, admin CRUD, staff lookup | **Gap — `rating` column missing in PRD** |
| `collections` | Public read + admin CRUD | Aligned |
| `product_collection_mapping` | Collection products + admin mapping | Aligned |
| `cart_items` | Cart CRUD + bulk sync | Aligned |
| `orders` | Order create, detail, history, cancel | **Gap — missing `delivery_mode`, address snapshot, refund fields** |
| `order_items` | Embedded in order responses | Aligned |
| `payments` | Process, lookup, admin audit | **Gap — missing `amount` column** |
| `deliveries` | Track, dispatch, assignments, admin list | **Gap — missing `assigned_driver_user_id`, `delivery_mode`** |
| `reviews` | Customer + admin review APIs | **Gap — PRD uses `review_text`, API uses `feedback`** |
| `wishlist_items` | Wishlist CRUD | Aligned (add UNIQUE constraint recommended) |
| `contact_messages` | `POST /api/contact` + admin list/update | Aligned |
| `password_reset_sessions` | Forgot-password + verify-otp | Aligned |
| `coupons` | Admin coupon CRUD + checkout validation | Aligned |
| `order_coupon_usage` | `GET /api/admin/orders/:id` (`coupon_applied`) | Aligned |
| `product_images` | Product detail `images[]` + admin add/remove | Aligned |
| `review_images` | Returned in review `images[]` | Aligned via review POST/PATCH body |

---

## 3. Gaps — PRD missing items (referenced in API doc)

These fields/tables are used in `api_doc.md` but are **not yet in the PRD schema**:

| # | What's missing in PRD | Used by API | Suggested PRD addition |
|---|----------------------|-------------|------------------------|
| 1 | `products.rating` | Product list, detail, home, sale, search filter `rating_min` | `rating DECIMAL(3,2) NOT NULL DEFAULT 5.00` on `products` |
| 2 | `orders.delivery_mode` | `POST /api/orders/:id/delivery-mode`, order detail, staff checkout | `delivery_mode ENUM NOT NULL DEFAULT 'HOME_DELIVERY'` — values: `HOME_DELIVERY`, `SHOWROOM_PICKUP` |
| 3 | Order address snapshot | `POST /api/orders` sends `delivery_address`, `landmark`, `pin_code` | Add `delivery_address`, `landmark`, `pin_code` VARCHAR columns on `orders` |
| 4 | Refund tracking | `GET /api/orders/:id/refund-status`, `PATCH /api/admin/orders/refund` | Add `refund_status ENUM`, `refund_amount DECIMAL(10,2)` on `orders` — or new `refunds` table |
| 5 | `deliveries.assigned_driver_user_id` | `PATCH /api/admin/orders/dispatch`, `GET /api/admin/deliveries` | `assigned_driver_user_id INT FK → users(user_id) NULL` on `deliveries` |
| 6 | `deliveries.delivery_mode` | Staff assisted-checkout, order detail | `delivery_mode ENUM` on `deliveries` |
| 7 | `payments.amount` | `GET /api/payments/:order_id` returns `amount` | `amount DECIMAL(10,2) NOT NULL` on `payments` |
| 8 | Auth provisioning policy | Customer-only signup, owner creates staff | Add to PRD §4 or new §6 — not a table, but a business rule gap |
| 9 | `users.is_active` | `DELETE /api/admin/users/:id` deactivates accounts | `is_active BOOLEAN NOT NULL DEFAULT TRUE` on `users` |
| 10 | Product soft-delete | `DELETE /api/admin/products/:id` | `is_active BOOLEAN NOT NULL DEFAULT TRUE` on `products` |
| 11 | `ADMIN` role / owner bootstrap | All `/api/admin/*` endpoints | Define `ADMIN` in `users.role` ENUM; seed first admin via migration (documented in API §0.11) |
| 12 | Walk-in customer linkage | Staff assisted-checkout `customer_details` | Document: auto-create/lookup customer by email/phone for `orders.user_id` |
| 13 | Shipping rules | `financial_summary.delivery_charges` | Document: ₹0 when post-discount subtotal ≥ ₹10,000; else ₹1,500 |

### PRD doc issues (non-schema)

| Issue | Detail |
|-------|--------|
| Duplicate table number | Both `product_images` and `review_images` are labelled **§5.16** |
| Missing UNIQUE constraint | `wishlist_items` should have `UNIQUE (user_id, product_id)` |
| Field naming mismatch | PRD `review_text` vs API `feedback` — pick one |
| ENUM values undefined | `role`, `order_status`, `delivery_status`, `payment_method`, `payment_status` not enumerated in PRD |

---

## 4. Resolved — API doc internal inconsistencies

The following issues were corrected in `api_doc.md` (see §0 Platform Conventions):

| Issue | Resolution |
|-------|------------|
| Route ordering | §0.1 documents static-before-param registration; `/products/sale` moved before `/:id` in doc |
| Financial field naming | Unified to `financial_summary` with `subtotal_amount`, `discount_applied`, `gst_tax_amount`, `delivery_charges`, `grand_total` |
| Delivery charges contradiction | Cart and checkout now both apply free shipping when post-discount subtotal ≥ ₹10,000 |
| `delivery_mode` vs `delivery_status` | Staff checkout response fixed; §0.3 defines separate state machines |
| Dispatch endpoint | `PATCH /api/admin/orders/dispatch` now updates `delivery_status`, not `order_status` |
| Missing admin list | Added `GET /api/admin/products` (paginated catalog list) |
| Order history field | `total_amount` renamed to `grand_total` for consistency |
| localStorage cart mapping | §0.7 documents `id`/`qty` → `product_id`/`quantity` |
| RBAC & errors | §0.5 standard error format; §0.6 role access matrix |
| Computed fields | §0.4 documents `estimated_delivery_date` as derived, not stored |

### Minor polish (second pass — resolved)

| Issue | Resolution |
|-------|------------|
| ENUM appendix incomplete | §0.8 — full ENUM reference for all status/role/channel fields |
| Pagination gaps | §0.9 + `page` on order history, product reviews, admin orders/deliveries/payments/users/reviews/contact/coupons, delivery assignments |
| Review verification | `POST /api/reviews` — purchase eligibility, one-per-product, 409/422 error codes |
| Image upload | §0.10 — URL-only in v1; no multipart upload; max 5 product / 3 review images |
| ADMIN bootstrap | §0.11 — seed via migration; `POST /api/admin/users` cannot create ADMIN |
| Admin payments list | `GET /api/admin/payments` now includes `amount` |
| Signup token policy | Signup returns `token` + `user` (same shape as login) with optional re-login note |

---

## 5. Resolved gaps (previously missing, now in PRD)

The following were flagged in earlier versions of this index and are **now present** in the updated PRD:

| Previously missing | Now in PRD |
|--------------------|-----------|
| `wishlist` table | §5.11 `wishlist_items` |
| `contact_messages` table | §5.12 |
| OTP / password-reset table | §5.13 `password_reset_sessions` |
| `coupons` table | §5.14 |
| Coupon audit trail | §5.15 `order_coupon_usage` |
| `profile_image_url` | §5.1 `users` |
| `colors`, `available_sizes`, `specifications` | §5.2 `products` |
| `floor_sample_present`, `showroom_location_bay` | §5.2 `products` |
| `product_images` (multiple images) | §5.16 `product_images` |
| `review_images` | §5.16 `review_images` (should be §5.17) |
| `origin_hub`, `delivery_tracking_id` | §5.9 `deliveries` |
| `gateway_transaction_token`, `transaction_id` | §5.8 `payments` |

---

## 6. Implementation Status (backend code)

Only auth is implemented today. Path naming and response shapes also differ from the API doc.

| Status | Method | Doc path | Code path |
|--------|--------|----------|-----------|
| Implemented | `POST` | `/api/auth/signup` | `/api/auth/register` |
| Implemented | `POST` | `/api/auth/login` | `/api/auth/login` |
| Not implemented | — | Remaining **71 endpoints** | — |

**Schema in repo:** No SQL migrations or ORM models exist. The PRD schema lives only in `Furni_PRD.docx`. The auth controller uses a partial `users` table with column names (`id`, `password`) that differ from the PRD (`user_id`, `password_hash`).

**Frontend alignment gaps (not in API doc scope):**

| Area | API doc | Frontend today |
|------|---------|----------------|
| Signup path | `/api/auth/signup` | `/api/auth/register` |
| Contact form | `POST /api/contact` (requires `phone`) | Google Sheets script; no `phone` field |
| Cart sync | `product_id` / `quantity` | localStorage uses `id` / `qty` (mapping in §0.7) |

---

## 7. Recommended next steps

1. **Fix PRD schema gaps** — add items from §3 (rating, delivery_mode, refund fields, `is_active`, shipping rules, ENUM appendix).
2. **Fix PRD doc numbering** — renumber `review_images` to §5.17.
3. **Align naming** — standardize `review_text` vs `feedback` across PRD and API doc.
4. **Document auth policy in PRD** — customer-only signup, owner-provisioned staff, ADMIN bootstrap.
5. **Generate SQL migrations** from PRD §5 before implementing endpoints.
6. **Align auth in code** — rename `/register` → `/signup`; match field names and JWT claims (`user_id`, `role`).

---

*Last synced against `api_doc.md` (73 endpoints, §0–§0.11 conventions) and `Furni_PRD.docx` (17 schema tables). See [`api_doc.md`](./api_doc.md) for full request/response payloads.*
