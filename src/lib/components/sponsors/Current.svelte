<script lang="ts">
  import { sponsorSections } from "$lib/data/sponsors";

  let activeCard: string | null = null; // track which card is open

  function toggleTooltip(name: string) {
    activeCard = activeCard === name ? null : name;
  }
</script>

<main>
  <!-- <div class="fade"></div> -->
  <span class="title">
    <div class="left">
      <h2>Special thanks to our sponsors</h2>
    </div>
    <p>
      Meet the sponsors bringing Sky<span style="color:rgba(255,0,0,0.8)"
        >X</span
      >perts to life! <br />Click their profiles to learn more.
    </p>
  </span>

  <section class="sponsor-section">
    {#each sponsorSections as section}
      {#if section.sponsors && section.sponsors.length > 0}
        <div class="sponsor-block">
          <h2 class="section-title">
            <span style="color:#dc0d40">❱ </span>{section.sectionTitle}<span
              style="color:#dc0d40"
            >
              ❰</span
            >
          </h2>

          <div
            class={`sponsor-cards ${section.sponsors.length <= 2 ? "center-flex" : ""}`}
          >
            {#each section.sponsors as sponsor, i}
              <article class="sponsor-card {sponsor.tier}">
                <a class="sponsor-name" href={sponsor.link}
                  ><img
                    class="sponsor-img"
                    src={sponsor.image}
                    alt={sponsor.alt}
                  /></a
                >
              </article>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </section>
  <!-- <div class="fade"></div> -->
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100svh;
    width: 100%;
    color: white;
    /*background-color: #f0f0f0;*/
    position: relative;
    margin-bottom: 4rem;
  }

  .fade {
    position: absolute;
    z-index: 2;
    inset: 0;
    pointer-events: none;

    &:nth-child(1) {
      background: linear-gradient(
        0deg,
        rgba(0, 26, 48, 0) 82.68%,
        #00162b 100%
      );
    }
    &:nth-child(4) {
      background: linear-gradient(
        180deg,
        rgba(0, 26, 48, 0) 82.68%,
        #00162b 100%
      );
    }
  }

  .title {
    display: grid;
    gap: 1.5rem;
    align-items: center;
    justify-items: end;
    grid-template-columns: 1fr auto;
    padding: 2rem 5rem;
    z-index: 3;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      h2 {
        font-size: clamp(2.5rem, -13rem + 26.6667vw, 7rem);
        margin: 0;
        font-synthesis: none;
        line-height: initial;
        /*color: #00162b;*/
        /*color: #dc0d40;*/
        color: white;
        text-shadow: #00162b77 2px 2px 5px;
      }
    }
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: clamp(1.2rem, -0.3rem + 2.6667vw, 1.7rem);
      /*color: #00162b;*/
      text-shadow: #00162b77 2px 2px 10px;
    }
  }
  @media (max-width: 900px) {
    .title {
      grid-template-columns: 1fr;

      .left {
        padding-left: 0;
        h2 {
          text-align: center;
        }
      }
      p {
        text-align: center;
      }
    }
  }

  .sponsor-section {
    z-index: 3;
  }

  .sponsor-section .sponsor-block {
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 2rem;
    margin-block: 2rem 0;
    justify-content: center;
  }

  .sponsor-section .sponsor-block .section-title {
    margin: 0;
    font-size: clamp(1.9rem, -1.4rem + 5.8667vw, 3rem);
    font-synthesis: none;
    color: #dc0d40;
    text-align: center;
  }

  .sponsor-section .sponsor-block .sponsor-cards {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 1.5rem;
  }

  /* cards + children */
  .sponsor-section .sponsor-block .sponsor-cards .sponsor-card {
    display: grid;
    grid-template-rows: auto auto 1fr;
    padding: 32px;
    border-radius: 0.75rem;
    width: 20rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 25px 20px -20px;
    position: relative; /* for background pseudo if you use it */
  }

  .sponsor-section .sponsor-block .sponsor-cards .sponsor-card .sponsor-name {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0;
    font-family: "Bull", monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #dc0d40;
    text-decoration: none;
    z-index: 2;
    gap: 0.2rem;
  }

  .sponsor-section .sponsor-block .sponsor-cards .sponsor-card .sponsor-desc {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    text-align: justify;
    color: #555;
    z-index: 2;
  }

  .sponsor-section .sponsor-block .sponsor-cards .sponsor-card .sponsor-img {
    width: 100%;
    height: 120px;
    object-fit: contain;
    justify-self: center;
    z-index: 2;
    top: -4rem;
  }

  /* center-flex utility */
  .sponsor-section .sponsor-block .sponsor-cards.center-flex {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  /* mobile */
  @media (max-width: 900px) {
    .sponsor-section .sponsor-block .sponsor-cards {
      grid-template-columns: 1fr;
      align-self: center;
      justify-self: center;
      margin: 0rem;
    }

    /* ensure center-flex stacks on mobile */
    .sponsor-section .sponsor-block .sponsor-cards.center-flex {
      display: grid !important;
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .sponsor-section .sponsor-block .section-title {
      text-align: center;
    }
  }

  /* desktop */
  @media (min-width: 1024px) {
    .sponsor-cards {
      display: grid;
      grid-template-columns: repeat(3, 20rem);
      justify-self: center;
      justify-content: center;
      margin-inline: auto;
      gap: 1.5rem; /* keep the gap here too */
    }

    /* center a single leftover */
    .sponsor-cards > .sponsor-card:last-child:nth-child(3n + 1) {
      grid-column: 2;
    }
  }

  /*.sponsor-cards {
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
    );
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
    );
    border: 2px solid #d281f7;
  }*/
</style>
