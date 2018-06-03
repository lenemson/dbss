import io from 'socket.io-client';

export default class Socket {
  constructor() {
    this.socket = io('http://dbe67de7.ngrok.io');
  }

  spawn(player) {
    const { x, y, z } = player.getEntity().position;
    this.socket.emit('spawn', {
      position: { x, y, z },
    });
  }

  getPlayers() {
    this.socket.emit('players');
  }

  move(player) {
    const { x, y, z } = player.getEntity().position;
    this.socket.emit('move', {
      position: { x, y, z },
    });
  }

  emit(eventName, message) {
    this.socket.emit(eventName, message);
  }
}
