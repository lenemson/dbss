import { HemisphereLight } from 'three';

export default class AmbientLight {
  constructor({
    id, skyColor, groundColor, intensity,
  }) {
    this.id = id;
    this.object3D = new HemisphereLight(skyColor, groundColor, intensity);
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
