import AmbientLight from './AmbientLight';
import Platform from './Platform';
import Player from './Player';
import Ground from './Ground';
import Spawn from './Spawn';
import Sun from './Sun';

export const entitiesByType = {
  ambientLight: AmbientLight,
  platform: Platform,
  player: Player,
  ground: Ground,
  spawn: Spawn,
  sun: Sun,
};

export const createEntity = (entityData) => {
  const Entity = entitiesByType[entityData.type];
  if (Entity) return new Entity(entityData);
  return null;
};
