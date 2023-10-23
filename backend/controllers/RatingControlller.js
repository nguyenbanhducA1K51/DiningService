import asyncHandler from "express-async-handler"
import { Rating } from "../models/ratingModel"
import { Menu } from "../models/menuModel"
import mongoose from "mongoose"
export const getRating = asyncHandler(async (req, res) => {
    const { date, food_id } = req.query
    if (!date || !food_id) {
        res.status(404).json({ message: "Missing either date or food id" })
        
    }
    const ratings = []
    const menuRecord = await Menu.findOne({ date: date, foodItem: food_id })
    if (!menuRecord) {
        res.status(404).json({message:"either food_id or date is wrong"})
    }
    const ratingRecords = await Rating.find({ food: menuRecord })
    for (let i = 0; i < ratingRecords.length; i++){
        ratings.push(ratingRecords[i].rating)
    }
    res.status(201).json({ratings:ratings})
})
export const postRating = asyncHandler(async (req, res) => {
    const { user } = req
    const { rating, date, food_id } = req.body
    if (!rating || !date || !foodItem) {
        res.status(404).json({ message: "Missing either rating or date or foodItem field" })

    }
    if (Number.isInteger(rating) || value < 0 || value <= 5) {
        res.status(404).json({ message: "rating must be integer and in range [0 ,5]" })
    }
    const objectId = new mongoose.Schema.ObjectId(food_id)
    const record = Menu.findOne({ date: date, foodItem: food_id })
    if (!record) {
        res.status(404).json({ message: "Food item for rating is not found" })

    }
    const ratingRecord = await Rating.create({
        food: objectId,
        user: user._id,
        rating: rating
    })
res.status(201).json({rateing:ratingRecord})

})
