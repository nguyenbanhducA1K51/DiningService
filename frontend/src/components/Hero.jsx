import MenuDisplayScreen from "../screens/MenuDisplayScreen";
import { useSelector, useDispatch } from 'react-redux'
import { defaultLogin } from "../slices/clientMenu";
import { useDefaultMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlices";
import { toast } from "react-toastify"
const Hero = () => {
    const dispatch = useDispatch()
    const [defaultLogin,{isLoading}]= useDefaultMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const trialLogin = async (role) => {
        try {
            const res = await defaultLogin({ role }).unwrap()
            dispatch(setCredentials({...res}))
        } catch (err) {
            console.log("error".err)
            toast.error(err?.data?.message || err.error)
        
        }

    }

    const landing = () => {
        return (
            <>
                <div>
                    <div className="d-flex flex-column white-text p-4">

                        <h2 className="head1">

                            Dining service rating
                        </h2>
                        <div className="  describe-text d-flex flex-column">
                            <div>

                                <span >  Prototype web-application  provides students
                                    information of weekly menu.</span>
                            </div>
                            <br ></br>
                            <div>

                                <span>Allow rating food quality by score and keywords.</span>
                            </div>
                            <br></br>
                            <div>

                                <span>  Admin page to manage dining weekly schedule.</span>
                            </div>


                        </div>
                        <div className="d-flex justify-content-between button-div mt-2">
                            <button className="btn btn-dark" onClick={e=>{trialLogin("admin")}}> Try admin</button>
                            <button className="btn btn-outline-light" onClick={e=>{trialLogin("user")}}> Try student</button>
                        </div>
                    </div>

                </div>

            </>
        )
    }
    return (
        <>
            {userInfo ?  <> <MenuDisplayScreen/> </>:landing()}
            </>
    )
}
export default Hero