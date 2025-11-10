import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/Register.css';
import '../Stylesheets/Login.css';
import Ilustracion from '../Images/ilustracionpadel.png';
import { validarContraseña,validarEmail,validarTelefono } from "../Utils/validations";



const Register = () => {
    const [nombre, setNombre] = useState(''); 
    const [apellido, setApellido] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [contraseña, setContraseña] = useState(''); 
    const [confContraseña, setConfContraseña] = useState(''); 
    const [telefono, setTelefono] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const navigate = useNavigate();
    
    //Funcion handleRegister
    const handleRegister = async e => {
        e.preventDefault();
          //Validacion de email
        if (!validarEmail(email)) {
            alert('El email no es válido');
            return; 
        }

        //validacion de contraseñas
        if (!validarContraseña(contraseña, confContraseña)) {
            alert('Las contraseñas no coinciden');
            return; 
        }
        //Validación de telefono
        if (!validarTelefono(telefono)) {
            alert('El número de teléfono no es válido');
            return; 
      } 
      
      //CONEXION CON BACKEND

      try {
        const response = await fetch('http://localhost:4000/api/register',{
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, apellido, email, contraseña, telefono })
        })
        const data = await response.json();
        
        if (response.ok) {
          setRegistroExitoso(true);
        } else {
          alert(data.message || 'Error al registrar usuario');
        }
      } catch (error) {
        alert('Error en la conexion al servidor'); 
      }

        
    }

    //Simulamos registro exitoso
        if(registroExitoso){
          return(
            <div className='form-container'>
              <div className='register-content'>
              <h2 className='register-title'>Registro completado</h2>
              <p className='panel-text'>Ya puedes iniciar sesión con tu cuenta.</p>
              <button className="homepage-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
            </div>
            </div>
          );
        }

    return (
      <div className='container'>
        <div className='register-panel'>
          <div className='register-content'>
            <h2 className='register-title'>Regístrate en PlayRanking</h2>
            <p className='panel-text'>¡Únete a nuestra comunidad!</p>
          </div>

        <form className='form-register' onSubmit={handleRegister}>
          
            <input className='form-input'
                      type='text'
                      placeholder="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      required
                    ></input>
           
            <input className='form-input'
                      type='text'
                      placeholder='Apellidos'
                      value={apellido}
                      onChange={e => setApellido(e.target.value)} 
                      required
                      />
           
            <input className='form-input'
                      type='email'
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)} 
                      required
                      />
            
            <input className='form-input'
                      type='password'
                      placeholder="Contraseña"
                      value={contraseña}
                      onChange={e => setContraseña(e.target.value)} 
                      required
                      />
           
            <input className='form-input'
                      type='password'
                      placeholder='Confirma contraseña'
                      value={confContraseña} 
                      onChange={e => setConfContraseña(e.target.value)}
                      required
                      />
            
            <input className='form-input'
                      type='number'
                      placeholder='Número de telefono'
                      value={telefono} 
                      onChange={e => setTelefono(e.target.value)}
                      required
            />

            <button className='homepage-btn' type='submit'>Registrarse</button>
            
        </form>
        
        <div className='panel-login'>
            ¿Ya tienes cuenta?
            <button className='login-btn'
                      type='button'
                      onClick={() => navigate('/login')}>Iniciar sesión</button>
        </div>
          

        </div>
        <div className='register-imagen'>
                  <img src={Ilustracion }
                    alt='Ilustracion padel'/>
        </div>
      </div>
    )
}

export default Register; 