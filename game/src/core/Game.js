import { TextureLoader } from 'three';
import Socket from './Socket';
import Inputs from './Inputs';
import Player from './Player';
import arena from '../maps/arena';
import {
  createScene,
  createCamera,
  createRenderer,
} from './helpers';

export default class Game {
  constructor(config) {
    this.config = config;
    this.scene = createScene(config.scene);
    this.camera = createCamera(config.camera);
    this.renderer = createRenderer(config.renderer);
    this.socket = new Socket();
    this.inputs = new Inputs();
    this.map = arena(new TextureLoader());
    this.startTime = null;
    this.state = {
      serverState: {
        players: [],
      },
      inputs: this.inputs.state,
      entities: {},
    };
  }

  start() {
    this.socket.connect(this.state);
    Object.values(this.map).forEach(object => this.scene.add(object));
    this.inputs.start();
    this.loop();
  }

  update(delta) {
    const {
      serverState,
      entities,
    } = this.state;

    serverState.players.forEach((player) => {
      if (!entities[player.id]) {
        const newPlayer = new Player(player);
        entities[player.id] = newPlayer;
        this.scene.add(newPlayer.getObject3D());
      }
    });

    Object.values(entities).forEach((entity) => {
      const entityId = entity.getId();
      if (!serverState.players.find(({ id }) => id === entityId)) {
        this.scene.remove(entity);
        delete entities[entityId];
      } else {
        entity.update(delta, this.state);
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
