import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems, selectAllFoodItems } from "../slices/foodItemSlice"
import { getWeekDays, getTodayDate } from "../helper/calculateDay"
import { fetchWeekMenu, postWeekMenu, selectWeekMenu, setDefaultWeek, addFoodAtDate, removeFoodAtDate, selectMenuError } from "../slices/menuSlice"
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { RiAddFill } from 'react-icons/ri';
import { toast } from "react-toastify"
import { FaTimes } from 'react-icons/fa';
const MenuScreen = () => {
    const foodItem = useSelector(selectAllFoodItems)
    const dispatch = useDispatch()
    const menu = useSelector(selectWeekMenu)
    const error = useSelector(selectMenuError)

    useEffect(() => {
        dispatch(fetchItems())
        dispatch(setDefaultWeek())
        dispatch(fetchWeekMenu({ date: getTodayDate() }))
        
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
        }

    }, [error])

    const updateMenu = () => {

        dispatch(postWeekMenu({menu:menu}))
        if (!error) {
            toast.success("Menu updated")
        }

    }

    const DropdownItem = (day) => {
        return (
            <DropdownButton
                title={<RiAddFill />}
                variant="outline-secondary"
            >
                {foodItem.map((item, index) => (
                    <Dropdown.Item key={index} onClick={e => { dispatch(addFoodAtDate({ date: day, item: item })) }}> {item.name} </Dropdown.Item>
                ))}

            </DropdownButton>
        );
    };

    const divMenuItem = (day, item) => {
        const iconStyle = {
            color: 'black',
        };

        const containerStyle = {
            border: '1px solid #dddddd', // Light grey border
            borderRadius: '10px', // Rounded corners
        };
        return (

            <div className="container " style={containerStyle} >
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text">{item.name}</span>
                    <button type="button" className="btn btn-link clickable-x" onClick={e => { dispatch(removeFoodAtDate({ date: day, item: item })) }}>
                        <FaTimes size={24} style={iconStyle} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <span>{JSON.stringify(menu)}</span>
            {/* onCLick={alert("go herer")} */}
            <div className="d-flex justify-content-center m-2"> <button className="btn btn-outline-dark" onClick={e => { updateMenu() }}>Update menu</button></div>

            {getWeekDays().map((day) => (
                <div className="card" >
                    <div className="card-body">
                        <div className="row">

                            <div className="col" >
                                <h5 className="card-title">{day} </h5>
                                {DropdownItem(day)}
                            </div>
                            <div className="col d-flex justify-content-around justify-content-center align-items-center ">


                                {menu[day] ? menu[day].map((item, index) => (

                                    <div className="col-md-4 " key={index}> {divMenuItem(day, item)}</div>

                                )) : <></>}

                            </div>
                        </div>


                    </div>

                </div>

            ))}
        </>
    )
}
export default MenuScreen