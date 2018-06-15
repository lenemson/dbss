import io from 'socket.io-client';

export default class Socket {
  constructor() {
    this.socket = io('http://localhost:4242');
  }

  connect(gameState) {
    this.socket.on('update', gameState.setServerState.bind(gameState));

    // Ask server to spawn our player character.
    this.socket.emit('spawn');

    // Send player inputs to server 60 times per seconds.
    setInterval(
      () => this.socket.emit('inputs', gameState.getInputs()),
      1000 / 60,
    );
  }
}
