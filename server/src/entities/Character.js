const cannon = require('cannon');

const STATE_ALIVE = 'alive';
const STATE_DEAD = 'dead';

class Character {
  constructor({ id }) {
    this.id = id;
    this.spawnPosition = { x: 0, y: 0, z: 0 };
    this.direction = { x: 0, y: 0, z: 0 };

    this.body = new cannon.Body({
      mass: 50,
      position: new cannon.Vec3(0, 0, 0),
      shape: new cannon.Sphere(1),
    });

    this.state = STATE_ALIVE;
  }

  inputs({ direction }) {
    this.direction = direction;
  }

  update() {
    if (this.state === STATE_DEAD) {
      this.setPositionToSpawn();
      this.state = STATE_ALIVE;
    } else {
      // TODO: Check max speed.
      const { x, y } = this.direction;
      this.body.velocity.x = x / 5;
      this.body.velocity.y = y / 5;
      this.direction = { x: 0, y: 0, z: 0 };
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

  setPosition(x, y, z) {
    this.body.position.x = x;
    this.body.position.y = y;
    this.body.position.z = z;
  }

  getPosition() {
    return this.body.position;
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
      type: 'character',
      position: this.body.position
    };
  }
}

module.exports = Character;
