import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import {
    /* user */
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    /* admin */
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post( '/login',    authUser );
router.post( '/logout',   logoutUser );
router.post( '/register', registerUser );
router.route('/profile')
    .get( protect, getUserProfile )
    .put( protect, updateUserProfile );

// Admin routes
router.get('/', protect, isAdmin, getAllUsers);

router.route( '/:id' )
    .get(    protect, isAdmin, getUserById )
    .put(    protect, isAdmin, updateUserById )
    .delete( protect, isAdmin, deleteUser );

export default router;