const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); //Manjear variables de entorno
 


const app = express(); 

const PORT = process.env.PORT || 4000; 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jessiasus_db_user:jSprAq55kTQ8yOi3@cluster0.sdv67uj.mongodb.net/PlayRanking'; 


app.use(cors()); //Habilitamos para que REACT pueda hacer peticiones
app.use(express.json()); //Recibir json en request


//Conexión con MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error conexion MongoDB:', err)); 


//Endpoint para testear conexión

app.get('/', (req, res) =>
    res.json({ message: 'Backend funcionando correctamente' })); 


//Importacion de rutas 
const userRoutes = require('./src/routes/userRoutes'); 
app.use('/api', userRoutes); 

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const forgotPassword = require('./src/routes/forgot-password');
app.use('/api/forgot-password', forgotPassword);

const resetPasswordRoutes = require('./src/routes/reset-password');
app.use('/api/reset-password', resetPasswordRoutes);


//Arrancar servidor

app.listen(PORT, () =>
    console.log(`Servidor backend funcionando en http://localhost:${PORT}`)); 

