import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [menu, setmenu] = useState("")
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo' />
        <ul className='navbar-menu'>
           <Link to="/"> <li onClick={()=>{setmenu("home")}} className={menu === "home"?"active":"" }>HOME</li></Link>
            <li onClick={()=>{setmenu("menu")}} className={menu === "menu"?"active":""}>MENU</li>
            <li onClick={()=>{setmenu("mobile-app")}} className={menu === "mobile-app"?"active":""}>MOBILE-APP</li>
            <li onClick={()=>{setmenu("contact-us")}} className={menu === "contact-us"?"active":""}>CONTACT US </li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Signin</button>
        </div>
    </div>
  )
}

export default Navbar