const cannon = require('cannon');

class Ground {
  constructor({ id, color, width, height }) {
    this.id = id;
    this.color = color;
    this.width = width;
    this.height = height;

    this.body = new cannon.Body({
      mass: 0,
      shape: new cannon.Plane(),
    });
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
      type: 'ground',
      color: this.color,
      width: this.width,
      height: this.height,
    };
  }

  update() {}
}

module.exports = Ground;
