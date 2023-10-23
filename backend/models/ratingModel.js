import mongoose from "mongoose";
const ratingSchema = mongoose.Schema({
    
    food: {
        type: mongoose.Schema.ObjectId,
        ref:"Menu"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    rating: {
        type:Number
    }

})
export const Rating =mongoose.model("Rating",ratingSchema)