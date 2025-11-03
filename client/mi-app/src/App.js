import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import ForgotPassword from './Components/ForgotPassword.js';
import Contact from './Components/Contact.js';
import Cookies from './Components/Cookies.js';
import Privacity from './Components/Privacity.js';
import UserDashBoard from './Components/DashBoard/UserDashBoard.js';



function App() {

  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/cookies' element={<Cookies />} />
      <Route path='/privacity' element={<Privacity />} />
      <Route path='/userDashBoard' element={<UserDashBoard />} />
    </Routes>


    
   
  );
}

export default App;