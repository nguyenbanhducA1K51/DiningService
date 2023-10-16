import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import {Container} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <>
      <ToastContainer />
      <Header /> 
      <Container>
        <Outlet />        
      </Container>

    </>
  )
}
export default App

