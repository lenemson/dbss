class Sun {
  constructor({ id, color, intensity, castShadow, position }) {
    this.id = id;
    this.color = color;
    this.intensity = intensity;
    this.castShadow = castShadow;
    this.position = position;

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
      type: 'sun',
      color: this.color,
      intensity: this.intensity,
      castShadow: this.castShadow,
      position: this.position,
    };
  }

  update() {}
}

module.exports = Sun;
