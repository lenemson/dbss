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
    newDomCursor.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABjElEQVRYR2NkIBOoy9z/j6z15hNFRnKMIksTyKIBcwDMYjHJJ2APf/kM8fe3LzJgmtSQIDkEBswBMIu5+S6DffrvjxqYFhGF+OHt21dkhQTRITDgDoClcFwO+f6NHaykefpFMN1R3wSmz507h9eTRIfAoHEAukNg/NTqTSjFgJyMPFEhQXII0NwBsDgmNj8bGRmBS0S/qGCw23i4eUgKCYwQGDAHoBcwr56TVrKRGxLwEBgwB8As5uKBlO3CwmJg+ucvSMlG65BgHDQO4OT6CfYxE8stMP3/nyBK2c4tBknlhEo2WBbAlSbQywd4CGA6AJSdWBl+fBdl+PeXnYFmDkAvWGAOgZXtsBKO2JINpRBgYGCAhURUajxYCiMEBo0D0B0SWbCMrJKN7BAYNA4glIph8oTSBHrc49KHszYkt2hF9wAs8ZHsAHJDAqYP3eKh6wBiQwI99aPzv3z9AhbatGwtSolKdIuIUJqguQNwhQQhi2Hy6D6HiRMdAoPGAegOITYEcNWiJIcAtR0AAG/vVSyXsIyjAAAAAElFTkSuQmCC) no-repeat top left';
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
