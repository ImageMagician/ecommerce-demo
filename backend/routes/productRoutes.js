import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler( async( req, res) => {
    res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
}));

export default router;