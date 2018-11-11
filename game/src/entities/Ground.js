import {
  Mesh,
  FaceColors,
  PlaneGeometry,
  MeshStandardMaterial,
} from 'three';

export default class Ground {
  constructor({
    id, color = 0xffffff, width = 10, height = 10
  }) {
    this.id = id;
    this.object3D = new Mesh(
      new PlaneGeometry(width, height, 20, 20),
      new MeshStandardMaterial({
        color,
        flatShading: true,
        metalness: 0,
        vertexColors: FaceColors
      }),
    );

    this.object3D.geometry.vertices.forEach(vertice => vertice.setZ(Math.random() * 0.1));
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
