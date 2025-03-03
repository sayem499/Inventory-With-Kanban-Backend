import express from 'express';
import { getCategory, setCategory} from '../controllers/CategoryController.js'

const router = express.Router();

router.route('/').get(getCategory).post(setCategory); 

export default router;