<div id="socket-status">
  <div class="{isConnected ? 'dot-connected' : 'dot-disconnected'}" />
  <div class="text">
    {isConnected ? 'connected' : 'disconnected'}
  </div>
  {#if isConnected}
    <div class="info">[{players.length}]</div>
  {/if}
</div>

<style>
  #socket-status {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    font-family: Courier New;
  }

  #socket-status >  .dot-connected {
    width: 10px;
    height: 10px;
    background: green;
    border-radius: 50%;
  }

  #socket-status > .dot-disconnected {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }

  #socket-status > .text {
    padding: 2px 5px;
    font-weight: bold;
  }

  #socket-status > .info {
    padding: 2px 5px;
    font-size: 0.8em;
  }
</style>

<script>
  export default {
    data() {
      return {
        isConnected: false,
        players: [],
      };
    },
  }
</script>
