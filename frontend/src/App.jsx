import Header from "./components/Header"
// import HomeScreen from "./screens/HomeScreen"

import {Container} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./style.css"
import { useSelector } from 'react-redux'



const App = () => {
  // const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const background= userInfo? "" : "black-bg"
  return (
    <>
      <div className={background}>   
      <ToastContainer />
      <Header /> 
      <Container >
        <Outlet />        
        </Container>
      </div>

    </>
  )
}
export default App

