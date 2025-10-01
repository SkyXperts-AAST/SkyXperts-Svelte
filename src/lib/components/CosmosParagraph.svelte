<!-- CosmosParagraph.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  export let text = "";
  export let align: "left" | "center" | "right" | "justify" = "justify";
  export let baseAlpha = 0.5;
  export let staggerMs = 80; // cascade speed
  export let width: string = "100%"; // e.g. "60ch", "40rem", "80%", "min(70ch, 80vw)"
  export let maxWidth: string | null = null; // optional cap

  const words = text.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);

  let el: HTMLDivElement | null = null;
  let raf = 0;

  // NEW knobs
  export let triggerAt = 0.5; // 0..1 of viewport height where reveal starts (0.5 = middle)
  export let revealDistancePx = 900; // pixels from start line to full reveal (constant speed)

  // Replace updateProgress() with:
  function updateProgress() {
    if (!browser || !el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;

    // start line (e.g., middle of viewport)
    const startLine = vh * triggerAt;

    // use element TOP so nothing happens until its top reaches the line
    const elemTop = rect.top;

    // fixed distance for 0→1 (prevents end-speed-up)
    const dist = Math.max(1, revealDistancePx);

    // 0 before line; then linearly 0→1 as the top moves up by `dist` pixels
    let raw = (startLine - elemTop) / dist;
    if (raw < 0) raw = 0;
    if (raw > 1) raw = 1;

    // LINEAR (no easing)
    const progress = raw;

    el.style.setProperty("--progress", String(progress));
  }

  function scheduleUpdate() {
    if (!browser) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateProgress);
  }

  function onScroll() {
    scheduleUpdate();
  }
  function onResize() {
    scheduleUpdate();
  }

  onMount(() => {
    if (!browser) return;
    scheduleUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
  });

  onDestroy(() => {
    if (!browser) return;
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  });
</script>

<div
  bind:this={el}
  class="intro align-{align}"
  style={`--count:${words.length}; --base-alpha:${baseAlpha}; --stagger-ms:${staggerMs}ms; --progress:0;`}
  style:width
  style:max-width={maxWidth ?? undefined}
  role="group"
  aria-label="scroll reveal paragraph"
>
  {#each words as word, i}
    <span class="word" style={`--i:${i};`}>{word}</span>{i < words.length - 1
      ? "\u00A0"
      : ""}
  {/each}
</div>

<style>
  .intro {
    display: block; /* instead of flex */
    line-height: 1.1;
    text-align: justify; /* ← justify! */
    text-justify: inter-word; /* better spacing */
    /*word-spacing: 0.5rem; /* optional tweak */
  }
  .align-left {
    justify-content: flex-start;
    text-align: left;
  }
  .align-center {
    justify-content: center;
    text-align: center;
  }
  .align-right {
    justify-content: flex-end;
    text-align: right;
  }

  .align-justify {
    text-align: justify;
    text-justify: inter-word;
  }

  .word {
    display: inline-block;
    white-space: pre;
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
    font-synthesis: none;
    font-size: clamp(1.5rem, -3rem + 8vw, 2.5rem);

    /* per-word reveal math (unchanged) */
    --t: calc(var(--progress) * var(--count));
    --e: clamp(0, calc(var(--t) - var(--i)), 1);
    --alpha: calc(var(--base-alpha) + (1 - var(--base-alpha)) * var(--e));

    color: rgba(255, 255, 255, var(--alpha));
    transform: translateY(calc((1 - var(--e)) * 0.12em));
    filter: blur(calc((1 - var(--e)) * 1.2px));

    /* Make the visual response strictly follow scroll */
    transition:
      color 0s linear,
      transform 0s linear,
      filter 0s linear;
  }
  /* If you still want a tiny smoothing but constant speed, use e.g. 40ms linear: */
  /*
  transition:
    color 40ms linear,
    transform 40ms linear,
    filter 40ms linear;
  */

  @media (prefers-reduced-motion: reduce) {
    .word {
      transform: none;
      filter: none;
      transition: color 0.2s linear;
    }
  }
</style>
