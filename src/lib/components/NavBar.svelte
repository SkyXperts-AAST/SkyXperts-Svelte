<script>
  import Button from "./Button.svelte";
  import Logo from "$lib/assets/logos/skyxpert-short-logo.png";
  let isOpened = false;
  import navRoutes from "$lib/navRoutes.js";
</script>

<div class={isOpened ? "NavBar opened" : "NavBar"}>
  <div class="navContainer">
    <a href="/">
      <img src={Logo} alt="Logo" class="logo" />
    </a>
    <div class="navRightContainer">
      <div class="navButtons">
        {#each navRoutes as route}
          <a class="button" href={route.href} onclick={() => (isOpened = false)}
            >{route.label}</a
          >
        {/each}
      </div>

      <Button
        class="menu-toggle"
        onclick={() => (isOpened = !isOpened)}
        expanded={isOpened}
      >
        {#if isOpened}
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {/if}
        {isOpened ? "Close" : "Menu"}
      </Button>
    </div>
  </div>
</div>

<style>
  .NavBar {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    margin-top: 5vh;
    transition: background 0.3s;
    z-index: 20;

    .navContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      width: 90%;

      .navRightContainer {
        display: flex;

        :global(.menu-toggle[aria-expanded="false"]) {
          display: flex;
          align-items: center;
        }

        svg {
          height: 20px;
          margin-right: 0.3em;
        }
      }
    }
    .navButtons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 650px;
      /*background-color: magenta;*/

      .button {
        position: relative;
        margin-right: 1em;
        color: white;
        font-family: "Bull", monospace;
        font-variation-settings: "wght" 220;
        font-size: 1.2em;

        &::after {
          content: "";
          position: absolute;
          bottom: -0.5em;
          left: 0;
          height: 2px;
          width: 100%;
          background-color: red;
          transform: scaleX(0);
          transform-origin: bottom;
          transition: transform 0.1s ease-in-out;
        }

        &:hover::after {
          transform: scaleX(1);
        }
      }
    }
  }

  .logo {
    max-width: clamp(4rem, 5vw, 5rem);
  }

  .NavBar.opened {
    height: 100%;
    backdrop-filter: blur(15px);
    background: linear-gradient(
      0deg,
      rgba(0, 26, 48, 0.8) 0%,
      rgba(0, 26, 48, 0.8) 100%
    );
    margin: 0;

    .navContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
    }
    .logo {
      display: none;
    }

    .navRightContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100vh;

      :global(.menu-toggle[aria-expanded="true"]) {
        margin-bottom: 5em;
        display: flex;
        align-items: center;
      }
    }
    .navButtons:nth-child(1) {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;

      .button {
        margin: 0;
        font-size: clamp(3rem, 0rem + 5.3333vw, 4rem);
        color: rgba(255, 255, 255, 0.6);

        &::after {
          bottom: -0.2em;
        }

        &:hover {
          color: white;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .NavBar {
      .navButtons {
        display: none;
      }
    }
  }
</style>
