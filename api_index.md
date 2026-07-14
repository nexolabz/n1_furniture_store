# FURNI. API Index

Quick-reference index for all endpoints documented in [`api_doc.md`](./api_doc.md), cross-checked against the PRD schema and functional requirements in [`Furni_PRD.docx`](./Furni_PRD.docx).

**Auth model:** Only customers self-register. Store Owner provisions staff and delivery partners via admin APIs and shares login credentials with them.

| Metric | Count |
|--------|------:|
| Endpoints in `api_doc.md` | **72** |
| Endpoints implemented in backend | **2** |
| Tables defined in PRD schema (§5) | **17** |
| PRD schema gaps vs API doc | **8 items** |
| API doc gaps vs PRD schema | **0 items** |

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
| `GET` | `/api/products/:id` | Product detail, reviews, related items |
| `GET` | `/api/collections` | Design theme collections |
| `GET` | `/api/collections/:id/products` | Products within a collection |
| `GET` | `/api/products/sale` | Active sale / discounted products |

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

### 1.7 Store Owner / Admin (30)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/admin/dashboard/metrics` | Cross-channel analytics snapshot |
| `POST` | `/api/admin/products` | Create product |
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

> **Total:** 6 + 8 + 12 + 11 + 3 + 2 + 30 = **72 endpoints**

---

## 2. PRD Schema Coverage (updated)

The PRD now defines **17 tables** (§5.1–§5.17). Two tables share the number **5.16** in the doc — `review_images` should be renumbered to **5.17**.

| PRD Table | API coverage | Status |
|-----------|-------------|--------|
| `users` | Auth, profile, admin user CRUD | Aligned |
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
| 6 | `deliveries.delivery_mode` | Staff assisted-checkout response | `delivery_mode ENUM` on `deliveries` |
| 7 | `payments.amount` | `GET /api/payments/:order_id` returns `amount` | `amount DECIMAL(10,2) NOT NULL` on `payments` |
| 8 | Auth provisioning policy | Customer-only signup, owner creates staff | Add to PRD §4 or new §6 — not a table, but a business rule gap |

### PRD doc issues (non-schema)

| Issue | Detail |
|-------|--------|
| Duplicate table number | Both `product_images` and `review_images` are labelled **§5.16** |
| Missing UNIQUE constraint | `wishlist_items` should have `UNIQUE (user_id, product_id)` |
| Field naming mismatch | PRD `review_text` vs API `feedback` — pick one |
| ENUM values undefined | `role`, `order_status`, `delivery_status`, `payment_method`, `payment_status` not enumerated in PRD |

---

## 4. Gaps — API doc missing items

All PRD-backed API gaps have been resolved. No outstanding API doc gaps vs PRD schema.

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

Only auth is implemented today. Path naming also differs from the API doc.

| Status | Method | Doc path | Code path |
|--------|--------|----------|-----------|
| Implemented | `POST` | `/api/auth/signup` | `/api/auth/register` |
| Implemented | `POST` | `/api/auth/login` | `/api/auth/login` |
| Not implemented | — | Remaining **70 endpoints** | — |

**Schema in repo:** No SQL migrations or ORM models exist. The PRD schema lives only in `Furni_PRD.docx`. The auth controller uses a partial `users` table with column names (`id`, `password`) that differ from the PRD (`user_id`, `password_hash`).

---

## 7. Recommended next steps

1. **Fix PRD schema gaps** — add `rating` back to `products`, add `delivery_mode` + address snapshot + refund fields to `orders`, add `assigned_driver_user_id` to `deliveries`, add `amount` to `payments`.
2. **Fix PRD doc numbering** — renumber `review_images` to §5.17.
3. **Align naming** — standardize `review_text` vs `feedback` across PRD and API doc.
4. **Document auth policy in PRD** — customer-only signup, owner-provisioned staff.
5. **Generate SQL migrations** from PRD §5 before implementing endpoints.
6. **Align auth path in code** — `signup` vs `register`.

---

*Last synced against `api_doc.md` (72 endpoints) and `Furni_PRD.docx` (17 schema tables). See [`api_doc.md`](./api_doc.md) for full request/response payloads.*
