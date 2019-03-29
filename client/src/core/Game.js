import Store from './Store';
import Socket from './Socket';
import Inputs from './Inputs';
import UI from './UI';
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
    this.store = new Store(config);
    this.ui = new UI(this.store, config.ui);
    this.inputs = new Inputs(this.store);
    this.socket = new Socket(this.store);
    this.startTime = null;

    this.store.onResize(this.handleResize.bind(this));
  }

  handleResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  start() {
    if (process.env.NODE_ENV === 'development') {
      this.scene.add(createAxesHelper());
    }
    this.ui.mount();
    this.inputs.start();
    this.socket.connect();
    this.loop();
  }

  loop(time) {
    requestAnimationFrame(this.loop.bind(this));

    if (!this.startTime) this.startTime = time;
    const delta = time - this.startTime;
    this.startTime = time;

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  }

  update(delta) {
    const { store, camera } = this;

    store.update();

    const cameraState = store.getCamera();

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
    store.getNewEntities().forEach((newEntity) => {
      const entity = createEntity(newEntity);
      if (entity) {
        store.addEntity(entity);
        this.scene.add(entity.getObject3D());
      }
      store.removeNewEntities(newEntity.id);
    });

    // Iterate through the entity pool to:
    // - Update entities
    // - Remove entities that are not in the server state
    const serverEntities = store.getServerEntities();
    store.getEntities().forEach((entity) => {
      const entityId = entity.getId();
      const serverEntity = serverEntities.find(({ id }) => id === entityId);
      if (!serverEntity) {
        this.scene.remove(entity.getObject3D());
        this.store.removeEntity(entityId);
      } else {
        entity.update(delta, serverEntity, this.store);
      }
    });
  }
}
