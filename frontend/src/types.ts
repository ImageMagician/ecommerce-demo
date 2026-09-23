export type Product = {
    _id: string,
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
    product?: Product
}

export type CartItem = {
    _id: string,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    rating: number,
    numReviews: number,
    price: number,
    countInStock: number,
    reviews: string,
    __v: number,
    createdAt: string,
    updatedAt: string,
    qty: number,
}