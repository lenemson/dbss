const cannon = require('cannon');

class Platform {
  constructor({ id, color, width, height, depth, position }) {
    this.id = id;
    this.color = color;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = position;
    this.body = new cannon.Body({
      mass: 0,
      position: new cannon.Vec3(position.x, position.y, position.z),
      shape: new cannon.Box(new cannon.Vec3(width / 2, height / 2, depth / 2)),
    })
  }

  getId() {
    return this.id;
  }

  getBody() {
    return this.body;
  }

  toJSON() {
    return {
      id: this.id,
      type: 'platform',
      color: this.color,
      position: this.body.position,
      width: this.width,
      height: this.height,
      depth: this.depth
    };
  }

  update() {}
}

module.exports = Platform;
