import {
  Mesh,
  Vector3,
  BoxGeometry,
  MeshStandardMaterial,
} from 'three';

export default class Platform {
  constructor({
    id, color = 0xffffff,
    width, height, depth,
    rotation: { axis, angle = 0 } = {},
    position: {
      x = 0, y = 0, z = 0,
    } = {},
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new BoxGeometry(width, height, depth),
      new MeshStandardMaterial({ color }),
    );

    this.object3D.position.set(x, y, z);
    this.object3D.castShadow = true;
    this.object3D.receiveShadow = true;

    if (axis && angle) {
      this.setRotation(
        new Vector3(axis.x, axis.y, axis.z),
        angle,
      );
    }
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

  setRotation(axis, angle) {
    this.object3D.setRotationFromAxisAngle(axis, angle);
  }

  update() {}
}
