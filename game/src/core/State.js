export default class State {
  constructor() {
    this.serverState = {
      players: [],
    };
    this.entities = {};
    this.newPlayers = {};
    this.inputs = {
      right: false,
      left: false,
      up: false,
      down: false,
    };
  }

  setServerState(serverState) {
    this.serverState = serverState;
  }

  getEntities() {
    return Object.values(this.entities);
  }

  addEntity(entity) {
    this.entities[entity.getId()] = entity;
  }

  removeEntity(id) {
    delete this.entities[id];
  }

  getPlayers() {
    return Object.values(this.serverState.players);
  }

  getNewPlayers() {
    return Object.values(this.newPlayers);
  }

  removeNewPlayer(id) {
    delete this.newPlayers[id];
  }

  getInputs() {
    return this.inputs;
  }

  updateInputs(inputs) {
    this.inputs = { ...this.inputs, ...inputs };
  }

  update() {
    const { players } = this.serverState;
    players.forEach((player) => {
      if (!this.entities[player.id]) {
        this.newPlayers[player.id] = player;
      }
    });
  }
}
