const express = require('express'); 
const crypto = require('crypto'); 
const nodemailer = require('nodemailer'); 
const User = require('../models/User'); 
require('dotenv').config(); 

const router = express.Router(); 

router.post('/', async (req, res) => {
    const { email } = req.body; 

    try {
        //Buscamos el usuario por email 
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(400).json({ message: 'No existe un usuario con ese correo ' }); 
        }

        //Creamos el token 
        const token = crypto.randomBytes(32).toString('hex'); 

        user.resetPasswordToken = token; 
        user.resetPasswordExpires = Date.now() + 3600000; // 1hora 
        await user.save(); 
        console.log('Token generado: ', token);


        //Configuramos el envio del mail

        const envio = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        }); 

        envio.verify(function (error, sucess) {
            if (error) {
                console.log('Error de SMPT:', error);
            } else {
                console.log('Conexion SMTP OK');
            }
        })
        //URL para restablecer la contraseña
        const resetURL = `http://localhost:3000/reset-password/${token}`; 

        //opciones del correo
        const mailOpciones = {
            to: user.email,
            from: 'playrankingpadel@gmail.com',
            subject: 'Recuperar contraseña',
            text: `Has solicitado restablecer la contraseña.\n\n Haz click en el siguiente enlace para restablecerla: \n\n ${resetURL} \n\n Este enlace expirará en 1 hora. `
        };

        //Enviar el correo 
        await envio.sendMail(mailOpciones); 

        res.json({ message: 'Email de recuperación enviado correctamente' });


    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: 'Error interno del servidor' });
    }
})

module.exports = router; 