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

/**
 * @type {(function(*, *, *): void)|*}
 * @desc    UPDATE existing product
 * @route   PUT /api/products
 * @access  PRIVATE
 */
const updateProduct = asyncHandler( async ( req, res ) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById( req.params.id );

    if ( !product ) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.name         = name         ?? product.name;
    product.price        = price        ?? product.price;
    product.description  = description  ?? product.description;
    product.image        = image        ?? product.image;
    product.brand        = brand        ?? product.brand;
    product.category     = category     ?? product.category;
    product.countInStock = countInStock ?? product.countInStock;

    const updatedProduct = await product.save();

    res.json( updatedProduct );
});

/**
 * @type {(function(*, *, *): void)|*}
 * @desc    DELETE a current products
 * @route   DELETE /api/products/:id
 * @access  PRIVATE
 */
const deleteProduct = asyncHandler( async ( req, res ) => {
    const product = await Product.findById( req.params.id );
    if ( !product ) {
        res.status( 404 );
        throw new Error('Product not found');
    }

    await Product.deleteOne({ _id: product._id });
    res.status( 200 ).json( "Product deleted successfully" );
})


/**
 * @type {(function(*, *, *): void)|*}
 * @desc    Create product review
 * @route   POST /api/products/:id/reviews
 * @access  PRIVATE
 */
const reviewProduct = asyncHandler( async ( req, res ) => {
    const product = await Product.findById( req.params.id );

    if ( !product ) {
        res.status( 404 );
        throw new Error('Product not found');
    }

    const alreadyReviewed = product.reviews.find(
        ( review ) => review.user === req.user._id
    );

    if ( alreadyReviewed ) {
        res.status( 400 );
        throw new Error('Already reviewed product');
    }

    const review = {
        user:   req.user._id,
        name:   req.user.name,
        rating: Number( rating ),
        comment,
    }

    await product.reviews.push( review );
    product.numReviews = product.reviews.length;


});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, reviewProduct };
