const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido:{type:String, required:true } , 
    email: { type: String, required: true, unique: true },
    contraseña:{type:String, required:true},
    telefono: { type: Number, required: true} 
})

module.exports = mongoose.model('User', userSchema); 