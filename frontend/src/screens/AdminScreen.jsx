
import { toast } from "react-toastify"
import { useState, useEffect } from 'react'
import CreateItemScreen from './CreateItem'
import ListFoodItem from './ListFoodItem'
import MenuScreen from "./MenuScreen"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from 'react-router-dom'
const AdminScreen = () => {
    const TABS=["create","list","menu"]
    const navigate = useNavigate()
    const [screen, setScreen] = useState("create")


    useEffect(() => {
        TABS.map((item, idx) => {
            const element = document.getElementById(item)
            if (element.classList.contains('underline')) {
                element.classList.remove('underline');
            }
            const btn = document.getElementById(screen)
            btn.classList.add("underline")
            
        })
        const btn = document.getElementById(screen)

        
    },[screen])
    
    
    return (
        <div>
        
            <nav className="flex justify-between">
                <button type="button" className="hover:underline" onClick= { (e) =>{navigate('/')}}>Home</button>
                <button type="button" id="create" className="hover:underline" onClick={(e) => setScreen("create")}>  Create dish</button>
                <button type="button" id="list" className="hover:underline" onClick={(e) => setScreen("list")}>List item</button>
                <button type="button" id="menu" className="hover:underline" onClick={(e)=>setScreen("menu")}>Menu</button>            
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