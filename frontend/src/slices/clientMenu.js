import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { selectWeekMenu } from "./menuSlice";
import { useSelector, useDispatch } from 'react-redux'
import { getWeekDays } from "../helper/calculateDay";

const initialState = {
    anchorDate: null,
    images:{},
    weekdata: {},
    weekKeyword:{},
    error: "",
    userWeekKeyword: {},
    userWeekRating: {},
    weekRating:{}
}

const FETCH_MENU_API = "api/dining/dailyFood"
const KEYWORD_API = "api/dining/keyword"
const RATING_API = "api/dining/rating"
const FETCH_KEYWORD = KEYWORD_API
const POST_KEYWORD = KEYWORD_API
const FETCH_RATING = RATING_API
const POST_RATING = RATING_API
const DEFAULT_LOGIN = "api/users/trial"
const FETCH_KEYWORD_USER = "api/dining/keyword/user"

export const selectAnchor=state=>{
    return state.clientMenu.anchorDate
}
export const selectUserKeyword = state => {
    return state.clientMenu.userWeekKeyword
}
export const selectUserWeekRating = state => state.clientMenu.userWeekRating 
export const selectWeekRating = state => state.clientMenu.weekRating
export const selectClientImages = state => state.clientMenu.images
export const selectClientWeekMenu = state => {
    return state.clientMenu.weekdata
}
export const selectClientWeekKeyword = state => {
    return state.clientMenu.weekKeyword
}

export const defaultLogin = state => {
    "clientMenu/defaultLogin", async (data) => {
        try {
            const res = await axios.post(DEFAULT_LOGIN, data)
            return res
        } catch (error) {
            console.log("error from default login", error)
        }
    }
}

export const fetchUserKeyword = createAsyncThunk(
    "clientMenu/fetchUserKeyword", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_KEYWORD_USER, { params })
           
            return res.data
        } catch (error) {
            console.log("Error fetchUserKeyword::", error)
            throw new Error (" Error getting keywords")
        }
    }
)

export const fetchMenu = createAsyncThunk(
    "clientMenu/fetchMenu", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_MENU_API, { params })
            return res.data
        } catch (error) {
            console.log("Error fetchMenu ::",error)
            throw new Error ("Error fetch menu")
        }
    }
)
export const fetchRating = createAsyncThunk(
    "clientMenu/fetchRating", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_RATING, { params })
            return res.data
        } catch (error) {   
            console.log("Error fetchRating", error)
            throw new Error( "Failed to fetch Ratings")
        }
    }
)
export const fetchKeyword = createAsyncThunk(
    "clientMenu/fetchKeyword", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_KEYWORD, { params })
            return res.data
        } catch (error) {      
            console.log("Error fetch Keywords ::", error)
            throw new Error("Error fetch keyword")
        }
    }
)
export const postKeyword = createAsyncThunk(
    "clientMenu/postKeyword", async (data) => {
        console.log("data::",data);
        
        try {
            const res = await axios.post(POST_KEYWORD, data)
            return res.data
        } catch (error) {
            console.log("Error post Keywords ::", error)
            throw new Error("Error post keyword")
        }
    }
)
export const postRating = createAsyncThunk(
    "clientMenu/postRating", async (data) => {
        try {
            const res = await axios.post(POST_RATING, data)
            return res.data
        } catch (error) {
            console.log("Error post Rating::", error)
            throw new Error("Error post Rating")
        }
    }
)
export const selectError = state => {
    return state.clientMenu.error
}

const clientMenuSlice = createSlice({
    name: "clientMenu",
    initialState,
    reducers: {
        setAnchorDate: (state, action) => {
            if (!action.payload) {
                state.error = "expect payload to be nonempty"
                return
            }
            let{ anchorDate } = action.payload;
            if (!anchorDate) {
                anchorDate = new Date().toISOString().slice(0, 10)
            }
            state.anchorDate = anchorDate


        },
        

    },
    extraReducers(builder) {
        builder
            .addCase(fetchMenu.fulfilled, (state, action) => {

                state.weekdata = action.payload.menu 
                state.images=action.payload.images
                
            })
            .addCase(fetchKeyword.fulfilled, (state, action) => {
                
                state.weekKeyword=action.payload
               
            })
            .addCase(fetchUserKeyword.fulfilled, (state, action) => {
               state.userWeekKeyword=action.payload

            })
            .addCase(fetchRating.fulfilled, (state,action)=> {
                state.weekRating = action.payload.rating 
                state.userWeekRating=action.payload.userRating 
        
        
            })
        
        
            .addCase(fetchUserKeyword.rejected, (state, action) => {           
                state.error = action.error.message
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(fetchRating.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(fetchKeyword.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(postRating.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(postKeyword.rejected, (state, action) => {
                state.error = action.error.message
            })
    }



})
export const { setAnchorDate, setKeyword, addKeyword } = clientMenuSlice.actions
export default clientMenuSlice.reducer