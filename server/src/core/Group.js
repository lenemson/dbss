const SPEED = 400;

const computeVelocity = (pos, maxPos) => {
  const translatedPos = pos - (maxPos / 2);
  const normalizedPos = translatedPos / (maxPos / 2);
  return normalizedPos * SPEED;
};

class Group {
  constructor() {
    this.players = {};
  }

  addPlayer(playerId) {
    this.players[playerId] = {
      id: playerId,
      inputs: {
        isActive: false,
        right: false,
        left: false,
        up: false,
        down: false,
        cursorPosition: { x: 400, y: 300 },
        screenWidth: 800,
        screenHeight: 600,
      }
    };
  }

  removePlayer(playerId) {
    delete this.players[playerId];
  }

  setPlayerInputs(playerId, inputs) {
    // // TODO: Inputs validations.
    this.players[playerId] = {
      ...this.players[playerId],
      inputs: inputs,
    };
  }

  getGroupInputs() {
    const activePlayers = Object.values(this.players)
      .filter(player => player.inputs.isActive);

    const playersDirections = activePlayers
      .map(player => ({
        x: computeVelocity(player.inputs.cursorPosition.x, player.inputs.screenWidth),
        y: -computeVelocity(player.inputs.cursorPosition.y, player.inputs.screenHeight),
        z: 0,
      }));

    const direction = playersDirections.reduce((acc, { x: playerX, y: playerY }) => ({
      x: acc.x + (playerX / playersDirections.length),
      y: acc.y + (playerY / playersDirections.length),
      z: 0,
    }), { x: 0, y: 0, z: 0 });

    return { direction };
  }
}

module.exports = Group;
