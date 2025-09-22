<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Button from "./Button.svelte";
  import Logo from "$lib/assets/logos/skyxpert-short-logo.png";
  import navRoutes from "$lib/navRoutes.js";

  let isOpened = false;
  let blurred = false;

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    blurred = scrollTop > 8; // blur after a tiny scroll
  }

  onMount(() => {
    if (!browser) return;
    handleScroll(); // initialize on load
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div class={`NavBar ${isOpened ? "opened" : ""} ${blurred ? "blurred" : ""}`}>
  <div class="navContainer">
    <a href="/">
      <img src={Logo} alt="Logo" class="logo" />
    </a>
    <div class="navRightContainer">
      <div class="navButtons">
        {#each navRoutes as route}
          <a
            class="button"
            href={route.href}
            on:click={() => (isOpened = false)}>{route.label}</a
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
  /* Apply blur to the element you SEE (.navContainer), with a translucent background */

  .NavBar {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    /*margin-top: 5vh;*/
    z-index: 20;
    max-width: 100%; /* prevent shrinking */
    padding: 1rem; /* keep vertical + horizontal padding */
    box-sizing: border-box;
  }

  .NavBar.blurred {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background-color: rgba(255, 2655, 255, 0.3); /* semi-transparent */
    transition:
      backdrop-filter 0.3s ease,
      background-color 0.3s ease;
  }

  /* Make only the parent fixed; let the container be the painted layer */
  .navContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  }

  .navRightContainer {
    display: flex;
  }

  :global(.menu-toggle[aria-expanded="false"]) {
    display: flex;
    align-items: center;
  }

  .navRightContainer svg {
    height: 20px;
    margin-right: 0.3em;
  }

  .navButtons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 650px;
  }

  .navButtons .button {
    position: relative;
    margin-right: 1em;
    color: white;
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 220;
    font-size: 1.2em;
  }

  .navButtons .button::after {
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

  .navButtons .button:hover::after {
    transform: scaleX(1);
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

    .NavBar.blurred {
      backdrop-filter: unset;
      background-color: transparent;
    }
  }
</style>
