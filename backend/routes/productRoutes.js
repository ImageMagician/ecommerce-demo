// GENERAL
import express from 'express';

// MIDDLEWARE
import { protect, isAdmin } from "../middleware/authMiddleware.js";

// CONTROLLERS
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getReviewsByProductId,
    getReviewForProductByUserId,
    reviewProduct,
    getTopProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get ( getProducts )                       // Public: view
    .post( protect, isAdmin, createProduct );  // Admin: create product

router.route( '/top')
    .get( getTopProducts );                     // Public:view

router.route('/:id')
    .get   ( getProductById )                   // Public: view
    .put   ( protect, isAdmin, updateProduct )  // Admin: update product
    .delete( protect, isAdmin, deleteProduct ); // Admin: delete product

router.route('/:id/reviews')
    .get ( getReviewsByProductId )
    .post( protect, reviewProduct );

router.route('/:id/reviews/:user')
    .get( protect, getReviewForProductByUserId );

export default router;