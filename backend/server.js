import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import  userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from "./config/db.js";
import diningRoute from "./routes/diningRoute.js"
import path from "path"
import process from 'process'
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const grandPath = path.dirname(__dirname);
app.use("/image", express.static(path.join(grandPath, "storage")))
app.use('/api/users', userRoutes)
app.use('/api/dining', diningRoute)

if (process.env.NODE_ENV === "production") {

    const rootpath = path.resolve(path.dirname(__dirname))
    app.use(express.static(path.join(rootpath, "frontend/dist")))
     
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(rootpath,'frontend','dist',"index.html"))
    })
}
else {
    app.get('/', (req, res) => {
        res.send("ready");
    });

}

app.use(notFound);
app.use(errorHandler)

 app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app