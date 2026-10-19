import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import { routes } from './routes/mainRoutes.js'

dotenv.config({ quiet: true })

const app = express()
const port = 9090
app.use(express.json())
app.use(cors())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
	
})

app.use(limiter)

mongoose.connect(process.env.Atlas_URL)
    .then(() => console.log("mongodb Connected.."))
    .catch((err) => console.log(err.message))

app.use('/api', routes)

app.listen(port, () => console.log(`Server is Running Port ${port}`))

