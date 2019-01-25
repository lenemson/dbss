const World = require('./World');
const Player = require('../entities/Player');
const levelOne = require('../levels/one');

class Game {
  constructor(ioServer) {
    this.ioServer = ioServer;
    this.world = new World();
    this.players = [];
    this.time = null;

    this.ioServer.on('connection', socket => {
      console.log('Client connected', socket.id);

      const currentPlayer = new Player({
        id: socket.id,
        position: this.world.getSpawnPosition(),
        color: 0xffffff * Math.random(),
      });

      socket.on('login', () => {
        socket.emit('login', currentPlayer.id);
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
    this.world.load(levelOne);
    this.iId = setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    const now = Date.now();
    if (!this.time) this.time = now;
    const delta = now - this.time;
    process.stdout.write(`~( ${delta} ms )~\r`);
    this.time = now;
    this.players.forEach(player => player.update());
    this.world.step(delta / 1000);
    this.ioServer.emit('update', {
      entities: [...this.players.map(player => player.toJSON()), ...this.world.getEntities()],
    });
  }
}

module.exports = Game;
