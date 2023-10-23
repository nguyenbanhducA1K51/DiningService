import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchMenu,fetchRating,fetchKeyword,postKeyWord,postRating } from "../slices/clientMenu";
import { getTodayDate } from "../helper/calculateDay";
import { Modal} from 'react-bootstrap';
const Hero = () => {
    const imgSource = "/image/imagestorage/"
    const dispatch = useDispatch()
    const menu = useSelector(selectWeekMenu)
    const weekDates = useSelector(selectWeekDate)
    const anchorDate=useSelector(selectAnchorDate)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        console.log("dispatch from hero")
        if (!anchorDate) {
            dispatch(setWeek({ anchorDate:getTodayDate() }))
            dispatch(fetchWeekMenu({ date: getTodayDate() }))
        }
    }, [])

    const dailyMenu = (day, dailymenu) => {


        return (

            <>
                <span> {day}</span>
                <div className="row">
                    {dailymenu.map((dish, index) => (

                        <div id={index} className="col-md-2">

                            <div class="card " >
                                <div class="card-body">
                                    <h5 class="card-title text-center">{dish.name}</h5>
                                    <div className="img-contain">
                                        <img onCLick={handleShow} src={`${imgSource}/${dish.filePath}`} className="img-fluid rounded mx-auto d-block " alt="Your Image"></img>
                                        </div>
                                   
                                    <div>
                                        <div>
                                            <img src="/src/images/yummy.png" className="rounded-image" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    ))}
                </div></>
        )
    }
    return (

        <div className="py-5">
            <div className="container">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Floating Div</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This is a floating div.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="menu">
                    {
                        weekDates.map((day, index) => (
                            <div id={index} className="mt-3">
                                {dailyMenu(day, menu[day])}
                            </div>

                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Hero