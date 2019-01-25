const cannon = require('cannon');

class Platform {
  constructor({ id, color, width, height, depth, rotation = {}, position }) {
    this.id = id;
    this.color = color;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.rotation = {
      ...rotation,
      angle: rotation.angle ? rotation.angle * (Math.PI / 180) : 0,
    };
    this.position = position;
    this.body = new cannon.Body({
      mass: 0,
      position: new cannon.Vec3(position.x, position.y, position.z),
      shape: new cannon.Box(new cannon.Vec3(width / 2, height / 2, depth / 2)),
    });

    const { axis, angle } = this.rotation;
    if (axis && angle) {
      this.body.quaternion.setFromAxisAngle(
        new cannon.Vec3(axis.x, axis.y, axis.z),
        angle,
      )
    }
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

  toJSON() {
    return {
      id: this.id,
      type: 'platform',
      color: this.color,
      position: this.body.position,
      rotation: this.rotation,
      width: this.width,
      height: this.height,
      depth: this.depth
    };
  }

  update() {}
}

module.exports = Platform;
