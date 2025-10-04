<script lang="ts">
  import { CURRENT_SEASON_ID, getActiveSubteams } from "$lib/data/seasons";

  // Current season
  let currentSeasonId = $state(CURRENT_SEASON_ID);

  // Get all active subteams for the chosen season
  const activeSubteams = $derived(getActiveSubteams(currentSeasonId));

  // Helper to safely access subteam titles
  const getSubteamTitle = (index: number) => activeSubteams[index]?.title ?? "";
</script>

<section class="join">
  <div class="container">
    <h2>Become a Team <br /> Member</h2>

    <div class="subteams">
      <!-- First pair -->
      {#if getSubteamTitle(0) || getSubteamTitle(1)}
        <span class="pair">
          {#if getSubteamTitle(0)}<h1>{getSubteamTitle(0)}</h1>{/if}
          {#if getSubteamTitle(0) && getSubteamTitle(1)}<h3 aria-hidden="true">
              -
            </h3>{/if}
          {#if getSubteamTitle(1)}<h1>{getSubteamTitle(1)}</h1>{/if}
        </span>
      {/if}

      <!-- Middle solo -->
      {#if getSubteamTitle(2)}
        <h1 class="solo">{getSubteamTitle(2)}</h1>
      {/if}

      <!-- Second pair -->
      {#if getSubteamTitle(3) || getSubteamTitle(4)}
        <span class="pair">
          {#if getSubteamTitle(3)}<h1>{getSubteamTitle(3)}</h1>{/if}
          {#if getSubteamTitle(3) && getSubteamTitle(4)}<h3 aria-hidden="true">
              -
            </h3>{/if}
          {#if getSubteamTitle(4)}<h1>{getSubteamTitle(4)}</h1>{/if}
        </span>
      {/if}
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

  .subteams {
    display: grid;
    row-gap: var(--y-gap);
    width: 100%;
  }

  .pair {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    column-gap: clamp(0.25rem, 1.5vw, 1rem);
    width: 100%;
  }

  .solo {
    justify-self: center;
  }

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

  @media (max-width: 560px) {
    .pair {
      grid-auto-flow: row;
      row-gap: 0.25rem;
    }

    .subteams h3 {
      display: none;
    }
  }
</style>
