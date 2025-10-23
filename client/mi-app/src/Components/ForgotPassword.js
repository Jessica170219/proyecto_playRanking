import {React,useState} from"react";
import '../Stylesheets/ForgotPassword.css'; 
import '../Stylesheets/HomePage.css';

const ForgotPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState(''); 
  const [message,setMessage]=useState(''); 
  const [error,setError]=useState('');

  
  const handleSubmit= e =>{
    e.preventDefault();

    setMessage('');
    setError('');
    //AQUI VA LA LLAMADA AL BACKEND PARA RESETEAR LA CONTRASEÑA

    try{

      //PENDIENTE DE IMPLEMENTAR LLAMADA A BACKEND 


    }catch(err){
      setError('Error al enviar el email de reseteo de contraseña');
    }
  };

  return (
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
  );


}

export default ForgotPassword;  
