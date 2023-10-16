import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseQuery = fetchBaseQuery({ baseUrl: "" })
export const apiSlice = createApi({
    baseQuery,
    tagType: ['User'],
    endpoints: (builder) => ({
        
    })
})

export default apiSlice 