const mongoose = require('mongoose'); 


const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido:{type:String, required:true } , 
    email: { type: String, required: true, unique: true },
    contraseña:{type:String, required:true},
    telefono: { type: Number, required: true },
    role: { type: String, enum: ['admin', 'normal'], default: 'normal' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: {type:Number},
})

module.exports = mongoose.model('User', userSchema); 