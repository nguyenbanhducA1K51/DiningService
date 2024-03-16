import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip} from '@fortawesome/free-solid-svg-icons';
// link icon: https://fontawesome.com/icons/grip?f=classic&s=light
import { useState } from 'react';
import { FloatFullKeyword } from './card-fullKeyword';
export const CardKeyword = ({ prop }) => {
    const [floatVisible, setFloatVisible] = useState(false)
    const { keywords } = prop
    if (keywords) {
        
        let displaykeywords = []
        if (!Array.isArray(keywords)) {
            displaykeywords = [keywords]
        }
        else {
            displaykeywords = keywords
        }
        //  to prevent overflow. we will only display limit number of keyword
        const reduceKeywords = displaykeywords.slice(0, 6)
        return (
            <>
                <div className='flex w-full justify-between space-x-1 mx-1'>

             
                    <div className="flex max-w-70 flex-wrap justify-between items-center space-x-1 space-y-1 m-1" >

                    

                    {reduceKeywords.map((key, index) => (
                    
                            <span key={index} className=" text-xs text-gray font-semibold bg-white p-1 rounded-md">{key}</span>
                       
                    ))}
                   
                   
                    </div>
                    <div className='flex items-center justify-center  transition duration-300 ease-in-out transform hover:scale-110 '>

                        <FontAwesomeIcon onClick={e=>{setFloatVisible(true)}} className='cursor-pointer' icon={faGrip} style={{ color: 'white' }} />
                    </div>
                
                {floatVisible? <FloatFullKeyword prop={{keywords:keywords,modelVisible:floatVisible, modelClose:setFloatVisible}}/> :<></>}
                </div>
                <span>{floatVisible}</span>
            </>
        )
    }
    else {
        return <></>
    }
}