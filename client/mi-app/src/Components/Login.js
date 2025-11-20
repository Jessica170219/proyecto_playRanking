import { React, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../Stylesheets/Login.css';
import Ilustracion from '../Images/ilustracionpadel.png';
import { validarEmail } from "../Utils/validations"; 



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  //Funcion handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();

    //Validacion de email
            if (!validarEmail(email)) {
                alert('El email no es válido');
                return; 
            }
        

    //CONEXION CON BACKEND
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,contraseña})
      })
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); //Guardamos token
        localStorage.setItem('user', JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          role: data.role,
        }))

        //Redirigimos según rol
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
        
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }

    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
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
              <Link to='/forgotpassword' target='_bank' rel="noopener noreferrer">¿Has olvidado la contraseña? </Link>
              
            </div>
             <button className='homepage-btn' type='submit'>Entrar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='panel-register'>
                 ¿No tienes cuenta?
            <button
            className='register-btn'  type='button' onClick={() => navigate('/register')}>Regístrate</button>
      
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