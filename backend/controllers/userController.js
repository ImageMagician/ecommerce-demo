import User          from '../models/userModel.js';
import asyncHandler  from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async ( req, res ) => {
    const { email, password } = req.body;

    const user = await User.findOne( { email } );

    if ( user && ( await user.matchPassword( password ) ) ) {
        await generateToken(res, user._id);

        res.json({
            _id:     user._id,
            name:    user.name,
            email:   user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid username or password.');
    }
});

/**
 * @desc    Register User
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async ( req, res ) => {
    console.log( req.body );
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email } );

    if ( userExists ) {
        res.status( 400 );
        throw new Error( 'The email already exists in the system.' )
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if ( ! user ) {
        res.status( 400 );
        throw new Error( 'Invalid Credentials.' );
    }

    await generateToken( res, user._id );

    res.status(201).json({
        _id:      user._id,
        name:     user.name,
        email:    user.email,
        password: user.password,
        isAdmin:  user.isAdmin,
    });
});

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        message: 'User logged out',
    })
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById( req.user._id );

    if ( ! user ) {
        res.status( 404 );
        throw new Error( 'User not found.' );
    }

    res.status(200).json({
        _id:     user._id,
        name:    user.name,
        email:   user.email,
        isAdmin: user.isAdmin,
    });

});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async ( req, res ) => {
    const user = await User.findById( req.user._id );

    if ( ! user ) {
        res.status( 404 );
        throw new Error( 'User not found.' );
    }

    user.name =    req.body.name    || user.name;
    user.email =   req.body.email   || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    if ( req.body.password ) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status( 200 ).json({
        _id:     updatedUser._id,
        name:    updatedUser.name,
        email:   updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
});

/**
 * @desc    Get all users (admin function)
 * @route   GET /api/users
 * @access  Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if ( ! users ) {
        res.status(404);
        throw new Error( 'No users found.' );
    }

    res.status(200).json(users);
});

/**
 * @desc    Get user by id (admin function)
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUserById = asyncHandler(async ( req, res ) => {
    const user = await User.findById( req.params.id ).select('-password');

    if ( !user ) {
        res.status( 404 );
        throw new Error( 'User not found.' );
    }

    res.status(200).json( user );
});

/**
 * @desc    Update user by id (admin function)
 * @route   PUT /api/users/:id
 * @access  Private
 */
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById( req.params.id );

    if ( !user ) {
        res.status( 404 );
        throw new Error( 'User not found.' );
    }

    user.name     = req.body.name || user.name;
    user.email    = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // check against an admin setting being overwritten
    if ( req.body.isAdmin !== undefined ) {
        user.isAdmin  = Boolean( req.body.isAdmin );
    }

    const updatedUser = await user.save();

    res.status( 200 ).json({
        _id:     updatedUser._id,
        name:    updatedUser.name,
        email:   updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
});

/**
 * @desc    Delete a user (admin function)
 * @route   DELETE /api/users/:id
 * @access  Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById( req.params.id ).select('-password');

    if ( !user ) {
        res.status( 404 );
        throw new Error( 'User not found.' );
    }

    if ( user.isAdmin ) {
        res.status( 400 );
        throw new Error( 'Admins cannot be deleted without the "G-bye, Bitches!" power up.' );
    }

    await User.deleteOne({ _id: user._id });
    res.status(201).json({message: 'User deleted successfully.'});

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