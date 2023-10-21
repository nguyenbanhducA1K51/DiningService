import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getWeekDays } from "../helper/calculateDay"
const initialState = {
    weekmenu: {},
    status: "",
    error: ""

}
export const fetchWeekMenu = createAsyncThunk(
    'menu/fetchWeekMenu', async (data = getWeekDays()) => {
        const res = await axios.get("api/menu/", data)
        console.log("response ", res.data)
        return res.data
    }
)
export const selectWeekMenu = state => {
    return state.menu.weekmenu
}
export const selectMenuError = state => {
    return state.menu.error
}
const menuSlice = createSlice({

    name: "menu",
    initialState,
    reducers: {
        setDefaultWeek: (state, action) => {
            getWeekDays().map(day => {
                state.weekmenu[day] = []
            })

        },
        addFoodAtDate: (state, action) => {
            const { date, item } = action.payload
            state.error = ""
            if (!date || !item) {
                // console.log("Missing date or item in addItemToDate")
                state.error = "Missing date or item in addItemToDate"
                return
            }
            const daymenu= state.weekmenu[date]
            for (let i = 0; i < daymenu.length; i++){
                if (daymenu[i].name === item.name) {
                    state.error = `item ${item} already in menu`
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
                // console.log("Missing date or item in addItemToDate")
                state.error = "Missing date or item in addItemToDate"
                return
            }
            if (!state[date]) {
                // console.log(`${date} not in menu date`)
                state.error = "`${date} not in menu date` "
                return
            }
            if (!state[date].includes(item)) {
                state.error = `item ${item} not in in menu`
                return
            }
            const index= state[date].indexOf(item)
            state[date].splice(index,1)
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
            .addCase(fetchWeekMenu.rejected, (state, error) => {
                state.status = "failed"
                state.error = action.error?.message || "default menu fetch error"
            })
    }
})
export const { setDefaultWeek, addFoodAtDate, removeFoodAtDate } = menuSlice.actions
export default menuSlice.reducer