const cannon = require('cannon');

const { createEntity } = require('../entities');

const FIXED_TIME_STEP = 1.0 / 60.0;
const MAX_SUB_STEPS = 3;

class World {
  constructor() {
    this.world = new cannon.World();
    this.entities = [];
    this.players = [];
    this.spawnPosition = { x: 0, y: 0, z: 0 };

    this.world.broadphase = new cannon.NaiveBroadphase();
  }

  /**
   * Update entities and step the physics world forward in time.
   * @param {number} delta - Time elapsed since last step.
   */
  update(delta) {
    this.players.forEach(player => player.update());
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
        const groundedPlayer = this.players.find(
          player => player.getBody().id === e.body.id
        );

        if (groundedPlayer) groundedPlayer.die();
      });
    }
  }

  check(level) {
    if (!level) throw new Error('No level');
    if (!level.gravity) throw new Error('No gravity');
    if (!level.entities) throw new Error('No entities');
  }

  addPlayer(player) {
    player.setSpawn(this.spawnPosition);
    player.addToWorld(this.world);
    this.players = [...this.players, player];
  }

  removePlayer(player) {
    player.removeFromWorld(this.world);
    this.players = this.players.filter(p => p.getId() !== player.getId());
  }

  getEntities() {
    return [
      ...this.players.map(player => player.toJSON()),
      ...this.entities.map(entity => entity.toJSON())
    ];
  }

  getSpawnPosition() {
    return this.spawnPosition;
  }
}

module.exports = World;
