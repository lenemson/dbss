import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  HemisphereLight,
  DirectionalLight,
  MeshStandardMaterial,
  Mesh,
  PlaneGeometry,
  FaceColors,
} from 'three';

export const createCamera = ({
  fov = 75, ratio, near = 0.1, far = 1000,
}) => {
  const camera = new PerspectiveCamera(fov, ratio, near, far);

  camera.position.set(0, -20, 20);
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

export const createHemisphereLight = ({
  skyColor = 0xfffafa, groundColor = 0x000000, intensity = 1,
} = {}) =>
  new HemisphereLight(skyColor, groundColor, intensity);

export const createDirectionalLight = ({
  color = 0xcdc1c5,
  intensity = 1,
  position: { x = 0, y = 0, z = 50 } = {},
  castShadow = true,
} = {}) => {
  const directionalLight = new DirectionalLight(color, intensity);

  directionalLight.position.set(x, y, z);
  directionalLight.castShadow = castShadow;
  return directionalLight;
};

export const createGround = () => {
  const planeGeometry = new PlaneGeometry(10, 10, 20, 20);
  const planeMaterial = new MeshStandardMaterial({
    color: 0x7CFC00,
    flatShading: true,
    metalness: 0,
    vertexColors: FaceColors,
  });
  const plane = new Mesh(planeGeometry, planeMaterial);

  plane.geometry.vertices.forEach(vertice => vertice.setZ(Math.random() * 0.1));

  return plane;
};
