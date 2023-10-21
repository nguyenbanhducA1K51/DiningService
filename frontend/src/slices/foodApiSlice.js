import { apiSlice } from './apiSlice'

const FOOD_URL = "/api/admin/food"
// const USERS_URL = "/api/users"
export const foodAPISlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createFoodItem: builder.mutation({
            query: (data) => ({
                url: `${FOOD_URL}/`,
                method: "POST",
                body: data
            })
        }),
        getFoodItem: builder.mutation({
            query: (data) => ({
                url: `${FOOD_URL}/all`,
                 method: "GET"
                        
            })
        }),
        delFoodSingle: builder.mutation({
            query: (data) => ({
                url: `${FOOD_URL}/delone`,
                method: "POST",
                body: data
                
            })
        }),
        delFoodAll: builder.mutation({
            
            query:(data)=> ({
                url: `${FOOD_URL}/delall`,
                method: "POST"
            
            })
        })
    })

})
export const { useCreateFoodItemMutation,useGetFoodItemMutation,useDelFoodSingleMutation,useDelFoodAllMutation}=foodAPISlice