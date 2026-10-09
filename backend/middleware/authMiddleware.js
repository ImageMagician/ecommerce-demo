import jwt from 'jsonwebtoken';
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler( async( req, res, next ) => {
    let token;

    // read the JWT from the cookie
    token = req.cookies.jwt;

    if ( ! token ) {
        res.status(401);
        throw new Error ('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    }
    catch( err ) {
        res.status(401);
        throw new Error( "Not authorized: token failed. ", err );
    }
});

const isAdmin = ( req, res, next ) => {
    if ( ! req.user || ! req.user.isAdmin ) {
        res.status(401);
        throw new Error ('Not authorized: adminProtected');
    }
    next();
}

export { protect, isAdmin };