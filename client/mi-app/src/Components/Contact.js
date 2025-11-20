import {useState} from "react";
import '../Stylesheets/Contact.css';
import { validarEmail } from "../Utils/validations";
import { useNavigate } from 'react-router-dom';


const Contact=() => {
    const [nombre, setNombre]= useState('');
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');
   

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setStatusMessage('');
        setError(false);

        //Validacion de email 
        if (!validarEmail(email)) {
            alert('El email no es válido');
            return; 
        }   

        //AQUI VA LA LLAMADA AL BACKEND
    
        try {
            const response = await fetch('http://localhost:4000/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, message })
            }); 

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor'); 
            }

            const data = await response.json();
            setStatusMessage(data.message || 'Mensaje enviado correctamente'); 
            setNombre(''); 
            setEmail(''); 
            setMessage(''); //vaciamos campos 
            
        } catch {
            setStatusMessage('Error al enviar el mensaje. Por favor, intenta otra vez');
            setError(true);
        }
    }
    return (
        <main className='contact-main'>
            
            <div className='contact-container'>
                <h2 className='contact-title'>Contacto</h2>   
                <form className='contact-form' onSubmit={handleSubmit}>
                    <input 
                    className='form-input'
                    type='text'
                    placeholder='Nombre'
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                    required />

                    <input 
                    className='form-input'  
                    type='email'
                    placeholder='Email de contacto'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required />
                    
                    <textarea
                    className='form-textarea'
                    placeholder='Escribe tu mensaje aquí...'
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                    required></textarea>    

                    <button className='homepage-btn' type='submit'>Enviar</button>
                
                </form> 

                {statusMessage && (<p className={error ? 'error-message' : 'success-message'}> {statusMessage} </p>)}
            </div>
        </main>

        

    )
}

export default Contact; 
