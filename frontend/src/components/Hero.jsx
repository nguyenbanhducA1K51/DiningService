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
                <div className="flex ">
                    <div className=" flex flex-col w-1/2">

                        <div>
                            
                        <span className="block text-[72px]">
                            Browse the menu and see how people feel !
                        </span>
                        <span className="block text-2xl">
                        Here we provide the weekly menu with information so that you can understand and value what we bring. 
                        </span>
                            </div>

                        <div className="flex items-center justify-start space-x-4 my-4">
                            <button type="button" className="btn btn-dark" onClick={e => { trialLogin("admin") }}> Try admin</button>
                            <button type="button" className="btn btn-outline-dark" onClick={e => { trialLogin("user") }}> Try student</button>
                        </div>
                    </div>


                <div className="flex justify-center mx-4 my-4 ">
                        <img className="object-contain max-w-[500px]" src="/chicken-hero.png" alt="" /> 
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