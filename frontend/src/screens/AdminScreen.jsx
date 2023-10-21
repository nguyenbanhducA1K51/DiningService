
import { toast } from "react-toastify"
import { useState, useEffect } from 'react'
import CreateItemScreen from './CreateItem'
import ListFoodItem from './ListFoodItem'
import MenuScreen from "./MenuScreen"
const AdminScreen = () => {
    const [screen, setScreen] = useState("")
    return (
        <div>
            <p>admin page {screen}</p>
            <nav className="navbar navbar-light bg-light">
                <button type="button" className="btn btn-dark" onClick={(e) => setScreen("create")}>  create dish</button>
                <button type="button" className="btn btn-dark" onClick={(e) => setScreen("list")}>list item</button>
                <button type="button" className="btn btn-dark" onClick={(e)=>setScreen("menu")}>menu</button>            
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