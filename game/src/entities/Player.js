import {
  Mesh,
  CubeGeometry,
  MeshLambertMaterial,
} from 'three';

export default class Player {
  constructor({
    id, x = 0, y = 0, z = 0, color = 0xffffff,
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new CubeGeometry(1, 1, 1),
      new MeshLambertMaterial({ color }),
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

  update(delta, newState) {
    if (newState) {
      const { x = 0, y = 0, z = 0 } = newState;
      this.setPosition(x, y, z);
    }
  }
}
