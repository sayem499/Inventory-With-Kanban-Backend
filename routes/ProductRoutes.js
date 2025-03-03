import express from 'express';
import { getProduct, setProduct, updateProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.route('/').get(getProduct).post(setProduct); 
router.route('/:barcode').put(updateProduct);

export default router;