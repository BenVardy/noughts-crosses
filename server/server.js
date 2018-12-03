const express = require('express')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080, '206.189.23.215', () => console.log('listening on port 3000'));

app.use('/', express.static(`${__dirname}/../build`))

let connections = [null, null];

io.on('connection', socket => {
    
    let playerIndex = -1;
    for (let i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            break;
        }
    }

    socket.emit('player-number', playerIndex);

    if (playerIndex == -1) return;

    connections[playerIndex] = socket;

    socket.broadcast.emit('player-connect', playerIndex);

    socket.on('turn-done', squares => {
        socket.broadcast.emit('next-turn', squares);
    })

    socket.on('disconnect', () => connections[playerIndex] = null)
})
