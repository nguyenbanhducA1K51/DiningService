import mongoose from "mongoose";
const foodSchema = mongoose.Schema({
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
export const Food = mongoose.model('Food', foodSchema)


