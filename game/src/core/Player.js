import {
  Mesh,
  Vector3,
  CubeGeometry,
  MeshLambertMaterial,
} from 'three';

export default class Player {
  constructor(position = { x: 0, y: 0, z: 0 }) {
    this.player = new Mesh(
      new CubeGeometry(1, 1, 1),
      new MeshLambertMaterial({ color: 0xffffff * Math.random() }),
    );

    const { x, y, z } = position;
    this.player.position.set(x, y, z);
    this.player.castShadow = true;
    this.player.receiveShadow = true;
  }

  getEntity() {
    return this.player;
  }

  move(x, y, z) {
    this.player.position.add(new Vector3(x, y, z));
  }

  moveTo(x, y, z) {
    this.player.position.set(x, y, z);
  }
}
