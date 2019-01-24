import State from './State';
import Socket from './Socket';
import Inputs from './Inputs';
import {
  createScene,
  createCamera,
  createRenderer,
  createEntity,
  createAxesHelper,
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
    this.startTime = null;
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  start() {
    this.camera.position.set(0, -50, 35);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(createAxesHelper());
    this.inputs.start(this.state);
    this.socket.connect(this.state);
    this.loop();
  }

  update(delta) {
    const { state, camera } = this;
    const playerId = state.getPlayerId();

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

        if (entityId === playerId) {
          camera.position.set(
            entity.getPosition().x,
            entity.getPosition().y - 50,
            entity.getPosition().z + 35,
          );
          camera.lookAt(
            entity.getPosition().x,
            entity.getPosition().y,
            entity.getPosition().z,
          );
        }
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
