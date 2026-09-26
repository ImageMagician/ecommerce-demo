import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    res.send('Auth user');
});

/**
 * @desc    Register User
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register user');
});

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout user');
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Get user profile');
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Update user profile');
});

/**
 * @desc    Get all users (admin function)
 * @route   GET /api/users
 * @access  Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
    res.send('Get all users');
});

/**
 * @desc    Get user by id (admin function)
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get user by id.');
});

/**
 * @desc    Update user by id (admin function)
 * @route   PUT /api/users/:id
 * @access  Private
 */
const updateUserById = asyncHandler(async (req, res) => {
    res.send('Update user by id.');
});

/**
 * @desc    Delete a user (admin function)
 * @route   DELETE /api/users/:id
 * @access  Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
}