// GENERAL
import express from 'express';

// CONTROLLERS
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get( getProducts );
router.route('/:id').get( getProductById );

// Admin
router.route('/create').post( createProduct );

export default router;