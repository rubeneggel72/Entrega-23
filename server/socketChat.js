const uuid = require('uuid');
const getDateTime = require('../util/fecha-hora.js')
const create = require("../db/perdurarMensajes");
const updateMessageFromDb= require('../db/updateMessageFromDb')
const socketChat = (socket, io,connections,users,arrayMensajesNormalized) => {

    //listen  change_username
    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.chatUser;
        socket.userNombre = data.chatNombre;
        socket.userApellido = data.chatApellido;
        socket.userAvatar = data.chatAvatar;
        socket.userEmail = data.chatEmail;
        users.push({ id, username: socket.username,userNombre:socket.userNombre,userApellido:socket.userApellido,userAvatar:socket.userAvatar,userEmail:socket.userEmail });
        updateUsernames();
    })

    //update Usernames en cliente
    const updateUsernames = () => {
        io.sockets.emit('get users', users);
        io.sockets.emit('get historicalMessage', arrayMensajesNormalized);
    }

    //listen nuevo mensaje
    socket.on('new_message', (data) => {

        //broadcast nuevo mensaje
        const messageEmit = { message: data.message, user:{username: socket.username,userAvatar:socket.userAvatar,userNombre:socket.userNombre,userApellido:socket.userApellido,userEmail:socket.userEmail}, date: getDateTime()}
        const obj = { message: data.message, user:{username: socket.username,userAvatar:socket.userAvatar,userNombre:socket.userNombre,userApellido:socket.userApellido,userEmail:socket.userEmail}}
        console.log("mensaje emitido"+messageEmit);
        create(obj);
        io.sockets.emit('new_message', messageEmit);
        updateMessageFromDb()
    })

    //listen tipeo en chat
    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username });
    })

    //Desconeccion de usuario
    socket.on('disconnect', data => {
        if (!socket.username)
            return;
        //encontrar usuario y borrarlo de la lista de conectados
        let user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
                break;
            }
        }
        users = users.filter(x => x !== user);

        //actualiza lista usuarios conectados
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
    })
}
module.exports = socketChat