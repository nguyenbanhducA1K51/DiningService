
import { toast } from "react-toastify"
import { useState, useEffect } from 'react'
import CreateItemScreen from './CreateItem'
import ListFoodItem from './ListFoodItem'
import MenuScreen from "./MenuScreen"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from 'react-router-dom'
const AdminScreen = () => {
    const navigate=useNavigate()
    const [screen, setScreen] = useState("")
    
    return (
        <div>
        
            <nav className="navbar navbar-light bg-light">
                <button type="button" className="b1" onClick= { (e) =>{navigate('/')}}>Home</button>
                <button type="button" className="b1" onClick={(e) => setScreen("create")}>  Create dish</button>
                <button type="button" className="b1" onClick={(e) => setScreen("list")}>List item</button>
                <button type="button" className="b1" onClick={(e)=>setScreen("menu")}>Menu</button>            
            </nav>
            {screen === "create" ? <CreateItemScreen /> : <></>}
            {screen === "list" ? <ListFoodItem /> : <></>}
            {screen==="menu"? <MenuScreen/>:<></> }
            <>
            </>
        </div>

    )
}
export default AdminScreen