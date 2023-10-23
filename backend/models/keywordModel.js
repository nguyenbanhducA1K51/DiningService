import mongoose from "mongoose"
const keywordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    keywords: {
        type:Array
    },
    food: {
        type: mongoose.Schema.ObjectId,
        ref:"Menu"
    }
})
export const Keyword=mongoose.model("Keyword",keywordSchema)