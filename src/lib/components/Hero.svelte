<script>
  import { onMount, onDestroy } from "svelte";

  export let title;
  export let subtitle = "";
  export let bg; // background image URL or import
  export let bgAlt = "background";

  // parallax factors
  export let parallaxBg = 0.3; // background moves slower
  export let parallaxText = -0.1; // text counter-moves slightly

  let sectionEl;
  let y = 0;

  function update() {
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    y = -rect.top; // relative scroll offset
  }

  onMount(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  });
  onDestroy(() => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });

  $: bgTranslate = `translate3d(0, ${y * parallaxBg}px, 0)`;
  $: textTranslate = `translate3d(0, ${y * parallaxText}px, 0)`;
</script>

<div class="title" bind:this={sectionEl}>
  <div class="bg" style="transform:{bgTranslate}">
    {#if bg}
      <img src={bg} alt={bgAlt} />
    {/if}
  </div>

  <h1 style="transform:{textTranslate}">{title}</h1>
  {#if subtitle}
    <h1 style="transform:{textTranslate}">{subtitle}</h1>
  {/if}
</div>

<style>
  .title {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: clip; /* or overflow: hidden; */
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0, 26, 48, 0) 82.68%,
        #00162b 100%
      );
    }
  }

  .bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    will-change: transform;
  }

  .bg img {
    width: 105%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 60%;
    z-index: 0;
  }

  h1 {
    position: relative;
    z-index: 1;
    color: white;
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
    margin: 0;
    bottom: -1.3em;
    font-size: 13em;
    line-height: 1em;
    margin-left: 0.5em;
  }
</style>
