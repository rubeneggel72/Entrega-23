const express = require('express');
const Mensaje = require('../models/mensajes');

const mensajeRouter = express.Router();


const messagesNormalize= require('../db/messagesNormalize')


mensajeRouter
    .route('/')
    .post(function (request, response) {

        console.log('POST /mensajes');

        var item = new Mensaje(request.body);

        item.save();

        response.status(201).send(item);
    })
    .get(function (request, response) {

        console.log('GET /mensajes');

        Mensaje.find(function (error, items) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            // console.log(items);

            response.json(items);
        });
    });

mensajeRouter
    .route('/:id')
    .get(function (request, response) {

        console.log('GET /mensajes/:id');

        var itemId = request.params.id;

        Mensaje.findOne({ id: itemId }, function (error, item) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            

            response.json(messagesFromDb(response));

        });
    })
    .put(function (request, response) {

        console.log('PUT /mensajes/:id');

        var itemId = request.params.id;

        Mensaje.findOne({ id: itemId }, function (error, item) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            if (item) {
                item.message = request.body.message;
                item.username = request.body.username;
                item.userNombre = request.body.userNombre
                item.userApellido= request.body.userApellido
                item.userAvatar = request.body.serAvatar
                item.userEmail = request.body.userEmail
                item.save();
                response.json(item);
                return;
            }

            response.status(404).json({
                message: 'Mensaje con id ' + itemId + ' no fue encontrado.'
            });
        });
    })

    .delete(function (request, response) {

        console.log('DELETE /items/:itemId');

        var itemId = request.params.id;

        Mensaje.findOne({ id: itemId }, function (error, item) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            if (item) {
                item.remove(function (error) {

                    if (error) {
                        response.status(500).send(error);
                        return;
                    }

                    response.status(200).json({
                        message: 'Mensaje con id ' + itemId + ' fue borrado.'
                    });
                });
            } else {
                response.status(404).json({
                    message: 'Mensaje con id ' + itemId + ' no fue encontrado.'
                });
            }
        });
    });



    mensajeRouter
    .route('/chat/historial')
    .get(function (request, response) {

        console.log('GET /mensajes-historial-1');
    
     console.log('array mensajes'+(arrayMensajes))
    let arrayMensajesNormalized=messagesNormalize(arrayMensajes)   
        
    

            console.log("item  " + (arrayMensajesNormalized));
            response.json(arrayMensajesNormalized);
        });
    

module.exports = mensajeRouter;