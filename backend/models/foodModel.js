import mongoose from "mongoose";
 const foodItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        require: true
    }

})
export const FoodItem = mongoose.model('FoodItem', foodItemSchema)


