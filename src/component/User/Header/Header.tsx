import React, { useState } from 'react'
import './Header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(userLogout())
        navigate('/')
    }

    const handleHome =()=>{
      navigate('/home')
    }

    return (
      <header>
         <input type='checkbox' name='' id='chk1'/>
        <div className='logo'><h1>Blog Master</h1></div>
        <div className='search-box'>
          <form>
            <input type='text' name='search' id='srch' placeholder='Search...'/>
            <button type='submit'><i className="fas fa-search"></i></button>
          </form>
        </div>
        <ul>
          <li><a onClick={handleHome}>Home</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
        <div className='menu'>
          <label htmlFor='chk1'>
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </header>
       
    );
  };
  
  export default Header;