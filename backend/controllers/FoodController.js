import asyncHandler from "express-async-handler"
import { Food } from "../models/foodModel"
import { dailyFood } from "../models/dailyFoodModel"
import { encodeImage } from "../utils/images"
import mongoose from "mongoose"
import path from "path"
import dotenv from 'dotenv'
const IMG_STORE = path.resolve(__dirname + "/../../storage/image")
import fs from "fs"
dotenv.config()

const getFood = asyncHandler(async (req, res) => {
  try {
    const docs = await Food.find({}).exec()
    let images = {}
    for (let i = 0; i < docs.length; i++) {
      const iden = docs[i]["fileIden"] 
      const id = docs[i]["_id"]
      images[id] = encodeImage(iden)
    }
    res.status(201).json({ foodList: docs, images: images })

  } catch (error) {
    console.log(error)
    return res.status(400)
  }
})
const delAll = asyncHandler(async (req, res) => {
  const user = req.user
  if (user.permission != 9) {
    req.send(404).json({ message: "Unathorized for this operation" })
  }
  const result = await Food.deleteMany({});
  for (record in result) {
    const imagePath = path.join(STORAGE_PATH, "imagestorage", record.fileIden)

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting the image file: ${err}`);
      } else {
        console.log(`Image file was deleted successfully.`);
      }
    })

  }
  return res.status(200).json({ message: "delete all the food item in collection" })

})
const delOne = asyncHandler(async (req, res) => {
  const user = req.user
  if (user.permission != 9) {
    req.send(404).json({ message: "Unathorized for this operation" })
  }
try {
  const { food_id } = req.body
  if (!food_id) {
    res.status(400)
    throw new Error(" Missing food id")

  }
  const object_id = new mongoose.Types.ObjectId(food_id);
  const deletedRecord = await Food.findOneAndRemove({ _id: object_id });
  if (deletedRecord) {

   
    const deletedDailyItem = await dailyFood.deleteMany({ foodId: object_id })

    res.status(200).json({ message: "Deleted item" });
  } else {

    console.log('Record not found.');
    res.status(400)
    throw new Error(" Cannot find that item !")
  }
} catch (error) {
  console.log(error)
  res.send(500).json("message:'error when delete'")
}
})
const createFood = asyncHandler(async (req, res) => {

  const user = req.user
  if (user.permission != 9) {
    req.status(404).json({ message: "Unathorized for this operation" })
  }
  try {

    const { name, description, fileIden } = req.body

    if (fileIden == null) {
      console.log("file is null")
      return req.status(404).json({ message: "image is empty" })
    }
    const savePath = path.join(IMG_STORE, fileIden)
    
  
    const foodExist = await Food.findOne({ name })
    if (foodExist) {
      res.status(400)
      throw new Error("dish exist")
    }

    const item = await Food.create({
      name,
      description,
      fileIden

    })

    res.status(201).json({ "_id": item._id })
  
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "cannot create item, try again later" })
  }
})

export { createFood, getFood, delOne, delAll }