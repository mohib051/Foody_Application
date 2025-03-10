import React, { useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
const LoginPopup = ({ setshowLogin}) => {
    const [currState, setcurrState] = useState("Sign Up")
  return (
    <div className='login-popup'>
        <form  className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></> : <input type='text' placeholder='enter your name' required  />}
                <input type="email" placeholder='enter email' required />
                <input type="password" placeholder='enter password' required />
            </div>
            <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing,i aggree to the terms of use & privacy policy.</p>
            </div>
            <p>Create a new Account? <span onClick={()=>setcurrState("Sign up")}>Click here</span></p>
            <p>Already have an account? <span onClick={()=>setcurrState("Login")}>Click here</span></p>
        </form>
    </div>
  )
}

export default LoginPopup