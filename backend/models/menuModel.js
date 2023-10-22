import mongoose from "mongoose"
const menuSchema = mongoose.Schema({
    
    weekday: {
        type: String,
        required:true
    },
    foodItem: {
        type: mongoose.Schema.ObjectId,
        ref:'FoodItem'
    }
})
export const Menu=mongoose.model("Menu", menuSchema)


// import mongoose from 'mongoose';
// //import {Address} from './Address.js';
// export const Channel = mongoose.model('Channel',
//     {   
    //         id: mongoose.Schema.Types.ObjectId,
    //         name: String,
    //         path: String,
    //         subscribers: [{
//                        type: mongoose.Schema.Types.ObjectId,
//                        ref: 'Address'
//                       }],
//     });