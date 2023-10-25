import mongoose from "mongoose";
const ratingSchema = mongoose.Schema({

    food: {
        type: mongoose.Schema.ObjectId,
        ref: "dailyFood"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number
    }

})
export const Rating = mongoose.model("Rating", ratingSchema)