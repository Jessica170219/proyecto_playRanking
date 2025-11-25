const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User'); //importamos los datos


//Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find(); 
        res.json(usuarios); 

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
})

module.exports = router;