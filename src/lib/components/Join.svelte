<script>
  import subteams from "$lib/Subteams";
</script>

<section>
  <h2>Become a Team <br /> Member</h2>
  <div class="Subteams">
    <span>
      <h1>{subteams.at(0)}</h1>
      <h3>-</h3>
      <h1>{subteams.at(1)}</h1>
    </span>
    <h1>{subteams.at(2)}</h1>
    <span>
      <h1>{subteams.at(3)}</h1>
      <h3>-</h3>
      <h1>{subteams.at(4)}</h1>
    </span>
  </div>
</section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1,
  h2 {
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
    font-synthesis: none;
    font-size: 2.5em;
    color: white;
    text-align: center;
    margin: 0;
  }

  .Subteams {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5em 0;

    span {
      display: flex;
      align-items: center;
      height: 10em;
    }

    h1,
    h3 {
      color: rgba(255, 255, 255, 0.6);
    }

    h3 {
      margin: 0 0.2em;
      font-size: 7em;
    }

    h1 {
      font-size: 7em;

      &:hover {
        color: white;
      }
    }
  }
</style>
