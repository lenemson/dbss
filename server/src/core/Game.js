const cannon = require('cannon');

const Map = require('./Map');
const Player = require('../entities/Player');

class Game {
  constructor(ioServer) {
    this.ioServer = ioServer;
    this.world = new cannon.World();
    this.map = new Map(this.world);
    this.players = [];
    this.time = null;

    this.ioServer.on('connection', socket => {
      console.log('Client connected', socket.id);

      const currentPlayer = new Player({
        id: socket.id,
        position: this.map.getSpawnPosition(),
        color: 0xffffff * Math.random(),
      });

      socket.on('spawn', () => {
        this.players.push(currentPlayer);
        this.world.addBody(currentPlayer.getBody());
      });

      socket.on('inputs', inputs => {
        currentPlayer.setInputs(inputs);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        this.players = this.players.filter(player => player.getId() !== currentPlayer.getId());
      });
    });
  }

  start() {
    this.map.init();
    this.world.gravity.set(0, 0, -200);
    this.world.broadphase = new cannon.NaiveBroadphase();
    this.iId = setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    const now = Date.now();
    if (!this.time) this.time = now;
    const delta = now - this.time;
    process.stdout.write(`~( ${delta} ms )~\r`);
    this.time = now;
    this.players.forEach(player => player.update());
    this.world.step(1.0 / 60.0, delta / 1000, 3);
    this.ioServer.emit('update', {
      entities: [...this.players.map(player => player.toJSON()), ...this.map.getEntities()],
    });
  }
}

module.exports = Game;
