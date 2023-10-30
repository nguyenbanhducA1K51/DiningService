
import { useState, useEffect,useRef } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {selectClientWeekKeyword,selectAnchor,setAnchorDate,selectUserKeyword, fetchUserKeyword,selectError, selectClientWeekMenu, fetchMenu, fetchRating, fetchKeyword, postKeyword, postRating } from "../slices/clientMenu";
import { selectUserWeekRating, selectWeekRating , } from "../slices/clientMenu";
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { dateToWeekDay } from "../helper/calculateDay";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, parse } from 'date-fns'
import { reduceToFullDate } from "../helper/calculateDay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const MenuDisplayScreen = () => {

    const userDataRating=useSelector(selectUserWeekRating)
    const dataRating=useSelector (selectWeekRating)
    const weekKeyword= useSelector(selectClientWeekKeyword)
    const anchorDate=useSelector(selectAnchor)
    const imgSource = "/image/imagestorage/"
    const dispatch = useDispatch()
    const clientMenu = useSelector(selectClientWeekMenu)
    const [error, setError] = useState("")
    const sliceError = useSelector(selectError)
    const [date, setDate] = useState(null)
    const [foodId, setFoodId] = useState(null)
    const [showFullKeyword, setShowFullKeyword] = useState(false)
    const [fullKeyword,setFullKeyword]=useState([])
    const [show, setShow] = useState(false);
    const dataUserkeywords = useSelector(selectUserKeyword)
    const [userKeywords,setUsersKeyword]=useState([])
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [ dateCalendar,setDateCalendar]=useState(null)
    const calendarRef = useRef(null);

    const [rating,setRating]=useState(10)

    const DEFAULT_DATE="2023-10-25"
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

    const updateAnchorDate = (calendarDate) => {

        closeCalendar()
        const formattedDate = format(calendarDate, 'yyyy-MM-dd');
        
        dispatch(setAnchorDate({ anchorDate: formattedDate }))


    }

    const handleCloseFullKeyword = () => {
        setShowFullKeyword(false)
    }

    const handleClose = () => setShow(false);

    const style = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
    };


    const handleShow = (date) => {
        
        setShow(true)
    };
    useEffect(() => {
        if (anchorDate) {
            console.log(" anchordate change")
            setDateCalendar(reduceToFullDate(anchorDate))
            dispatch(fetchMenu({ date: anchorDate}))
            dispatch(fetchKeyword({ anchorDate: anchorDate }))
            dispatch(fetchUserKeyword({ anchorDate: anchorDate }))
            dispatch(fetchRating({ date: anchorDate }))
        
        }

    }, [anchorDate])

    useEffect(() => {
        dispatch(fetchMenu({ date: DEFAULT_DATE }))
        dispatch(fetchKeyword({ anchorDate: DEFAULT_DATE }))
        dispatch(fetchUserKeyword({anchorDate:DEFAULT_DATE}))
        dispatch(fetchRating ({anchorDate:DEFAULT_DATE}))
    
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
            setError("")
        }
    }, [error])


   
    const addKeyword = () => {
        const value=document.getElementById("keywordInput").value
        if (value.length > 15) {
            setError("keyword length must be less than 15 character")
            return
        }
        const duplicateKeyword = userKeywords.filter(key => { return key == value })
        if (duplicateKeyword.length > 0) {
           
            setError("key word exist!")
            return
        }
        const newKeywordList = value.length > 0 ? [...userKeywords, value] : userKeywords
        setUsersKeyword(newKeywordList)
        document.getElementById("keywordInput").value=""
        
    
    }
    const updateKeywords = () => {
        // const userRating=document.getElementById("rating").value

        // if (userRating < 0 || userRating > 10) {
        //     setError("Invalid rating")
        //     return
        // }
        
        dispatch(postKeyword({ date: date, food_id: foodId, keywords: userKeywords }))
        // dispatch (postRating({rating:userRating,date:date,foodId:foodId}))
        setError(sliceError)
        if (!error) {
            toast.success("updated ! reload to see your keywords")
        }
        
     
    }
    const removeKeyword = (keyword) => {
        const filter = userKeywords.filter(key => {
            return key != keyword
        })
        setUsersKeyword(filter)
    }
    const renderKeywords = (keywords) => {

        let displaykeywords = []
        if (!Array.isArray(keywords)) {
            displaykeywords = [keywords]
        }
        else {
            displaykeywords = keywords
        }
        //  to prevent overflow. we will only display limit number of keyword
        const reduceKeywords=displaykeywords.slice(0,6)
        return (
            <>
                <div className="row d-flex m-2">
                    {reduceKeywords.map((key, index) => (
                        <div id={ index} className="col-md-3 card p-1 m-1">
                            <span className="text-keyword">{key}</span>
                        </div>
                    ))}
                </div>
            </>
        )

    }
    const renderFoodCard = (day, dailymenu, id, index) => {

        if (dailymenu && dailymenu[id]) {
            const img_bg = {
                background: `url(${imgSource}${dailymenu[id].filePath})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1 / 1'
            }

            return (
               
                <div id={index} className="card col-md-2  child-card" style={img_bg}>
                    <div className="card-body d-flex justify-content-between flex-column p-1">
                        <div className="d-flex justify-content-center title-div" >
                            
                            <span className=""> {dailymenu[id].name}</span> 
                            </div>
                           
                        </div>
                            <div className="row d-flex justify-content-around">
                            {weekKeyword[day]&& weekKeyword[day][id] ? renderKeywords(weekKeyword[day][id]) : null}
                            </div>
                    <div className="m-1 d-flex ">

                        <div className="white-back">

                            <FontAwesomeIcon icon={faPizzaSlice} size="1x" className="rounded-image"
                                alt=""
                                onClick={(e) => {
                                    handleShow(day, id);
                                    setFoodId(id)
                                    setDate(day)

                                    displayRatingAndKeyword(day, id)

                                }} />
                        </div>
                        

                    </div>

                    </div>

            );
        } else {
            return null;
        }

    }
    
    const DailyMenu = (day, dailymenu) => {
        

        return (

            <>
                <span className="bold-text"> { dateToWeekDay(day)} {day}</span>
                <div className="row parent-card d-flex justify-content-around" >
                    {Object.keys(dailymenu).map((id, index) => (
                        renderFoodCard(day, dailymenu, id, index)
                    ))}
                </div>
           
            
            </>
        )
    }
    const displayFullKeyword = () => {
        setFullKeyword( userKeywords)
        setShowFullKeyword(true)
        handleClose()
    }
    const displayRatingAndKeyword = (date, id) => {
        if (dataUserkeywords[date][id] ) {
            
            setUsersKeyword(dataUserkeywords[date][id])
        }
        else {
            setUsersKeyword([])
        }
        
    }
    const RatingAndKeyword = () => {

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rating</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="mb-1 small" >Remember to add your keywords before update </span>
                    {/* <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Rating</span>
                        </div>
                        <input id="rating" type="number" class="form-control" placeholder="Give a number from 0 to 10"  aria-describedby="basic-addon1"/>
                    </div> */}
                    
                    <div className="input-group mb-3">
                        
                       

                        <input id='keywordInput' type="text" className="form-control" placeholder="Add your keyword"  aria-label="keyword" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={e => { addKeyword() }} >Add </button>
                        </div>
                    </div>
                    <div className="row  d-flex justify-content-around">
                        { userKeywords.slice(0, 6).map((key, index) => (
                            <div id={index} className="col-md-4 m-3 d-flex justify-content-between align-items-center containerStyle">
                                <span>{key}</span>
                                <button type="button" className="btn btn-link clickable-x " onClick={e => removeKeyword(key)} >
                                    <FaTimes size={20} className="iconStyle" />
                                </button>
                            </div>
                        ))}

                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <div className="d-flex flex-column ">

                        <span className="mb-1" >For display convenient it only display 6 keywords at maximum</span>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-dark" onClick={e=>{updateKeywords()}}>Update</button>
                        <button className="btn btn-outline-secondary" onClick={displayFullKeyword} >Full Keyword</button>
                    </div>
                    </div>
                    
                </Modal.Footer>
            </Modal>
        )
    }
    const FloatFullKeyword = () => {

        return (
            <>
            
                <Modal show={showFullKeyword} onHide={handleCloseFullKeyword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Full keywords </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row  d-flex justify-content-around">
                            {fullKeyword ? fullKeyword.map((key, index) => (
                                <div id={ index} className="col-md-4 m-3 d-flex justify-content-between align-items-center containerStyle">
                                    <span>{key}</span>

                                </div>
                            )) : null}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
               
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
            {/* {console.log("err",error)} */}
            <RatingAndKeyword />
            <FloatFullKeyword />
            <CalendarComponent />
            {/* {console.log("week keyword", week3Keyword)} */}
            {/* {console.log("client menu", clientMenu)}
            {console.log("clinet rating", dataRating)} */}
        <div className="py-5 " style={style}>
                <div  className="d-flex  m-3">
                    <button onClick={e => toggleCalendar()} className="btn btn-dark">Show Calendar</button>

                </div>
            <div className="container">
               
                <div className="menu ">
                    {
                        Object.keys(clientMenu).map((day, index) => (
                            <div id={index} className="mt-3 ">
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