
let historicalMessageLoaded=false;

$(function () {

    let socket = io.connect('');
    let message = $("#message");
    let send_message = $("#send_message");
    let chatroom = $("#chatroom");
    let feedback = $("#feedback");
    let usersList = $("#users-list");
    let chatEmail = $("#chatEmail-input");
    let chatUser = $("#chatAlias-input");
    let chatNombre = $("#chatNombre-input");
    let chatApellido = $("#chatApellido-input");
    let chatAvatar = $("#chatAvatar-input");
    let send_chatUser = $("#send_chatUser");
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
    });

    message.keypress(e => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            let new_message ={ message: message.val(),chatUser: chatUser.val(),chatNombre: chatNombre.val(),chatApellido: chatApellido.val(),chatAvatar: chatAvatar.val(),chatEmail: chatEmail.val() }
            socket.emit('new_message',new_message )
            console.log("emit"+new_message)
        }
    })

    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(`
                          <div >
                            <img class="img-avatar-chat" src=${data.user.userAvatar}>
                            <p  class="chat-text-user">${data.user.username} - </p>
                            <p  class="chat-text-date">${data.date}-</p>
                            <p  class="chat-text">${data.message}.</p>
                          </div>
                      `)
        keepTheChatRoomToTheBottom()
    });

    send_chatUser.click(function () {
        console.log('click')
        socket.emit('change_username', { chatUser: chatUser.val(),chatNombre: chatNombre.val(),chatApellido: chatApellido.val(),chatAvatar: chatAvatar.val(),chatEmail: chatEmail.val()});
        socket.on('get users', data => {
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `<li class="list-item" ><img class="img-avatar-chat" src=${data[i].userAvatar}>${data[i].username}</li>`;
            }
            usersList.html(html)
        })
        socket.on('get historicalMessage', data => {
           if( historicalMessageLoaded==false){
               console.log('Normalized '+JSON.stringify(data))
               historicalMessageLoaded=true
           }
        })
    })
       

    message.on("keypress", e => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode != '13') {
            socket.emit('typing')
        }
    });

    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
});

    socket.on('arrayProductos', function(arrayProducts) {
        console.log(arrayProducts);
        var theTemplateScript = $("#products-template").html();
         var theTemplate = Handlebars.compile(theTemplateScript);
         var theTemplateScript = $("#products-template").html();
         var theTemplate = Handlebars.compile(theTemplateScript);
         products={"products":arrayProducts}
         var theCompiledHtml = theTemplate(products)
         $('.content-placeholder').html(theCompiledHtml);
       });
});

const keepTheChatRoomToTheBottom = () => {
    const chatroom = document.getElementById('chatroom');
    chatroom.scrollTop = chatroom.scrollHeight - chatroom.clientHeight;
}