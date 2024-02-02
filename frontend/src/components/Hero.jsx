import MenuDisplayScreen from "../screens/MenuDisplayScreen";
import { useSelector, useDispatch } from 'react-redux'
import { useDefaultMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlices";
import { toast } from "react-toastify"
const Hero = () => {
    const dispatch = useDispatch()
    const [defaultLogin, { isLoading }] = useDefaultMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const trialLogin = async (role) => {
        try {
            const res = await defaultLogin({ role }).unwrap()
            dispatch(setCredentials({ ...res }))
        } catch (err) {
            console.log("error".err)
            toast.error(err?.data?.message || err.error)
        }

    }

    const landing = () => {
        return (
            <>
                <div>
                    <div className="flex flex-col space-y-6 text-white mt-3">
                      
                        <h2 className=" text-3xl font-semibold text-center ">
                            Dining service rating
                        </h2>
                        <div className="  flex flex-col text-center">
                            <div>
                               
                                <span >  This Prototype web-application will provides students
                                    information of weekly menu, and show their feeling !</span>
                            </div>
                        

                            <div>

                                <span> Besides, the Admin functionality will help manager to upload and schedule food on weekly basis !</span>
                            </div>


                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <button type="button" className="btn btn-dark" onClick={e => { trialLogin("admin") }}> Try admin</button>
                            <button type="button" className="btn btn-outline-light" onClick={e => { trialLogin("user") }}> Try student</button>
                        </div>
                    </div>

                </div>

            </>
        )
    }
    return (
        <>
            {userInfo ? <> <MenuDisplayScreen /> </> : landing()}
        </>
    )
}
export default Hero