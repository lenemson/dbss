const project = (sourcePoint, sourceMax, targetMax) =>
  (sourcePoint / sourceMax) * targetMax;

export default class Cursors {
  constructor({ screenWidth = 800, screenHeight = 600 } = {}) {
    this.cursors = {};
    this.currentScreenWidth = screenWidth;
    this.currentScreenHeight = screenHeight;
  }

  setCursor(cursorData, screenWidth, screenHeight) {
    const cursor = this.cursors[cursorData.id];

    this.currentScreenWidth = screenWidth;
    this.currentScreenHeight = screenHeight;

    if (!cursor && cursorData.isActive) {
      this.createCursor(cursorData);
    } else if (cursor && !cursorData.isActive) {
      this.removeCursor(cursor);
    } else if (cursor && cursorData.isActive) {
      this.updateCursor(cursor, cursorData);
    }
  }

  createCursor(cursorData) {
    const newDomCursor = document.createElement('span');
    const x = project(
      cursorData.cursorPosition.x,
      cursorData.screenWidth,
      this.currentScreenWidth,
    );
    const y = project(
      cursorData.cursorPosition.y,
      cursorData.screenHeight,
      this.currentScreenHeight,
    );

    newDomCursor.style.width = '128px';
    newDomCursor.style.height = '128px';
    newDomCursor.style.background = 'url(assets/cursors/magnet-blue.png) no-repeat top left';
    newDomCursor.style.position = 'fixed';
    newDomCursor.style.top = `${y}px`;
    newDomCursor.style.left = `${x}px`;

    document.body.appendChild(newDomCursor);
    this.cursors[cursorData.id] = {
      id: cursorData.id,
      element: newDomCursor,
    };
  }

  updateCursor(cursor, cursorData) {
    const x = project(
      cursorData.cursorPosition.x,
      cursorData.screenWidth,
      this.currentScreenWidth,
    );
    const y = project(
      cursorData.cursorPosition.y,
      cursorData.screenHeight,
      this.currentScreenHeight,
    );

    cursor.element.style.top = `${y}px`;
    cursor.element.style.left = `${x}px`;
  }

  removeCursor(cursor) {
    cursor.element.parentNode.removeChild(cursor.element);
    delete this.cursors[cursor.id];
  }
}
