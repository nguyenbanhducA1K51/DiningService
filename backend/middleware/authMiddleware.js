import jwt from 'jsonwebtoken'

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
const protect = asyncHandler(async (req,res,next) => {
    
console.log("req from middle ware", req)
    let token;    
    token = req.cookies.jwt;
    if (token ) {
        try {       
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            
            console.log('user id', decoded.userId);
            
            // because when generate token by const tokn=jwt.sign ( {userID})
            req.user = await User.findById(decoded.userId).select('-password')
        // so thta password does not get return
        next()
        } catch (error) {
            res.status(401)
            throw new Error ("Not authorized, invalid token")
            
        }
    } else {
        res.status(401)
        throw new Error('Not authorized,no token')
    }
})

export { protect };