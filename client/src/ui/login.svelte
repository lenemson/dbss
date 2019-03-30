<div id="login" class="{needLogin ? 'active' : ''}">
  <form on:submit="handleSubmit(event)">
    <input
      autofocus
      type=text
      class="input-name"
      placeholder="Name"
      bind:value=name
    />
    <button type="submit" class="play-btn">Play</button>
  </form>
</div>

<style>
  #login {
    display: none;
  }

  #login.active {
    display: block;
    width: 300px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #a9a9a9;
    border-bottom: 3px solid #a9a9a9;
    padding: 20px;
    position: fixed;
    left: 40%;
    top: 20%;
    cursor: pointer;
  }

  #login input.input-name {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 3px 5px;
    margin-botton: 10px;
    border-radius: 5px;
    border: 2px solid #b8591b;
    outline-width: 0;
    font-family: Courier New;
  }

  #login button.play-btn {
    display: block;
    border: none;
    border-radius: 5px;
    border-bottom: 3px solid #000;
    padding: .5rem 1rem;
    margin: 10px auto 0 auto;
    text-decoration: none;
    background: #6F3510;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    font-family: Courier New;
  }
</style>

<script>
  export default {
    data() {
      return {
        name: '',
        needLogin: false,
      };
    },
    methods: {
      handleSubmit(event) {
        event.preventDefault();
        this.fire('login', { name: this.get().name });
      }
    },
  }
</script>
