const mongoose = require('mongoose'); 

const PartidoSchema = new mongoose.Schema({
    pareja1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pareja',
        required: true,
    },
    pareja2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pareja',
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    ranking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking',
        required: true,
    }
}); 

module.exports = mongoose.model('Partido', PartidoSchema); 