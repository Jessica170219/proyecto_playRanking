const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET; 

//Verficamos TOKEN

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
        return res.status(401).json({ message: 'No hay token' }); 
    }

    const token = authHeader.split(' ')[1]; //Separamos el Bearer

    if (!token) {
        return res.status(401).json({ message: 'Token invalido' }); 
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.usuario = decoded; 
        next();
    })
}

module.exports = verificarToken; 