const express = require('express')
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const socektio = require('socket.io');

const io = new socektio(server);

if (!process.env.NODE_ENV) {
    app.use( express.static(`${__dirname}/../build`) );
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
    console.log('Serving static files!');
}

const PORT = 8080;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

let connections = {};

let emptyRoomCheck = setInterval(() => {
    for (let x in connections) {
        if (connections[x][0] === null && connections[x][1] === null) {
            delete connections[x];
            console.log(`deleted server: ${x}`)
        }
    }
}, 60000);

io.on('connection', socket => {

    socket.on('join-room', roomId => {

        if (!connections[roomId]) {
            connections[roomId] = new Array(2).fill(null);
        }

        let playerIndex = -1;
        for (let i in connections[roomId]) {
            if (connections[roomId][i] === null) {
                playerIndex = i;
                break;
            }
        }
    
        if (playerIndex == -1) return;

        socket.join(roomId);
    
        connections[roomId][playerIndex] = socket;

        socket.emit('player-number', { playerIndex, shouldStart: io.sockets.adapter.rooms[roomId].length >= 2 });
    
        socket.to(roomId).emit('player-connect', playerIndex);
    
        socket.on('turn-done', squares => {
            socket.to(roomId).emit('next-turn', squares);
        });
    
        socket.on('disconnect', () => {
            socket.in(roomId).emit('player-disconnect')
            connections[roomId][playerIndex] = null
            socket.leave(roomId)
        });

    });
})
