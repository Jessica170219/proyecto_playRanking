const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User'); 

router.post('/:token', async (req, res) => {
    const { token } = req.params; 
    const { newPassword } = req.body;


    try {
        //Buscamos el usuario con ese token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt:Date.now()}
        })
        

        if (!user) {
            return res.status(400).json({error: 'Token no valido o expirado' }); 
        }

        //Hasheamos la nueva contraseña 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(newPassword, salt); 

        //Actualizamos la nueva contraseña 
        user.contraseña = hashedPassword; 
        user.resetPassWordToken = undefined; 
        user.resetPasswordExpires = undefined; 

        await user.save(); //Gardamos
        

        res.json({ message: 'Contraseña actualizada correctamente' });

    } catch (error) {
        console.error('Error en reset contraseña: ', error); 
        res.status(500).json({ message: 'Error interno del servidor' });
    }
})

module.exports = router; 