import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit';
import { routes } from './routes/mainRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 9090;

app.use(express.json());
app.use(cookieParser());

// CORS configuration supporting credentials (cookies, authorization headers)
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false, 
    ipv6Subnet: 56, 
});

app.use(limiter);

if (!process.env.Atlas_URL) {
    console.error("Warning: Atlas_URL is not defined in environment variables!");
} else {
    mongoose.connect(process.env.Atlas_URL)
        .then(() => console.log("mongodb Connected.."))
        .catch((err) => console.log("MongoDB connection error:", err.message));
}

app.use('/api', routes);

app.listen(port, () => console.log(`Server is Running Port ${port}`));
