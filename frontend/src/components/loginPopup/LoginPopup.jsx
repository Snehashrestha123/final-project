import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(Storecontext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

 
  const onLogin = async (event) => {
  event.preventDefault();

  let newUrl = url;
  if (currState === "Login") {
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }

  try {
    const response = await axios.post(newUrl, data);

    if (response.data.success && response.data.token) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else if (response.data.success && !response.data.token) {
      alert("Registration/Login successful, but no token was returned from the server.");
    } else {
      alert(response.data.message || "Registration/Login failed");
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  }
};

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
