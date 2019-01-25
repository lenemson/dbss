const World = require('./World');
const Player = require('../entities/Player');
const levelOne = require('../levels/one');

class Game {
  constructor(ioServer) {
    this.ioServer = ioServer;
    this.world = new World();
    this.time = null;

    this.ioServer.on('connection', socket => {
      console.log('Client connected', socket.id);

      const currentPlayer = new Player({
        id: socket.id,
        color: 0xffffff * Math.random(),
      });

      socket.on('login', () => {
        socket.emit('login', currentPlayer.getId());
      });

      socket.on('spawn', () => {
        this.world.addPlayer(currentPlayer);
      });

      socket.on('inputs', inputs => {
        currentPlayer.setInputs(inputs);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        this.world.removePlayer(currentPlayer);
      });
    });
  }

  start() {
    this.world.load(levelOne);
    this.iId = setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    const now = Date.now();
    if (!this.time) this.time = now;
    const delta = now - this.time;

    process.stdout.write(`~( ${delta} ms )~\r`);

    this.time = now;
    this.world.update(delta / 1000);
    this.ioServer.emit('update', {
      entities: this.world.getEntities(),
    });
  }
}

module.exports = Game;
