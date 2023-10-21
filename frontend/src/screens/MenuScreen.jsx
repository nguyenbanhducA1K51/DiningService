import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems, selectAllFoodItems } from "../slices/foodItemSlice"
import { getWeekDays } from "../helper/calculateDay"
import { selectWeekMenu, setDefaultWeek, addFoodAtDate, removeFoodAtDate, selectMenuError } from "../slices/menuSlice"
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { RiAddFill } from 'react-icons/ri';
import { Row, Col, Container } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
const MenuScreen = () => {
    const foodItem = useSelector(selectAllFoodItems)
    const dispatch = useDispatch()
    const menu = useSelector(selectWeekMenu)
    const error = useSelector(selectMenuError)

    useEffect(() => {
        dispatch(fetchItems())
        dispatch(setDefaultWeek())
    }, [])

    const DropdownItem = (day) => {
        return (
            <DropdownButton
                title={<RiAddFill />}
                variant="outline-secondary"
            >
                {foodItem.map(item => (
                    <Dropdown.Item onClick={e => { dispatch(addFoodAtDate({ date: day, item: item })) }}> {item.name} </Dropdown.Item>
                ))}

            </DropdownButton>
        );
    };

    const divMenuItem = (day,item) => {
        const iconStyle = {
            color: 'black', 
        };

        const containerStyle = {
            border: '1px solid #dddddd', // Light grey border
            borderRadius: '10px', // Rounded corners
        };
        return (

            <div className="container" style={containerStyle} >
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text">{ item.name}</span>
                    <button type="button" className="btn btn-link clickable-x" onClick={e => { dispatch(removeFoodAtDate({date:day,item:item}))}}>
                        <FaTimes size={24} style={iconStyle} /> 
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <span>{JSON.stringify(menu)}</span>
            <span>{error}</span>
            {getWeekDays().map((day) => (
                <div className="card" >
                    <div className="card-body">
                        <div className="row">

                            <div className="col" >
                                <h5 className="card-title">{day} </h5>
                                {DropdownItem(day)}
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                              

                                    {menu[day] ? menu[day].map((item, index) => (

                                        <div className="col-md-4 "> {divMenuItem(day,item)}</div>

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