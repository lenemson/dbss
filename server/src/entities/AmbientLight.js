const cannon = require('cannon');

class AmbientLight {
  constructor({ id, skyColor, groundColor, intensity }) {
    this.id = id;
    this.skyColor = skyColor;
    this.groundColor = groundColor;
    this.intensity = intensity;

    this.body = null;
  }

  getId() {
    return this.id;
  }

  getBody() {
    return this.body;
  }

  addToWorld(world) {}

  removeFromWorld(world) {}

  toJSON() {
    return {
      id: this.id,
      type: 'ambientLight',
      skyColor: this.skyColor,
      groundColor: this.groundColor,
      intensity: this.intensity,
    };
  }

  update() {}
}

module.exports = AmbientLight;
