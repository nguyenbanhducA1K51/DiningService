import { configureStore } from '@reduxjs/toolkit'
import authreducer from "./slices/authSlices"
import { apiSlice } from './slices/apiSlice'
import foodItemSlice from './slices/foodItemSlice';
import menuSlice from './slices/menuSlice';
const store = configureStore({

    reducer: {
        auth: authreducer,
        foodItem: foodItemSlice,
         menu:menuSlice,
        [apiSlice.reducerPath]: apiSlice.reducer ,
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) ,
    devTools:true
});

export default store;