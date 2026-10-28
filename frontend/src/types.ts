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

export type ProductUpdate = Omit<Product, "rating" | "numReviews">;

export interface UploadResponse {
    message: string;
    image: string;
}

export type User = {
    _id: string,
    name: string,
    email: string,
    password: string,
    isAdmin: string,
    createdAt: string,
    updatedAt: string,
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