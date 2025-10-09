import react, { useState } from "react";

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
        <form className='form-register' onSubmit={handleRegister}>
            <h1>Registro</h1>
            
            <label>Nombre:</label>
            <input type='text' placeholder="Nombre" value={nombre}></input>
            <label>Apellidos:</label>
            <input type='text' placeholder='Apellidos' value={apellido} />
            <label>Email:</label>
            <input type='email' placeholder="Email" value={email} />
            <label>Contraseña:</label>
            <input type='password' placeholder="Contraseña" value={contraseña} />
            <label>Confirmación Contraseña:</label>
            <input type='password' placeholder='Confirma contraseña' value={confContraseña} />
            <label>Telefono:</label>
            <input type='number' placeholder='Número de telefono' value={telefono} />
            <button type='submit'>Registrarse</button>

            <p>
                ¿Ya tienes cuenta? <button type='button' onClick={()=> onSwitch('login')}>Iniciar sesión</button>
            </p>
            
       </form> 
    )
}

export default Register; 