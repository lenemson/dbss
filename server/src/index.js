const http = require('http');
const io = require('socket.io');

const Game = require('./core/Game');

const PORT = process.env.PORT || 4242;
const httpServer = http.createServer();
const ioServer = io(httpServer);
const game = new Game(ioServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
  game.start();
  console.log('Game loop started');
});
