const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User'); 
const Pareja = require('../models/Pareja'); 

//Obtener todas las parejas de un ranking
router.get('/rankings/:rankingId', async (req, res) => {
    try {
        const parejas = await Pareja.find({ ranking: req.params.rankingId }).populate('usuarios');
        
       const parejasConNombres = parejas.map(p => ({
            ...p.toObject(),
            nombres: p.usuarios.map(u => u.nombre)
        }));
        res.json(parejasConNombres);

    } catch (error) {
        res.status(500).json({ message: 'Error al listar parejas' }); 
    }
})

//Crear una pareja 
router.post('/', async (req, res) => {
    try {
        const { ranking, usuarios } = req.body; 
        if (!ranking || !usuarios || usuarios.length !== 2) {
            return res.status(500).json({ message: 'Datos invalidos' }); 
        }
        const nuevaPareja = new Pareja({ ranking, usuarios }); 
        await nuevaPareja.save(); 

        const parejaPopulada = await Pareja.findById(nuevaPareja._id).populate('usuarios'); 

        res.status(201).json(parejaPopulada); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la pareja' }); 
    }
})

//Eliminar la pareja

router.delete('/:parejaId', async (req, res) => {
    try {
        await Pareja.findByIdAndDelete(req.params.parejaId);
        res.status(200).json({ message: 'Pareja eliminada' }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pareja' }); 
    }
})


module.exports = router; 

