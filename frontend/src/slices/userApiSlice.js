import {apiSlice } from './apiSlice'
const USERS_URL = "/api/users"
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder )=> ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body:data
            })  
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: "POST",
                body:data

            })
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                
         })
        }),
        update: builder.mutation({
            query: (data) => ({
                
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body:data
            })
        }),
        default: builder.mutation({
            query: (data) => ({
            url:`${USERS_URL}/trial`,
            method: "POST",
            body:data})
        })

    })
})


export const {useDefaultMutation, useLoginMutation,useLogoutMutation,useRegisterMutation ,useUpdateMutation} = userApiSlice;
