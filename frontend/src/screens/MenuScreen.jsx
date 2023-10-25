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
 
    const [stateMenu,setStateMenu]=useState({})
    const [date, setDate] = useState(null)

    const [calendarVisible, setCalendarVisible] = useState(false);

    const calendarRef = useRef(null);

    const [errorMessage,setErrorMessage]=useState("")

    
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
            setErrorMessage(error)
        }

    }, [error])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            setErrorMessage("")
        }
    },[errorMessage])
    useEffect(() => {
        if (menu) {
            setStateMenu(JSON.parse(JSON.stringify(menu)))        
        }
        
    },[menu])

    const removeItem = (day, id) => {
        if (stateMenu[day] && stateMenu[day][id]) {
            setStateMenu({
                ...stateMenu,
                [day]: {
                    ...stateMenu[day], 
                    [id]: null
                },
            });
        }
    }
    const addItem = (day, foodItem) => {
        if (stateMenu[day]) {
            if (stateMenu[day][foodItem._id]) {
                setErrorMessage("Not allow duplicate dish in a day")
            
            }
            else {
                setStateMenu({
                    ...stateMenu,
                    [day]: {
                        ...stateMenu[day],
                        [foodItem._id]:foodItem 
                    },
                });
            }
        }
    }
    const updateMenu = () => {

        dispatch(postWeekMenu({ menu: stateMenu }))
        
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

                    <Dropdown.Item key={index} onClick={e => { addItem(day,item) }}> {item.name} </Dropdown.Item>
                ))}

            </DropdownButton>
        );
    };

    
    const divMenuItem = (day,dailyMenu, id) => {
       
        if (dailyMenu[id]) {
            return (

                <div className="container containerStyle "  >
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text">{dailyMenu[id].name}</span>
                        <button type="button" className="btn btn-link clickable-x" >
                            <FaTimes size={24} className="iconStyle" onClick={e=>{removeItem(day,id)}}/>
                        </button>
                    </div>
                </div>
            );
        }     
        
    }
       
  
    return (
        <>
            <div className="row" style={{
            position: 'relative',
            }}>
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <div >
                    <button type="button" onClick={toggleCalendar} className="btn btn-dark">Show Calendar</button>

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
           
                


                <div className=" col d-flex justify-content-center align-items-center"> <button type="button" className="btn btn-outline-dark m-3" onClick={e => { updateMenu() }}>Update menu</button></div>
            </div>
            

            {   Object.keys(stateMenu).map((day,index) => (
                <div id={index} className=" d-flex " >
                  
                        <div className="row flex-fill">

                            <div className="col-md-2 " >
                            <span className=""> {day} </span> 
                                {DropdownItem(day)}
                            </div>
                            <div className="col d-flex justify-content-around justify-content-center align-items-center ">
                            {Object.keys(stateMenu[day]).map((id, subindex) => (

                                <div className="col-md-2 " key={subindex}> {divMenuItem(day, stateMenu[day],id)}</div>

                                )) }

                            </div>
                        </div>
                       
                        
                    
                </div>

            ))}
        </>
    )
}
export default MenuScreen
