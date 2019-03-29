import Root from '../ui/root.svelte';

export default class UI {
  constructor(gameStore, config) {
    this.gameStore = gameStore;
    this.config = config;
    this.root = null;
  }

  mount() {
    this.root = new Root({
      target: this.config.rootElement,
      data: this.gameStore.getUiState(),
    });

    this.gameStore.onUiUpdate(state => this.root.set(state));

    this.root.on('login', (event) => {
      this.gameStore.setUsername(event.name);
    });
  }

  unmount() {
    this.gameStore.onUiUpdate(() => {});
    this.root.destroy();
  }
}
