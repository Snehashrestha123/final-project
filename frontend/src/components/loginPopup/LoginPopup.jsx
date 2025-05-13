import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

  const { url, setToken } = useContext(Storecontext)
  const [currState, setCurrState] = useState("Login")

  //creating the state variable where the user's name,email and password will be stored
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })


  // creating on change handler which will take the data from the user and store it in the state variable
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()    //to prevent the page from reloading
  
    let newUrl = url;
    if (currState == "Login") {
      newUrl += "/api/user/login"      //checks whether the current state is login or not
    }
    else {
      newUrl += "/api/user/register"
    }

    //call api
    const response = await axios.post(newUrl, data);   
    if (response.data.success) {   //if this is true that means the user is logged in
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)   

    }
    else {
      alert(response.data.message)
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        {/* linking the on change handler */}
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
        </div>
        <button type='submit' >{currState === "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree the terms and policies</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click Here!</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopup
