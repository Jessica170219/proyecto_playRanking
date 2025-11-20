const mongoose = require('mongoose'); 

const RankingSchema = new mongoose.Schema({
    nombreRanking: {
        type: String,
        required: true,
    },
    parejas: {
        type: Number,
        required: true,
        min: 4,
        max: 10
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    partidos: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        default: ' Sin iniciar'
    },


}, { timestamps: true });

module.exports = mongoose.model('Ranking', RankingSchema);