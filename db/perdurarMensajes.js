
const Mensaje = require('../models/mensajes');
const create=(mensaje)=>{
    console.log('mensaje chat guardado'+mensaje);
    let item = new Mensaje(mensaje);
    item.save();
  }

module.exports = create
