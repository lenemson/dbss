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

      socket.emit('players', this.group.getPlayers());

      socket.on('login', username => {
        const MAX_LENGTH = 20;
        const cleanUsername = username.trim();
        const finalName = cleanUsername.length > MAX_LENGTH
          ? `${cleanUsername.slice(0, MAX_LENGTH)}...`
          : cleanUsername || 'Unnamed player';
        console.log(`${finalName} logged in [${socket.id}]`);
        this.group.addPlayer(currentPlayerId, finalName);
        this.ioServer.emit('players', this.group.getPlayers());
      });

      socket.on('inputs', inputs => {
        this.group.setPlayerInputs(currentPlayerId, inputs);
        const player = this.group.getPlayer(currentPlayerId);
        if (!player) return;
        socket.broadcast.emit('cursor', {
          ...player.inputs,
          username: player.username,
        });
        this.ioServer.emit('players', this.group.getPlayers());
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        const player = this.group.getPlayer(currentPlayerId);
        this.group.removePlayer(currentPlayerId);
        this.ioServer.emit('players', this.group.getPlayers());
        socket.broadcast.emit('cursor', {
          isActive: false,
        });
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

    //process.stdout.write(`~( ${delta} ms )~\r`);

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
