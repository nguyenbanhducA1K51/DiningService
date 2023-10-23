import mongoose from "mongoose"
const menuSchema = mongoose.Schema({
    
    date: {
        type: String,
        required:true
    },
    foodItem: {
        type: mongoose.Schema.ObjectId,
        ref: 'FoodItem',
        required:true
    }
})
export const Menu=mongoose.model("Menu", menuSchema)


