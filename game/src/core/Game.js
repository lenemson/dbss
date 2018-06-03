import { TextureLoader, AxesHelper, Vector3 } from 'three';
import { fromEvent } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import {
  createScene,
  createCamera,
  createRenderer,
  createHemisphereLight,
  createDirectionalLight,
  createGround,
  createPlayer,
} from './helpers';

const keyBindings = {
  ArrowRight: new Vector3(0.1, 0, 0),
  ArrowLeft: new Vector3(-0.1, 0, 0),
  ArrowUp: new Vector3(0, 0.1, 0),
  ArrowDown: new Vector3(0, -0.1, 0),
};

export default class Game {
  constructor(config) {
    this.config = config;
    this.scene = createScene(config.scene);
    this.camera = createCamera(config.camera);
    this.renderer = createRenderer(config.renderer);
    this.keyboard = fromEvent(document, 'keydown').pipe(
      pluck('key'),
      map(key => keyBindings[key]),
    );

    this.textureLoader = new TextureLoader();

    this.objects = {};
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
      player: createPlayer(),
    };

    Object.values(this.objects).forEach(object => this.scene.add(object));
    this.keyboard.subscribe(state => state && this.objects.player.position.add(state));
    this.loop();
  }

  // update() {}

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    // this.update();
    this.renderer.render(this.scene, this.camera);
  }
}
