<div id="player-list">
  <SocketStatus isConnected={isConnected} players={players} />
  <ul>
    {#each players as player}
      <li>
        <div class="{player.isActive ? 'dot-active' : 'dot-inactive'}" />
        <div class="text">{player.username}</div>
      </li>
    {/each}
  </ul>
</div>

<style>
  #player-list {
    position: fixed;
    bottom: 10px;
    right: 10px;
    min-height: 200px;
    max-height: 400px;
    width: 250px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #a9a9a9;
    border-bottom: 5px solid #a9a9a9;
    padding: 20px;
    font-family: Courier New;
    overflow-y: auto;
  }

  #player-list > ul {
    list-style: none;
    padding-inline-start: 0;
    margin-block-end: 0;
  }

  #player-list > ul > li {
    overflow: hidden;
    white-space:nowrap;
	  text-overflow:ellipsis;
    display: flex;
    align-items: center;
  }

  #player-list > ul > li > .dot-active {
    width: 10px;
    height: 10px;
    background: green;
    border-radius: 50%;
  }

  #player-list > ul > li > .dot-inactive {
    width: 10px;
    height: 10px;
    background: orange;
    border-radius: 50%;
  }

  #player-list > ul > li > .text {
    padding: 2px 5px;
  }
</style>

<script>
  import SocketStatus from './socket-status.svelte';

  export default {
    data() {
      return {
        players: [],
        isConnected: false,
      };
    },
    components: {
      SocketStatus,
    },
  }
</script>
