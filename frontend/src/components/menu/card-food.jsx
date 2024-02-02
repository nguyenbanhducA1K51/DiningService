import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardKeyword } from "./card-keyword";
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CardUserKeyword } from './card-userKeyword';
export const CardFood = ({ prop }) => {
    const { extend, imageData, name, keywords, date, foodId, userKeywords } = prop

    const [modalVisible, setModalVisible] = useState(false)
    return (

        <div className="card col-md-2  child-card relcontainer" >
            <div className="background-image">

                <img src={`data: ${extend};base64, ${imageData}`} className="backgroundimage" alt="" /> <img />
            </div>
            <div className="foreground d-flex justify-content-between flex-column">

                <div className=" foreground card-body d-flex justify-content-between flex-column p-1">
                    <div className="d-flex justify-content-center title-div" >

                        <span className=""> {name}</span>
                    </div>

                </div>

                <div className="row d-flex justify-content-around">
                    <CardKeyword prop={{ keywords }} />
                </div>
                <div className="flex items-center justify-center m-2">

                    <div className="bg-white rounded-md border  border-black pr-2 pl-2 hover:transform hover:scale-110 cursor-pointer">

                        <FontAwesomeIcon icon={faBowlFood} size="1x" className=""
                            alt=""
                            onClick={(e) => {
                                setModalVisible(!modalVisible)
                            }}
                        />
                        <CardUserKeyword prop={{ userKeywords, foodId, modalVisible, setModalVisible }} />

                    </div>


                </div>

            </div>

        </div>

    );
}