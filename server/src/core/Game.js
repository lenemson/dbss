const World = require('./World');
const Group = require('./Group');
const levelOne = require('../levels/one');

class Game {
  constructor(ioServer) {
    this.ioServer = ioServer;
    this.world = new World();
    this.group = new Group();
    this.time = null;

    this.ioServer.on('connection', socket => {
      console.log('Client connected', socket.id);

      const currentPlayerId = socket.id;

      socket.on('login', username => {
        const finalName = username || 'Unnamed player';
        console.log(`${finalName} logged in [${socket.id}]`);
        this.group.addPlayer(currentPlayerId, finalName);
      });

      socket.on('inputs', inputs => {
        this.group.setPlayerInputs(currentPlayerId, inputs);
        const player = this.group.getPlayer(currentPlayerId);
        if (!player) return;
        socket.broadcast.emit('cursor', {
          username: player.username,
          ...player.inputs,
        });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        this.group.removePlayer(currentPlayerId);
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
    this.world.inputs(this.group.getGroupInputs());
    this.world.update(delta / 1000);
    this.ioServer.emit('update', {
      entities: this.world.getEntities(),
      camera: this.processCameraView(),
    });
  }

  processCameraView() {
    const characterPosition = this.world.getCharacterPosition();
    return {
      position: {
        x: characterPosition.x,
        y: characterPosition.y - 50,
        z: characterPosition.z + 35,
      },
      lookAt: characterPosition,
    };
  }
}

module.exports = Game;
