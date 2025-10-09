import React from "react";
import '../Stylesheets/Login.css';
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
        <form className='form-login' onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <label>Email:</label>
            <input type='email' placeholder='Email' value={email} />
            
            <label>Contraseña:</label>
            <input type='password' placeholder='Contraseña' value={contraseña} />
            
            <button>Entrar</button>

            <p>
            ¿No tienes cuenta? <button type='button' onClick={()=>onSwitch('register')}>Regístrate</button>
            </p>
       </form> 
    )
}

export default Login; 