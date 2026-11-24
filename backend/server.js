// GENERAL
import path          from "path";
import express       from 'express';
import dotenv        from 'dotenv';
import connectDB     from "./config/db.js";
import cookieParser  from "cookie-parser";

// ROUTES
import productRoutes from './routes/productRoutes.js';
import userRoutes    from './routes/userRoutes.js';
import orderRoutes   from './routes/orderRoutes.js';
import uploadRoutes  from './routes/uploadRoutes.js';

// MIDDLEWARE
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const __dirname = path.resolve();
const port = process.env.PORT || "8000";

connectDB();

const app = express();

// body parser middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// cookie parser middleware
app.use( cookieParser() );

// routes
app.use( '/api/products', productRoutes );
app.use( '/api/users',    userRoutes );
app.use( '/api/orders',   orderRoutes );
app.use( '/api/upload',   uploadRoutes );
app.use( '/uploads', express.static( path.join( process.cwd(), 'uploads' ) ) );

app.get( '/api/config/paypal', ( req, res ) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID } )
);

if ( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( path.join( __dirname, '/frontend/dist' ) ) );

    // Any route that is not API will be directed to index.html
    app.get('/{*splat}', ( req, res ) =>
        res.sendFile( path.resolve( __dirname, 'frontend', 'dist', 'index.html' ) )
    );
}
else {
    app.get( '/', ( req, res) => {
        res.send('API is running...');
    });
}

// errorMiddleware
app.use( notFound );
app.use( errorHandler );

app.listen( port, () => console.log(`Listening on port ${port}`) );