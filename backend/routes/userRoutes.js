import express from 'express';
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
    .get(getUserProfile)
    .post(updateUserProfile);

// Admin routes
router.get('/', getAllUsers);

router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUser);

export default router;