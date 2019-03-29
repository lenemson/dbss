<div id="root">
  <Login needLogin={needLogin} on:login="fire('login', event)"/>
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

  export default {
    data() {
      return {
        needLogin: false,
        cursors: [],
      };
    },
    components: {
      Login,
      Cursor,
    }
  }
</script>
