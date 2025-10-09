<script>
  import { PACKAGE_PLANS } from "$lib/data/package-plan";
  import Button from "$lib/components/Button.svelte";
</script>

<div class="plans">
  {#each PACKAGE_PLANS as plan}
    <div class="card {plan.name.split(' ')[0].toLowerCase()}">
      <div class="card-background"></div>
      <div class="card-top">
        <h3>{plan.name}</h3>
        <h2>{plan.price}</h2>
        <Button>Get Started</Button>
      </div>
      <div class="card-bottom">
        <div class="card-grid"></div>
        <ul>
          {#each Object.entries(plan.benefits) as [benefit, value]}
            {#if value !== false}
              <li class="benefit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>
                <span>{value === true ? benefit : `${value} ${benefit}`}</span>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>

<style>
  .plans {
    display: flex;
    gap: 5rem;
    justify-content: center;
    flex-wrap: wrap;

    .card {
      display: flex;
      flex-direction: column;
      width: 350px; /* fixed width works better */
      overflow: hidden;
      position: relative;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-10px) scale(1.03);
      }

      .card-background {
        position: absolute;
        height: 15em;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        content: "";
        border-radius: 1.5rem;
      }

      .card-grid {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        content: "";
        border-radius: 1.5rem;
        background-image:
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 19px,
            rgba(75, 85, 99, 0.1) 19px,
            rgba(75, 85, 99, 0.1) 20px,
            transparent 20px,
            transparent 39px,
            rgba(75, 85, 99, 0.1) 39px,
            rgba(75, 85, 99, 0.1) 40px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 19px,
            rgba(75, 85, 99, 0.1) 19px,
            rgba(75, 85, 99, 0.1) 20px,
            transparent 20px,
            transparent 39px,
            rgba(75, 85, 99, 0.1) 39px,
            rgba(75, 85, 99, 0.1) 40px
          ),
          radial-gradient(
            circle at 20px 20px,
            rgba(55, 65, 81, 0.12) 2px,
            transparent 2px
          ),
          radial-gradient(
            circle at 40px 40px,
            rgba(55, 65, 81, 0.12) 2px,
            transparent 2px
          );
        background-size:
          40px 40px,
          40px 40px,
          40px 40px,
          40px 40px;

        -webkit-mask-image: linear-gradient(to top, #000 60%, transparent 100%);
        mask-image: linear-gradient(to top, #000 60%, transparent 100%);
      }

      .card-top,
      .card-bottom {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 1.5rem;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.05);
        z-index: 2;
        cursor: pointer;
      }

      .card-top {
        padding-bottom: 0;
        /*border-radius: 1.5rem 1.5rem 0 0;*/

        h2 {
          font-size: 3rem;
          margin: 0;
        }

        h3 {
          color: rgba(255, 255, 255, 0.8);
        }
        :global(button) {
          margin: 2rem 0 1rem 0;
          text-align: center;
          justify-content: center;
          font-size: clamp(1.3rem, 1rem + 0.5333vw, 1.4rem);
        }
      }
      .card-bottom {
        /*border-radius: 0 0 1.5rem 1.5rem;*/
        .benefit {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin: 0 0 0.8rem 0;
          font-size: 1.1rem;
          color: white;

          svg {
            width: 1em;
            height: 1em;
            flex: 0 0 auto;
            display: block;
            margin-top: 0.1em;
          }
        }
      }
    }

    /* Color themes */

    .card.silver {
      .card-background {
        background: linear-gradient(180deg, #c0c0c055, #e0e0e0);

        mask-image: radial-gradient(
          ellipse 70% 60% at 50% 0%,
          #000 60%,
          transparent 100%
        );
      }
      .card-top {
        border: 5px solid rgba(192, 192, 192, 0.2);
        border-bottom: none;
        h2 {
          color: #c0c0c0;
        }
      }

      .card-bottom {
        border: 5px solid rgba(192, 192, 192, 0.2);
        border-top: none;
        background-image: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0) 20%,
          rgba(192, 192, 192, 0.2) 90%
        );
        background-clip: padding-box;

        li {
          color: #c0c0c0;
        }
      }
    }

    .card.gold {
      .card-background {
        background: linear-gradient(180deg, #ffd70055, #ffcc00);

        mask-image: radial-gradient(
          ellipse 70% 60% at 50% 0%,
          #000 60%,
          transparent 100%
        );
      }
      .card-top {
        border: 5px solid rgba(255, 215, 0, 0.2);
        border-bottom: none;
        h2 {
          color: #ffd700;
        }

        :global(button) {
          background-color: rgba(255, 215, 0, 0.2);
        }
      }
      .card-bottom {
        border: 5px solid rgba(255, 215, 0, 0.2);
        border-top: none;
        background-image: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0) 20%,
          rgba(255, 215, 0, 0.1) 90%
        );
        background-clip: padding-box;

        li {
          color: #ffd700;
        }
      }
    }
    .card.platinum {
      .card-background {
        background: linear-gradient(180deg, #9b59b655, #d281f7);

        mask-image: radial-gradient(
          ellipse 70% 60% at 50% 0%,
          #000 60%,
          transparent 100%
        );
      }

      .card-top {
        border: 5px solid rgba(155, 89, 182, 0.2);
        border-bottom: none;

        h2 {
          color: #d281f7;
        }

        :global(button) {
          background-color: rgba(155, 89, 182, 0.2);
        }
      }
      .card-bottom {
        border: 5px solid rgba(155, 89, 182, 0.2);
        border-top: none;
        background-image: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0) 20%,
          rgba(155, 89, 182, 0.3) 90%
        );
        background-clip: padding-box;

        li {
          color: #d281f7;
        }
      }
    }
  }
</style>
