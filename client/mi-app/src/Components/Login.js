import {React, useState} from "react";
import '../Stylesheets/Login.css';
import Ilustracion from '../Images/ilustracion-padel.jpg';
import { validarEmail } from "../Utils/validations"; 
import ForgotPassword from "./ForgotPassword.js";


const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  //Funcion handleLogin
  const handleLogin = e => {
    e.preventDefault();

    //Validacion de email
            if (!validarEmail(email)) {
                alert('El email no es válido');
                return; 
            }
        

    //AQUI VA LA VALIDACION Y LLAMADA AL BACKEND 
  }

  return (
      <div className='container'>
      <div className='login-panel'>
         <div className='login-content' >
          <h2 className='login-title'>Accede a PlayRanking</h2>
          <p className="panel-text">¡Nos alegra verte de nuevo!</p>
        </div>

          <form className='form-login' onSubmit={handleLogin}>
              <input
                className='form-input'
                type='email'
                placeholder='Email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
              required />
            
              <input
                className='form-input'
                type='password'
                placeholder='Contraseña'
                value={contraseña}
                onChange={e=>setContraseña(e.target.value)}
                  required
          />
            <div className='form-linea'>
              <a href='/forgotpassword' className='form-link'
                 onClick={e=>{e.preventDefault();
                  onNavigate(ForgotPassword);
                 }}>¿Has olvidado tu contraseña?</a>
            </div>
             <button className='homepage-btn' type='submit'>Entrar</button>
          </form>

          <div className='panel-register'>
                 ¿No tienes cuenta?
            <button
            className='register-btn'  type='button' onClick={() => onNavigate('register')}>Regístrate</button>
      
          </div>
      
        </div>
      
        <div className='login-imagen'>
          <img src={Ilustracion }
            alt='Ilustracion padel'/>
      </div>
    </div>
  )
};


export default Login; 