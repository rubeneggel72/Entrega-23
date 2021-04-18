const Mensaje = require('../models/mensajes');

const updateMessageFromDb=()=>{
    Mensaje.find(function (error, items) {

        if (error) {
            response.status(500).send(error);
            return;
        }
        arrayMensajes = items;
       
        
        
    })
    
}
module.exports = updateMessageFromDb;