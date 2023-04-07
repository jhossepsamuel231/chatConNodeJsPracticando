const socket = io()
let usuario

let username = document.getElementById('username')

const onLoadoIndex = () => {

    usuario = localStorage.getItem('usuario')

    if (!usuario) {
        // TODO: mandar al login
        window.location.href = '/login'
        return
    }

    usuario = JSON.parse(usuario)

    username.value = usuario.username

}

// DOM elements
let message = document.getElementById('message')

let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

//enviar al servidor
btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        username: usuario.username,
        message: message.value
    })
})

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value)
});

//escuchar al servidor
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
    message.value = '';
})

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo </em></p>`
})

const logout = () => {
    localStorage.removeItem('usuario')
    window.location.href = '/login'
}

/**
 * docker para base dedatos,
 */