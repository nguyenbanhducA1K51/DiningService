
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { fetchItems, selectAllFoodItems, selectImages, deleteItem, selectStatus, selectError } from "../slices/foodItemSlice"
const ListFoodItem = () => {
    const dispatch = useDispatch()
    const foodItems = useSelector(selectAllFoodItems)

    const images=useSelector(selectImages)

    useEffect(() => {
        dispatch(fetchItems())
    }, [])
   
    const deleteOne = (item) => {
        dispatch(deleteItem({ food_id: item._id }))
        dispatch(fetchItems())
    }
    const displayItem = (item) => {
        const extend = images[item._id]["type"]
        const data = images[item._id]["data"]
       
        return (
           
            <div className="flex space-x-2">
                
                    <div className=" ">
                        <img src={`data: ${extend};base64, ${data}`} className="w-24 h-24 rounded-md " alt="Your Image"></img>
                      
                    </div>
                    <div className="flex flex-col items-center">
                        <h3>{item.name}</h3>
                        <button type="button" className="btn btn-light" onClick={(e) => deleteOne(item)}>delete</button>
                    </div>
                </div>
          
        )

    }
    const display = () => {
        return (
            <>
                <div className="flex flex-wrap justify-between space-y-2" >
                  
                        {foodItems.map((element, index) => (
                            
                                displayItem(element)
                           
                        ))}
                    </div>
             

            </>
        )

    }
    return (
        <>
           
            
            <div className="mt-4">
                {display()}
            </div>
        </>
    )
}

export default ListFoodItem