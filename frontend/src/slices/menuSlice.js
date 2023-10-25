import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getWeekDays } from "../helper/calculateDay"
const initialState = {
    anchorDate: null,
    weekmenu: {},
    status: "",
    error: "",
    weekDates: []

}
const MENU_API = "api/dining/dailyFood"
export const fetchWeekMenu = createAsyncThunk(
    'dailyFood/fetchWeekMenu', async (data) => {
        try {
            const params = data
            const res = await axios.get(MENU_API, { params })
            return res.data

        } catch (error) {

            console.log("error", error.response.data.message)
            if (!error.response) {
                throw error
            }
            return rejectWithValue(err.response)
        }
    }
)
export const postWeekMenu = createAsyncThunk(
    'dailyFood/postWeekMenu', async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(MENU_API, data)
            return res.data

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(err.response)
        }
    }
)
export const selectWeekMenu = state => {
    return state.dailyFood.weekmenu
}
export const selectMenuError = state => {
    return state.dailyFood.error
}
export const selectWeekDate = state => {
    return state.dailyFood.weekDates
}
export const selectAnchorDate = state => {
    return state.dailyFood.anchorDate
}

const menuSlice = createSlice({

    name: "dailyFood",
    initialState,
    reducers: {
        clearMenuError: (state, action) => {
            state.error = ""
        },
        setWeek: (state, action) => {
            if (!action.payload) {
                state.error = "expect payload to have some anchor date value"
                return
            }
            let { anchorDate } = action.payload
            if (!anchorDate) {
                anchorDate = new Date().toISOString().slice(0, 10);
            }
            const dateFormatPattern = /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
            if (!dateFormatPattern.test(anchorDate)) {
                state.error = "the value of Date must be formatted as YYYY-MM-DD "
                return
            }
            state.weekDates = []
            state.weekmenu = {}
            state.anchorDate = anchorDate

            getWeekDays(anchorDate).map(day => {
                state.weekmenu[day] = []
                state.weekDates.push(day)
            })

        },
        addFoodAtDate: (state, action) => {
            const { date, item } = action.payload
            state.error = ""
            if (!date || !item) {
                state.error = "Missing date or item in addItemToDate"
                return
            }
            const daymenu = state.weekmenu[date]
            for (let i = 0; i < daymenu.length; i++) {
                if (daymenu[i].name === item.name) {
                    state.error = `item ${item.name} already in dailyFood`
                    return
                }
            }

            state.weekmenu[date].push(item)

        }
        ,
        removeFoodAtDate: (state, action) => {
            const { date, item } = action.payload
            state.error = ""
            if (!date || !item) {
                state.error = "Missing date or item in addItemToDate"
                return
            }

            const daymenu = state.weekmenu[date]
            let idx = -1
            for (let i = 0; i < daymenu.length; i++) {
                if (daymenu[i].name === item.name) {
                    idx = i
                    break

                }
            }
            if (idx == -1) {
                state.error = " Cant find item in the dailyFood"
                return
            }
            daymenu.splice(idx, 1)
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeekMenu.pending, (state, action) => {
                state.status = " loading"
            })
            .addCase(fetchWeekMenu.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.weekmenu = action.payload
            })
            .addCase(fetchWeekMenu.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(postWeekMenu.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(postWeekMenu.fulfilled, (state, action) => {
                state.status = "succeed"

            })
            .addCase(postWeekMenu.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})
export const { clearMenuError, setWeek, addFoodAtDate, removeFoodAtDate } = menuSlice.actions
export default menuSlice.reducer