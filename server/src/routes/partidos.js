const express = require('express'); 
const router = express.Router(); 
const Partido = require('../models/Partido'); 
const { populate } = require('../models/Ranking');


//Obtener partidos

router.get('/rankings/:rankingId', async (req, res) => {
    try {
        const partidos = await Partido.find({ ranking: req.params.rankingId })
            .populate({
                path: 'pareja1',
                populate: { path: 'usuarios' }
        })
            .populate({
                path: 'pareja2',
                populate: { path: 'usuarios' }
            });
        res.json(partidos); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los partidos' }); 
    }
})




//Crear partido 
router.post('/', async (req, res) => {
    try {
        const partidos = await Partido.insertMany(req.body.partidos); 
        res.status(201).json(partidos); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear partidos' }); 
    }
})

module.exports = router;