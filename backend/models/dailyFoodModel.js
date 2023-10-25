import mongoose from "mongoose"
const dailyFoodSchema = mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    foodId:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Food',
        required: true
    }
})
export const dailyFood = mongoose.model("dailyFood", dailyFoodSchema)


