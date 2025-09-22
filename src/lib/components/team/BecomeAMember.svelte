<script>
  import subteam from "$lib/subteams.js";
</script>

<section class="join">
  <div class="container">
    <h2>Become a Team <br /> Member</h2>

    <div class="subteams">
      <span class="pair">
        <h1>{subteam[0].title}</h1>
        <h3 aria-hidden="true">-</h3>
        <h1>{subteam[1].title}</h1>
      </span>

      <h1 class="solo">{subteam[2].title}</h1>

      <span class="pair">
        <h1>{subteam[3].title}</h1>
        <h3 aria-hidden="true">-</h3>
        <h1>{subteam[4].title}</h1>
      </span>
    </div>
  </div>
</section>

<style>
  :root {
    --container: 1100px;
    --y-gap: clamp(1rem, 2vw, 2rem);
  }

  section {
    min-height: 100svh;
    width: 100%;
    display: grid;
    place-items: center;
    padding-block: clamp(2rem, 4vw, 5rem);
  }

  .container {
    width: min(100%, var(--container));
    display: grid;
    row-gap: var(--y-gap);
    justify-items: center;
  }

  h2 {
    font-size: clamp(2rem, -1rem + 5.3333vw, 3rem);
    margin: 0;
  }

  h1,
  h2 {
    font-variation-settings: "wght" 180;
    font-synthesis: none;
    color: white;
    text-align: center;
  }

  h1 {
    font-variation-settings: "wght" 220;
  }

  /* Subteams block stays in normal flow; grid manages wrapping neatly */
  .subteams {
    display: grid;
    row-gap: var(--y-gap);
    width: 100%;
  }

  /* Each row/pair uses inline grid so dash stays centered between titles */
  .pair {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    column-gap: clamp(0.25rem, 1.5vw, 1rem);
    width: 100%;
  }

  .solo {
    /* keeps the single title visually balanced between pairs */
    justify-self: center;
  }

  /* Typography sizing that won’t blow the layout on small screens */
  .subteams h1,
  .subteams h3 {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .subteams h1 {
    font-size: clamp(1.625rem, 1rem + 4vw, 10rem);
    line-height: 1.08;
    text-wrap: balance;
    transition: color 160ms ease;
  }
  .subteams h1:hover {
    color: white;
  }

  .subteams h3 {
    font-size: clamp(1.625rem, 0.5rem + 4vw, 3.5rem);
    font-weight: 400;
  }

  /* Small screens: allow pairs to wrap if titles get long */
  @media (max-width: 560px) {
    .pair {
      grid-auto-flow: row;
      row-gap: 0.25rem;
    }
    .subteams h3 {
      display: none;
    } /* optional: hide dash when stacked */
  }
</style>
