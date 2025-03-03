import Product from "../models/Product.js";
import Category from "../models/Category.js";

const setProduct = async (req, res) => {
    try {
      const products = req.body; // Expecting an array of products
  
      if (!Array.isArray(products)) {
        return res.status(400).json({ status: false, message: "Invalid input, expected an array." });
      }
  
      // Extract barcodes to check for existing products
      const barcodes = products.map((p) => p.barcode);
      const existingProducts = await Product.find({ barcode: { $in: barcodes } });
  
      // Filter out existing products
      const newProducts = products.filter(
        (p) => !existingProducts.some((ep) => ep.barcode === p.barcode)
      );
  
      if (newProducts.length === 0) {
        return res.status(400).json({ status: false, message: "All products already exist." });
      }
  
      // Process categories for new products
      for (let product of newProducts) {
        if (product.category_name) {
          // Check if category exists
          let category = await Category.findOne({ category_name: product.category_name });
  
          if (!category) {
            // Create new category if it does not exist
            category = await Category.create({ category_name: product.category_name });
          }
  
          // Assign category ID to the product
          product.category_id = category._id;
          delete product.category_name; // Remove category_name from product before saving
        }
      }
  
      // Insert only new products with assigned category IDs
      const insertedProducts = await Product.insertMany(newProducts);
  
      res.status(201).json({
        status: true,
        message: `${insertedProducts.length} products added.`,
        products: insertedProducts
      });
    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
      const products = await Product.find().populate("category_id", "category_name");
      res.status(200).json({status: true , products: products});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
      const { material, description, category_name } = req.body;
      const { barcode } = req.params;
  
      // Find the product by barcode
      let product = await Product.findOne({ barcode });
  
      if (!product) {
        return res.status(404).json({ status: false, message: "Product not found" });
      }
  
      // Handle category change (if category_name is provided)
      let category = product.category_id; // Keep the old category by default
      if (category_name) {
        category = await Category.findOne({ category_name });
  
        if (!category) {
          // If category does not exist, create a new one
          category = new Category({ category_name });
          await category.save();
        }
      }
  
      // Update the product
      product.material = material || product.material;
      product.description = description || product.description;
      product.category_id = category._id; // Update category_id
  
      await product.save();
  
      return res.json({ status: true, message: "Product updated successfully", product });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
};


export { getProduct, setProduct, updateProduct};
