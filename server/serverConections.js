const socketBroadcastProductos = require('./socketBroadcastProductos')
const socketChat = require('./socketChat')
const messagesNormalize= require('../db/messagesNormalize')
const socketConection = (app) => {
    const server = app.listen(process.env.PORT || 8080);
    const io = require("socket.io")(server)
   var users = [];
    let connections = [];

    io.on('connection', (socket) => {
        console.log('New user connected');
        connections.push(socket)
        socket.username = 'Anonymous';

        socketBroadcastProductos(socket);
        let arrayMensajesNormalized=messagesNormalize(arrayMensajes) 
        socketChat(socket, io,connections,users,arrayMensajesNormalized)
        
    })
}
module.exports = socketConection