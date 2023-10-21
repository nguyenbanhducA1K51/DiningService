import mongoose from "mongoose";
 const foodItemSchema = mongoose.Schema({
     food_id: {
         type: mongoose.Schema.Types.ObjectId,
         auto: true,
    },
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


