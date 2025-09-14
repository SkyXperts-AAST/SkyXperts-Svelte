<script>
  import Button from "./Button.svelte";
  import src from "$lib/assets/logos/skyxpert-team.jpg";
  import Logo from "$lib/assets/logos/skyxpert-short-logo.png";
  let isOpened = false;
  let navRoutes = [
    // { label: 'Mission & Vision', href: '#mission' },
    { label: "Team", href: "#team" },
    { label: "Drones", href: "#drone" },
    { label: "Partnerships", href: "#sponsors" },
    { label: "Next Steps", href: "#updates" },
    { label: "Contact Us", href: "#contactus" },
  ];
</script>

<!-- check if Navbar is opened or not -->
<div class={isOpened ? "NavBar opened" : "NavBar"}>
  <div class="navContainer">
    <a href="/">
      <img src={Logo} alt="Logo" class="logo" />
    </a>
    <div class="navRightContainer">
      <div class="navButtons">
        {#each navRoutes as route}
          <a class="button" href={route.href}>{route.label}</a>
        {/each}
      </div>
      <Button
        class="menu-toggle"
        onclick={() => (isOpened = !isOpened)}
        expanded={isOpened}
      >
        {isOpened ? "Close" : "Menu"}
      </Button>
    </div>
  </div>
</div>

<style>
  .NavBar {
    /*background-color: red;*/
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    margin-top: 5vh;
    transition: background 0.3s;

    .navContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      width: 90%;
      /*background-color: yellow;*/

      .navRightContainer {
        display: flex;

        .navButtons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 650px;

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
    }
  }

  .logo {
    max-width: clamp(3rem, 5vw, 5rem);
  }

  .NavBar.opened {
    height: 100%;
    backdrop-filter: blur(15px);
    background:
      linear-gradient(0deg, rgba(0, 26, 48, 0.8) 0%, rgba(0, 26, 48, 0.8) 100%),
      url("https://skyxperts-aast.github.io/Official-Website/assets/imgs/team-imgs/events/alamein-airshow/skyxpert-team.jpg")
        center/cover;
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
      }

      .navButtons {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        font-size: 2em;

        .button {
          margin: 0;
          font-size: 2em;
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
  }

  @media (min-width: 900px) {
  }
</style>
