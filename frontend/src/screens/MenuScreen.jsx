import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItems, selectAllFoodItems, clearFoodItemError } from "../slices/foodItemSlice"
import { getWeekDays, getTodayDate, reduceToFullDate, fullDateToReduce } from "../helper/calculateDay"
import { selectAnchorDate, clearMenuError, fetchWeekMenu, postWeekMenu, selectWeekMenu, setWeek, addFoodAtDate, removeFoodAtDate, selectMenuError, selectWeekDate } from "../slices/menuSlice"
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { RiAddFill } from 'react-icons/ri';
import { toast } from "react-toastify"
import { FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { format, parse } from 'date-fns'
const MenuScreen = () => {
    const foodItem = useSelector(selectAllFoodItems)
    const dispatch = useDispatch()
    const menu = useSelector(selectWeekMenu)
    const error = useSelector(selectMenuError)
    const anchorDate = useSelector(selectAnchorDate)
    const weekdate=useSelector(selectWeekDate)

    const [date, setDate] = useState(null)

    const [calendarVisible, setCalendarVisible] = useState(false);

    const calendarRef = useRef(null);

    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                closeCalendar();
            }
        };

        if (calendarVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [calendarVisible]);

    useEffect(() => {

        dispatch(clearMenuError())
        dispatch(clearFoodItemError())
        dispatch(fetchItems())
        if (!anchorDate) {
            dispatch(setWeek(getTodayDate()))
            dispatch(fetchWeekMenu({ date: getTodayDate() }))
        }


    }, [])
    useEffect(() => {
        if (anchorDate) {
            console.log(" anchordate change")
            setDate(reduceToFullDate(anchorDate))
            dispatch(fetchWeekMenu({ date: anchorDate }))
        }
       
    }, [anchorDate])

    useEffect(() => {
        if (error) {
            console.log(error)
        }

    }, [error])

    const updateMenu = () => {

        dispatch(postWeekMenu({ menu: menu }))
        
        if (!error) {
            toast.success("Menu updated")
        }

    }

    const updateAnchorDate = (date) => {

        closeCalendar()
        const formattedDate = format(date, 'yyyy-MM-dd');

        dispatch(setWeek({ anchorDate: formattedDate }))
       
       
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
            <div className="row" style={{
            position: 'relative',
            }}>
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <div >
                    <button onClick={toggleCalendar} className="btn btn-dark">Show Calendar</button>

                    </div>
                    <div>

                        {calendarVisible && (
                            <div
                                ref={calendarRef}
                                style={{
                                    display: "inline-block",
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    maxWidth: 'unset',
                                    zIndex: 1000,
                                }}
                            >
                                <Calendar
                                    onChange={updateAnchorDate}
                                    value={date}
                                />
                            </div>
                        )}
                    </div>
                    
                
                </div>
           
                
            

                <div className=" col d-flex justify-content-center align-items-center"> <button className="btn btn-outline-dark m-3" onClick={e => { updateMenu() }}>Update menu</button></div>
        </div>

            {weekdate.map((day) => (
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