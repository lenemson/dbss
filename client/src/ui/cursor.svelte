<span class="cursor">
  <span class="img" style="top: {y}px; left: {x}px"></span>
  <span class="text" style="top: {y + 7}px; left: {x + 40}px">{username}</span>
</span>

<style>
  .cursor {

  }
  .img {
    position: fixed;
    width: 32px;
    height: 32px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABjElEQVRYR2NkIBOoy9z/j6z15hNFRnKMIksTyKIBcwDMYjHJJ2APf/kM8fe3LzJgmtSQIDkEBswBMIu5+S6DffrvjxqYFhGF+OHt21dkhQTRITDgDoClcFwO+f6NHaykefpFMN1R3wSmz507h9eTRIfAoHEAukNg/NTqTSjFgJyMPFEhQXII0NwBsDgmNj8bGRmBS0S/qGCw23i4eUgKCYwQGDAHoBcwr56TVrKRGxLwEBgwB8As5uKBlO3CwmJg+ucvSMlG65BgHDQO4OT6CfYxE8stMP3/nyBK2c4tBknlhEo2WBbAlSbQywd4CGA6AJSdWBl+fBdl+PeXnYFmDkAvWGAOgZXtsBKO2JINpRBgYGCAhURUajxYCiMEBo0D0B0SWbCMrJKN7BAYNA4glIph8oTSBHrc49KHszYkt2hF9wAs8ZHsAHJDAqYP3eKh6wBiQwI99aPzv3z9AhbatGwtSolKdIuIUJqguQNwhQQhi2Hy6D6HiRMdAoPGAegOITYEcNWiJIcAtR0AAG/vVSyXsIyjAAAAAElFTkSuQmCC) no-repeat top left;
  }
  .text {
    position: fixed;
    background-color: white;
    border: 1px solid #ddd;
    border-bottom: 3px solid #ddd;
    border-radius: 5px;
    padding: 0 3px 0 3px;
    font-weight: bold;
    font-family: Courier New;
  }
</style>

<script>
  export default {
    data() {
      return {
        username: '',
        x: 0,
        y: 0,
      };
    },
  }
</script>
