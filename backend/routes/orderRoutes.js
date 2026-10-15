import express from 'express';

import { addOrderItems,
         getMyOrders,
         getOrderById,
         updateOrderToPaid,
         updateOrderToDelivered,
         getAllOrders
       } from "../controllers/orderController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/')        .post( protect, addOrderItems );
router.route('/myorders').get(  protect, getMyOrders );
router.route( '/:id/pay').put(  protect, updateOrderToPaid );
router.route('/:id')     .get(  protect, getOrderById );

// Admin
router.route( '/:id/deliver').get( protect, isAdmin, updateOrderToDelivered );
router.route( '/' )          .get( protect, isAdmin, getAllOrders );

export default router;