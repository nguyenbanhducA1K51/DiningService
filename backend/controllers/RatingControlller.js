import asyncHandler from "express-async-handler"
import { Rating } from "../models/ratingModel"
import { dailyFood } from "../models/dailyFoodModel"
import { getWeekFromDate } from "../utils/dateUtils"
import mongoose from "mongoose"
export const getRating = asyncHandler(async (req, res) => {
    try {
        
    const {user}=req
    const { anchorDate} = req.query
    if (!anchorDate) {
       return  res.status(500).json({ message: "Missing anchorDate" })

    }
    const dates = getWeekFromDate(anchorDate)
    const ratings = {}
    
    for (let i = 0; i < dates.length; i++){
        const date = dates[i]
        ratings[date]={}
        const dailyRecords = await dailyFood.find({ date: date })
        if (dailyRecords.length > 0) {
            for (let j = 0; j < dailyRecords.length; j++){
                const dailyRecord = dailyRecords[j]
                const foodId = dailyRecord.foodId 
                // console.log("dailyrec", dailyRecord)
                const ratingRecords = await Rating.find({ dailyFoodId: dailyRecord._id })
                
                let rating = []
                for (let k = 0; k < ratingRecords.length; k++){
                    console.log("ratings found". ratingRecords.length)
                    rating = [...rating, ...ratingRecords[k].rating]
                }
                ratings[date][foodId]=rating 
            }
        }
    }
    const userRatings = {}
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        userRatings[date] = {}
        const dailyRecords = await dailyFood.find({ date: date })
        if (dailyRecords.length > 0) {
            for (let j = 0; j < dailyRecords.length; j++) {
                const dailyRecord = dailyRecords[j]
                const foodId = dailyRecord.foodId
                const ratingRecord= await Rating.findOne({ dailyFoodId: dailyRecord._id ,user:user._id})
                if (ratingRecord) {
                    
                    userRatings[date][foodId] = ratingRecord.rating
                }
            }
        }
    }

        return res.status(201).json({ userRatings, ratings })
    } catch (error) {
console.log(error)
    }
})
export const postRating = asyncHandler(async (req, res) => {
    try {
        
    
    const { user } = req
    let { rating, date, foodId } = req.body
   
    rating=parseInt(rating)
    if (!rating || !date || !foodId) {
       return res.status(404).json({ message: "Missing either rating or date or foodItem field" })

    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 10) {
        return res.status(404).json({ message: "rating must be integer and in range [0 ,10]" })
    }
        const objectId = new mongoose.Schema.ObjectId(foodId)
        console.log("oid",objectId)
    const record = await dailyFood.findOne({ date: date, foodId: objectId })
    // if (!record) {
    //    return res.status(500).json({ message: "Food item for rating is not found" })

    // }
        //    console.log("rec id",record._id)
        
//     const existUserRatingRecord = await Rating.deleteMany({
//         dailyFoodId: record._id,
//         user: user._id,
//     })
//     const ratingRecord = await Rating.create({
//         dailyFoodId: record._id,
//         user: user._id,
//         rating: rating
//     })
//         console.log("delete record", existUserRatingRecord)
//          console.log( "new record", ratingRecord)
        //    return  res.status(201).json({ rateting: ratingRecord })
        return res.status(201).json({ok:"ok"})
    } catch (error) {
console.log("server err",error)
    }
})
