import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  material: { type: Number, required: true },
  barcode: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;