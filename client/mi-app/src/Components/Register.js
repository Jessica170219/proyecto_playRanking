import react, { useState } from "react";
import '../Stylesheets/Register.css';
import '../Stylesheets/HomePage.css';
import Logo from '../Images/PlayRanking_logo.png';

const Register = ({ onSwitch }) => {
    const [nombre, setNombre] = useState(''); 
    const [apellido, setApellido] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [contraseña, setContraseña] = useState(''); 
    const [confContraseña, setConfContraseña] = useState(''); 
    const [telefono, setTelefono] = useState('');

    
    //Funcion handleRegister
    const handleRegister = e => {
        e.preventDefault();
        if (contraseña !== confContraseña) {
            alert('Las contraseñas no coinciden'); 
            return; 
        }
        console.log('Registro: ', nombre, email, contraseña); //comprobamos que funcione 
    }

    return (
        <div className='container'>
            <main className='main'>
                <form className='form-register' onSubmit={handleRegister}>
                    <div className='logo-header'>
                        <img
                          className='logo-mini'
                          src={ Logo }
                          alt='Logo de PlayRanking'
                         />
                                    
                    </div>
                    
                    
                    <label>Nombre:</label>
                    <input className='register-input'
                      type='text'
                      placeholder="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      required
                    ></input>
                    <label>Apellidos:</label>
                    <input
                      className='register-input'
                      type='text'
                      placeholder='Apellidos'
                      value={apellido}
                      onChange={e => setApellido(e.target.value)} 
                      required
                      />
                    <label>Email:</label>
                    <input
                      className='register-input'
                      type='email'
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)} 
                      required
                      />
                    <label>Contraseña:</label>
                    <input
                      className='register-input'
                      type='password'
                      placeholder="Contraseña"
                      value={contraseña}
                      onChange={e => setContraseña(e.target.value)} 
                      required
                      />
                    <label>Confirmación Contraseña:</label>
                    <input
                      className='register-input'
                      type='password'
                      placeholder='Confirma contraseña'
                      value={confContraseña} 
                      onChange={e => setConfContraseña(e.target.value)}
                      required
                      />
                    <label>Telefono:</label>
                    <input
                      className='register-input'
                      type='number'
                      placeholder='Número de telefono'
                      value={telefono} 
                      onChange={e => setTelefono(e.target.value)}
                      required
                      />
                    <button className='homepage-btn' type='submit'>Registrarse</button>

                    <p className='yes-account'>
                        ¿Ya tienes cuenta?
                    <button
                      className='login-btn'
                      type='button'
                      onClick={() => onSwitch('login')}>Iniciar sesión</button>
                    </p>
                
                 </form>
            </main>    
            </div>
    )
}

export default Register; 