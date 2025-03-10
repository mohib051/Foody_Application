import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
const Navbar = ({setshowLogin}) => {
    const [menu, setmenu] = useState("")
    const  {getTotalCartAmount} = useContext(StoreContext)
   return (
  
    <div className='navbar'>
       <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link> 
        <ul className='navbar-menu'>
           <Link to="/"> <li onClick={()=>{setmenu("home")}} className={menu === "home"?"active":"" }>HOME</li></Link>
            <a href='#explore-menu' onClick={()=>{setmenu("menu")}} className={menu === "menu"?"active":""}>MENU</a>
            <a href='#app-download' onClick={()=>{setmenu("mobile-app")}} className={menu === "mobile-app"?"active":""}>MOBILE-APP</a>
            <a href='#footer' onClick={()=>{setmenu("contact-us")}} className={menu === "contact-us"?"active":""}>CONTACT US </a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>   
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>{setshowLogin(true)}}>Signin</button>
        </div>
    </div>
  )
}

export default Navbar