const http = require('http');
const io = require('socket.io');

const PORT = process.env.PORT || 4242;
const httpServer = http.createServer();
const ioServer = io(httpServer);

let players = [];
let currentTime = null;

const tickPlayer = (player, delta) => {
  const speed = delta / 100;
  if (player.inputs.right) player.x += speed;
  if (player.inputs.left) player.x -= speed;
  if (player.inputs.up) player.y += speed;
  if (player.inputs.down) player.y -= speed;
};

const gameLoop = () => {
  const time = Date.now();
  const delta = time - currentTime;
  currentTime = time;
  for (let i = 0; i < players.length; i++) tickPlayer(players[i], delta);
  ioServer.emit('update', {
    players,
  });
};

ioServer.on('connection', socket => {
  console.log('Client connected', socket.id);

  const currentPlayer = {
    id: socket.id,
    x: 0,
    y: 0,
    z: 0,
    color: 0xffffff * Math.random(),
    inputs: {
      right: false,
      left: false,
      up: false,
      down: false,
    }
  };

  socket.on('spawn', () => {
    players.push(currentPlayer);
  });

  socket.on('inputs', inputs => {
    currentPlayer.inputs = inputs;
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
    players = players.filter(({ id }) => id !== currentPlayer.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
  currentTime = Date.now();
  setInterval(gameLoop, 1000 / 60);
  console.log('Game loop started');
});
