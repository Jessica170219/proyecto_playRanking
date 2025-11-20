const express = require('express'); 
const router = express.Router(); 
const Ranking = require('../models/Ranking'); 
const { validacionCrearRanking } = require('../utils/validationRules');
const { validationResult } = require('express-validator'); 



//Obtenemos todos los rankings 
router.get('/', async (req, res) => {
    try {
        const rankings = await Ranking.find(); 
        res.json(rankings); 


    } catch (error) {
        console.log('Error al obtener rankings: ', error); 
        res.status(500).json({ message: 'Error en el servidor' }); 
    }
})


//Crear un nuevo ranking

router.post('/', validacionCrearRanking, async (req, res) => {
    const errores = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() }); 
    }

    const { nombreRanking, parejas, fechaInicio, fechaFin } = req.body; 
    
try {
  const nuevoRanking = new Ranking({
    nombreRanking,
    parejas,
    fechaInicio,
    fechaFin,
    partidos: 0,
    estado: 'Sin iniciar',
  })

  const rankingGuardado = await nuevoRanking.save();
  res.status(201).json(rankingGuardado);
    
} catch (error) {
  console.log('Error al crear ranking: ', error.message, error); 
  res.status(500).json({ message: 'Error en el servidor' }); 
}

}); 


//Eliminar ranking

router.delete('/:id', async (req, res) => {
  try {
    await Ranking.findByIdAndDelete(req.params.id); 
    res.status(200).json({ message: 'Ranking eliminado' }); 
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ranking' });
  }
})

module.exports = router; 