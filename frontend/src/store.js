import { configureStore } from '@reduxjs/toolkit'
import authreducer from "./slices/authSlices"
import { apiSlice } from './slices/apiSlice'
import foodItemSlice from './slices/foodItemSlice';
import menuSlice from './slices/menuSlice';

import clientMenu from './slices/clientMenu';
const store = configureStore({

    reducer: {
        auth: authreducer,
        foodItem: foodItemSlice,
        dailyFood: menuSlice,
        clientMenu: clientMenu,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;