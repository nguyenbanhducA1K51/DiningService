import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip} from '@fortawesome/free-solid-svg-icons';
// link icon: https://fontawesome.com/icons/grip?f=classic&s=light
export const CardKeyword = ({ prop }) => {
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
                <div className="flex justify-between items-center m-1" >

                <div className="flex space-x-2  ">

                    {reduceKeywords.map((key, index) => (
                       
                            <span key={index} className=" text-xs text-gray font-semibold bg-white p-1 rounded-md">{key}</span>
                       
                    ))}
                    </div>
                    {/* <div className=' flex items-center'> */}
                        <FontAwesomeIcon className='cursor-pointer' icon={faGrip} style={{ color: 'white' }} />
                        
                    {/* </div> */}
                    
                   
                </div>
            </>
        )
    }
    else {
        return <></>
    }
}