import { DirectionalLight } from 'three';

export default class Sun {
  constructor({
    id, x = 0, y = 0, z = 50,
    color = 0xcdc1c5, intensity = 1,
    castShadow = true,
  }) {
    this.id = id;
    this.object3D = new DirectionalLight(color, intensity);

    this.object3D.castShadow = castShadow;
    this.object3D.position.set(x, y, z);
  }

  getId() {
    return this.id;
  }

  getObject3D() {
    return this.object3D;
  }

  setPosition(x, y, z) {
    this.object3D.position.set(x, y, z);
  }

  update() {}
}
