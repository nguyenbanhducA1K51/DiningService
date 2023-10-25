import asyncHandler from "express-async-handler"

import { Keyword } from "../models/keywordModel"
import { dailyFood } from "../models/dailyFoodModel"
import mongoose from "mongoose"
import { getWeekFromDate } from "../utils/dateUtils"
export const getKeywordsByUser = asyncHandler(async (req, res) => {
    try {
        console.log("get keyword by user req")
        const {user}=req
        const { anchorDate } = req.query
        if (!anchorDate) {
            res.status(500).json({ message: "Missing  anchor Date " })

        }
        const dates = getWeekFromDate(anchorDate)
        const data = {}
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i]
            data[date] = {}
            const dailyFoodRecords = await dailyFood.find({ date: date })
            if (dailyFoodRecords.length > 0) {
                for (let j = 0; j < dailyFoodRecords.length; j++) {
                    const dailyFoodRecord = dailyFoodRecords[j]
                    const foodId = dailyFoodRecord.foodId
                    const keywordRecords = await Keyword.find({ dailyFoodId: dailyFoodRecord._id,user:user._id })

                    let keywords = []
                    for (let k = 0; k < keywordRecords.length; k++) {
                        console.log("keywordrec", keywordRecords[k])
                        console.log("add keyword", keywordRecords[k].keywords)
                        keywords = [...keywords, ...keywordRecords[k].keywords]
                        console.log("after", keywords)
                    }
                    data[date][foodId] = null

                    if (keywords.length > 0) {
                        data[date][foodId] = keywords

                    }
                }

            }
        }
        console.log("fetch keyword by user ", data)
        return res.status(201).json(data)
    } catch (error) {
        console.log("sys error", error)
        res.status(500)
    }
    
})
export const postKeyWords = asyncHandler(async (req, res) => {
    const { user } = req
    console.log("post", req.body)
    let { date, food_id, keywords } = req.body

    if (!date || !food_id || !keywords) {
        return res.status(404).json({ message: "Missing either date or food id" })

    }
    if (!Array.isArray(keywords)) {
        return res.status(404).json({ message: "param keywords must be an array" })
    }
    

    for (let i = 0; i < keywords.length; i++) {
        if (typeof keywords[i] != "string") {
            return res.status(404).json({ message: "expect each value in keyword params to be string" })
        }
    }
    const objectId = new mongoose.Types.ObjectId(food_id);
    const dailyFoodRecord = await dailyFood.findOne({ date: date, foodId: objectId })
    if (!dailyFoodRecord) {
        return res.status(404).json({ message: "The corresponding food item in given date is not found" })
    }

    const existKeywordRecord = await Keyword.deleteMany({
        user: user._id,
        dailyFoodId: dailyFoodRecord._id
    })
     console.log("delete keyword:", existKeywordRecord)
    if (keywords.length > 0) {
        const keywordRecord = await Keyword.create({
            user: user._id,
            dailyFoodId: dailyFoodRecord._id,
            keywords: keywords
        })
        
        console.log("create", keywordRecord)
        return res.status(201).json({ record: keywordRecord })
    }
    else {
        return res.status(201).json({message: "Empty keywords, no update"})
    }
    
})
export const getKeywords = asyncHandler(async (req, res) => {
try {
    const { anchorDate } = req.query
    if (!anchorDate) {
        res.status(500).json({ message: "Missing  anchor Date " })

    }
    const dates = getWeekFromDate(anchorDate)
    const data = {}
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        data[date] = {}
        const dailyFoodRecords = await dailyFood.find({ date: date })
        if (dailyFoodRecords.length > 0) {
            for (let j = 0; j < dailyFoodRecords.length; j++) {
                const dailyFoodRecord = dailyFoodRecords[j]
                const foodId = dailyFoodRecord.foodId
                const keywordRecords = await Keyword.find({ dailyFoodId: dailyFoodRecord._id })

                let keywords = []
                for (let k = 0; k < keywordRecords.length; k++) {
                    // const arrayKeyword = Array.isArray(keywordRecords[k].keywords )? keywords[k].keywords: [keywordRecords[k].keywords]
                    console.log("add keyword", keywordRecords[k].keywords)
                    keywords = [...keywords,...keywordRecords[k].keywords]
                    console.log( "after", keywords)
                }
                data[date][foodId] = null

                if (keywords.length > 0) {
                    data[date][foodId] = keywords

                }
            }
            
        }
    }
    console.log("fetch keyword ", data)
    return res.status(201).json(data)
} catch (error) {
    console.log("sys error", error)
    res.status(500)
}
    

})