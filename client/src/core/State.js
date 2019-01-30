import Cursors from './Cursors';

export default class State {
  constructor({ renderer }) {
    this.serverState = {
      entities: [],
      camera: {
        position: {
          x: 0, y: -50, z: 35,
        },
        lookAt: {
          x: 0, y: 0, z: 0,
        },
      },
    };
    this.entities = {};
    this.newEntities = {};
    this.camera = {};
    this.cursors = new Cursors();
    this.inputs = {
      isActive: false,
      right: false,
      left: false,
      up: false,
      down: false,
      cursorPosition: {
        x: renderer.width / 2,
        y: renderer.height / 2,
      },
      screenWidth: renderer.width,
      screenHeight: renderer.height,
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

  getServerEntities() {
    return Object.values(this.serverState.entities);
  }

  getNewEntities() {
    return Object.values(this.newEntities);
  }

  removeNewEntities(id) {
    delete this.newEntities[id];
  }

  getCamera() {
    return this.camera;
  }

  setInputs(inputs) {
    this.inputs = { ...this.inputs, ...inputs };
  }

  getInputs() {
    return this.inputs;
  }

  setCursor(cursorData) {
    this.cursors.setCursor(
      cursorData,
      this.inputs.screenWidth,
      this.inputs.screenHeight,
    );
  }

  setResolution(width, height) {
    this.inputs = {
      ...this.inputs,
      screenWidth: width,
      screenHeight: height,
    };

    if (this.handleResize) {
      this.handleResize(width, height);
    }
  }

  onResize(handleResize) {
    this.handleResize = handleResize;
  }

  update() {
    const { entities: serverEntities, camera } = this.serverState;

    if (camera) this.camera = camera;
    serverEntities.forEach((serverEntity) => {
      if (!this.entities[serverEntity.id]) {
        this.newEntities[serverEntity.id] = serverEntity;
      }
    });
  }
}
