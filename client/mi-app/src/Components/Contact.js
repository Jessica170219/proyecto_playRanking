import {React,useState} from "react";
import '../Stylesheets/Contact.css';
import Logo from '../Images/logo-snfondo.png';
import { validarEmail } from "../Utils/validations";



const Contact=({ onNavigate }) => {
    const [nombre, setNombre]= useState('');
    const [email,setEmail]= useState(''); 


    const handleSubmit = e=>{
        e.preventDefault();

        //Validacion de email 
        if (!validarEmail(email)) {
            alert('El email no es válido');
            return; 
        }   
    }
    return (
        <div className='homepage'>
            <nav className='homepage-nav'>
                <img src={Logo} alt='PlayRanking' className='nav-logo' />
                <div className='nav-links'>
                    <button className='nav-btn' onClick={() => onNavigate('login')}>Iniciar sesión</button>
                    <button className='nav-btn primary' onClick={() => onNavigate('register')}>Registrarse</button>
                </div>
            </nav>
            <div className='contact-container'>
                <h2>Contacto</h2>   
                <form className='contact-form' onSubmit={handleSubmit}>
                    <input 
                    className='form-input'
                    type='text'
                    placeholder='Nombre'
                    value='nombre'
                    onChange={e=>setNombre(e.target.value)}
                    required />

                    <input 
                    className='form-input'  
                    type='email'
                    placeholder='Email de contacto'
                    value='email'
                    onChange={e=>setEmail(e.target.value)}
                    required />
                    
                    <textarea
                    className='form-textarea'
                    placeholder='Escribe tu mensaje aquí...'
                    required></textarea>    

                    <button className='homepage-btn' type='submit'>Enviar</button>
                
                </form> 
            </div>

        </div>

    )
}

export default Contact; 
