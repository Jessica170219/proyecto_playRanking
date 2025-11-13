import {React,useState} from"react";
import '../Stylesheets/ForgotPassword.css'; 
import '../Stylesheets/HomePage.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  const [message,setMessage]=useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit= async (e) =>{
    e.preventDefault();

    setMessage('');
    setError('');

    
    //AQUI VA LA LLAMADA AL BACKEND PARA RESETEAR LA CONTRASEÑA

    try {
      const response = await fetch('http://localhost:4000/api/forgot-password', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      }); 

      const data = await response.json();

      if (response.ok) {
        setMessage('Se ha enviado un email con instrucciones para restablecer tu contraseña');
        setTimeout(() => navigate('/login'), 4000); //Redirigimos a login
      
      } else {
        setError(data.message || 'No se puedo enviar el email'); 
      }

    }catch(err){
      setError('Error al enviar el email de reseteo de contraseña');
    }
  };

  return (
    <main className='fp-main'>
      <div className='form-container'>
      <h2 className='forgot-title'>Recuperar contraseña</h2>
      <form className='form-forgot' onSubmit={handleSubmit}>
        <input
          className='form-input'
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <button className='homepage-btn' type='submit'>Enviar solicitud</button>
      </form>

      {message && <p className='success-message'>{message}</p>}
      {error && <p className='error-message'>{error}</p>}     

    </div>

    </main>
    
  );


}

export default ForgotPassword;  
