const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname,'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
//app.use('/', (req,res) => res.sendFile(__dirname + '/public/index.html'))

var messages = []

io.on('connection', socket =>
{

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data =>
    {
        messages.push(data)
        socket.broadcast.emit('receiveMessage', data) // envia para todos os demais sockets
    })
})

http.listen(process.env.PORT || 3000, () => console.log('server on'))