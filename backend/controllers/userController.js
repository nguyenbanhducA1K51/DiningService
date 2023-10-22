import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            permission:user.permission
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid user email or password")
    }

})

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (email == "ad@gmail.com") {
        const user = await User.create({
            name,
            email,
            password,
            permission: 9
        })
        if (user) {
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                permission: 9
            })
        }
    }
    const userExists = await User.findOne({ email: email })


        if (userExists) {
            res.status(400);
            throw new Error("user exist")

        }
        const user = await User.create({
            name,
            email,
            password,
            permission:1
        })
        if (user) {
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                permission:1
            })
        }
        else {
            res.status(400)
            throw new Error("Invalid user data")
        }
   




})

const logoutUser = asyncHandler((req, res) => {
    console.log("log out from browserr")
    console.log(req)

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'logout User' })

})
const getUserProfile = asyncHandler((req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)

})
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password

        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }

    else {
        res.status(404)
        throw new Error("User not found")
    }

})
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}

