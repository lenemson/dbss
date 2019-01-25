import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
} from 'three';

export default class Spawn {
  constructor({
    id, color = 0x000000,
    width, height, depth,
    position: {
      x = 0, y = 0, z = 0
    }
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new BoxGeometry(width, height, depth),
      new MeshStandardMaterial({ color }),
    );

    this.object3D.position.set(x, y, z);
    this.object3D.castShadow = true;
    this.object3D.receiveShadow = true;
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
