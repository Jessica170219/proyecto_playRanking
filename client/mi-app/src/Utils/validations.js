//Validacion de que las contraseñas coincidan
export const validarContraseña=(contraseña,confContraseña)=>
    contraseña===confContraseña;

//Validacion de email con @,dominio y extension
export const validarEmail=(email)=>
    {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

//Validacion de telefono con numeros y opcional +   
export const validarTelefono=(telefono)=>
    {
        const regex = /^\+?\d{7,15}$/;
        return regex.test(telefono);
    }
    