import React from "react";
import '../Stylesheets/HomePage.css'; 
import '../Stylesheets/Login.css';
import Logo from '../Images/PlayRanking_logo.png';
import { useState } from "react";

const Login = ({ onSwitch }) => {
    const [email, setEmail] = useState(''); 
    const [contraseña, setContraseña] = useState(''); 

    //Funcion handleLogin
    const handleLogin = e => {
        e.preventDefault();
        

        //AQUI VA LA VALIDACION Y LLAMADA AL BACKEND 
    }

    return (
      <div className='container'>
        <main className="main">
          
          <form className='form-login' onSubmit={handleLogin}>
            <div className='logo-header'>
                <img
                    className='logo-mini'
                    src={ Logo }
                    alt='Logo de PlayRanking'
              />
                
            </div>
              <label>Email:</label>
              <input
                className='login-input'
                type='email'
                placeholder='Ingresa tu Email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required/>
            
              <label>Contraseña:</label>
              <input
                className='login-input'
                type='password'
                placeholder='Ingresa tu contraseña'
                value={contraseña}
                onChange={e=>setContraseña(e.target.value)}
                  required
                />
            
              <button className='homepage-btn' type='submit'>Entrar</button>

            <p className='no-account'>
            ¿No tienes cuenta?
            <button
            className='register-btn'  type='button' onClick={() => onSwitch('register')}>Regístrate</button>
            </p>
          </form> 
        </main>
    </div>
    )
}

export default Login; 