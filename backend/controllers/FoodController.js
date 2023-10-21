import asyncHandler from "express-async-handler"
import { FoodItem } from "../models/foodModel"
import mongoose from "mongoose"


const getFood = asyncHandler(async (req, res) => {
  try {
    const documents = await FoodItem.find({}).exec()
    const returnDocuments = documents.map((d) => { return { "food_id": d.food_id, "name": d.name, "description": d.description, "filePath": d.filePath } })
    console.log("return documents", returnDocuments.length)
    console.log(returnDocuments)
    return res.status(201).json(returnDocuments)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error("Error in finding document")

  }

})

const delAll = asyncHandler(async (req, res) => {

  const result = await  FoodItem.deleteMany({});
  console.log(`Deleted ${result.deletedCount} records.`);
  res.status(200).json({message: "delete all the food item in collection"})
  
})
const delOne = asyncHandler(async (req, res) => {
    const { food_id } = req.body
  if (!food_id) {
      console.log("erro here")
      res.status(400)
      throw new Error(" Missing food id")

    }
  const object_id = new mongoose.Types.ObjectId(food_id);
  const deletedRecord = await FoodItem.findOneAndRemove( { food_id: object_id });
  if (deletedRecord) {
      console.log("delete record",deletedRecord)
      res.status(200).json({message:"Deleted item"});
    } else {

    console.log('Record not found.');
    res.status(400)
    throw new Error(" Cannot find that item !")
  }


})
const createFood = asyncHandler(async (req, res) => {
  try {
    const { name, description, filePath } = req.body
    if (!name || !description || !filePath) {
      res.status(400)
      throw new Error("Missing either name, description or file")

    }
    const foodExist = await FoodItem.findOne({ name })

    if (foodExist) {
      res.status(400)
      throw new Error("dish exist")
    }

    const item = await FoodItem.create({
      name,
      description,
      filePath

    })
    res.status(201).json({ "food_id": item.food_id })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export { createFood, getFood ,delOne,delAll}