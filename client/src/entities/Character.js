import {
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
  FaceColors,
  Vector3,
} from 'three';

export default class Character {
  constructor({
    id, x = 0, y = 0, z = 0,
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new SphereGeometry(1, 16, 16),
      new MeshLambertMaterial({ vertexColors: FaceColors }),
    );

    const faceLength = this.object3D.geometry.faces.length;
    for (let i = 0; i < faceLength; i += 1) {
      if (i < faceLength / 4) {
        this.object3D.geometry.faces[i].color.setHex(0xffffff);
      } else if (i < faceLength / 2) {
        this.object3D.geometry.faces[i].color.setHex(0x000000);
      } else if (i < faceLength * 0.75) {
        this.object3D.geometry.faces[i].color.setHex(0xffffff);
      } else {
        this.object3D.geometry.faces[i].color.setHex(0x000000);
      }
    }

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

  getPosition() {
    return this.object3D.position;
  }

  setPosition(x, y, z) {
    this.object3D.position.set(x, y, z);
  }

  setOrientation(x, y, z, w) {
    this.object3D.quaternion.set(x, y, z, w);
  }

  update(delta, newState) {
    if (newState) {
      const { position } = newState;
      const direction = new Vector3(position.x, position.y, position.z)
        .sub(this.object3D.position);
      this.setPosition(position.x, position.y, position.z);
      this.object3D.rotation.x -= direction.y * 0.5;
      this.object3D.rotation.y += direction.x * 0.5;
    }
  }
}
