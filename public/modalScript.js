// Get the modal
const modal = document.getElementById("modal");
const main = document.getElementById("main");
const chat = document.getElementById("chat");
const chatUserInput = document.getElementById('chatUser-input');
const send_chatUser = document.getElementById('send_chatUser');

// chatUserInput.onkeypress = e => {
//     let keycode = (e.keyCode ? e.keyCode : e.which);
//     if(keycode == '13'){
//         modal.style.display = "none";
//         main.style.display = "block";
//         chat.style.display = "block";
//     }
// };

send_chatUser.onclick = function(){
        modal.style.display = "none";
        main.style.display = "block";
        chat.style.display = "block";
    }
  