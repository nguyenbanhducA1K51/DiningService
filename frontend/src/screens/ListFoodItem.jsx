
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { fetchItems, selectAllFoodItems, deleteAll, deleteItem, selectStatus, selectError } from "../slices/foodItemSlice"
const ListFoodItem = () => {
    const imgSource = "/image/imagestorage/"

    const dispatch = useDispatch()
    const foodItems = useSelector(selectAllFoodItems)
    const error = useSelector(selectError)
    const status = useSelector(selectStatus)
    
    useEffect(() => {
        dispatch(fetchItems())
    }, [])
    const deleteAll = () => {
        dispatch(deleteAll())
    }
    const deleteOne = (item) => {
        dispatch(deleteItem({ food_id: item._id }))
        dispatch(fetchItems())
    }
    const displayItem = (item) => {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 img-contain ">
                    
                            <img src={`${imgSource}${item.filePath}`} className="img-fluid rounded mx-auto d-block" alt="Your Image"></img>

                       
                    </div>
                    <div className="col-md-6">
                        <h3>{item.name}</h3>
                        <button type="button" className="btn btn-light" onClick={(e) => deleteOne(item)}>delete</button>
                    </div>
                </div>
            </div>
        )

    }
    const display = () => {
        return (
            <>
                <div className="container">
                    <div className="row m-2 ">
                        {foodItems.map((element, index) => (
                            <div key={index} className="col-md-4 mr-1 mb-1">
                                {displayItem(element)}
                            </div>
                        ))}
                    </div>
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