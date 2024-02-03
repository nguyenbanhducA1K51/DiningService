import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { axiosRequest} from "../helper/Request";
const initialState = {
    foodList: [],

    images:[],
    error: null
}
const FOOD_API = "api/dining/food"
const FETCH_ITEM = `${FOOD_API}/all`
const CREATE_ITEM = `${FOOD_API}`
const DELETE_ITEM = `${FOOD_API}/delone`
export const fetchItems = createAsyncThunk(
    'foodItem/fetchItems', async () => {
        try {        
            const res=await axiosRequest("GET",FETCH_ITEM,null,null)
            return res.data
        } catch (error) {
            throw new Error("Error fetchItems")
        }
    }
)

export const createItem = createAsyncThunk(
    'foodItem/createItem', async (data) => {
        try {
          await axiosRequest("POST",CREATE_ITEM,null,data)          
        } catch (error) {
            console.log("Error createItem ::", error)
            throw new Error("Error create Item")
        }
    }
)
export const deleteItem = createAsyncThunk(
    'foodItem/deleteItem', async (item) => {
        try {
            const res=await axiosRequest("POST",DELETE_ITEM,null,item)
            return res.data
        } catch (error) {
            console.log("Error deleteItem ::", error)
            throw new Error("Error delete Item")
        }
      

    }
)

export const selectAllFoodItems = state => {

    return state.foodItem.foodList
}
export const selectImages = state => {
    return state.foodItem.images
}
export const selectError = state => state.foodItem.error
export const selectStatus = state => state.foodItem.status
const foodItemSlice = createSlice({
    name: "foodItem",
    initialState,
    reducers: {
        clearFoodItemError: (state, action) => {
            state.error = ""
        },
    },

    extraReducers(builder) {
        builder
            .addCase(fetchItems.fulfilled, (state, action) => {
           
                state.foodList = action.payload.foodList; 
                state.images=action.payload.images
            })
            .addCase(fetchItems.rejected, (state, action) => {
             
                state.error = action.error.message
            })         
            .addCase(deleteItem.rejected, (state, action) => {
            
                state.error = action.error.message
            })
            .addCase(createItem.rejected, (state, action) => {

                state.error = action.error.message
            })
    }
})
export const {clearFoodItemError}=foodItemSlice.actions
export default foodItemSlice.reducer