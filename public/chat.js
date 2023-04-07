const socket = io()
let usuario

let username = document.getElementById('username')
let actions = document.getElementById('actions')

const onLoadoIndex = () => {

    usuario = localStorage.getItem('usuario')

    if (!usuario) {
        // TODO: mandar al login
        window.location.href = '/login'
        return
    }

    usuario = JSON.parse(usuario)

}


const btnSend = document.getElementById("send-message");
const message = document.getElementById("message-area");
const boxMessages = document.getElementById("chat-box");



btnSend.addEventListener("click", () => {
    let usuarioEncontrado = JSON.parse(localStorage.getItem('usuario'))
    if (message.value == "") {
        message.focus();
    } else {
        boxMessages.innerHTML += `
            <!-- MI MENSAJE -->
        <div class="chat from-message">
          <div class="detalles">
            <p>${message.value}</p>
          </div>
        </div>
            `;
        scrollBottom();
        let mensaje = { msg: message.value, userEnvio: usuarioEncontrado.username };
        socket.emit("message", mensaje)
        message.value = null;


    }
});

message.addEventListener('keypress', function () {
    let usuarioEncontrado = JSON.parse(localStorage.getItem('usuario'))
    socket.emit('chat:typing', usuarioEncontrado.username)
});

/* ENTER KEY  */
function enterkey() {
    keyenter = event.keyCode;
    if (keyenter == 13) {
        btnSend.click();
        scrollBottom();
    }
}
window.onkeydown = enterkey;

function scrollBottom() {
    boxMessages.scrollTop = boxMessages.scrollHeight;
}

/* LISTENER SOCKET */
socket.on("message", (data) => {
    console.log(data);
    boxMessages.innerHTML += `
        <!-- MENSAJE AMIGO -->
        <div class="chat to-message">
          <div class="detalles">
          <p><strong>${data.userEnvio}</strong>: ${data.msg}</p>
          </div>
        </div>
        `;
    scrollBottom()
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo </em><i class="fa-solid fa-ellipsis fa-beat"></i></p>`
})


// DOM elements
/* let message = document.getElementById('message')

let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions') */

//enviar al servidor
/* btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        username: usuario.username,
        message: message.value
    })
}) */

/* message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value)
}); */

//escuchar al servidor
/* socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
    message.value = '';
}) */

/* socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo </em></p>`
}) */

/* const logout = () => {
    localStorage.removeItem('usuario')
    window.location.href = '/login'
} */

/**
 * docker para base dedatos,
 */