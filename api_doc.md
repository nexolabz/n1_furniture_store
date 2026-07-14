# FURNI. Hybrid Platform – Extended Comprehensive API Specification

This master specification details every endpoint, method, request payload, and response format required for the omni-channel platform architecture, grouping them explicitly by user persona workflows.

**Authentication model:** Only customers self-register (`POST /api/auth/signup`). Store staff and delivery partners are created by the Store Owner (`POST /api/admin/users`) who shares login credentials with them. All roles sign in via `POST /api/auth/login`.

---

## 1. Persona: Customer Workflows (Online / Mobile Web Apps)

### 1.1 Authentication & Session Gateway

Handles customer self-registration, credential checks, and password resets.

> **Auth policy**
> - **Customers** are the only persona that may self-register via `POST /api/auth/signup`.
> - **Store staff, delivery partners, and admins** are provisioned by the Store Owner through `POST /api/admin/users`. They do not have a public registration flow.
> - All roles sign in through the same `POST /api/auth/login` endpoint using credentials issued by the platform (customers choose their own password at signup; staff receive login details from the owner).

#### `POST /api/auth/signup`

Registers a new **customer** account. This endpoint always creates users with the `CUSTOMER` role. Staff and admin accounts cannot be created through self-registration.

**Request Body (JSON):**

```json
{
  "full_name": "Arjun Mehta",
  "email": "arjun.mehta@university.edu",
  "password": "HashedSecurePassword567!",
  "phone": "+919876543210",
  "delivery_address": "42 Maple Street, Pune",
  "landmark": "Near Riverside University Gate",
  "pin_code": "411001"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Customer account registered successfully.",
  "user_id": 2045,
  "role": "CUSTOMER"
}
```

**Error Response (403 Forbidden):**

Returned if a `role` field is supplied or the email already belongs to a staff/admin account.

```json
{
  "message": "Self-registration is only available for customers. Staff accounts must be created by the store owner."
}
```

#### `POST /api/auth/login`

Validates user identity against stored credentials and returns a secure JWT signature token. Used by **customers, store staff, delivery partners, and admins**. Staff and internal users must use credentials provisioned by the Store Owner.

**Request Body (JSON):**

```json
{
  "email": "arjun.mehta@university.edu",
  "password": "HashedSecurePassword567!"
}
```

**Success Response (200 OK) — Customer:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDQ1LCJyb2xlIjoiQ1VTVE9NRVIifQ...",
  "user": {
    "user_id": 2045,
    "full_name": "Arjun Mehta",
    "role": "CUSTOMER"
  }
}
```

**Success Response (200 OK) — Store Staff:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MTIsInJvbGUiOiJTVG9SRV9TVEFGRSJ9...",
  "user": {
    "user_id": 412,
    "full_name": "Neha Singh",
    "role": "STORE_STAFF"
  }
}
```

#### `POST /api/auth/forgot-password`

Initiates a password reset for **customer accounts only**. Staff and delivery partners who forget their credentials must contact the Store Owner for a password reset via the admin panel.

**Request Body (JSON):**

```json
{
  "email": "arjun.mehta@university.edu",
  "phone": "+919876543210",
  "role": "CUSTOMER"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Verification OTP sent successfully to registered communication channels.",
  "session_transaction_id": "OTP-88301-2026"
}
```

#### `POST /api/auth/verify-otp`

Validates the temporal verification code against the active reset transaction to grant profile password modification permissions.

**Request Body (JSON):**

```json
{
  "session_transaction_id": "OTP-88301-2026",
  "otp_code": "569201",
  "new_password": "NewCompliantPassword999!"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Password updated successfully. Please re-authenticate via the login gateway."
}
```

---

### 1.2 User Profile & Lifecycle Management

Enables customers to monitor account data, retrieve delivery logs, and track performance changes.

#### `GET /api/customer/profile`

Fetches a user profile summary, including calculated order totals from database join queries.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "user_id": 2045,
  "full_name": "Arjun Mehta",
  "email": "arjun.mehta@university.edu",
  "phone": "+919876543210",
  "role": "CUSTOMER",
  "delivery_address": "42 Maple Street, Pune",
  "landmark": "Near Riverside University Gate",
  "pin_code": "411001",
  "profile_image_url": "https://assets.furni.in/profiles/user-2045.jpg",
  "created_at": "2026-03-01T08:30:00Z",
  "updated_at": "2026-07-14T12:00:00Z",
  "total_orders_placed": 14
}
```

#### `PATCH /api/customer/profile`

Modifies customer account fields inside the relational row matrix.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "full_name": "Arjun Mehta",
  "phone": "+919876543211",
  "delivery_address": "78 Market Road, Pune",
  "landmark": "Opposite Grand Plaza Mall",
  "pin_code": "411038",
  "profile_image_url": "https://assets.furni.in/profiles/user-2045-updated.jpg"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Profile specifications modified successfully."
}
```

---

### 1.3 Discovery & Catalog Systems

Provides access to products, structured design lines, and promotional landing pages.

#### `GET /api/home`

Fetches pre-sorted lists for the landing page dashboard viewports.

**Success Response (200 OK):**

```json
{
  "categories": ["living-room", "bedroom", "dining-room", "office", "outdoor", "kids"],
  "new_arrivals": [
    { "product_id": 101, "product_name": "Eco-Weave Armchair", "category": "living-room", "price": 18500.00, "rating": 4.90, "image_url": "https://assets.furni.in/p101.jpg" }
  ],
  "featured": [
    { "product_id": 88, "product_name": "Minimalist Oak Desk", "category": "office", "price": 24000.00, "rating": 4.75, "image_url": "https://assets.furni.in/p88.jpg" }
  ],
  "recommended": [
    { "product_id": 34, "product_name": "Modular Lounge Sectional", "category": "living-room", "price": 89000.00, "rating": 5.00, "image_url": "https://assets.furni.in/p34.jpg" }
  ],
  "best_selling": [
    { "product_id": 56, "product_name": "Solid Walnut Dining Table", "category": "dining-room", "price": 62000.00, "rating": 4.85, "image_url": "https://assets.furni.in/p56.jpg" }
  ]
}
```

#### `GET /api/categories`

Returns a list of active categories along with live item counts for catalog routing.

**Success Response (200 OK):**

```json
{
  "categories": [
    { "category_name": "living-room", "number_of_products": 142 },
    { "category_name": "bedroom", "number_of_products": 98 },
    { "category_name": "dining-room", "number_of_products": 64 },
    { "category_name": "office", "number_of_products": 45 },
    { "category_name": "outdoor", "number_of_products": 31 },
    { "category_name": "kids", "number_of_products": 22 }
  ]
}
```

#### `GET /api/products`

Retrieves products based on category layout definitions and sorting parameters, supporting paginated navigation.

**Query Parameters:**

| Parameter    | Type    | Description |
|-------------|---------|-------------|
| `category`  | String  | Query path matching target layouts |
| `price_min` | Decimal | Lower bounds query metric |
| `price_max` | Decimal | Upper bounds query metric |
| `rating_min`| Float   | Minimum performance metric parameter |
| `page`      | Integer | Target subset indicator (default: 1; 10 or 15 items per page) |

**Success Response (200 OK):**

```json
{
  "products": [
    {
      "product_id": 102,
      "product_name": "Urban Teak Sideboard",
      "category": "dining-room",
      "price": 34000.00,
      "rating": 4.60,
      "image_url": "https://assets.furni.in/p102.jpg",
      "is_online_only": false
    }
  ],
  "pagination_metadata": {
    "current_page": 1,
    "items_per_page": 15,
    "total_items": 42,
    "total_pages": 3
  }
}
```

#### `GET /api/products/search`

Queries catalog records across naming arrays and description fields.

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `q`      | String | User search term |

**Success Response (200 OK):**

```json
{
  "search_term": "Walnut Table",
  "results_count": 1,
  "matches": [
    {
      "product_id": 56,
      "product_name": "Solid Walnut Dining Table",
      "price": 62000.00,
      "image_url": "https://assets.furni.in/p56.jpg",
      "rating": 4.85
    }
  ]
}
```

#### `GET /api/products/:id`

Returns product technical data, layout dimensions, available stock variants, and customer review items.

**Success Response (200 OK):**

```json
{
  "product_id": 56,
  "product_name": "Solid Walnut Dining Table",
  "description": "Premium solid walnut wood construction with a matte finish protectant layer.",
  "price": 62000.00,
  "original_price": 70000.00,
  "discount_percentage": 11.43,
  "category": "dining-room",
  "stock_count": 14,
  "is_online_only": false,
  "rating": 4.85,
  "specifications": {
    "timber_type": "American Black Walnut",
    "finish": "Natural Polyurethane Matte",
    "seating_capacity": "6 Seater"
  },
  "colors": ["Natural Walnut", "Dark Charcoal Stain"],
  "available_sizes": ["180cm x 90cm x 75cm", "210cm x 100cm x 75cm"],
  "estimated_delivery_date": "2026-07-22",
  "features": "Scratched Surface Resilience\nSolid Core Cross Beams",
  "dimensions": "180cm x 90cm x 75cm",
  "images": [
    "https://assets.furni.in/p56-main.jpg",
    "https://assets.furni.in/p56-angle.jpg"
  ],
  "reviews": [
    { "review_id": 401, "user_name": "Priya N.", "rating": 5, "feedback": "Stunning craftsmanship worth every rupee." }
  ],
  "related_furniture": [
    { "product_id": 57, "product_name": "Walnut Dining Bench", "category": "dining-room", "price": 18000.00, "rating": 4.50, "image_url": "https://assets.furni.in/p57.jpg" }
  ]
}
```

#### `GET /api/collections`

Returns current design trends and matching theme collections configured by store administration.

**Success Response (200 OK):**

```json
{
  "collections": [
    { "collection_id": 1, "collection_name": "Bedroom Collection", "associated_category": "bedroom" },
    { "collection_id": 2, "collection_name": "Study Room Collection", "associated_category": "office" },
    { "collection_id": 3, "collection_name": "Living Room Collection", "associated_category": "living-room" },
    { "collection_id": 4, "collection_name": "Dining Room Collection", "associated_category": "dining-room" },
    { "collection_id": 5, "collection_name": "Office Furniture", "associated_category": "office" }
  ]
}
```

#### `GET /api/collections/:id/products`

Returns all products mapped to a specific design collection via the `product_collection_mapping` junction table.

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Collection ID |

**Success Response (200 OK):**

```json
{
  "collection_id": 1,
  "collection_name": "Bedroom Collection",
  "associated_category": "bedroom",
  "products": [
    {
      "product_id": 34,
      "product_name": "Modular Lounge Sectional",
      "category": "living-room",
      "price": 89000.00,
      "rating": 5.00,
      "image_url": "https://assets.furni.in/p34.jpg"
    }
  ]
}
```

#### `GET /api/products/sale`

Returns active clearance markdowns, price reductions, and markdown values.

**Success Response (200 OK):**

```json
{
  "sale_event_title": "Monsoon Clearance Drive",
  "discounted_products": [
    {
      "product_id": 78,
      "product_name": "Ergonomic Mesh Task Chair",
      "discount_percentage": 20.00,
      "old_price": 15000.00,
      "new_price": 12000.00,
      "rating": 4.40,
      "image_url": "https://assets.furni.in/p78.jpg"
    }
  ]
}
```

---

### 1.4 Engagement & Retention Matrix

Handles persistent cart items, active user wishlists, and item feedback loops.

#### `GET /api/cart`

Fetches a user's active cart rows, running tax calculations on the backend based on the product state mapping parameters.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "cart_items": [
    { "cart_item_id": 901, "product_id": 56, "product_name": "Solid Walnut Dining Table", "quantity": 1, "unit_price": 62000.00 }
  ],
  "financial_summary": {
    "total_price_subtotal": 62000.00,
    "discount_applied": 0.00,
    "gst_amount_18": 11160.00,
    "delivery_charges": 1500.00,
    "final_amount_grand_total": 74660.00
  }
}
```

#### `POST /api/cart`

Saves new inventory selection lines into the user's persistent database profile table when syncing from client-side state hooks.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "product_id": 56,
  "quantity": 1
}
```

**Success Response (200 OK):**

```json
{
  "message": "Product successfully committed to database cart state infrastructure."
}
```

#### `POST /api/cart/sync`

Bulk-syncs client-side localStorage cart items into the database-backed cart at checkout start.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "cart_items": [
    { "product_id": 56, "quantity": 1 },
    { "product_id": 102, "quantity": 2 }
  ]
}
```

**Success Response (200 OK):**

```json
{
  "message": "Cart synchronized to database successfully.",
  "synced_item_count": 2
}
```

#### `PATCH /api/cart`

Modifies item quantity constraints for active cart lines in the database.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "cart_item_id": 901,
  "quantity": 2
}
```

**Success Response (200 OK):**

```json
{
  "message": "Cart item volume successfully updated."
}
```

#### `DELETE /api/cart`

Removes selected item line rows from the cart table.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "cart_item_id": 901
}
```

**Success Response (200 OK):**

```json
{
  "message": "Item sequence dropped from user cart records."
}
```

#### `GET /api/wishlist`

Fetches the saved item mapping array linked to the user's profile token reference index.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "wishlist": [
    { "product_id": 12, "product_name": "Plush Velvet Ottoman", "price": 8500.00, "product_image": "https://assets.furni.in/p12.jpg" }
  ]
}
```

#### `POST /api/wishlist`

Inserts a target product reference into the customer's permanent wishlist table line entries.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "product_id": 12
}
```

**Success Response (200 OK):**

```json
{
  "message": "Product mapped to customer account wishlist array successfully."
}
```

#### `DELETE /api/wishlist`

Removes product linkages from the user's saved items layout matrix.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "product_id": 12
}
```

**Success Response (200 OK):**

```json
{
  "message": "Target item reference deleted from user wishlist index."
}
```

#### `GET /api/reviews/:product_id`

Retrieves submitted feedback parameters and aggregate scores for a specific catalog asset index.

**Success Response (200 OK):**

```json
{
  "product_id": 56,
  "reviews": [
    { "review_id": 401, "user_id": 1054, "rating": 5, "feedback": "Stunning craftsmanship worth every rupee.", "images": ["https://assets.furni.in/review-images/r401.jpg"] }
  ]
}
```

#### `POST /api/reviews`

Inserts post-purchase consumer feedback metrics directly into database log tables.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "product_id": 56,
  "rating": 5,
  "feedback": "Stunning craftsmanship worth every rupee.",
  "images": ["https://assets.furni.in/review-images/r401.jpg"]
}
```

**Success Response (201 Created):**

```json
{
  "message": "Customer product review captured and documented successfully."
}
```

#### `PATCH /api/reviews`

Modifies existing feedback entry elements using user token validations.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "review_id": 401,
  "rating": 4,
  "feedback": "Beautiful work, though delivery tracking was slightly delayed.",
  "images": ["https://assets.furni.in/review-images/r401.jpg"]
}
```

**Success Response (200 OK):**

```json
{
  "message": "Target review content successfully modified."
}
```

#### `DELETE /api/reviews`

Removes a specific review entry row matching the authenticated author token.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "review_id": 401
}
```

**Success Response (200 OK):**

```json
{
  "message": "Review records deleted from public catalog access matrices."
}
```

---

### 1.5 Transactions, Checkout Pipelines & Delivery Fulfillment

Converts active shopping cart lines into verified transactions and generates logistical delivery items.

#### `POST /api/checkout/summary`

Calculates real-time financial totals at checkout, checking active inventory blocks and promo code validity before order commitment.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "coupon_code": "SAVE10",
  "delivery_address": "42 Maple Street, Pune",
  "payment_method": "UPI"
}
```

**Success Response (200 OK):**

```json
{
  "checkout_validation": {
    "coupon_status": "VALID",
    "stock_availability": "ALL_ITEMS_IN_STOCK"
  },
  "order_summary": {
    "total_price_subtotal": 62000.00,
    "discount_applied_markdown": 6200.00,
    "gst_tax_calculated_18": 10044.00,
    "delivery_charges": 0.00,
    "final_amount_liability": 65844.00
  }
}
```

#### `POST /api/orders`

Transforms cart items into an official orders entry with a `PENDING` status, capturing cost snapshots to create immutable historical records.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "delivery_address": "42 Maple Street, Pune",
  "landmark": "Near Riverside University Gate",
  "pin_code": "411001",
  "payment_method": "UPI",
  "coupon_code": "SAVE10"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Order processing checkpoint established.",
  "order_id": 99201,
  "grand_total": 65844.00,
  "order_status": "PENDING"
}
```

#### `POST /api/orders/:id/delivery-mode`

Sets the customer's fulfillment preference for an existing pending order.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Order ID |

**Request Body (JSON):**

```json
{
  "delivery_mode": "HOME_DELIVERY"
}
```

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "delivery_mode": "HOME_DELIVERY",
  "message": "Fulfillment mode updated successfully."
}
```

#### `POST /api/payments/process`

Validates external transaction tokens against internal metrics to update order workflows to `CONFIRMED`.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "order_id": 99201,
  "payment_method": "UPI",
  "amount": 65844.00,
  "gateway_transaction_token": "TXN-UPI-REF998271"
}
```

**Success Response (200 OK):**

```json
{
  "payment_status": "COMPLETED",
  "transaction_id": "FURNI-TXN-773012",
  "updated_order_status": "CONFIRMED"
}
```

#### `GET /api/payments/:order_id`

Retrieves payment status and audit details for a specific order.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Path Parameters:**

| Parameter  | Type    | Description |
|------------|---------|-------------|
| `order_id` | Integer | Order ID |

**Success Response (200 OK):**

```json
{
  "payment_id": 5501,
  "order_id": 99201,
  "payment_method": "UPI",
  "payment_status": "COMPLETED",
  "amount": 65844.00,
  "transaction_id": "FURNI-TXN-773012",
  "updated_at": "2026-07-14T16:50:00Z"
}
```

#### `GET /api/orders/history`

Retrieves past order records, item sub-lists, and tracking indicators for the active user account.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "order_history": [
    {
      "order_id": 99201,
      "created_at": "2026-07-14T16:45:00Z",
      "total_amount": 65844.00,
      "payment_status": "COMPLETED",
      "order_status": "CONFIRMED",
      "delivery_status": "UNASSIGNED",
      "estimated_delivery_date": "2026-07-22",
      "ordered_products": [
        { "product_id": 56, "product_name": "Solid Walnut Dining Table", "quantity": 1, "price_snapshot": 62000.00 }
      ]
    }
  ]
}
```

#### `GET /api/orders/:id`

Fetches full detail for a single order including line items and payment summary.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Order ID |

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "created_at": "2026-07-14T16:45:00Z",
  "order_placement_channel": "ONLINE",
  "subtotal_amount": 62000.00,
  "discount_applied": 6200.00,
  "gst_tax_amount": 10044.00,
  "grand_total": 65844.00,
  "order_status": "CONFIRMED",
  "payment_status": "COMPLETED",
  "delivery_status": "UNASSIGNED",
  "delivery_mode": "HOME_DELIVERY",
  "ordered_products": [
    { "product_id": 56, "product_name": "Solid Walnut Dining Table", "quantity": 1, "price_snapshot": 62000.00 }
  ]
}
```

#### `PATCH /api/orders/cancel`

Updates an order status to `CANCELLED` if it hasn't entered logistical delivery distribution pipelines.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "order_id": 99201
}
```

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "order_status": "CANCELLED",
  "message": "Order transaction successfully revoked. Refund pipeline initialized."
}
```

#### `GET /api/orders/:id/refund-status`

Returns the current refund pipeline status for a cancelled order.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Order ID |

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "refund_status": "INITIATED",
  "refund_amount": 65844.00,
  "estimated_completion": "2026-07-21T00:00:00Z"
}
```

#### `GET /api/deliveries/track/:order_id`

Provides real-time updates on active delivery routes and fulfillment statuses.

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "delivery_tracking_id": "DLV-88201",
  "delivery_status": "SHIPPED",
  "origin_hub": "Central Distribution Warehouse - Hub 1",
  "destination_address": "42 Maple Street, Pune, Pin 411001",
  "last_updated_timestamp": "2026-07-14T15:22:00Z"
}
```

---

### 1.6 External Communication Channels

Handles public messaging from unauthenticated context forms.

#### `POST /api/contact`

Logs incoming support requests, user messages, and contact forms into database tables.

**Request Body (JSON):**

```json
{
  "full_name": "Vikram Rao",
  "email": "vikram.rao@example-corp.com",
  "phone": "+919922110033",
  "message": "Interested in standard bulk pricing options for university office setups."
}
```

**Success Response (200 OK):**

```json
{
  "message": "Contact feedback request successfully logged. A support ticket has been generated."
}
```

---

## 2. Persona: In-Store Sales Executive (Showroom Terminal View)

### 2.0 Staff Account Provisioning & Login

Store staff **do not self-register**. The Store Owner creates staff accounts via `POST /api/admin/users` and shares the login credentials (email + password) with each staff member directly. Staff then sign in using `POST /api/auth/login`.

**Typical staff login flow:**

1. Owner creates account → `POST /api/admin/users` with `role: "STORE_STAFF"`
2. Owner shares email and password with the staff member offline
3. Staff signs in at the showroom terminal → `POST /api/auth/login`
4. Staff uses the returned JWT for all `/api/staff/*` endpoints

### 2.1 Floor Inventory Inquiries & Cross-Channel Sync

Allows showroom staff to check global warehouse stock levels and verify display item availability for walk-in customers.

#### `GET /api/staff/products/lookup`

Provides store terminals with full inventory tracking details, highlighting whether items are showroom floor samples or online-only variants.

**Headers:**

- `Authorization: Bearer <STAFF_JWT_TOKEN>`

**Query Parameters:**

| Parameter            | Type    | Description |
|---------------------|---------|-------------|
| `q`                 | String  | Search term (e.g. `Walnut`) |
| `include_restricted`| Boolean | Include restricted inventory (e.g. `true`) |

**Success Response (200 OK):**

```json
{
  "lookup_results": [
    {
      "product_id": 56,
      "product_name": "Solid Walnut Dining Table",
      "stock_count": 14,
      "is_online_only": false,
      "floor_sample_present": true,
      "showroom_location_bay": "Bay-D3"
    },
    {
      "product_id": 99,
      "product_name": "Extended Walnut Console Cabinet",
      "stock_count": 3,
      "is_online_only": true,
      "floor_sample_present": false,
      "showroom_location_bay": "N/A - WAREHOUSE DIRECT"
    }
  ]
}
```

---

### 2.2 Assisted Customer Checkout Management

Enables staff members to compile items and complete orders directly on the store system on behalf of walk-in customers.

#### `POST /api/staff/orders/assisted-checkout`

Processes point-of-sale transactions by assigning the client ID and adding a `booked_by_staff_id` parameter to the order entry using the `IN_STORE` channel flag.

**Headers:**

- `Authorization: Bearer <STAFF_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "customer_details": {
    "full_name": "Maya Desai",
    "phone": "9822334455",
    "email": "maya.desai@example.com"
  },
  "checkout_items": [
    { "product_id": 56, "quantity": 1 },
    { "product_id": 99, "quantity": 1 }
  ],
  "order_placement_channel": "IN_STORE",
  "payment_method": "CREDIT_CARD",
  "delivery_mode": "SHOWROOM_PICKUP",
  "coupon_code": "SAVE10"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Assisted showroom transaction completed successfully.",
  "invoice_ledger_data": {
    "order_id": 99202,
    "booked_by_staff_id": 412,
    "financials": {
      "subtotal_amount": 147000.00,
      "discount_applied": 14700.00,
      "gst_tax_calculated_18": 23814.00,
      "grand_total": 156114.00
    },
    "payment_status": "COMPLETED",
    "delivery_status": "SHOWROOM_PICKUP"
  }
}
```

#### `GET /api/staff/orders/:id/invoice`

Generates a printable showroom invoice with base price, discount, and GST breakdown.

**Headers:**

- `Authorization: Bearer <STAFF_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Order ID |

**Success Response (200 OK):**

```json
{
  "invoice_number": "INV-99202-2026",
  "order_id": 99202,
  "booked_by_staff_id": 412,
  "customer_name": "Maya Desai",
  "order_placement_channel": "IN_STORE",
  "line_items": [
    { "product_name": "Solid Walnut Dining Table", "quantity": 1, "unit_price": 62000.00, "line_total": 62000.00 },
    { "product_name": "Extended Walnut Console Cabinet", "quantity": 1, "unit_price": 85000.00, "line_total": 85000.00 }
  ],
  "financials": {
    "subtotal_amount": 147000.00,
    "discount_applied": 14700.00,
    "gst_tax_calculated_18": 23814.00,
    "grand_total": 156114.00
  },
  "payment_method": "CREDIT_CARD",
  "payment_status": "COMPLETED",
  "issued_at": "2026-07-14T16:30:00Z"
}
```

---

## 3. Persona: Delivery Partner Workflows

Delivery partners are provisioned by the Store Owner via `POST /api/admin/users` with `role: "DELIVERY_PARTNER"`. They sign in using credentials shared by the owner — they do not self-register.

### 3.1 Fulfillment Routing Operations

Provides regional delivery personnel with access to active delivery locations and dispatch routes.

#### `GET /api/delivery/assignments`

Lists pending and active delivery tasks assigned to the authenticated carrier profile.

**Headers:**

- `Authorization: Bearer <DELIVERY_JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "assigned_shipments": [
    {
      "delivery_id": 88201,
      "order_id": 99201,
      "customer_name": "Arjun Mehta",
      "phone": "+919876543210",
      "delivery_address": "42 Maple Street, Pune",
      "landmark": "Near Riverside University Gate",
      "pin_code": "411001",
      "delivery_status": "SHIPPED"
    }
  ]
}
```

#### `PATCH /api/delivery/status`

Updates shipment progression states within the logistics tracking system.

**Headers:**

- `Authorization: Bearer <DELIVERY_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "delivery_id": 88201,
  "delivery_status": "DELIVERED"
}
```

**Success Response (200 OK):**

```json
{
  "delivery_id": 88201,
  "delivery_status": "DELIVERED",
  "actual_delivery_timestamp": "2026-07-14T17:00:00Z",
  "message": "Fulfillment documentation successfully finalized."
}
```

---

## 4. Persona: Store Owner / Admin Workflows

### 4.1 Executive Insights Analytics

Provides high-level performance metrics across all sales channels.

#### `GET /api/admin/dashboard/metrics`

Aggregates sales performance data across both online pipelines and physical store terminals.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "analytics_snapshot": {
    "total_orders_processed": 14502,
    "total_active_customers": 8904,
    "total_catalog_products": 540,
    "gross_revenue_inr": 48902500.00
  },
  "channel_revenue_split": {
    "digital_online_channel_inr": 29400000.00,
    "in_store_showroom_channel_inr": 19502500.00
  }
}
```

---

### 4.2 Catalog Governance

Enables administrators to manage product items, adjust pricing structures, and set visibility constraints.

#### `POST /api/admin/products`

Inserts a new product asset directly into the master database catalog table.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "product_name": "Scandi Oak Bookshelf",
  "description": "Minimalist five-tier solid oak bookshelf.",
  "price": 28500.00,
  "original_price": 32000.00,
  "category": "office",
  "is_online_only": true,
  "stock_count": 25,
  "dimensions": "90cm x 30cm x 180cm",
  "image_url": "https://assets.furni.in/bookshelf.jpg"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Product asset successfully added to inventory database.",
  "product_id": 541
}
```

#### `GET /api/admin/products/:id`

Retrieves full product detail for admin catalog management.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Product ID |

**Success Response (200 OK):**

```json
{
  "product_id": 541,
  "product_name": "Scandi Oak Bookshelf",
  "description": "Minimalist five-tier solid oak bookshelf.",
  "price": 28500.00,
  "original_price": 32000.00,
  "category": "office",
  "is_new": true,
  "is_online_only": true,
  "stock_count": 25,
  "rating": 5.00,
  "dimensions": "90cm x 30cm x 180cm",
  "image_url": "https://assets.furni.in/bookshelf.jpg",
  "images": [
    { "image_id": 1, "image_url": "https://assets.furni.in/bookshelf.jpg", "is_primary": true, "sort_order": 0 },
    { "image_id": 2, "image_url": "https://assets.furni.in/bookshelf-angle.jpg", "is_primary": false, "sort_order": 1 }
  ],
  "created_at": "2026-07-01T10:00:00Z",
  "updated_at": "2026-07-14T12:00:00Z"
}
```

#### `PATCH /api/admin/products/:id`

Updates product specifications, costs, and current warehouse counts.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "price": 26999.00,
  "stock_count": 40,
  "is_online_only": false
}
```

**Success Response (200 OK):**

```json
{
  "message": "Catalog product settings adjusted successfully."
}
```

#### `DELETE /api/admin/products/:id`

Removes items from active catalogs while maintaining historical record tracking.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "message": "Product removed from catalog views. Historical logs preserved."
}
```

#### `POST /api/admin/products/:id/images`

Adds an image to a product's gallery via the `product_images` table.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Product ID |

**Request Body (JSON):**

```json
{
  "image_url": "https://assets.furni.in/bookshelf-angle.jpg",
  "is_primary": false,
  "sort_order": 1
}
```

**Success Response (201 Created):**

```json
{
  "message": "Product image added successfully.",
  "image_id": 2,
  "product_id": 541
}
```

#### `DELETE /api/admin/products/:id/images/:image_id`

Removes an image from a product's gallery.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter  | Type    | Description |
|------------|---------|-------------|
| `id`       | Integer | Product ID |
| `image_id` | Integer | Image ID |

**Success Response (200 OK):**

```json
{
  "message": "Product image removed successfully."
}
```

---

### 4.3 Collection Governance

Enables administrators to create design collections and manage product-to-collection mappings.

#### `POST /api/admin/collections`

Creates a new curated design collection.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "collection_name": "Mid-Century Luxe",
  "associated_category": "living-room"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Collection created successfully.",
  "collection_id": 6
}
```

#### `PATCH /api/admin/collections/:id`

Updates collection name or associated category.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Collection ID |

**Request Body (JSON):**

```json
{
  "collection_name": "Mid-Century Luxe Edition",
  "associated_category": "bedroom"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Collection updated successfully."
}
```

#### `DELETE /api/admin/collections/:id`

Removes a collection and its product mappings.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Collection ID |

**Success Response (200 OK):**

```json
{
  "message": "Collection removed successfully."
}
```

#### `POST /api/admin/collections/:id/products`

Assigns a product to a collection.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Collection ID |

**Request Body (JSON):**

```json
{
  "product_id": 34
}
```

**Success Response (201 Created):**

```json
{
  "message": "Product assigned to collection successfully.",
  "collection_id": 1,
  "product_id": 34
}
```

#### `DELETE /api/admin/collections/:id/products/:product_id`

Removes a product from a collection.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter    | Type    | Description |
|-------------|---------|-------------|
| `id`         | Integer | Collection ID |
| `product_id` | Integer | Product ID |

**Success Response (200 OK):**

```json
{
  "message": "Product removed from collection successfully."
}
```

---

### 4.4 Coupon & Promotion Management

Enables administrators to create and manage discount campaigns such as SAVE10.

#### `GET /api/admin/coupons`

Lists all promo codes and their active status.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `active` | Boolean | Filter by active status (e.g. `true`) |

**Success Response (200 OK):**

```json
{
  "coupons": [
    {
      "coupon_id": 1,
      "coupon_code": "SAVE10",
      "discount_percentage": 10.00,
      "is_active": true,
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T23:59:59Z"
    }
  ]
}
```

#### `POST /api/admin/coupons`

Creates a new promotional discount code.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "coupon_code": "SAVE10",
  "discount_percentage": 10.00,
  "valid_from": "2026-01-01T00:00:00Z",
  "valid_until": "2026-12-31T23:59:59Z"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Coupon created successfully.",
  "coupon_id": 1
}
```

#### `PATCH /api/admin/coupons/:id`

Updates discount rules, validity window, or active status.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Coupon ID |

**Request Body (JSON):**

```json
{
  "discount_percentage": 15.00,
  "is_active": false
}
```

**Success Response (200 OK):**

```json
{
  "message": "Coupon updated successfully."
}
```

#### `DELETE /api/admin/coupons/:id`

Deactivates and removes a promo code from active campaigns.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Coupon ID |

**Success Response (200 OK):**

```json
{
  "message": "Coupon deactivated successfully."
}
```

---

### 4.5 Order Operations Management

Allows staff to track transaction statuses and manage logistics workflows.

#### `GET /api/admin/orders`

Filters the global transaction ledger based on running workflow parameters.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `status` | String | Filter by order status (e.g. `PENDING`) |

**Success Response (200 OK):**

```json
{
  "filtered_orders": [
    {
      "order_id": 99201,
      "user_id": 2045,
      "order_placement_channel": "ONLINE",
      "grand_total": 65844.00,
      "order_status": "PENDING"
    }
  ]
}
```

#### `GET /api/admin/orders/:id`

Retrieves full order detail including line items, payment, delivery status, and applied coupon audit data from `order_coupon_usage`.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Order ID |

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "user_id": 2045,
  "booked_by_staff_id": null,
  "order_placement_channel": "ONLINE",
  "subtotal_amount": 62000.00,
  "discount_applied": 6200.00,
  "gst_tax_amount": 10044.00,
  "grand_total": 65844.00,
  "order_status": "PENDING",
  "payment_status": "PENDING",
  "delivery_status": "UNASSIGNED",
  "created_at": "2026-07-14T16:45:00Z",
  "coupon_applied": {
    "coupon_id": 1,
    "coupon_code": "SAVE10",
    "discount_percentage": 10.00,
    "discount_amount": 6200.00,
    "applied_at": "2026-07-14T16:45:00Z"
  },
  "ordered_products": [
    { "product_id": 56, "product_name": "Solid Walnut Dining Table", "quantity": 1, "price_snapshot": 62000.00 }
  ]
}
```

#### `PATCH /api/admin/orders/dispatch`

Updates order logistics status values and coordinates driver assignment workflows.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "order_id": 99201,
  "order_status": "SHIPPED",
  "assigned_driver_user_id": 884
}
```

**Success Response (200 OK):**

```json
{
  "message": "Order successfully marked as dispatched. Delivery tracking initialized.",
  "delivery_id": 88201
}
```

#### `PATCH /api/admin/orders/refund`

Initiates or updates refund processing for a cancelled order.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "order_id": 99201,
  "refund_status": "COMPLETED",
  "refund_amount": 65844.00
}
```

**Success Response (200 OK):**

```json
{
  "order_id": 99201,
  "refund_status": "COMPLETED",
  "message": "Refund processed successfully."
}
```

---

### 4.6 Fulfillment & Payment Auditing

Provides admin visibility into delivery pipelines and payment records.

#### `GET /api/admin/deliveries`

Lists all delivery records for logistics monitoring.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `status` | String | Filter by delivery status (e.g. `SHIPPED`) |

**Success Response (200 OK):**

```json
{
  "deliveries": [
    {
      "delivery_id": 88201,
      "order_id": 99201,
      "delivery_status": "SHIPPED",
      "assigned_driver_user_id": 884,
      "actual_delivery": null
    }
  ]
}
```

#### `GET /api/admin/payments`

Provides financial audit data across all order payments.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `status` | String | Filter by payment status (e.g. `COMPLETED`) |

**Success Response (200 OK):**

```json
{
  "payments": [
    {
      "payment_id": 5501,
      "order_id": 99201,
      "payment_method": "UPI",
      "payment_status": "COMPLETED",
      "updated_at": "2026-07-14T16:50:00Z"
    }
  ]
}
```

---

### 4.7 Staff & User Management

Allows the Store Owner to provision staff accounts, issue login credentials, and manage internal roles. Staff and delivery partners are onboarded exclusively through this section — they cannot use the public signup endpoint.

#### `GET /api/admin/users`

Retrieves system user logs based on role type permissions.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `role`   | String | Filter by role (e.g. `STORE_STAFF`) |

**Success Response (200 OK):**

```json
{
  "users": [
    { "user_id": 412, "full_name": "Neha Singh", "email": "neha.singh@furni.in", "role": "STORE_STAFF", "created_at": "2025-09-10T11:00:00Z" }
  ]
}
```

#### `POST /api/admin/users`

Creates a staff or delivery partner account on behalf of the Store Owner. The owner sets the initial password and shares the login credentials with the staff member directly. Staff use these credentials to sign in via `POST /api/auth/login` — they do not self-register.

**Allowed roles:** `STORE_STAFF`, `DELIVERY_PARTNER`

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "full_name": "Karan Patel",
  "email": "karan.patel@furni.in",
  "password": "StaffSecurePass441!",
  "phone": "+919988776655",
  "role": "STORE_STAFF"
}
```

**Success Response (201 Created):**

```json
{
  "message": "Staff account created successfully. Share these login credentials with the staff member.",
  "user_id": 415,
  "login_credentials": {
    "email": "karan.patel@furni.in",
    "password": "StaffSecurePass441!",
    "role": "STORE_STAFF"
  }
}
```

#### `PATCH /api/admin/users/:id`

Modifies staff profile details, resets passwords, or updates role assignments. Use this when a staff member forgets their password — the owner resets it here and shares the new credentials.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Request Body (JSON):**

```json
{
  "password": "NewStaffPassword552!",
  "role": "STORE_STAFF"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Staff account updated successfully. Share updated credentials if password was changed."
}
```

#### `DELETE /api/admin/users/:id`

Deactivates a staff, delivery partner, or customer account.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | User ID |

**Success Response (200 OK):**

```json
{
  "message": "User account deactivated successfully."
}
```

---

### 4.8 Content Review Moderation

Handles administrative management of user-submitted product reviews.

#### `GET /api/admin/reviews`

Retrieves a comprehensive list of all product reviews across categories to identify and manage low-quality submissions.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "all_user_reviews": [
    { "review_id": 401, "product_id": 56, "user_id": 1054, "rating": 5, "feedback": "Spam message context text template." }
  ]
}
```

#### `DELETE /api/admin/reviews/:id`

Removes targeted review entries from public viewports to handle spam or duplicate entries.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "message": "Review entry removed from public catalog access matrices."
}
```

---

### 4.9 Contact Message Management

Allows the Store Owner to view and manage inbound contact form submissions stored in the `contact_messages` table.

#### `GET /api/admin/contact`

Lists all contact form submissions and support tickets.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Query Parameters:**

| Parameter | Type   | Description |
|----------|--------|-------------|
| `status` | String | Filter by status (e.g. `OPEN`, `IN_PROGRESS`, `RESOLVED`) |

**Success Response (200 OK):**

```json
{
  "contact_messages": [
    {
      "contact_id": 301,
      "full_name": "Vikram Rao",
      "email": "vikram.rao@example-corp.com",
      "phone": "+919922110033",
      "message": "Interested in standard bulk pricing options for university office setups.",
      "status": "OPEN",
      "created_at": "2026-07-14T14:00:00Z"
    }
  ]
}
```

#### `PATCH /api/admin/contact/:id`

Updates the status of a contact message or support ticket.

**Headers:**

- `Authorization: Bearer <ADMIN_JWT_TOKEN>`

**Path Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `id`      | Integer | Contact message ID |

**Request Body (JSON):**

```json
{
  "status": "RESOLVED"
}
```

**Success Response (200 OK):**

```json
{
  "contact_id": 301,
  "status": "RESOLVED",
  "message": "Contact message status updated successfully."
}
```
