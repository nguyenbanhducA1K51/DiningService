import asyncHandler from "express-async-handler"

import { Keyword } from "../models/keywordModel"
import { Menu } from "../models/menuModel"
import mongoose from "mongoose"

export const postKeyWords = asyncHandler(async (req, res) => {
 const {user}=req 
    const { date, food_id ,keywords} = req.body 
    if (!date || !food_id ||!keywords) {
        res.status(404).json({ message: "Missing either date or food id" })

    }
    if (!Array.isArray(keywords)) {
        res.status(404).json({ message: "param keywords must be an array" })
        
    }
    for (let i = 0; i < keywords.length; i++){
        if (typeof keywords[i] != "string") {
            res.status(404).json({message:"expect each value in keyword params to be string"})
        }
    }
    const objectId=new mongoose.Schema.ObjectId(food_id)
    const menuRecord=await Menu.findOne({ date:date,fooditem:objectId})
    if (!menuRecord) {
        res.status(404).json({ message: "The corresponding food item in given date is not found" })
        
    }

    const keywordRecord = Keyword.create({
        user: user._id,
        food: objectId,
        keyword:keywords
    })
    res.status(201).send({record:keywordRecord})

})
export const getKeywords = asyncHandler(async (req, res) => {

    const { date, food_id } = req.query
    if (!date || !food_id) {
        res.status(404).json({ message: "Missing either date or food id" })

    }
    const objectId = new mongoose.Schema.ObjectId(food_id)
    const menuRecord = await Menu.findOne({ date: date, fooditem: objectId })
    if (!menuRecord) {
        res.status (404).json({message:"cannot find the food in the given date"})
    }
    const keywords = []
    const keywordRecords = await Keyword.find({ food: objectId })
    for (let i = 0; i < keywordRecords.length; i++){
        keywords=keywords.concat(keywordRecords[i])
    }
    res.status(201).json({keywords:keywords})
})