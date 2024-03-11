import Header from "./components/Header"

import {Container} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./style.css"
import { useSelector } from 'react-redux'



const App = () => {
  
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
      <div >   
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

