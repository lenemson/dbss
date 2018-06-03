const http = require('http');
const io = require('socket.io');

const PORT = process.env.PORT || 4242;
const httpServer = http.createServer((req, res) => res.end());
const ioServer = io(httpServer);

const players = {};

ioServer.on('connection', socket => {
  console.log('Client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
    if (players[socket.id]) {
      socket.broadcast.emit('unspawn', players[socket.id]);
      delete players[socket.id];
    }
  });

  socket.on('spawn', player => {
    console.log('Player spawn', socket.id,  player);
    const newPlayer = {
      ...player,
      id: socket.id
    };
    socket.emit('players', players);
    socket.broadcast.emit('spawn', newPlayer);
    players[socket.id] = newPlayer;
  });

  socket.on('players', () => {
    console.log('Client ask for players list');
    socket.emit('players', players);
  });

  socket.on('move', player => {
    const playerUpdated = {
      ...player,
      id: socket.id
    };
    socket.broadcast.emit('move', playerUpdated);
    players[socket.id] = playerUpdated;
  })
});

httpServer.listen(PORT, () => console.log(`Server listening on *:${PORT}`));
