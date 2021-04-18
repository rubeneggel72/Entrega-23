const Mensaje = require('../models/mensajes');

const {denormalize,normalize,schema}=require('normalizr')
const user=new schema.Entity('users')
const mensaje= new schema.Entity('mensajes',{user:user} )

const sendOldMessages=()=>{

        Mensaje.find(function (error, mensajes) {

            if (error) {
                response.status(500).send(error);
                return;
            }
            // console.log("old mensajes"+mensajes);
            const normalizeData=normalize(mensajes,mensaje)
            console.log("old mensajes DE Normalized"+JSON.stringify(normalizeData));

            const denormalizeData=denormalize(normalizeData,mensaje)
            console.log("old mensajes DE Normalized"+JSON.stringify(denormalizeData));
        });
    }
module.exports =sendOldMessages;