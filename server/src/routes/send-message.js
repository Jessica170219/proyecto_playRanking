const express = require('express'); 
const nodemailer = require('nodemailer'); 
const router = express.Router(); 


router.post('/', async (req, res) => {
    const { nombre, email, message } = req.body; 

    if (!nombre || !email || !message) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' }); 
    }

    //Configuramos el transporte para el correo
    const envio = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    //Opciones del correo
    const mailOpciones = {
        from: `"${nombre}" <${email}>`,
        to: 'playrankingpadel@gmail.com',
        subject: 'Nuevo mensaje desde el formulario de contacto de PlayRanking',
        html: `<p>Nombre: ${nombre} </p>
               <p>Email: ${email} </p>
               <p>Mensaje: ${message} </p>`
    };

    try {
        await envio.sendMail(mailOpciones); 
        res.json({ message: ' Mensaje enviado correctamente' });

    } catch (error) {
        console.log('Error al enviar email: ', error); 
        res.status(500).json({ message: 'Error al enviar el mensaje. Intente mas tarde' });
    }
})


module.exports = router; 