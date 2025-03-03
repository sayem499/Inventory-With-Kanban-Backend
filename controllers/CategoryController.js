import Category from "../models/Category.js";


const setCategory = async (req, res) => {
    try {
      const newCategory = new Category({ category_name: req.body.category_name });
      await newCategory.save();
      res.status(201).json({ status: true, category: newCategory });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({status: true, categories: categories});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


export { getCategory, setCategory};