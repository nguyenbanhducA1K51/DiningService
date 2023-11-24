import asyncHandler from "express-async-handler"
import { Food } from "../models/foodModel"
import { dailyFood } from "../models/dailyFoodModel"
import mongoose from "mongoose"
import path from "path"
import dotenv from 'dotenv'
dotenv.config()
const fs = require('fs');
const STORAGE_PATH = path.resolve(__dirname + "/../../storage")
const getFood = asyncHandler(async (req, res) => {
  try {
    const returnDocuments = await Food.find({}).exec()
    return res.status(201).json(returnDocuments)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error("Error in finding document")

  }

})

const delAll = asyncHandler(async (req, res) => {

  const user = req.user
  if (user.permission != 9) {
    req.send(404).json({ message: "Unathorized for this operation" })
  }
  const result = await Food.deleteMany({});
  for (record in result) {
    const imagePath = path.join(STORAGE_PATH, "imagestorage", record.filePath)
    // console.log("Find image file ", fs.existsSync(imagePath))
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting the image file: ${err}`);
      } else {
        console.log(`Image file was deleted successfully.`);
      }
    })

  }
  // console.log(`Deleted ${result.deletedCount} records.`);
  res.status(200).json({ message: "delete all the food item in collection" })

})
const delOne = asyncHandler(async (req, res) => {
  const user = req.user
  if (user.permission != 9) {
    req.send(404).json({ message: "Unathorized for this operation" })
  }

  const { food_id } = req.body
  if (!food_id) {
    console.log("erro here")
    res.status(400)
    throw new Error(" Missing food id")

  }
  const object_id = new mongoose.Types.ObjectId(food_id);
  const deletedRecord = await Food.findOneAndRemove({ _id: object_id });
  if (deletedRecord) {
    // console.log("delete record", deletedRecord)
    const imagePath = path.join(STORAGE_PATH, "imagestorage", deletedRecord.filePath)
    // console.log("Find image file ", fs.existsSync(imagePath))
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting the image file: ${err}`);
      } else {
        console.log(`Image file was deleted successfully.`);
      }
    })

    const deletedDailyItem = await dailyFood.deleteMany({ foodId: object_id })

    res.status(200).json({ message: "Deleted item" });
  } else {

    console.log('Record not found.');
    res.status(400)
    throw new Error(" Cannot find that item !")
  }


})
const createFood = asyncHandler(async (req, res) => {

  const user = req.user
  if (user.permission != 9) {
    req.staus(404).json({ message: "Unathorized for this operation" })
  }
  try {
    const { name, description, filePath } = req.body
    console.log("create", req)

    if (!name || !description || !filePath) {
      res.status(400)
      throw new Error("Missing either name, description or file")
    }
    const foodExist = await Food.findOne({ name })

    if (foodExist) {
      res.status(400)
      throw new Error("dish exist")
    }

    const item = await Food.create({
      name,
      description,
      filePath

    })

    res.status(201).json({ "_id": item._id })
  } catch (error) {
    res.status(400)
    console.log(error)
    throw new Error(error)
  }
})

export { createFood, getFood, delOne, delAll }