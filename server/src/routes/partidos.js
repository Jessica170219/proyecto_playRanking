const express = require('express'); 
const router = express.Router(); 
const Partido = require('../models/Partido'); 
const Pareja = require('../models/Pareja');

//Obtener todos los partidos (administrador)
router.get('/', async (req, res) => {
    try {
        const partidos = await Partido.find()
            .sort({ fecha: 1 })
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


//Obtener partidos (administrador)

router.get('/rankings/:rankingId', async (req, res) => {
    try {
        const partidos = await Partido.find({ ranking: req.params.rankingId })
            .sort({ fecha: 1 })
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


//Crear partido (administrador)
router.post('/', async (req, res) => {
    try {
        const partidos = await Partido.insertMany(req.body.partidos); 
        res.status(201).json(partidos); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear partidos' }); 
    }
})


//Actualizar el resultado del partido (administrador)

router.put('/:id/resultado', async (req, res) => {
    try {
        const { resultado } = req.body; 
        if (!Array.isArray(resultado.local) ||
            resultado.local.length < 2 ||
            !Array.isArray(resultado.visitante) ||
            resultado.visitante.length < 2) {
            return res.status(400).json({ message: ' Datos de resultado incompletos' });
        }

        const partidoActualizado = await Partido.findByIdAndUpdate(req.params.id,
            { $set: { resultado } },
            { new: true });
        
        if (!partidoActualizado) {
            return res.status(404).json({ message: 'Partido no encontrado' }); 
        }

        res.status(200).json(partidoActualizado);
        
        
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el resultado' });
    }
})


//Obtener partidos de un usuario (usuario normal)
router.get('/usuario/:usuarioId', async (req, res) => {
    try{
        const usuarioId = req.params.usuarioId; 

        //Buscamos parejas donde esta el usuario 
        const parejaUsuario = await Pareja.find({usuarios:usuarioId}).select('_id'); 
        const parejaIds = parejaUsuario.map(p => p._id);

        if(parejaIds.length ===0){
            return res.json([]); //el usuario no tiene pareja 
        }

        //Buscamos partidos donde participe alguna de las parejas del usuario
        const partidos = await Partido.find({
            $or: [
                { pareja1: { $in: parejaIds } },
                { pareja2: { $in: parejaIds } } 
            ]
         })
         .sort({ fecha: 1 })
         .populate({
            path:'pareja1',
            populate:{path:'usuarios'}
         })
         .populate({
            path: 'pareja2', 
            populate:{path: 'usuarios'}
         });

         res.json(partidos);

    }catch (error){
        res.status(500).json({ message: 'Error al obtener los partidos del usuario' });
    
         }

    });


module.exports = router;