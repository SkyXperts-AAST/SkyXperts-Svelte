<script lang="ts">
  import { sponsorSections } from "$lib/data/sponsors";

  let activeCard: string | null = null; // track which card is open

  function toggleTooltip(name: string) {
    activeCard = activeCard === name ? null : name;
  }
</script>

<main>
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
      <div class="sponsor-block">
        <h2 class="section-title">
          <span style="color:#dc0d40">❱ </span>{section.sectionTitle}<span
            style="color:#dc0d40"
          >
            ❰</span
          >
        </h2>

        <div class="sponsor-cards">
          {#each section.sponsors as sponsor}
            <article class="sponsor-card {sponsor.tier}">
              <div class="sponsor-background"></div>
              <a class="sponsor-name" href={sponsor.link}
                >{sponsor.name}<svg width="24" height="24" fill="currentColor"
                  ><path
                    d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"
                  /></svg
                ></a
              >
              <p class="sponsor-desc">{sponsor.description}</p>
              <img class="sponsor-img" src={sponsor.image} alt={sponsor.alt} />
            </article>
          {/each}
        </div>
      </div>
    {/each}
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: center;*/
    min-height: 100svh;
    width: 100%;
    color: white;
    padding: 0 5rem;
  }

  .title {
    display: grid;
    gap: 1.5rem;
    align-items: center;
    justify-items: end;
    grid-template-columns: 1fr auto;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      /*padding-left: 5rem;*/
      width: 100%;

      h2 {
        font-size: clamp(2.5rem, -13rem + 26.6667vw, 7rem);
        margin: 0;
        font-synthesis: none;
        line-height: initial;
      }
    }
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: clamp(1.2rem, -0.3rem + 2.6667vw, 1.7rem);
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
    .sponsor-block {
      display: grid;
      grid-template-rows: auto 1fr;
      row-gap: 2rem;
      margin-block: 2rem;

      .section-title {
        margin: 0;
        font-size: clamp(1.9rem, -4.4rem + 11.2vw, 4rem);
        font-synthesis: none;
      }
      .sponsor-cards {
        position: relative;
        display: grid;
        margin-left: 5rem;

        /*gap: 0.5rem;*/

        .sponsor-card {
          display: grid;
          grid-template-rows: auto auto 1fr;
          gap: 24px;
          padding: 32px;
          box-shadow: #dc0d40 4px 4px 10px 2px;
          border-radius: 0.75rem;
          width: 20rem;
          /*height: 25rem;*/
          background: rgba(255, 255, 255, 1);
          /*backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);*/

          .sponsor-background {
            position: absolute;
            /*height: 15em;*/
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            content: "";

            /*background: linear-gradient(190deg, #c0c0c0, #dc0d4099);*/
          }

          .sponsor-name {
            display: flex;
            align-items: flex-end;
            margin: 0;
            font-family: "Bull", monospace;
            font-size: 2rem;
            font-weight: 700;
            color: #dc0d40;
            text-decoration: none;
            z-index: 2;
            gap: 0.2rem;

            svg {
              margin-bottom: 0.45rem;
            }
          }

          .sponsor-desc {
            margin: 0;
            font-size: 1rem;
            line-height: 1.4;
            text-align: justify;
            color: #555;
            z-index: 2;
          }
          .sponsor-img {
            width: 100%;
            height: 120px;
            object-fit: contain;
            align-self: end;
            justify-self: center;
            z-index: 2;
          }
        }
      }
    }
  }

  /* mobile: 1 col */
  @media (max-width: 900px) {
    .sponsor-section .sponsor-block .sponsor-cards {
      grid-template-columns: 1fr;
      align-self: center;
      justify-self: center;
      margin: 0rem;
    }

    .sponsor-section .sponsor-block .section-title {
      text-align: center;
    }
  }

  /* desktop and up: 3 cols (max) */
  @media (min-width: 1024px) {
    .sponsor-cards {
      grid-template-columns: repeat(3, minmax(0, 1fr));
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
