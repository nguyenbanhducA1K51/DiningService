import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import  userRoutes from "./backend/routes/userRoutes.js"
import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js';
import connectDB from "./backend/config/db.js";
import diningRoute from "./backend/routes/diningRoute.js"
import path from "path"
import  process from 'process'
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();


connectDB()
// app.get('/', (req, res) => {
//     res.send("ready");
// });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/image", express.static(path.join(__dirname, "storage")))
app.use('/api/users', userRoutes)
app.use('/api/dining', diningRoute)

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    console.log("Dir", __dirname)
    console.log(path.join(__dirname, "frontend/dist"))
    app.use(express.static(path.join(__dirname, "frontend/dist")))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve( __dirname,'frontend','dist',"index.html"))
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
