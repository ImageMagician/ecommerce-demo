// GENERAL
import express from 'express';

// MIDDLEWARE
import { protect, isAdmin } from "../middleware/authMiddleware.js";

// CONTROLLERS
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/')   .get( getProducts );
router.route('/:id').get( getProductById );

// Admin
router.route('/create').post( protect, isAdmin, createProduct );

export default router;