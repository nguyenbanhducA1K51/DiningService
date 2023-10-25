
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {selectUserKeyword, fetchUserKeyword,selectError, selectClientWeekMenu, fetchMenu, fetchRating, fetchKeyword, postKeyword, postRating } from "../slices/clientMenu";
import { getTodayDate } from "../helper/calculateDay";
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { dateToWeekDay } from "../helper/calculateDay";
import { set } from "mongoose";

const MenuDisplayScreen= () => {
    const imgSource = "/image/imagestorage/"
    const dispatch = useDispatch()
    const clientMenu = useSelector(selectClientWeekMenu)
    const [keywords, setKeywords] = useState([])
    const [inputKeyword, setInputKeyword] = useState("")
    const [error, setError] = useState("")
    const sliceError = useSelector(selectError)
    const [date, setDate] = useState(null)
    const [foodId, setFoodId] = useState(null)
    const [showFullKeyword, setShowFullKeyword] = useState(false)
    const [fullKeyword,setFullKeyword]=useState([])
    const [show, setShow] = useState(false);
    const dataUserkeywords = useSelector(selectUserKeyword)
    const [userKeywords,setUsersKeyword]=useState([])
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
        dispatch(fetchMenu({ date: getTodayDate() }))
        dispatch(fetchKeyword({ anchorDate: getTodayDate() }))
        dispatch(fetchUserKeyword({anchorDate:getTodayDate()}))
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
            setError("")
        }
    }, [error])


   
    const addKeyword = () => {
        const value=document.getElementById("keywordInput").value
        console.log ("inp",value)
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

        
        dispatch(postKeyword({ date: date, food_id: foodId, keywords: userKeywords }))
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
        if (dailymenu[id].item) {
            const img_bg = {
                background: `url(${imgSource}/${dailymenu[id].item.filePath})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1 / 1'
            }

            return (
                <div id={index} className="col-md-3 " >
                    <div className="card" style={img_bg}>
                        <div className="card-body d-flex justify-content-between flex-column">
                            <h5 className="text-center text-card">{dailymenu[id].item.name}</h5>
                           
                        </div>
                            <div className="row d-flex justify-content-around">
                                {dailymenu[id].keywords ? renderKeywords(dailymenu[id].keywords) : null}
                            </div>
                            <div className="m-1">
                                <img
                                    src="/src/images/yummy.png"
                                    className="rounded-image"
                                    alt=""
                                    onClick={(e) => {
                                        handleShow(day, id);
                                        setFoodId(id)
                                        setDate(day)

                                        displayRatingAndKeyword( day,id)


                                    }}
                            />
                          
                            </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }
    
    const dailyMenu = (day, dailymenu) => {


        return (

            <>
                <span> { dateToWeekDay(day)} {day}</span>
                <div className="row">
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

                    <div className="input-group mb-3">
                        <input id='keywordInput' type="text" className="form-control" placeholder="keyword"  aria-label="keyword" aria-describedby="basic-addon2" />
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

                    <span>For display convenient it only display 6 keywords at maximum</span>
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
    return (
        <>
            <RatingAndKeyword />

            <FloatFullKeyword />
        <div className="py-5 " style={style}>

            <div className="container">
               
                <div className="menu">
                    {
                        Object.keys(clientMenu).map((day, index) => (
                            <div id={index} className="mt-3">
                                {dailyMenu(day, clientMenu[day])}

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