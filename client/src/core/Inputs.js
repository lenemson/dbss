import { Vector3 } from 'three';

const keyMap = {
  68: 'right',
  65: 'left',
  81: 'left',
  87: 'up',
  90: 'up',
  83: 'down',
};

export default class Inputs {
  constructor() {
    this.gameState = null;
  }

  start(gameState) {
    this.gameState = gameState;
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('mouseout', this.handleMouseOut.bind(this));
  }

  stop() {
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('mouseout', this.handleMouseOut.bind(this));
  }

  handleKeyUp(event) {
    const key = keyMap[event.keyCode];
    if (key && this.gameState) this.gameState.setInputs({ [key]: false });
  }

  handleKeyDown(event) {
    const key = keyMap[event.keyCode];
    if (key && this.gameState) this.gameState.setInputs({ [key]: true });
  }

  handleMouseMove(event) {
    this.gameState.setInputs({
      isActive: true,
      cursorPosition: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  }

  handleResize() {
    this.gameState.setResolution(window.innerWidth, window.innerHeight);
  }

  handleMouseOut() {
    this.gameState.setInputs({ isActive: false });
  }
}
