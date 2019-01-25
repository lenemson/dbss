const AmbientLight = require('./AmbientLight');
const Platform = require('./Platform');
const Player = require('./Player');
const Ground = require('./Ground');
const Spawn = require('./Spawn');
const Sun = require('./Sun');

const entitiesByType = {
  ambientLight: AmbientLight,
  platform: Platform,
  player: Player,
  ground: Ground,
  spawn: Spawn,
  sun: Sun,
};

const createEntity = (entityData) => {
  const Entity = entitiesByType[entityData.type];
  if (Entity) return new Entity(entityData);
  return null;
};

module.exports = {
  entitiesByType,
  createEntity,
};
