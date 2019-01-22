const cannon = require('cannon');

const Platform = require('../entities/Platform');

class Map {
  constructor(world) {
    this.world = world;
    this.entities = [];
    this.spawnPosition = { x: 0, y: 0, z: 0 };
  }

  init() {
    this.spawnPosition = { x: 0, y: 0, z: 10.1 };

    // Add ground.
    this.world.addBody(
      new cannon.Body({
        mass: 0,
        shape: new cannon.Plane(),
      })
    );

    // Add a platform.
    const platform = new Platform({
      id: 3,
      color: 0x8b4513,
      width: 20,
      height: 5,
      depth: 0.1,
      position: {
        x: 0,
        y: 0,
        z: 10,
      }
    });

    this.world.addBody(platform.getBody());

    this.entities = [
      {
        id: 0,
        type: 'sun',
        position: {
          x: 0,
          y: 0,
          z: 50,
        },
        color: 0xcdc1c5,
        intensity: 1,
        castShadow: true,
      },
      {
        id: 1,
        type: 'ambientLight',
        skyColor: 0xfffafa,
        groundColor: 0x000000,
        intensity: 1,
      },
      {
        id: 2,
        type: 'ground',
        width: 20,
        height: 20,
        color: 0x8b4513,
      },
      platform.toJSON()
    ];
  }

  getEntities() {
    return this.entities;
  }

  getSpawnPosition() {
    return this.spawnPosition;
  }
}

module.exports = Map;
