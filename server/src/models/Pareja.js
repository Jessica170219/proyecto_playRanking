const mongoose = require('mongoose'); 

const ParejaSchema = new mongoose.Schema({
    ranking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking',
        required: true,
    },
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }], 
    
})

module.exports = mongoose.model('Pareja', ParejaSchema); 
    