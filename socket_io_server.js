const { Server } = require('socket.io');

let  io;

function initSocketServer(httpServer) {
    io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        })
    })

    return io;
}

function getIO() {
    if(!io) {
        throw new Error('Socket is not initialized')
    }
    return io;
}

module.exports = { initSocketServer, getIO };