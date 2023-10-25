import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { selectWeekMenu } from "./menuSlice";
import { useSelector, useDispatch } from 'react-redux'
import { getWeekDays } from "../helper/calculateDay";


const initialState = {
    anchorDate: null,
    weekdata: {},
    error: "",
    userWeekKeyword:{}
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
export const selectUserKeyword = state => {
    return state.clientMenu.userWeekKeyword
}
export const fetchUserKeyword = createAsyncThunk(
    "clientMenu/fetchUserKeyword", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_KEYWORD_USER, { params })
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
export const selectClientWeekMenu = state => {
    return state.clientMenu.weekdata
}
export const defaultLogin = state => {
    "clientMenu/defaultLogin", async (data) => {
        try {
            const res=await axios.post( DEFAULT_LOGIN,data)
            console.log(res)
            return res
        } catch (error) {
            console.log("error from default login",error)
        }
    }
}
export const fetchMenu = createAsyncThunk(
    "clientMenu/fetchMenu", async (data) => {
        try {
            const params = data
            const res = await axios.get(FETCH_MENU_API, { params })

            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            console.log("full error", error)
            state.error = error.response.data.message
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
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
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
            if (!error.response) {
                throw error
            }
            console.log("error", error.response.data.message)
            state.error = error.response.data.message
        }
    }
)
export const postKeyword = createAsyncThunk(
    "clientMenu/postKeyword", async (data) => {
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
    "clientMenu/postRating", async (data) => {
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
export const selectError = state => {
    return state.clientMenu.error
}

const clientMenuSlice = createSlice({
    name: "clientMenu",
    initialState,
    reducers: {
        setAnchorDate: (state, action) => {
            if (!payload) {
                state.error = "expect payload to be nonempty"
                return
            }
            const { anchorDate } = action.payload;
            if (!anchorDate) {
                anchorDate = new Date().toISOString().slice(0, 10)
            }
            console.log("anchor", anchorDate)
            state.anchorDate = anchorDate


        },
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
            .addCase(fetchMenu.fulfilled, (state, action) => {

                state.weekdata = {}
                for (const property in action.payload) {
                    if (action.payload.hasOwnProperty(property)) {

                        state.weekdata[property] = {}
                        for (let i = 0; i < action.payload[property].length; i++) {
                            const _id = action.payload[property][i]._id
                            state.weekdata[property][_id] = {}
                            state.weekdata[property][_id].item = action.payload[property][i]

                        }
                    }
                }

            })
            .addCase(fetchKeyword.fulfilled, (state, action) => {
                for (const property in action.payload) {
                    if (action.payload.hasOwnProperty(property)) {
                        const dailyMenu=action.payload[property]
                        if (!state.weekdata[property]) {
                            state.weekdata[property]={}
                        }
                        for (const foodId in dailyMenu) {
                            if (dailyMenu.hasOwnProperty(foodId)) {
                                if (!state.weekdata[property][foodId]) {
                                    state.weekdata[property][foodId]={}
                                }
                                state.weekdata[property][foodId].keywords=dailyMenu[foodId]

                            }
                        }

                    }
                }
               
            })
            .addCase(fetchUserKeyword.fulfilled, (state, action) => {
               state.userWeekKeyword=action.payload

            })
    }


})
export const { setAnchorDate, setKeyword, addKeyword } = clientMenuSlice.actions
export default clientMenuSlice.reducer