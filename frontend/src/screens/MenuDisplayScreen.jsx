
import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {resetError, selectClientWeekKeyword, selectAnchor, setAnchorDate, selectUserKeyword, fetchUserKeyword, selectError, selectClientWeekMenu, fetchMenu, fetchRating, fetchKeyword, postKeyword, postRating } from "../slices/clientMenu";
import { selectUserWeekRating, selectWeekRating,selectClientImages } from "../slices/clientMenu";
import { dateToWeekDay } from "../helper/calculateDay";
import 'react-calendar/dist/Calendar.css';
import { format, parse } from 'date-fns'
import { reduceToFullDate } from "../helper/calculateDay";
import { LinkContainer } from "react-router-bootstrap";
import { CardFood } from "../components/menu/card-food";
import { CustomCalendar } from "../components/calendar";

import { ClickOutsideComponent } from "../components/ClickOutsideComponent";
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
    const DEFAULT_DATE = "2023-10-25"
 
   
    const isAuthorized = () => {

        if (userInfo.permission == 9) {
            return true
        }
        return false
    }
    

    const updateAnchorDate = (calendarDate) => {
        setCalendarVisible(false)
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
        dispatch(setAnchorDate({ anchorDate: DEFAULT_DATE }))
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
    
    return (
        <>
          
            {calendarVisible && (
                <ClickOutsideComponent onClose={ e=>{setCalendarVisible(false)}}>
                  {/* <CalendarComponent/>
                   */}
                    <CustomCalendar prop={ {dateCalendar,updateAnchorDate}} />
                </ClickOutsideComponent>
            )}
                   
            <div className="py-5 " >
                <div className="flex justify-between">

                <div className="d-flex  m-3">
                        <button onClick={e => setCalendarVisible(true)} className="btn btn-dark">Show Calendar</button>

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