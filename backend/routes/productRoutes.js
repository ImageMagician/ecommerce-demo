// GENERAL
import express from 'express';

// MIDDLEWARE
import { protect, isAdmin } from "../middleware/authMiddleware.js";

// CONTROLLERS
import {getProducts, getProductById, createProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get( getProducts )                         // Public: view
    .post( protect, isAdmin, createProduct );   // Admin: create product

router.route('/:id')
    .get( getProductById )                      // Public: view
    .put( protect, isAdmin, updateProduct );    // Admin: update product

export default router;