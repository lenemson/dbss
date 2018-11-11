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

  toJSON() {
    return {
      id: this.id,
      type: 'player',
      color: this.color,
      position: this.body.position
    };
  }

  update() {
    if (this.inputs.right) {
      this.body.velocity.x = 15;
    } else if (this.inputs.left) {
      this.body.velocity.x = -15;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.inputs.up) {
      this.body.velocity.y = 15;
    } else if (this.inputs.down) {
      this.body.velocity.y = -15;
    } else {
      this.body.velocity.y = 0;
    }
  }
}

module.exports = Player;
