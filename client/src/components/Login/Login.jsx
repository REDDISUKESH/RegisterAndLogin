
import React, { useContext } from 'react'
import { useRef } from 'react'
import {Context} from '../Context/Context'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
  const URL="http://localhost:3500";
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)
  const navigate = useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
      try{
        const res = await axios.post(`${URL}/auth/Login`, {
          Email: userRef.current.value,
          Password: passwordRef.current.value
        });      
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        console.log(res.data)
        navigate('/')
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      console.log(err);

    }
  }

  return (
    <div className='login'>
        <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={handleSubmit}>
            <label >Email</label>
            <input type="text" className='loginInput'  placeholder='Enter Your Email'
              ref={userRef}
            />
            <label >Password</label>
            <input type="password" className='loginInput' placeholder='Enter Your Password'
            ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login


