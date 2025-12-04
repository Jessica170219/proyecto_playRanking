const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User'); //importamos los datos
const bcrypt = require('bcryptjs');

//Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find(); 
        res.json(usuarios); 

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
})


//Actualizamos usuarios por ID (perfil usuario normal)

router.put('/:id', async (req, res) => {
    try {
      const { nombre, apellido, email, telefono } = req.body;

      const updated = await User.findByIdAndUpdate(
        req.params.id,
        { nombre, apellido, email, telefono },
        { new: true }               
      ).select('-contraseña');       

     if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(updated);
      
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});


//Modificacion de contraseña 
router.put('/:id/password', async (req, res) => {
  try {
    const { actual, nueva } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comprobamos la contraseña actual
    const ok = await bcrypt.compare(actual, user.contraseña);
    if (!ok) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    // hashear nueva contraseña
    const hashed = await bcrypt.hash(nueva, 10);
    user.contraseña = hashed;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });

    
  } catch (err) {
    console.error('Error al cambiar contraseña:', err);
    res.status(500).json({ message: 'Error al cambiar contraseña' });
  }
});

module.exports = router;