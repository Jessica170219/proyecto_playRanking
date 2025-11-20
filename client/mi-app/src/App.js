
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import ForgotPassword from './Components/ForgotPassword.js';
import Contact from './Components/Contact.js';
import Cookies from './Components/Cookies.js';
import Privacity from './Components/Privacity.js';
import DashBoard from './Components/UserDashboard/DashBoard.js';
import ResetPassword from './Components/reset-Password.js';
import CookieConsent from './Components/bannerCookies.js';
import AdminDashBoard from './Components/AdminDashboard/AdminDashboard.js';
import AdminRanking from './Components/AdminDashboard/AdminRanking.js';



function App() {

  
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/cookies' element={<Cookies />} />
      <Route path='/privacity' element={<Privacity />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/admin-dashboard' element={<AdminDashBoard />} />
        <Route path='/admin/rankings' element={<AdminRanking />} />
        



        
      </Routes>
     

     <CookieConsent />

    </>

    
   
  );
}

export default App;