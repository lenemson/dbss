import { TextureLoader } from 'three';
import State from './State';
import Socket from './Socket';
import Inputs from './Inputs';
import arena from '../maps/arena';
import {
  createScene,
  createCamera,
  createRenderer,
  createEntity,
} from './helpers';

export default class Game {
  constructor(config) {
    this.config = config;
    this.scene = createScene(config.scene);
    this.camera = createCamera(config.camera);
    this.renderer = createRenderer(config.renderer);
    this.state = new State();
    this.socket = new Socket();
    this.inputs = new Inputs();
    this.map = arena(new TextureLoader());
    this.startTime = null;
  }

  start() {
    this.inputs.start(this.state);
    this.socket.connect(this.state);
    Object.values(this.map).forEach(object => this.scene.add(object));
    this.loop();
  }

  update(delta) {
    const { state } = this;

    state.update();

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
