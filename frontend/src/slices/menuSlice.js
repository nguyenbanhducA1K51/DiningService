import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getWeekDays } from "../helper/calculateDay"
const initialState = {
    weekmenu: {},
    status: "",
    error: ""

}
const MENU_API = "api/dining/menu"
export const fetchWeekMenu = createAsyncThunk(
    'menu/fetchWeekMenu', async (data) => {
        console.log("data", data)
        const params = data
        const res = await axios.get(MENU_API, { params })
        console.log("response ", res.data)
        return res.data
    }
)
export const postWeekMenu = createAsyncThunk(
    'menu/postWeekMenu', async (data = getWeekDays()) => {
        const res = await axios.post(MENU_API, data)
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
                state.error = "Missing date or item in addItemToDate"
                return
            }
            const daymenu = state.weekmenu[date]
            for (let i = 0; i < daymenu.length; i++) {
                if (daymenu[i].name === item.name) {
                    state.error = `item ${item.name} already in menu`
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
                state.error = " Cant find item in the menu"
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
                state.error = action.error?.message || "default menu fetch error"
            })
            .addCase(postWeekMenu.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(postWeekMenu.fulfilled, (state, action) => {
                state.status = "succeed"
                
            })
            .addCase(postWeekMenu.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error?.message || "default menu post error"
            })
    }
})
export const { setDefaultWeek, addFoodAtDate, removeFoodAtDate } = menuSlice.actions
export default menuSlice.reducer