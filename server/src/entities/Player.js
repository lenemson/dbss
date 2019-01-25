const cannon = require('cannon');

class Player {
  constructor({ id, color, position }) {
    this.id = id;
    this.color = color;
    this.inputs = {
      right: false,
      left: false,
      up: false,
      down: false,
      direction: { x: 0, y: 0, z: 0 },
    };
    this.body = new cannon.Body({
      mass: 50,
      position: new cannon.Vec3(position.x, position.y, position.z),
      shape: new cannon.Sphere(1),
    });
  }

  getId() {
    return this.id;
  }

  getBody() {
    return this.body;
  }

  setInputs(inputs) {
    this.inputs = inputs;
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
      type: 'player',
      color: this.color,
      position: this.body.position
    };
  }

  update() {
    // TODO: Check max speed.
    this.body.velocity.x = this.inputs.direction.x / 5;
    this.body.velocity.y = this.inputs.direction.y / 5;
  }
}

module.exports = Player;
