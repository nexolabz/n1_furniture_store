const db_connection = require('../../../config/db_config');
const { uploadToCloudinary } = require('../../../config/cloudinary');

/**
 * Helper to parse boolean values from request
 */
const parseBool = (val, defaultVal) => {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === 'string') return val === 'true' || val === '1';
  return !!val;
};

/**
 * Helper to format JSON fields for MySQL insertion
 */
const formatJsonField = (field) => {
  if (field === undefined || field === null) return null;
  if (typeof field === 'object') return JSON.stringify(field);
  try {
    // If it's a string, verify if it's already JSON or need to be wrapped
    JSON.parse(field);
    return field;
  } catch (e) {
    return JSON.stringify(field);
  }
};

/**
 * POST /api/admin/products
 * Create a new product. Accepts primary image file and additional gallery image files,
 * uploads them to Cloudinary, and saves the details to the database.
 */
const createProduct = async (req, res) => {
  try {
    const promiseDb = db_connection.promise();
    
    const {
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
      is_active
    } = req.body;

    // Validation for required fields
    if (!product_name || !description || price === undefined || original_price === undefined || !category) {
      return res.status(400).json({ 
        message: "Required fields are missing: product_name, description, price, original_price, category" 
      });
    }

    // Determine the primary image URL
    let primaryImageUrl = req.body.image_url;

    // Check if a primary image file was uploaded
    if (req.files && req.files['image_url'] && req.files['image_url'][0]) {
      const uploadResult = await uploadToCloudinary(req.files['image_url'][0].buffer, 'products');
      primaryImageUrl = uploadResult.secure_url;
    } else if (req.files && req.files['image'] && req.files['image'][0]) {
      const uploadResult = await uploadToCloudinary(req.files['image'][0].buffer, 'products');
      primaryImageUrl = uploadResult.secure_url;
    } else if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'products');
      primaryImageUrl = uploadResult.secure_url;
    }

    if (!primaryImageUrl) {
      return res.status(400).json({ 
        message: "Product primary image is required (either via file upload or 'image_url' URL field)." 
      });
    }

    // Parse options with proper defaults
    const isNewVal = parseBool(is_new, true);
    const isOnlineOnlyVal = parseBool(is_online_only, false);
    const floorSampleVal = parseBool(floor_sample_present, false);
    const isActiveVal = parseBool(is_active, true);
    const stockCountVal = stock_count !== undefined ? parseInt(stock_count) : 0;
    const ratingVal = rating !== undefined ? parseFloat(rating) : 5.00;

    const specsJson = formatJsonField(specifications);
    const colorsJson = formatJsonField(colors);
    const sizesJson = formatJsonField(available_sizes);

    // Insert product into products table
    const insertProductQuery = `
      INSERT INTO products (
        product_name, description, price, original_price, category,
        is_new, is_online_only, specifications, colors, available_sizes,
        floor_sample_present, showroom_location_bay, features, dimensions,
        stock_count, rating, is_active, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertValues = [
      product_name, description, price, original_price, category,
      isNewVal ? 1 : 0, isOnlineOnlyVal ? 1 : 0, specsJson, colorsJson, sizesJson,
      floorSampleVal ? 1 : 0, showroom_location_bay || null, features || null, dimensions || null,
      stockCountVal, ratingVal, isActiveVal ? 1 : 0, primaryImageUrl
    ];

    const [productResult] = await promiseDb.query(insertProductQuery, insertValues);
    const newProductId = productResult.insertId;

    // Save primary image to product_images table
    const insertImageQuery = `
      INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
      VALUES (?, ?, ?, ?)
    `;
    await promiseDb.query(insertImageQuery, [newProductId, primaryImageUrl, 1, 0]);

    // Handle additional gallery images from request files
    if (req.files && req.files['images']) {
      const galleryFiles = req.files['images'];
      let sortOrder = 1;
      for (const file of galleryFiles) {
        const uploadResult = await uploadToCloudinary(file.buffer, 'product_gallery');
        await promiseDb.query(insertImageQuery, [newProductId, uploadResult.secure_url, 0, sortOrder++]);
      }
    }

    return res.status(201).json({
      message: "Product asset successfully added to inventory database.",
      product_id: newProductId
    });

  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ 
      message: "Internal server error during product creation.",
      error: error.message 
    });
  }
};

/**
 * GET /api/admin/products
 * Lists all products in the catalog for admin management with pagination and optional filters.
 */
const getAdminProducts = async (req, res) => {
  try {
    const promiseDb = db_connection.promise();
    
    const { category, q, is_online_only, page } = req.query;

    let countSql = "SELECT COUNT(*) AS total FROM products WHERE 1=1";
    let selectSql = "SELECT product_id, product_name, category, price, original_price, stock_count, rating, is_online_only, is_new, image_url FROM products WHERE 1=1";
    const queryParams = [];

    if (category) {
      countSql += " AND category = ?";
      selectSql += " AND category = ?";
      queryParams.push(category);
    }
    if (q) {
      countSql += " AND product_name LIKE ?";
      selectSql += " AND product_name LIKE ?";
      queryParams.push(`%${q}%`);
    }
    if (is_online_only !== undefined) {
      const isOnlineOnlyVal = parseBool(is_online_only, false);
      countSql += " AND is_online_only = ?";
      selectSql += " AND is_online_only = ?";
      queryParams.push(isOnlineOnlyVal ? 1 : 0);
    }

    // Get total items for pagination metadata
    const [countResult] = await promiseDb.query(countSql, queryParams);
    const totalItems = countResult[0].total;

    // Pagination calculations
    const pageNum = parseInt(page) || 1;
    const itemsPerPage = 20;
    const offset = (pageNum - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // Append limit and offset
    selectSql += " LIMIT ? OFFSET ?";
    const selectParams = [...queryParams, itemsPerPage, offset];

    const [products] = await promiseDb.query(selectSql, selectParams);

    // Format products response values
    const formattedProducts = products.map(prod => ({
      product_id: prod.product_id,
      product_name: prod.product_name,
      category: prod.category,
      price: parseFloat(prod.price),
      original_price: parseFloat(prod.original_price),
      stock_count: prod.stock_count,
      rating: parseFloat(prod.rating),
      is_online_only: !!prod.is_online_only,
      is_new: !!prod.is_new,
      image_url: prod.image_url
    }));

    return res.status(200).json({
      products: formattedProducts,
      pagination_metadata: {
        current_page: pageNum,
        items_per_page: itemsPerPage,
        total_items: totalItems,
        total_pages: totalPages
      }
    });

  } catch (error) {
    console.error("Error in getAdminProducts:", error);
    return res.status(500).json({ 
      message: "Internal server error fetching product list.",
      error: error.message 
    });
  }
};

/**
 * GET /api/admin/products/:id
 * Retrieves full product detail for admin catalog management (includes images gallery).
 */
const getAdminProductById = async (req, res) => {
  try {
    const promiseDb = db_connection.promise();
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const selectProductQuery = "SELECT * FROM products WHERE product_id = ?";
    const [productResult] = await promiseDb.query(selectProductQuery, [productId]);

    if (!productResult || productResult.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    const product = productResult[0];

    // Fetch associated gallery images
    const selectImagesQuery = `
      SELECT image_id, image_url, is_primary, sort_order 
      FROM product_images 
      WHERE product_id = ? 
      ORDER BY sort_order ASC
    `;
    const [imagesResult] = await promiseDb.query(selectImagesQuery, [productId]);

    const formattedImages = imagesResult.map(img => ({
      image_id: img.image_id,
      image_url: img.image_url,
      is_primary: !!img.is_primary,
      sort_order: img.sort_order
    }));

    // Parse specifications, colors, and available_sizes if they are JSON strings
    let specifications = product.specifications;
    let colors = product.colors;
    let availableSizes = product.available_sizes;

    if (typeof specifications === 'string') {
      try { specifications = JSON.parse(specifications); } catch (e) { /* ignore */ }
    }
    if (typeof colors === 'string') {
      try { colors = JSON.parse(colors); } catch (e) { /* ignore */ }
    }
    if (typeof availableSizes === 'string') {
      try { availableSizes = JSON.parse(availableSizes); } catch (e) { /* ignore */ }
    }

    const responseData = {
      product_id: product.product_id,
      product_name: product.product_name,
      description: product.description,
      price: parseFloat(product.price),
      original_price: parseFloat(product.original_price),
      category: product.category,
      is_new: !!product.is_new,
      is_online_only: !!product.is_online_only,
      specifications: specifications,
      colors: colors,
      available_sizes: availableSizes,
      floor_sample_present: !!product.floor_sample_present,
      showroom_location_bay: product.showroom_location_bay,
      features: product.features,
      dimensions: product.dimensions,
      stock_count: product.stock_count,
      rating: parseFloat(product.rating),
      is_active: !!product.is_active,
      image_url: product.image_url,
      images: formattedImages,
      created_at: product.created_at,
      updated_at: product.updated_at
    };

    return res.status(200).json(responseData);

  } catch (error) {
    console.error("Error in getAdminProductById:", error);
    return res.status(500).json({ 
      message: "Internal server error fetching product details.",
      error: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getAdminProducts,
  getAdminProductById
};
