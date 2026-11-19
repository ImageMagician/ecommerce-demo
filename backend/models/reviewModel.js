import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        title: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    })

reviewSchema.statics.updateProductStats = async function ( productId ) {
    const [ stats ] = await this.aggregate([
        { $match: { product: new mongoose.Types.ObjectId( productId ) } },
        { $group: {
            _id: '$product',
            numReviews: { $sum: 1 },
            rating: { $avg: '$rating' },
        }}
    ])

    await mongoose.model( 'Product' ).findByIdAndUpdate( productId, {
        numReviews: stats?.numReviews ?? 0,
        rating: stats ? Math.round( stats.rating * 10 ) / 10: 0,
    })
}

const Review = mongoose.model('Review', reviewSchema);
export { Review }