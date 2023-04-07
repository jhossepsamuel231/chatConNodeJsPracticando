const path = require('path')
const express = require('express')
const app = express()

const SocketIO = require('socket.io')

app.use((express.static(path.join(__dirname, "public"))))





app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
    console.log("server port:", app.get("port"));
})

const io = SocketIO(server)


// HOME 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'))
})


io.on('connection', (socket) => {

    console.log('new connection', socket.id);

    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("message", data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit("chat:typing", data);
    })



})

/*



*/