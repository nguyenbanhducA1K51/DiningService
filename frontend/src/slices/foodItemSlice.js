import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
// import { axiosRequest} from "../helper/Request";
const initialState = {
    foodList: [],
    status: "iddle",
    images:[],
    error: null
}
const FOOD_API = "api/dining/food"
const FETCH_ITEM = `${FOOD_API}/all`
const CREATE_ITEM = `${FOOD_API}`
const DELETE_ITEM = `${FOOD_API}/delone`
const DELETE_ALL=`${FOOD_API}/delall`
export const fetchItems = createAsyncThunk(
    'foodItem/fetchItems', async () => {
        try {        
            const res = await axios.get(FETCH_ITEM)
            // const res=await request("GET",FETCH_ITEM,null,null)
            return res.data
        } catch (error) {
            throw new Error("Error fetchItems")
        }
    }
)

export const createItem = createAsyncThunk(
    'foodItem/createItem', async (data, { rejectWithValue }) => {
        try {
            // const res = await request("POST",CREATE_ITEM,null,data)
                await axios.post(CREATE_ITEM, data)
        } catch (error) {
            console.log("Error createItem ::", error)
            throw new Error("Error create Item")
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
                state.status = 'succeeded';
                state.foodList = action.payload.foodList; 
                state.images=action.payload.images
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.status = "loading"
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