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
  }

  stop() {
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyUp(event) {
    const key = keyMap[event.keyCode];
    if (key && this.gameState) this.gameState.updateInputs({ [key]: false });
  }

  handleKeyDown(event) {
    const key = keyMap[event.keyCode];
    if (key && this.gameState) this.gameState.updateInputs({ [key]: true });
  }
}
