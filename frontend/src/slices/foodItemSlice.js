import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useGetFoodItemMutation, useDelFoodAllMutation, useDelFoodSingleMutation } from './foodApiSlice'

import axios from "axios"
const initialState = {
    foodList: [],
    status: "iddle",
    error: null
}
export const fetchItems = createAsyncThunk(
    'foodItem/fetchItems', async () => {
        const res = await axios.get("api/admin/food/all")
        return res.data
    }
)

export const deleteItem = createAsyncThunk(
    'foodItem/deleteItem', async (item) => {
       
        const res = await axios.post("api/admin/food/delone", item)
        // console.log(res)
        
        return res.data

    }
)
export const deleteAll = createAsyncThunk(
    'foodItem/deleteAll', async () => {
        const deleteAll = useDelFoodAllMutation()
        const delResponse = await deleteAll().unwrap()
        // console.log("del all response", delResponse)
        return response
    }
)
export const selectAllFoodItems = state => {
    
    return state.foodItem.foodList
}
export const selectError = state => state.foodItem.error
export const selectStatus=state=> state.foodItem.status
const foodItemSlice = createSlice({
    name: "foodItem",
    initialState,
    reducer: {
    },

        extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.foodList = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error?.message || "default error message from get food list"
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.stastus = "loading"
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = "succeed"

            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error?.message || "default error message from delete"
            })
            .addCase(deleteAll.pending, (state, action) => {
                state.stastus = "loading"
            })
            .addCase(deleteAll.fulfilled, (state, action) => {
                state.status = "succeed"

            })
            .addCase(deleteAll.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error?.message || "default error message from delete"
            })
    }
    }
)

export default foodItemSlice .reducer