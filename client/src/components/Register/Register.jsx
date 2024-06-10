import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Register.css'

const Register = () => {
  const URL="http://localhost:3500";
  const [UserName,setUserName]=useState('')
  const [Mobile,setMobile]=useState('')
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    const newUser = {
        UserName,
        Mobile,
        Email,
        Password,
        ConfirmPassword,
    };

    try {
        const res = await axios.post(`${URL}/auth/Register`, newUser);
        //console.log('Response status:', res.status); // Log the response status
        //console.log('Response data:', res.data); // Log the response data
        if (res.status === 200) {
            window.location.replace("/Login");
        }
    } catch (error) {
        console.error('Error registering:', error);
        setError(true);
    }
};

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type='text'
          className='registerInput'
          placeholder='Enter Name'
          onChange={e=>setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          type='text'
          className='registerInput'
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          className='registerInput'
          placeholder='Enter Your Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm-Password</label>
        <input
          type='password'
          className='registerInput'
          placeholder='Enter Your Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label>Mobile</label>
        <input
          type='Number'
          className='registerInput'
          placeholder='Enter Mobile Number'
          onChange={(e) =>setMobile(e.target.value)}
        />
        <button className='registersButton' type='submit'>
          Register
        </button>
      </form>
      <button className='loginsButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: 'lightred', fontSize: '22px', marginTop: '10px' }}>
          Something Went Wrong!!!!!!!!!!
        </span>
      )}
    </div>
  );
};

export default Register;
