import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

/**
 * @type    {(function(*, *, *): void)|*}
 * $desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @type    {(function(*, *, *): void)|*}
 * @desc    Fetch one products
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json(product);
});

/**
 * @type    {(function(*, *, *): void)|*}
 * @desc    Create a new product
 * @route   POST /api/products/create
 * @access  PRIVATE
 */
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name:         'Sample name',
        price:        0,
        user:         req.user._id,
        image:        '/images/sample.jpg',
        brand:        'Sample brand',
        category:     'Sample category',
        countInStock: 0,
        numReviews:   0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();

    res.status( 201 ).json( createdProduct );
})

const updateProduct = asyncHandler( async ( req, res ) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById( req.params.id );

    if ( !product ) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.name         = name;
    product.price        = price;
    product.description  = description;
    product.image        = image;
    product.brand        = brand;
    product.category     = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json( updatedProduct );
});

export { getProducts, getProductById, createProduct, updateProduct };