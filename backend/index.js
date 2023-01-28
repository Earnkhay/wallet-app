import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import userRoutes from './routes/users.js'
import errorHandler from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';

const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:8080"]
}));
app.use(express.urlencoded({extended: false}))
app.use('/api/users', userRoutes)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))