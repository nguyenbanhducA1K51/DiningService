import mongoose from "mongoose"
const keywordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    keywords: {
        type: Array
    },
    dailyFoodId: {
        type: mongoose.Schema.ObjectId,
        ref: "dailyFood"
    }
})
export const Keyword = mongoose.model("Keyword", keywordSchema)