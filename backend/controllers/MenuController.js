import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import { Menu } from "../models/menuModel"
import { FoodItem } from "../models/foodModel"
import { getWeekFromDate } from "../utils/dateUtils"

const getMenu = asyncHandler(async (req, res) => {

    try {

        const date = req.query.date
        let menu = {}
        const weekdays = getWeekFromDate(date)
        for (let index = 0; index < weekdays.length; index += 1) {
            const records = await Menu.find({ weekday: weekdays[index] })
            if (records) {
                menu[weekdays[index]] = []
                for (let i = 0; i < records.length; i++) {
                    const foodRecord = await FoodItem.findOne({ _id: records[i].foodItem })
                    if (foodRecord) {
                        menu[weekdays[index]].push(
                            foodRecord
                        )
                    }

                }
            }
        }

        console.log("menu", menu)
        res.status(201).json(menu)
    } catch (error) {
        res.status(500)
        console.log("server error", error)
        throw new Error(error)
    }
})

const postMenu = asyncHandler(async (req, res) => {

    try {
        console.log("body", req.body)
        const user = req.user
        if (user.permission != 9) {
            res.status(404).json({ message: "Unothorized operation" })
        }
        const { menu } = req.body
        console.log("menu post menu", menu)
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        for (const key in menu) {
            if (menu.hasOwnProperty(key)) {
                if (Array.isArray(menu.key)) {
                    res.status(404)
                    throw new Error("expect every property of data to be array")
                }
                if (!datePattern.test(key)) {
                    res.status(404)
                    throw new Error("expect format of day in object property to be YYYY-MM-DD")
                }
            }
        }
        let createRecord = {}
        let deleteRecord = {}
        // use key in since we are retrieve attribute
        for (const key in menu) {
            if (menu.hasOwnProperty(key)) {
                const record = await Menu.deleteMany({ weekday: key })
                if (record) {
                    deleteRecord[key] = record
                }
                let dailyMenu = []
                //  use foodItem in since we are iterate over list
                for (let i = 0; i < menu[key].length; i++) {
                    const foodItem = menu[key][i]
                    if (!foodItem._id) {
                        res.status(404)
                        throw new Error(" Data food Item does not have _id attribute")
                    }
                    const objectId = new mongoose.Types.ObjectId(foodItem._id);
                    const existItem = await FoodItem.find({ _id: objectId })
                    if (!existItem) {
                        res.status(404)
                        throw new Error(` Cant find food item with _id ${foodItem._id} `)
                    }
                    const item = await Menu.create({
                        weekday: key,
                        foodItem: objectId

                    })
                    dailyMenu.push(item)

                }
                createRecord[key] = dailyMenu
            }
        }
        res.status(201).json({ createRecord, deleteRecord })

    } catch (error) {
        console.log("error from server", error)
        res.status(404)
        throw new Error(error)
    }

})
export { postMenu, getMenu }