use furniture_store;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(100) NOT NULL,

    role ENUM(
        'SUPER_ADMIN',
        'STORE_OWNER',
        'STORE_STAFF',
        'CUSTOMER'
    ) NOT NULL DEFAULT 'CUSTOMER',

    phone DECIMAL(10,0),

    delivery_address VARCHAR(200),

    profile_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    landmark VARCHAR(100),

    pin_code VARCHAR(10),

    is_active BOOLEAN DEFAULT TRUE
);

desc users;

ALTER TABLE users
ADD COLUMN landmark VARCHAR(100) NULL,
ADD COLUMN pin_code VARCHAR(10) NULL,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE users MODIFY COLUMN role ENUM('SUPER_ADMIN', 'STORE_OWNER', 'STORE_STAFF', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';



INSERT INTO users (full_name,email,password,role) VALUES ('Super Admin','admin@gmail.com','Admin@10','SUPER_ADMIN');

DELETE FROM users;

UPDATE users SET delievery_address='Yagnesh@10' WHERE id=13;

SELECT* FROM users;
desc users;

SET SQL_SAFE_UPDATES = 0;









CREATE TABLE products (
		product_id INT primary key auto_increment, 
        product_name VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL, 
        original_price DECIMAL(10,2) NOT NULL,
        category ENUM('living_room','bedroom','dinning_room','office','outdoor','kids') NOT NULL,
        is_new BOOLEAN NOT NULL DEFAULT TRUE,
        is_online_only BOOLEAN NOT NULL default false,
        specifications JSON ,
        colors JSON,
        available_sizes JSON,
        floor_sample_present boolean NOT NULL DEFAULT FALSE,
        showroom_location_bay VARCHAR(50),
        features TEXT,
        dimensions VARCHAR(100),
        stock_count INT NOT NULL DEFAULT 0,
        rating DECIMAL(3,2) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
);


CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,
    booked_by_staff_id INT NULL,

    order_placement_channel ENUM('ONLINE', 'IN_STORE')
        NOT NULL DEFAULT 'ONLINE',

    subtotal_amount DECIMAL(10,2) NOT NULL,

    discount_applied DECIMAL(10,2)
        NOT NULL DEFAULT 0.00,

    gst_tax_amount DECIMAL(10,2) NOT NULL,

    grand_total DECIMAL(10,2) NOT NULL,

    order_status ENUM(
        'PENDING',
        'CONFIRMED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    delivery_mode ENUM(
        'HOME_DELIVERY',
        'SHOWROOM_PICKUP'
    ) NOT NULL DEFAULT 'HOME_DELIVERY',

    delivery_address VARCHAR(255),

    landmark VARCHAR(100),

    pin_code VARCHAR(10),

    refund_status ENUM(
        'NOT_APPLICABLE',
        'INITIATED',
        'PROCESSING',
        'COMPLETED',
        'FAILED'
    ) NOT NULL DEFAULT 'NOT_APPLICABLE',

    refund_amount DECIMAL(10,2) DEFAULT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (booked_by_staff_id)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);





CREATE TABLE order_items (
		order_item_id INT PRIMARY KEY auto_increment,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL ,
        price_snapshot DECIMAL(10,2) NOT NULL,
        CHECK (quantity>0),
        foreign key (order_id) REFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
        foreign key (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
        


CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('ONLINE_CARD', 'ONLINE_WALLET', 'IN_STORE_CASH', 'IN_STORE_CHECK') NOT NULL,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    gateway_transaction_token VARCHAR(100) NULL,
    transaction_id VARCHAR(50) NULL UNIQUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
        
        
        
        
CREATE TABLE deliveries (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    delivery_status ENUM('UNASSIGNED', 'SHIPPED', 'DELIVERED') NOT NULL DEFAULT 'UNASSIGNED',
    actual_delivery TIMESTAMP NULL,
    delivery_tracking_id VARCHAR(50) NOT NULL UNIQUE,
    assigned_driver_user_id INT NULL,
    delivery_mode ENUM('HOME_DELIVERY', 'SHOWROOM_PICKUP') NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (assigned_driver_user_id) REFERENCES users(id)
);



CREATE TABLE coupons (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    coupon_code VARCHAR(50) NOT NULL UNIQUE,
    discount_percentage DECIMAL(5, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);




CREATE TABLE order_coupon_usage (
    order_id INT PRIMARY KEY,
    coupon_id INT NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
);



INSERT INTO products (
    product_name,
    description,
    price,
    original_price,
    category,
    is_new,
    is_online_only,
    specifications,
    colors,
    available_sizes,
    floor_sample_present,
    showroom_location_bay,
    features,
    dimensions,
    stock_count,
    rating,
    is_active,
    image_url
)
VALUES
(
    'Modern Wooden Sofa',
    'Premium 3-seater solid wood sofa with soft cushions.',
    24999.00,
    27999.00,
    'living_room',
    TRUE,
    FALSE,
    '{"material":"Sheesham Wood","seats":3}',
    '["Brown","Walnut"]',
    '["3-Seater"]',
    TRUE,
    'A-12',
    'Comfortable, Durable, Premium Finish',
    '210x90x85 cm',
    8,
    4.80,
    TRUE,
    'https://example.com/images/wooden-sofa.jpg'
),
(
    'Office Study Table',
    'Modern office table suitable for home and office.',
    8999.00,
    9999.00,
    'office',
    TRUE,
    FALSE,
    '{"material":"Engineered Wood","drawers":2}',
    '["White","Black"]',
    '["Standard"]',
    FALSE,
    'B-05',
    'Scratch Resistant, Spacious',
    '120x60x75 cm',
    15,
    4.50,
    TRUE,
    'https://example.com/images/study-table.jpg'
);


SELECT* FROM products;

desc products;

SELECT* FROM orders;

SELECT id, full_name, email, role FROM users;
desc orders;