import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  PCFSoftShadowMap,
  AxesHelper,
} from 'three';

export const createCamera = ({
  fov = 75, ratio, near = 0.1, far = 1000,
}) => new PerspectiveCamera(fov, ratio, near, far);

export const createScene = () => new Scene();

export const createRenderer = ({
  canvas, width = 800, height = 600, alpha = true, clear,
}) => {
  const renderer = new WebGLRenderer({ canvas, alpha });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.setSize(width, height);
  if (clear) renderer.setClearColor(clear.color || 0xffffff, clear.alpha || 1);
  return renderer;
};

export const createAxesHelper = (size = 5, x = -25, y = -10, z = 5) => {
  const axesHelper = new AxesHelper(size);
  axesHelper.position.set(x, y, z);
  return axesHelper;
};
