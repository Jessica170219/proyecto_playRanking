import { React, useState } from 'react';
import './App.css';
import HomePage from './Components/HomePage.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import ForgotPassword from './Components/ForgotPassword.js';
import Contact from './Components/Contact.js';



function App() {

  const [page, setPage] = useState('home'); //Estado que indica la pagina inicial 

  const handleNavigate = (pageName) => {
    setPage(pageName);
  }

  return (
    <div>
      {page === "home" && <HomePage onNavigate={handleNavigate} />}
      {page === "login" && <Login onNavigate={handleNavigate} />}
      {page ==="register" && <Register onNavigate={handleNavigate} />}
      {page ==="forgotpassword" && <ForgotPassword onNavigate={handleNavigate} />}
      {page ==="Contact" && <Contact onNavigate={handleNavigate} />}


    </div>
   
  
  );
}

export default App;