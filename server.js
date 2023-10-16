
import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import  userRoutes from "./backend/routes/userRoutes.js"
import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js';
import connectDB from "./backend/config/db.js";
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users',userRoutes)
app.get('/', (req, res) => {
    res.send("ready");
});

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


// "type": "module",