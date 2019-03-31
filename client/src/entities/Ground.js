import {
  Mesh,
  FaceColors,
  PlaneGeometry,
  MeshStandardMaterial,
} from 'three';

export default class Ground {
  constructor({
    id, color = 0xffffff, width = 10, height = 10,
  }) {
    this.id = id;
    this.count = 0;
    this.object3D = new Mesh(
      new PlaneGeometry(width, height, 100, 100),
      new MeshStandardMaterial({
        color,
        flatShading: true,
        metalness: 0,
        vertexColors: FaceColors,
      }),
    );

    this.object3D.receiveShadow = true;
    this.object3D.geometry.vertices.forEach(vertice => vertice.setZ(Math.random() * 2));
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

  update() {
    let i = 0;
    for (let ix = 0; ix < 100; ix += 1) {
      for (let iy = 0; iy < 100; iy += 1) {
        this.object3D.geometry.vertices[i].z =
          (Math.sin((ix + this.count) * 1) * 2)
          + (Math.cos((iy + this.count) * 0.75) * 4);
        i += 1;
      }
    }

    this.count += 0.01;

    this.object3D.geometry.verticesNeedUpdate = true;
  }
}
