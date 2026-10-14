import express from 'express';

import { addOrderItems,
         getMyOrders,
         getOrderById,
         updateOrderToPaid,
         updateOrderToDelivered,
         getAllOrders
       } from "../controllers/orderController";

import { protect, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.route('/')        .post( protect, addOrderItems );
router.route('/myorders').get( protect, getMyOrders );
router.route('/:id')     .get( protect, getOrderById );
router.route( '/:id/pay').get( protect, updateOrderToPaid );

// Admin
router.route( '/:id/deliver').get( protect, isAdmin, updateOrderToDelivered );
router.route( '/' )          .get( protect, isAdmin, getAllOrders );