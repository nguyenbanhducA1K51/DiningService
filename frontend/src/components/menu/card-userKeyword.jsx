import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux"

import { postKeyword } from '../../slices/clientMenu';
export const CardUserKeyword = ({ prop }) => {
    const dispatch = useDispatch()
    const { userKeywords, foodId, date, modalVisible, setModalVisible } = prop
    
    const [keywords, setKeywords] = useState( userKeywords ? userKeywords:[] )
  
    const addKeyword = () => {

        const inputElement = document.getElementById("keywordInput")
        const value = inputElement.value.slice()
        inputElement.value=""
    
        if (value.length == 0) {
            toast.error("Cannot post empty keyword !")
            return 
        }
        if (keywords.length == 3) {
            toast.error("Maximum keywords has reached, try do delete first")
        return
        }
        if (value.length > 15) {
            toast.error("Keyword length must be less than 15 character")
            return
        }
        const duplicateKeyword = userKeywords.filter(key => { return key == value })
        if (duplicateKeyword.length > 0) {
            toast.error("Key word exist!")
            return
        }
        const newKeywordList = value.length > 0 ? [...userKeywords, value] : userKeywords
        setKeywords(newKeywordList)
     
   }
    const removeKeyword = (keyword) => {
        const filter = userKeywords.filter(key => {
            return key != keyword
        })
        setKeywords(filter)
    }
    
    const updateKeywords = () => {
        dispatch(postKeyword({ date: date, food_id: foodId, keywords: userKeywords }))

    }
    return (
        <Modal show={modalVisible} onHide={setModalVisible}>
            <Modal.Header closeButton>
                <Modal.Title>Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body className='flex flex-col items-center'>
               
                <span className="mb-1 text-xs" >Do not post too much ! At most three times is ok</span>
                <div className="input-group mb-3">
                    <input id='keywordInput' type="text" className="form-control" placeholder="Add your keyword" aria-label="keyword" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={e => { addKeyword() }} >Add </button>
                    </div>
                </div>
              
                <div className="flex space-x-3 w-full justify-center">
                    {keywords.slice(0, 6).map((key, index) => (
                        <div key={key} id={index} className="flex items-center space-x-1 border border-gray-500 rounded pl-1 pr-1">
                            <span>{key}</span>
                                <FaTimes size={10} className="text-black mt-1 cursor-pointer" onClick={e => removeKeyword(key)} />                         
                        </div>
                    ))}

                </div>
                     
            </Modal.Body>

            <Modal.Footer className=" flex flex-col" >
                    <div className="flex justify-between">
                        <button className="btn btn-dark" onClick={e=> updateKeywords()} >Update</button>                     
                    </div>
            </Modal.Footer>
        </Modal>
    )


}