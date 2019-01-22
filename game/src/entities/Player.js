import {
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
} from 'three';

export default class Player {
  constructor({
    id, x = 0, y = 0, z = 0, color = 0xffffff,
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new SphereGeometry(1, 20, 20),
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

  setOrientation(x, y, z, w) {
    this.object3D.quaternion.set(x, y, z, w);
  }

  update(delta, newState) {
    if (newState) {
      const { position, quaternion } = newState;
      this.setPosition(position.x, position.y, position.z);
      //this.setOrientation(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
  }
}
