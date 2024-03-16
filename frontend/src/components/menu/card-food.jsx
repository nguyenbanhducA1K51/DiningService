import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardKeyword } from "./card-keyword";
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CardUserKeyword } from './card-userKeyword';


export const CardFood = ({ prop }) => {
    const { extend, imageData, name, keywords, date, foodId, userKeywords } = prop

    const [modalVisible, setModalVisible] = useState(false)
    
    return (
       
        <div className=" flex flex-col w-36 h-36 m-2 bg-slate-500 rounded-md" style={{ backgroundImage: `url(data:${extend};base64,${imageData})`, backgroundSize: 'cover', }}>
            <div className=" flex justify-between flex-col items-center m-1  h-full">
                <div className="flex items-center justify-center space-x-2 ">
                    <div className=' '>

                        <span className=" p-1 text-sm text-semibold bg-black text-white rounded-md"> {name}</span>
                    </div>
                    <div className=" pl-1 pr-1 bg-white rounded-md border    hover:transform hover:scale-110 cursor-pointer">
                        <FontAwesomeIcon icon={faBowlFood} size="1x" className=""
                            alt=""
                            onClick={(e) => {
                                setModalVisible(!modalVisible)
                            }}
                        />
                        <CardUserKeyword prop={{ userKeywords, foodId, date, modalVisible, setModalVisible }} />
                    </div>
                </div>

                <div className="flex justify-around w-full">
                    <CardKeyword prop={{ keywords }} />
                </div>


                
            </div>

        </div>

    );
}