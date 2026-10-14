// GENERAL
import express       from 'express';
import dotenv        from 'dotenv';
import connectDB     from "./config/db.js";
import cookieParser  from "cookie-parser";

// ROUTES
import productRoutes from './routes/productRoutes.js';
import userRoutes    from './routes/userRoutes.js';
import orderRoutes   from './routes/orderRoutes.js';

// MIDDLEWARE
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || "http://localhost:8000";

connectDB();

const app = express();

// body parser middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// cookie parser middleware
app.use( cookieParser() );

app.get( '/', ( req, res) => {
    res.send('API is running...');
});

// routes
app.use( '/api/products', productRoutes );
app.use( '/api/users',    userRoutes );
app.use( '/api/orders',   orderRoutes );

// errorMiddleware
app.use( notFound );
app.use( errorHandler );

app.listen( port, () => console.log(`Listening on port ${port}`) );