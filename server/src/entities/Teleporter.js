const cannon = require('cannon');

const COLOR = 0x0e99b8;
const WIDTH = 6;
const HEIGHT = 6;
const DEPTH = 0.5;

class Teleporter {
  constructor({ id, position, teleportPosition }) {
    this.id = id;
    this.position = position;
    this.teleportPosition = teleportPosition;
    this.body = new cannon.Body({
      mass: 0,
      position: new cannon.Vec3(position.x, position.y, position.z),
      shape: new cannon.Box(new cannon.Vec3(WIDTH / 2, HEIGHT / 2, DEPTH / 2)),
    })
  }

  getId() {
    return this.id;
  }

  getBody() {
    return this.body;
  }

  addToWorld(world) {
    world.addBody(this.body);
  }

  removeFromWorld(world) {
    world.removeBody(this.body);
  }

  onCollide(handleCollide) {
    this.body.addEventListener('collide', handleCollide);
  }

  toJSON() {
    return {
      id: this.id,
      type: 'teleporter',
      color: COLOR,
      width: WIDTH,
      height: HEIGHT,
      depth: DEPTH,
      position: this.body.position,
      teleportPosition: this.teleportPosition,
    };
  }

  update() {}
}

module.exports = Teleporter;
