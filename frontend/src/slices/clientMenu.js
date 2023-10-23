import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { selectWeekMenu } from "./menuSlice";
import { useSelector, useDispatch } from 'react-redux'
import { getWeekDays } from "../helper/calculateDay";


const initialState = {
    anchorDate: null,
    weekdata: {},
    error: ""
}

const FETCH_MENU_API = "api/dining/menu"
const KEYWORD_API = "api/dining/keyword"
const RATING_API = "api/dining/rating"
const FETCH_KEYWORD = KEYWORD_API
const POST_KEYWORD = KEYWORD_API
const FETCH_RATING = RATING_API
const POST_RATING = RATING_API
export const fetchMenu = createAsycnThunk(
    "client/fetchMenu", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_MENU_API, { params })
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)
export const fetchRating = createAsyncThunk(
    "client/fetchRating", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_RATING, { params })
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)
export const fetchKeyword = createAsyncThunk(
    "client/fetchKeyword", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_KEYWORD, { params })
            return res.data 
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)
export const postKeyword = createAsyncThunk(
    "client/postKeyword", async (data) => {
        try {
            const res = await axios.post(POST_KEYWORD, data)
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)
export const postRating = createAsyncThunk(
    "client/postRating", async (data) => {
        try {
            const res = await axios.post(POST_RATING, data)
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)


const keywordSlice = createSlice({
    name: "keyword",
    initialState,
    reducers: {
        setAnchorDate: (state, action) => {
            if (!payload) {
                state.error = "expect payload to be nonempty"
                return
            }
            const { anchorDate } = action.payload;
                
            
        } ,
        setKeyword: (state, action) => {
            const dateInWeek = getWeekDays()
            for (let i = 0; i < dateInWeek.length; i++) {
                state[dateInWeek[i]] = null
            }
        },
        addKeyword: (state, action) => {
            const { keyword, date, food_id } = action.payload
            try {

            } catch (error) {
                console.log(error)
                throw error
            }
        }

    },
    extraReducers(builder) {
        builder 
            .addCase(fetchKeyword.fulfilled, (state,action)=> {
            
                state.weekdata = {}
                for (const property in action.payload) {
                    state.weekdata[property] = {}
                    for (let i = 0; i < action.payload.property.length; i++){
                        
                        const _id = action.payload.property[i]._id 
                        state.weekdata[property][_id] = {}
                        state.weekdata[property][id].item=action.payload.property[i]

                    }
                }
                console.log("weekmenu", state.weekdata)
        })
    }


})
export const { setDefaultKeyword } = keywordSlice.actions
