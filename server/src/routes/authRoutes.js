const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET; 

//Ruta

router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;


    try {
        //Buscamos usuario por mail
        const usuario = await User.findOne({ email }); 
        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        //Comparar contraseña con la de la base de datos 
        const esValido = await bcrypt.compare(contraseña, usuario.contraseña); 
        if (!esValido) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        //Generar TOKEN
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        //Responder con el token
        res.json({ message: 'Login exitoso', token }); 

    } catch (error) {
        console.log('Error en login:', error); 
        res.status(500).json({ message: ' Error en el servidor' }); 
    }
})

module.exports = router; 