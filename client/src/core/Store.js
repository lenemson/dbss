const project = (sourcePoint, sourceMax, targetMax) =>
  (sourcePoint / sourceMax) * targetMax;

export default class Store {
  constructor({ renderer }) {
    this.isConnected = false;
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
    this.cursors = {};
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
    this.ui = {
      username: '',
      isConnected: false,
      needLogin: false,
      cursors: [],
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
    if (!cursorData.isActive) {
      delete this.cursors[cursorData.id];
    } else {
      this.cursors[cursorData.id] = {
        ...cursorData,
        x: project(
          cursorData.cursorPosition.x,
          cursorData.screenWidth,
          this.inputs.screenWidth,
        ),
        y: project(
          cursorData.cursorPosition.y,
          cursorData.screenHeight,
          this.inputs.screenHeight,
        ),
      };
    }

    this.ui = {
      ...this.ui,
      cursors: Object.values(this.cursors),
    };

    this.handleUiUpdate(this.ui);
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

  setUsername(username) {
    this.ui = {
      ...this.ui,
      username,
      needLogin: false,
    };
    this.handleLogin(username);
    this.handleUiUpdate(this.ui);
  }

  getUsername() {
    return this.username;
  }

  socketConnect() {
    this.ui = {
      ...this.ui,
      isConnected: true,
      needLogin: true,
    };

    this.handleUiUpdate(this.ui);
  }

  socketDisconnect() {
    this.ui = {
      ...this.ui,
      isConnected: false,
    };
  }

  getUiState() {
    return this.ui;
  }

  onUiUpdate(handleUiUpdate) {
    this.handleUiUpdate = handleUiUpdate;
  }

  onLoginNeeded(handleLogin) {
    this.handleLogin = handleLogin;
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
