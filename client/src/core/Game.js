import State from './State';
import Socket from './Socket';
import Inputs from './Inputs';
import { createEntity } from '../entities';
import {
  createScene,
  createCamera,
  createRenderer,
  createAxesHelper,
} from './helpers';

export default class Game {
  constructor(config) {
    this.config = config;
    this.scene = createScene(config.scene);
    this.camera = createCamera(config.camera);
    this.renderer = createRenderer(config.renderer);
    this.state = new State(config);
    this.socket = new Socket();
    this.inputs = new Inputs();
    this.startTime = null;

    this.state.onResize(this.handleResize.bind(this));
  }

  handleResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  start() {
    this.scene.add(createAxesHelper());
    this.inputs.start(this.state);
    this.socket.connect(this.state);
    this.loop();
  }

  update(delta) {
    const { state, camera } = this;

    state.update();

    const cameraState = state.getCamera();

    camera.position.set(
      cameraState.position.x,
      cameraState.position.y,
      cameraState.position.z,
    );
    camera.lookAt(
      cameraState.lookAt.x,
      cameraState.lookAt.y,
      cameraState.lookAt.z,
    );

    // Add new entities received from the server to
    // the entity pool and the threejs scene.
    state.getNewEntities().forEach((newEntity) => {
      const entity = createEntity(newEntity);
      if (entity) {
        state.addEntity(entity);
        this.scene.add(entity.getObject3D());
      }
      state.removeNewEntities(newEntity.id);
    });

    // Iterate through the entity pool to:
    // - Update entities
    // - Remove entities that are not in the server state
    const serverEntities = state.getServerEntities();
    state.getEntities().forEach((entity) => {
      const entityId = entity.getId();
      const serverEntity = serverEntities.find(({ id }) => id === entityId);
      if (!serverEntity) {
        this.scene.remove(entity.getObject3D());
        this.state.removeEntity(entityId);
      } else {
        entity.update(delta, serverEntity, this.state);
      }
    });
  }

  loop(time) {
    requestAnimationFrame(this.loop.bind(this));

    if (!this.startTime) this.startTime = time;
    const delta = time - this.startTime;
    this.startTime = time;

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  }
}
