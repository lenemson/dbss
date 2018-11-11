import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three';

import Sun from '../entities/Sun';
import Ground from '../entities/Ground';
import Platform from '../entities/Platform';
import Player from '../entities/Player';
import AmbientLight from '../entities/AmbientLight';

export const createCamera = ({
  fov = 75, ratio, near = 0.1, far = 1000,
}) => {
  const camera = new PerspectiveCamera(fov, ratio, near, far);

  camera.position.set(0, -50, 50);
  camera.lookAt(0, 0, 0);
  return camera;
};

export const createScene = () => new Scene();

export const createRenderer = ({
  width = 800, height = 600, alpha = true, clear,
}) => {
  const renderer = new WebGLRenderer({ alpha });

  renderer.setSize(width, height);
  if (clear) renderer.setClearColor(clear.color || 0xffffff, clear.alpha || 1);
  return renderer;
};

const entityTypes = {
  sun: Sun,
  ground: Ground,
  platform: Platform,
  player: Player,
  ambientLight: AmbientLight,
};

export const createEntity = (entity) => {
  const Entity = entityTypes[entity.type];
  if (Entity) return new Entity(entity);
  return null;
};
