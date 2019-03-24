import io from 'socket.io-client';

export default class Socket {
  constructor() {
    this.socket = io(process.env.DBSS_GAME_SERVER_HOST);
  }

  connect(gameState) {
    this.socket.on('update', gameState.setServerState.bind(gameState));
    this.socket.on('cursor', gameState.setCursor.bind(gameState));

    // Send player inputs to server 60 times per seconds.
    setInterval(
      () => this.socket.emit('inputs', gameState.getInputs()),
      1000 / 60,
    );
  }
}
