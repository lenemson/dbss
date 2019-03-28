const AmbientLight = require('./AmbientLight');
const Teleporter = require('./Teleporter');
const Character = require('./Character');
const Platform = require('./Platform');
const Ground = require('./Ground');
const Spawn = require('./Spawn');
const Sun = require('./Sun');

const entitiesByType = {
  ambientLight: AmbientLight,
  teleporter: Teleporter,
  character: Character,
  platform: Platform,
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
