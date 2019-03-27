import Game from './core/Game';

const game = new Game({
  scene: {},
  camera: {
    fov: 50,
    ratio: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
  },
  renderer: {
    canvas: document.getElementById('canvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    alpha: true,
    clear: { color: 0xfffafa, alpha: 1 },
  },
});

game.start();
