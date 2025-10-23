import react, { useState } from "react";
import '../Stylesheets/Register.css';
import '../Stylesheets/Login.css';
import Ilustracion from '../Images/ilustracion-padel.jpg';
import { validarContraseña,validarEmail,validarTelefono } from "../Utils/validations";



const Register = ({ onNavigate }) => {
    const [nombre, setNombre] = useState(''); 
    const [apellido, setApellido] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [contraseña, setContraseña] = useState(''); 
    const [confContraseña, setConfContraseña] = useState(''); 
    const [telefono, setTelefono] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);

    
    //Funcion handleRegister
    const handleRegister = e => {
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

        //Si todo lo anterior es correcto, simulamos registro exitoso
        setRegistroExitoso(true); 
          

        console.log('Registro: ', nombre, email, contraseña); //comprobamos que funcione 
    }

    //Simulamos registro exitoso
        if(registroExitoso){
          return(
            <div className='form-container'>
              <div className='register-content'>
              <h2 className='register-title'>Registro completado</h2>
              <p className='panel-text'>Ya puedes iniciar sesión con tu cuenta.</p>
              <button className="homepage-btn" onClick={() => onNavigate('login')}>Iniciar sesión</button>
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
                      onClick={() => onNavigate('login')}>Iniciar sesión</button>
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