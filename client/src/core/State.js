export default class State {
  constructor() {
    this.playerId = null;
    this.serverState = {
      entities: [],
    };
    this.entities = {};
    this.newEntities = {};
    this.inputs = {
      right: false,
      left: false,
      up: false,
      down: false,
      direction: { x: 0, y: 0, z: 0 },
    };
  }

  login(id) {
    this.playerId = id;
  }

  setServerState(serverState) {
    this.serverState = serverState;
  }

  getPlayerId() {
    return this.playerId;
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

  getServerEntities() {
    return Object.values(this.serverState.entities);
  }

  getNewEntities() {
    return Object.values(this.newEntities);
  }

  removeNewEntities(id) {
    delete this.newEntities[id];
  }

  getInputs() {
    return this.inputs;
  }

  updateInputs(inputs) {
    this.inputs = { ...this.inputs, ...inputs };
  }

  updateDirection([x, y, z]) {
    this.inputs = { ...this.inputs, direction: { x, y, z } };
  }

  update() {
    const { entities: serverEntities } = this.serverState;
    serverEntities.forEach((serverEntity) => {
      if (!this.entities[serverEntity.id]) {
        this.newEntities[serverEntity.id] = serverEntity;
      }
    });
  }
}
