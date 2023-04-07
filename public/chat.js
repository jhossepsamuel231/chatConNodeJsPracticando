const socket = io()

// DOM elements
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

//enviar al servidor
btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
})

message.addEventListener('keypress', function () {
    console.log(username.value, 'esta escribiendo');
    socket.emit('chat:typing', username.value)
});

//escuchar al servidor
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing', function (data){
    actions.innerHTML = `<p><em>${data} esta escribiendo </em></p>`
})