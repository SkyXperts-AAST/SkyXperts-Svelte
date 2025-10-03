<script lang="ts">
  import { sponsorSections } from "$lib/data/sponsors";

  let activeCard: string | null = null; // track which card is open

  function toggleTooltip(name: string) {
    activeCard = activeCard === name ? null : name;
  }
</script>

<main>
  <h2>Current Sponsors</h2>

  {#each sponsorSections as section}
    <section class="sponsor-section">
      <h3>{section.sectionTitle}</h3>

      <div class="sponsor-cards">
        {#each section.sponsors as sponsor}
          <div
            class="sponsor-card {sponsor.tier}"
            on:click={() => toggleTooltip(sponsor.name)}
          >
            <img src={sponsor.image} alt={sponsor.alt} />
            <p>{sponsor.name}</p>

            {#if activeCard === sponsor.name}
              <div class="tooltip">
                {sponsor.description}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
    width: 100%;
    color: white;
  }

  h2 {
    font-size: clamp(2rem, -13rem + 26.6667vw, 7rem);
    margin-bottom: 2rem;
    font-synthesis: none;
  }

  .sponsor-section {
    margin-bottom: 3rem;
    text-align: center;

    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  .sponsor-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
  }

  .sponsor-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin: 0 auto;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      filter: brightness(1.2);
    }
    img {
      max-width: 200px;
      max-height: 80px;
      object-fit: contain;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      color: white;
      font-size: 1rem;
    }
  }

  .sponsor-card.silver {
    background: linear-gradient(
      180deg,
      #c0c0c011,
      #e0e0e022
    ); /* Silver gradient */
    border: 2px solid #c0c0c0;
  }

  .sponsor-card.gold {
    background: linear-gradient(180deg, #ffd70011, #ffcc0022);
    border: 2px solid #ffd700;
  }

  .sponsor-card.platinum {
    background: linear-gradient(
      180deg,
      #9b59b611,
      #d281f744
    ); /* Bronze gradient */
    border: 2px solid #d281f7;
  }

  /* Tooltip style */
  .tooltip {
    position: absolute;
    bottom: -60px; /* place below card */
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    max-width: 220px;
    white-space: normal;
    text-align: center;
    z-index: 10;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
