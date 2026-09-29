import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

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

router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/register', registerUser);
router.route('/profile')
    .get(getUserProfile, protect)
    .put(updateUserProfile, protect);

// Admin routes
router.get('/', getAllUsers, protect, adminProtect);

router.route('/:id')
    .get(getUserById, protect, adminProtect)
    .put(updateUserById, protect, adminProtect)
    .delete(deleteUser, protect, adminProtect);

export default router;