<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let title;
  export let subtitle = "";
  export let bg; // URL or import
  export let bgAlt = "background";
  export let fontSize = "14rem"; // default maximum label size
  export let showFade = true;
  export let fadeColor = "#00162b";

  // parallax factors
  export let parallaxBg = 0.3;
  export let parallaxText = -0.1;

  let sectionEl;
  let y = 0;

  // cache absolute position of the section
  let sectionTop = 0;
  let animId = 0;

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const snap = (px) => Math.round(px * dpr) / dpr; // mitigate sub-pixel jitter

  function measure() {
    if (!sectionEl) return;
    const r = sectionEl.getBoundingClientRect();
    sectionTop = r.top + window.scrollY; // absolute page offset
    update(); // set initial y
  }

  function update() {
    y = window.scrollY - sectionTop;
  }

  function onScroll() {
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(update);
  }

  onMount(() => {
    if (!browser) return;
    measure();

    // Scroll + resize handlers
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // iOS URL bar show/hide fires a visual viewport resize without a layout resize.
    // Listen to it and re-measure to keep things stable.
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", measure);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", measure);
      }
      cancelAnimationFrame(animId);
    };
  });

  $: bgTranslate = `translate3d(0, ${snap(y * parallaxBg)}px, 0)`;
  $: textTranslate = `translate3d(0, ${snap(y * parallaxText)}px, 0)`;
</script>

<section
  class="hero"
  bind:this={sectionEl}
  style="--hero-max:{fontSize}; --label-offset: 10rem;"
>
  <div class="bg" style="transform:{bgTranslate}">
    {#if bg}
      <img src={bg} alt={bgAlt} loading="eager" />
    {/if}
  </div>

  <div class="overlay"></div>
  {#if showFade}
    <div class="fade" style="--fade-color:{fadeColor};"></div>
  {/if}

  <div class="content">
    <h1 style="transform:{textTranslate}">
      {@html title}
    </h1>
    {#if subtitle}
      <h1 class="sub" style="transform:{textTranslate}">
        {@html subtitle}
      </h1>
    {/if}
  </div>
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    min-height: 100svh; /* can grow with content */
    display: grid;
    align-items: center;
    overflow: clip; /* contain parallax bleed */
    isolation: isolate; /* clean stacking context */
    /* tweak vertical placement of the label(s) without inset: */
    --label-offset: 0rem;
    --hero-max: 14rem;
  }

  .bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    will-change: transform;
    transform: translateZ(0);
  }
  .bg img {
    width: 105%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 70%;
    display: block;
    filter: none;
  }

  /* Soft contrast overlay */
  .overlay {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }

  /* Bottom fade for legibility over next section */
  .fade {
    position: absolute;
    z-index: 2;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 26, 48, 0) 82.68%,
      var(--fade-color) 100%
    );
    pointer-events: none;
  }

  .content {
    position: relative;
    z-index: 3; /* above overlays, below nothing else */
    display: grid;
    row-gap: 0.15em;
    /* This shifts both the main and sub headings downward using top + transform,
       no inset shorthand necessary. */
    top: var(--label-offset);
    justify-items: start; /* left-align by default */
    padding-left: clamp(0.75rem, 3vw, 2rem);
  }

  h1 {
    color: white;
    font-variation-settings: "wght" 180;
    font-synthesis: none;
    margin: 0;
    line-height: 1;
    /* Use fluid clamp with a max cap, overridable via prop */
    font-size: clamp(3.5rem, -6rem + 20vw, var(--hero-max));
    text-shadow: rgba(0, 0, 0, 0.7) 0px 20px 30px;
    will-change: transform;
  }

  /* Secondary line slightly smaller for hierarchy */
  .sub {
    opacity: 0.9;
    font-size: clamp(2.25rem, -5rem + 14vw, calc(var(--hero-max) * 0.6));
  }

  /* Reduce motion: disable parallax shifts */
  @media (prefers-reduced-motion: reduce) {
    .bg,
    h1,
    .sub {
      transform: none !important;
    }
  }
</style>
