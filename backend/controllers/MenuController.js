import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import path from "path"
import { dailyFood } from "../models/dailyFoodModel"
import { Food } from "../models/foodModel"
import { getWeekFromDate } from "../utils/dateUtils"
import { encodeImage } from "../utils/images"
const getMenu = asyncHandler(async (req, res) => {

    const date = req.query.date
    if (!date) {
        res.status(404)
        throw new Error("cannot get param date")
    }
try {
    let menu = {}
    let images = {}
    const dateInWeek = getWeekFromDate(date)
    for (let index = 0; index < dateInWeek.length; index += 1) {

        const records = await dailyFood.find({ date: dateInWeek[index] })
        if (records) {
            menu[dateInWeek[index]] = {}
            for (let i = 0; i < records.length; i++) {
                const foodRecord = await Food.findOne({ _id: records[i].foodId })
                if (foodRecord) {
                    menu[dateInWeek[index]][foodRecord._id] = foodRecord
                    if (!(foodRecord._id in images)) {
                    
                        const fileIden= foodRecord["fileIden"]
                        const _id = foodRecord._id
                       images[_id]=  encodeImage(fileIden)
                    }
                }

            }
        }
    }
    res.status(201).json({menu:menu, images:images})
} catch (error) {
    console.log(error)
    res.send(401).json({message:"cannot get menu"})
}
   


})

const postMenu = asyncHandler(async (req, res) => {

    try {
        const user = req.user
        if (user.permission != 9) {
            res.status(404).json({ message: "Unothorized operation" })
        }
        const { menu } = req.body
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        for (const key in menu) {
            if (menu.hasOwnProperty(key)) {
                if (!datePattern.test(key)) {
                    res.status(404)
                    throw new Error("expect format of day in object property to be YYYY-MM-DD")
                }
            }
        }
        let createRecord = {}
        let deleteRecord = {}
        for (const key in menu) {
            if (menu.hasOwnProperty(key)) {
                createRecord[key] = []
                const record = await dailyFood.deleteMany({ date: key })
                if (record) {
                    deleteRecord[key] = record
                }
                let daily = {}

                for (const foodId in menu[key]) {
                    if (menu[key].hasOwnProperty(foodId)) {
                        const objectId = new mongoose.Types.ObjectId(foodId);
                        const existItem = await Food.find({ _id: objectId })
                        if (!existItem) {
                            res.status(404)
                            throw new Error(` Cant find food item with _id ${foodItem._id} `)
                        }
                        const dailyRecord = await dailyFood.create({
                            date: key,
                            foodId: objectId

                        })

                        createRecord[key].push(dailyRecord)
                    }
                }
            }
        }

        res.status(201).json({ createRecord, deleteRecord })

    } catch (error) {
        console.log("error from server", error)
        res.status(500)
        throw new Error(error)
    }

})
export { postMenu, getMenu }