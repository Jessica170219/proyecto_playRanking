const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const User = require('../models/User'); //importamos los datos


//Ruta
router.post('/register', async (req, res) => {
    const { nombre, apellido, email, contraseña, telefono } = req.body;
    
    if (!nombre || !apellido || !email || !contraseña || !telefono) {
        return res.status(400).json({ message: 'Faltan campos obligatorio' }); 
    }

    try {
        //Ciframos la contraseña antes de guardarla 
        const contraseñaCifrada = await bcrypt.hash(contraseña, 10); 


        //Verificamos si existe ya ese usuario
        const userExisting = await User.findOne({ email });
        if (userExisting) {
            return res.status(400).json({ error: 'El email ya está registrado' }); 
        }

        //Crear nuevo usuario 
        const newUser = new User({
            nombre,
            apellido,
            email,
            contraseña: contraseñaCifrada,
            telefono
        });
        
        await newUser.save(); 
        res.status(201).json({ message: 'Usuario registrado correctamente' });
        

    } catch (error) {
        res.status(500).json({ error: 'Error registrando usuario' }); 
    }

})

module.exports = router;