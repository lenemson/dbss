import AmbientLight from './AmbientLight';
import Character from './Character';
import Platform from './Platform';
import Ground from './Ground';
import Spawn from './Spawn';
import Sun from './Sun';

export const entitiesByType = {
  ambientLight: AmbientLight,
  character: Character,
  platform: Platform,
  ground: Ground,
  spawn: Spawn,
  sun: Sun,
};

export const createEntity = (entityData) => {
  const Entity = entitiesByType[entityData.type];
  if (Entity) return new Entity(entityData);
  return null;
};
