import io from 'socket.io-client';

export default class Socket {
  constructor(gameStore) {
    this.gameStore = gameStore;
    this.socket = null;
  }

  connect() {
    this.socket = io(process.env.DBSS_GAME_SERVER_HOST);

    this.gameStore.onLoginNeeded(this.login.bind(this));
    this.socket.on('connect', this.gameStore.socketConnect.bind(this.gameStore));
    this.socket.on('disconnect', this.gameStore.socketDisconnect.bind(this.gameStore));
    this.socket.on('update', this.gameStore.setServerState.bind(this.gameStore));
    this.socket.on('cursor', this.gameStore.setCursor.bind(this.gameStore));
    this.socket.on('players', this.gameStore.setPlayers.bind(this.gameStore));
  }

  login(name) {
    this.socket.emit('login', name);

    // Send player inputs to server 60 times per seconds.
    setInterval(
      () => this.socket.emit('inputs', this.gameStore.getInputs()),
      1000 / 60,
    );
  }
}
