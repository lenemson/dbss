module.exports = {
  gravity: {
    x: 0,
    y: 0,
    z: -200,
  },
  entities: [
    {
      id: 0,
      type: 'spawn',
      position: {
        x: 0,
        y: 0,
        z: 10.5,
      },
    },
    {
      id: 1,
      type: 'sun',
      color: 0xcdc1c5,
      intensity: 1,
      castShadow: true,
      position: {
        x: 20,
        y: 0,
        z: 100,
      },
    },
    {
      id: 2,
      type: 'ambientLight',
      skyColor: 0xfffafa,
      groundColor: 0x000000,
      intensity: 1,
    },
    {
      id: 3,
      type: 'ground',
      width: 1000,
      height: 1000,
      color: 0x006994,
    },
    {
      id: 4,
      type: 'platform',
      color: 0x8b4513,
      width: 20,
      height: 40,
      depth: 0.7,
      position: {
        x: 0,
        y: 15,
        z: 10,
      },
    },
    {
      id: 5,
      type: 'platform',
      color: 0x8b4513,
      width: 30,
      height: 10,
      depth: 0.7,
      position: {
        x: -20,
        y: 27,
        z: 20,
      },
      rotation: {
        axis: {
          x: 0,
          y: 1,
          z: 0,
        },
        angle: 45,
      },
    },
    {
      id: 6,
      type: 'platform',
      color: 0x8b4513,
      width: 20,
      height: 20,
      depth: 0.7,
      position: {
        x: -40,
        y: 25,
        z: 30,
      },
    },
    {
      id: 7,
      type: 'platform',
      color: 0x8b4513,
      width: 23,
      height: 2,
      depth: 0.7,
      position: {
        x: -41.3,
        y: 20,
        z: 19,
      },
      rotation: {
        axis: {
          x: 0,
          y: 1,
          z: 0,
        },
        angle: 90,
      },
    },
    {
      id: 8,
      type: 'platform',
      color: 0x8b4513,
      width: 10,
      height: 10,
      depth: 0.7,
      position: {
        x: -41,
        y: 16,
        z: 10,
      },
    },
    {
      id: 9,
      type: 'platform',
      color: 0x8b4513,
      width: 5,
      height: 35,
      depth: 0.7,
      position: {
        x: -41,
        y: -5,
        z: 10,
      },
    },
    {
      id: 10,
      type: 'platform',
      color: 0x8b4513,
      width: 50,
      height: 5,
      depth: 0.7,
      position: {
        x: -20,
        y: -25,
        z: 10,
      },
    },
    {
      id: 11,
      type: 'platform',
      color: 0x8b4513,
      width: 25,
      height: 5,
      depth: 0.7,
      position: {
        x: 14.5,
        y: -25,
        z: 18,
      },
      rotation: {
        axis: {
          x: 0,
          y: 1,
          z: 0,
        },
        angle: -40,
      },
    },
    {
      id: 12,
      type: 'platform',
      color: 0x8b4513,
      width: 25,
      height: 25,
      depth: 0.7,
      position: {
        x: 60,
        y: -25,
        z: 18,
      },
      rotation: {
        axis: {
          x: 0,
          y: 1,
          z: 0,
        },
        angle: -30,
      },
    },
    {
      id: 13,
      type: 'platform',
      color: 0x8b4513,
      width: 15,
      height: 25,
      depth: 0.7,
      position: {
        x: 60,
        y: -10,
        z: 20,
      },
    },
    {
      id: 14,
      type: 'teleporter',
      position: {
        x: 60,
        y: -4,
        z: 20.5,
      },
      teleportPosition: {
        x: 0,
        y: 0,
        z: 25,
      }
    },
  ],
};
