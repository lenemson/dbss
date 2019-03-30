<div id="root">
  <Login needLogin={needLogin} on:login="fire('login', event)"/>
  <PlayerList players={players} isConnected={isConnected} />
  {#each cursors as cursor}
    <Cursor {...cursor} />
  {/each}
</div>

<style>
  #root {}
</style>

<script>
  import Login from './login.svelte';
  import Cursor from './cursor.svelte';
  import PlayerList from './player-list.svelte';

  export default {
    data() {
      return {
        isConnected: false,
        needLogin: false,
        cursors: [],
        players: [],
      };
    },
    components: {
      Login,
      Cursor,
      PlayerList,
    }
  }
</script>
