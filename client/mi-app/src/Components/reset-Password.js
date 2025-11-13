import { useNavigate, useParams } from 'react-router-dom'; 
import { useState } from 'react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setMessage('');
        setError(''); 
        

        try {
            const response = await fetch(`http://localhost:4000/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            }); 

            const data = await response.json(); 

            //Si funciona correctamente redirigimos 
            if (response.ok) {
                setMessage(data.message); 
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.error || 'Error al actualizar la contraseña');
            }
          


        } catch (error) {
            setError('Error al actualizar la contraseña'); 
        }
    }

    return (
        <main className='fp-main'>
        <div className ='form-container'>
            <h2 className='forgot-title'>Restablecer contraseña</h2>
                <form className='form-forgot' onSubmit={handleSubmit}>
                <input
                className='form-input'
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
                <button className ='homepage-btn' type="submit">Cambiar contraseña</button>
                </form>
                {message && <p className='success-message'>{message}</p>}
                {error && <p className='error-message'>{error}</p>}
               
            </div>
        </main>
    )
}

export default ResetPassword; 