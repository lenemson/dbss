import { TextureLoader, AxesHelper } from 'three';
import Socket from './Socket';
import Inputs from './Inputs';
import Player from './Player';
import {
  createScene,
  createCamera,
  createRenderer,
  createHemisphereLight,
  createDirectionalLight,
  createGround,
} from './helpers';

export default class Game {
  constructor(config) {
    this.config = config;
    this.scene = createScene(config.scene);
    this.camera = createCamera(config.camera);
    this.renderer = createRenderer(config.renderer);
    this.textureLoader = new TextureLoader();
    this.socket = new Socket();
    this.inputs = new Inputs();
    this.player = new Player();
    this.players = {};
    this.objects = {};
    this.startTime = null;
    this.state = {
      player: {
        x: 0,
        y: 0,
        z: 0,
        mouse: { x: 0, y: 0 },
      },
      camera: {
        x: 0,
        y: 0,
        z: 10,
        speed: 300,
        distance: 5,
        angle: 0,
      },
    };
  }

  start() {
    this.objects = {
      axesHelper: new AxesHelper(2),
      ambient: createHemisphereLight(),
      sun: createDirectionalLight(),
      ground: createGround(this.textureLoader),
      player: this.player.getEntity(),
    };

    this.socket.socket.on('spawn', (player) => {
      const newPlayer = new Player(player.position);
      this.players[player.id] = newPlayer;
      this.scene.add(newPlayer.getEntity());
    });

    this.socket.socket.on('unspawn', (player) => {
      this.scene.remove(this.players[player.id].getEntity());
      delete this.players[player.id];
    });

    this.socket.socket.on('move', (player) => {
      const { id, position: { x, y, z } } = player;
      const playerMoving = this.players[id];

      if (playerMoving) {
        playerMoving.moveTo(x, y, z);
      } else {
        this.socket.getPlayers();
      }
    });

    this.socket.socket.on('players', (players) => {
      Object.values(players).forEach((player) => {
        const newPlayer = new Player(player.position);
        this.players[player.id] = newPlayer;
        this.scene.add(newPlayer.getEntity());
      });
    });

    this.socket.spawn(this.player);
    Object.values(this.objects).forEach(object => this.scene.add(object));
    this.inputs.start();
    this.loop();
  }

  update(delta) {
    const {
      right,
      left,
      up,
      down,
    } = this.inputs.state;

    if (right) this.player.move(0.01 * delta, 0, 0);
    if (left) this.player.move(-0.01 * delta, 0, 0);
    if (up) this.player.move(0, 0.01 * delta, 0);
    if (down) this.player.move(0, -0.01 * delta, 0);
    if (right || left || up || down) this.socket.move(this.player);
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
