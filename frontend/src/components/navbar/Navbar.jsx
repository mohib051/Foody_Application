import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
const Navbar = ({setshowLogin}) => {
    const [menu, setmenu] = useState("")
    const  {getTotalCartAmount,token , settoken } = useContext(StoreContext)

    const navigate = useNavigate()
    const logout = ()=>{
      localStorage.removeItem("token")
      settoken("")
      navigate("/")
    }
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
            {!token?<button onClick={()=>{setshowLogin(true)}}>Signin</button> : 
            <div  className='navbar-profile'>
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
                    <hr />
                    <li onClick={()=>logout()}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                  </ul>
            </div> }
            
        </div>
    </div>
  )
}

export default Navbar