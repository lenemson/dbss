import { AxesHelper } from 'three';
import {
  createGround,
  createHemisphereLight,
  createDirectionalLight,
} from '../core/helpers';

export default textureLoader => ({
  axesHelper: new AxesHelper(2),
  ambient: createHemisphereLight(),
  sun: createDirectionalLight(),
  ground: createGround(textureLoader),
});
