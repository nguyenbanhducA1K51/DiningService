import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    foodList: [],
    status: "iddle",
    error: null
}
const FOOD_API = "api/dining/food"
const FETCH_ITEM = `${FOOD_API}/all`
const CREATE_ITEM = `${FOOD_API}`
const DELETE_ITEM = `${FOOD_API}/delone`
const DELETE_ALL=`${FOOD_API}/delall`
export const fetchItems = createAsyncThunk(
    'foodItem/fetchItems', async () => {
        const res = await axios.get(FETCH_ITEM)
    
        return res.data
    }
)

export const createItem = createAsyncThunk(
    'foodItem/createItem', async (data, { rejectWithValue }) => {
        try {
            // console.log("make request")
            // console.log("data",data)
            const res = await axios.post(CREATE_ITEM, data)
            // console.log("res", res)
        } catch (error) {
            console.log(error)
            if (!err.response || !err.response.data) {
                throw err
            }
            else if (error.request) {
                // The request was made, but there was no response
                console.error('No Response:', error.request);
            }

            state.error = error.response.data.message
        }
        

    }
)
export const deleteItem = createAsyncThunk(
    'foodItem/deleteItem', async (item, { rejectWithValue }) => {
        try {
            const res = await axios.post(DELETE_ITEM, item)
            return res.data
        } catch (error) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue (err.response.data)
        }
      

    }
)
export const deleteAll = createAsyncThunk(
    'foodItem/deleteAll', async ({ rejectWithValue }) => {
        try {
            const res = await axios.post(DELETE_ALL)
            return res.data
            
        } catch (error) {
            if (!err.response) {
                throw err 
            }
            return rejectWithValue(err.response.data)
        }
       
    }
)
export const selectAllFoodItems = state => {

    return state.foodItem.foodList
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
                state.status = 'succeeded'
                state.foodList = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.stastus = "loading"
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = "succeed"

            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(deleteAll.pending, (state, action) => {
                state.stastus = "loading"
            })
            .addCase(deleteAll.fulfilled, (state, action) => {
                state.status = "succeed"

            })
            .addCase(deleteAll.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload

            })

    }
})
export const {clearFoodItemError}=foodItemSlice.actions
export default foodItemSlice.reducer