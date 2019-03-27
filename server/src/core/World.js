const cannon = require('cannon');

const { createEntity } = require('../entities');

const FIXED_TIME_STEP = 1.0 / 100.0;
const MAX_SUB_STEPS = 10;

class World {
  constructor() {
    this.world = new cannon.World();
    this.entities = [];
    this.spawnPosition = { x: 0, y: 0, z: 0 };

    this.world.broadphase = new cannon.SAPBroadphase(this.world);
    this.character = createEntity({ type: 'character', id: 'character0' });
  }

  inputs(groupInputs) {
    this.character.inputs(groupInputs);
  }

  /**
   * Update entities and step the physics world forward in time.
   * @param {number} delta - Time elapsed since last step.
   */
  update(delta) {
    this.character.update();
    this.world.step(FIXED_TIME_STEP, delta, MAX_SUB_STEPS);
  }

  load(level) {
    this.check(level);
    const {
      gravity,
      entities,
    } = level;
    this.world.gravity.set(gravity.x, gravity.y, gravity.z);
    this.entities.forEach(entity => entity.removeFromWorld(this.world));
    this.entities = [];
    entities.forEach(this.createEntity.bind(this));
    this.character.setSpawn(this.spawnPosition);
    this.character.addToWorld(this.world);
  }

  createEntity(entityData) {
    const entity = createEntity(entityData);
    if (!entity) return;
    entity.addToWorld(this.world);
    this.entities = [...this.entities, entity];

    if (entityData.type === 'spawn') {
      this.spawnPosition = {
        ...entityData.position,
        z: entityData.position.z + 1,
      };
    }

    if (entityData.type === 'ground') {
      entity.onCollide((e) => {
        if (this.character.getBody().id === e.body.id) this.character.die();
      });
    }
  }

  check(level) {
    if (!level) throw new Error('No level');
    if (!level.gravity) throw new Error('No gravity');
    if (!level.entities) throw new Error('No entities');
  }

  getEntities() {
    return [
      ...this.entities.map(entity => entity.toJSON()),
      this.character.toJSON(),
    ];
  }

  getCharacterPosition() {
    return this.character.getPosition();
  }
}

module.exports = World;
