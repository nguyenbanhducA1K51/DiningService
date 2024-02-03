
import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {resetError, selectClientWeekKeyword, selectAnchor, setAnchorDate, selectUserKeyword, fetchUserKeyword, selectError, selectClientWeekMenu, fetchMenu, fetchRating, fetchKeyword, postKeyword, postRating } from "../slices/clientMenu";
import { selectUserWeekRating, selectWeekRating,selectClientImages } from "../slices/clientMenu";
import { Modal } from 'react-bootstrap';
import { dateToWeekDay } from "../helper/calculateDay";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, parse } from 'date-fns'
import { reduceToFullDate } from "../helper/calculateDay";
import { LinkContainer } from "react-router-bootstrap";
import { CardFood } from "../components/menu/card-food";

const MenuDisplayScreen = () => {

    const userDataRating = useSelector(selectUserWeekRating)
    const dataRating = useSelector(selectWeekRating)
    const images=useSelector(selectClientImages)
    const weekKeyword = useSelector(selectClientWeekKeyword)
    const anchorDate = useSelector(selectAnchor)
    const dispatch = useDispatch()
    const clientMenu = useSelector(selectClientWeekMenu)
   
    const APIerror = useSelector(selectError)
    const { userInfo } = useSelector((state) => state.auth)
    const dataUserkeywords = useSelector(selectUserKeyword)
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [dateCalendar, setDateCalendar] = useState(null)
    const calendarRef = useRef(null);
    const DEFAULT_DATE = "2023-10-25"
    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };
    const isAuthorized = () => {

        if (userInfo.permission == 9) {
            return true
        }
        return false
    }
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

    const updateAnchorDate = (calendarDate) => {

        closeCalendar()
        const formattedDate = format(calendarDate, 'yyyy-MM-dd');

        dispatch(setAnchorDate({ anchorDate: formattedDate }))
    }

    const updateKeywords = () => {
        dispatch(fetchKeyword({ anchorDate: anchorDate }))
        dispatch(fetchUserKeyword({ anchorDate: anchorDate }))
    }
    const updateMenu = () => {
        dispatch(fetchMenu({ date: anchorDate }))
    }
    useEffect(() => {
        if (anchorDate) {
            console.log(" anchordate change")
            setDateCalendar(reduceToFullDate(anchorDate))
            updateKeywords()
            updateMenu()
           
            
        }
    }, [anchorDate])

    useEffect(() => {
        dispatch(fetchMenu({ date: DEFAULT_DATE }))
        dispatch(fetchKeyword({ anchorDate: DEFAULT_DATE }))
        dispatch(fetchUserKeyword({ anchorDate: DEFAULT_DATE }))
        dispatch(fetchRating({ anchorDate: DEFAULT_DATE }))

    }, [])
    useEffect(() => {
        if (APIerror) {
            toast.error(APIerror)
            dispatch(resetError())
        }
    }, [APIerror])

    const renderFoodCard = (date, dailymenu, id,index) => {
        if (dailymenu && dailymenu[id]) {
            const foodId = dailymenu[id]["_id"]
            const name = dailymenu[id].name
            const imageData = images[foodId]["data"]
            const extend = images[foodId]["type"]
            const keywords = weekKeyword[date]?.[id]
            const userKeywords = dataUserkeywords[date]?.[id]
            
            return (
              
                <CardFood key={ index} prop={{extend, imageData, name, keywords,date,foodId,userKeywords}} />
            );
        } else {
            return <></>;
        }

    }

    const DailyMenu = (day, dailymenu) => {
        return (
            <>
                <span className="bold-text"> {dateToWeekDay(day)} {day}</span>
                <div className="m-2 flex flex-wrap items-center  justify-center space-y-2" >
                    {Object.keys(dailymenu).map((id, index) => (                     
                        renderFoodCard(day, dailymenu, id, index)
                    ))}
                </div>


            </>
        )
    }
   
    


    const CalendarComponent = () => {
        return (
            <div className="col d-flex flex-column justify-content-center align-items-center" style={{
                position: 'relative'
            }}>

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

                                value={dateCalendar}
                            />
                        </div>
                    )}
                </div>


            </div>
        )
    }
    return (
        <>
            

            <CalendarComponent />
          
            
            <div className="py-5 " >


                <div className="flex justify-between">

                <div className="d-flex  m-3">
                    <button onClick={e => toggleCalendar()} className="btn btn-dark">Show Calendar</button>

                </div>
                    {isAuthorized ()?

                        <LinkContainer to="/admin">
                            <button ><span className="border border-black rounded-md p-2">Admin Page</span></button>
                        </LinkContainer>
                        : <></>}
                </div>
                
                <div className="container">

                    <div className="menu ">
                        {
                            Object.keys(clientMenu).map((day, index) => (
                                <div key={ index}  className="mt-3 ">
                                    {DailyMenu(day, clientMenu[day])}

                                </div>

                            ))
                        }
                    </div>
                </div>


            </div>
        </>
    )
}

export default MenuDisplayScreen 