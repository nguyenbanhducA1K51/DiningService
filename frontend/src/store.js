import { configureStore } from '@reduxjs/toolkit'
import authreducer from "./slices/authSlices"
import { apiSlice } from './slices/apiSlice'

const store = configureStore({

    reducer: {
        auth: authreducer,
        [apiSlice.reducerPath]:apiSlice.reducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) ,
    devTools:true
});

export default store;