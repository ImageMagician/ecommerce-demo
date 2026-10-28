// GENERAL
import express from 'express';

// MIDDLEWARE
import { protect, isAdmin } from "../middleware/authMiddleware.js";

// CONTROLLERS
import {getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get ( getProducts )                         // Public: view
    .post( protect, isAdmin, createProduct );   // Admin: create product

router.route('/:id')
    .get   ( getProductById )                      // Public: view
    .put   ( protect, isAdmin, updateProduct )     // Admin: update product
    .delete( protect, isAdmin, deleteProduct );    // Admin: delete product

export default router;