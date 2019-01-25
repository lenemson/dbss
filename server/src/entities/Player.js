const cannon = require('cannon');

const STATE_ALIVE = 'alive';
const STATE_DEAD = 'dead';

class Player {
  constructor({ id, color }) {
    this.id = id;
    this.color = color;
    this.spawnPosition = { x: 0, y: 0, z: 0 };
    this.inputs = {
      right: false,
      left: false,
      up: false,
      down: false,
      direction: { x: 0, y: 0, z: 0 },
    };

    this.body = new cannon.Body({
      mass: 50,
      position: new cannon.Vec3(0, 0, 0),
      shape: new cannon.Sphere(1),
    });

    this.state = STATE_ALIVE;
  }

  update() {
    if (this.state === STATE_DEAD) {
      this.setPositionToSpawn();
      this.state = STATE_ALIVE;
    } else {
      // TODO: Check max speed.
      this.body.velocity.x = this.inputs.direction.x / 5;
      this.body.velocity.y = this.inputs.direction.y / 5;
    }
  }

  die() {
    this.state = STATE_DEAD;
  }

  getId() {
    return this.id;
  }

  getBody() {
    return this.body;
  }

  setSpawn(position) {
    this.spawnPosition = position;
  }

  setInputs(inputs) {
    this.inputs = inputs;
  }

  setPosition(x, y, z) {
    this.body.position.x = x;
    this.body.position.y = y;
    this.body.position.z = z;
  }

  setPositionToSpawn() {
    this.setPosition(
      this.spawnPosition.x,
      this.spawnPosition.y,
      this.spawnPosition.z,
    );
  }

  addToWorld(world) {
    this.setPositionToSpawn();
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
}

module.exports = Player;
