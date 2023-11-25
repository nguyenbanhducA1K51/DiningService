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
    fileIden: {
        type: String,
        require: true
    }

})
export const Food = mongoose.model('Food', foodSchema)


