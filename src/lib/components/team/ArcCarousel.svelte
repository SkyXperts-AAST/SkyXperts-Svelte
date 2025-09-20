<script lang="ts">
  import { onMount } from "svelte";

  interface Item {
    name: string;
    image: string;
    href?: string;
  }

  const {
    items = [] as Item[],
    radius = 520, // arc radius (px)
    stepDeg = 18, // angular spacing between items (deg)
    rotateWithPath = true, // rotate cards to follow arc tangent
    sideScale = 0.92, // scale at edges vs center
    focusScale = 1, // scale for center
    fadeEdges = true, // opacity falloff toward edges
    arcHeight = 340, // stage height (px)
  } = $props();

  let stageEl: HTMLDivElement;
  let isDragging = $state(false);
  let theta = $state(0); // global angle offset (deg)
  let startX = 0,
    lastX = 0,
    vx = 0;

  const selected = $derived(() => {
    if (!items.length) return 0;
    const idx = Math.round(-theta / stepDeg);
    return ((idx % items.length) + items.length) % items.length;
  });

  function prev() {
    animateTo(theta + stepDeg);
  }
  function next() {
    animateTo(theta - stepDeg);
  }

  function animateTo(target: number) {
    const start = theta;
    const d = target - start;
    const t0 = performance.now();
    const dur = 280;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      theta = start + d * e;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function onPointerDown(e: PointerEvent) {
    isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX = lastX = e.clientX;
    vx = 0;
  }
  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    const x = e.clientX;
    const dx = x - lastX;
    lastX = x;
    const w = stageEl.clientWidth || 1;
    const degPerPx = (stepDeg * 1.05) / (w * 0.25);
    theta += -dx * degPerPx;
    vx = 0.8 * vx + 0.2 * dx;
  }
  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    const w = stageEl.clientWidth || 1;
    const degPerPx = (stepDeg * 1.05) / (w * 0.25);
    const fling = -vx * degPerPx * 10;
    const target = Math.round((theta + fling) / stepDeg) * stepDeg;
    animateTo(target);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  // arc math (screen Y grows downward)
  function arcPosition(deg: number) {
    const rad = (deg * Math.PI) / 180;
    const x = radius * Math.sin(rad);
    const y = radius * (1 - Math.cos(rad)); // 0 at center, positive downward
    return { x, y };
  }

  function cardStyle(i: number) {
    const a = i * -stepDeg - theta; // 0deg => front-center
    const { x, y } = arcPosition(a);

    // tangent angle = derivative of circle: rotate by 'a' degrees
    const rot = rotateWithPath ? a : 0;

    // visual prominence
    const abs = Math.abs(((a + 180) % 360) - 180);
    const t = Math.min(1, abs / (stepDeg * 4));
    const scale = focusScale * (1 - t * (1 - sideScale));
    const op = fadeEdges ? 1 - Math.min(0.85, abs / (stepDeg * 6)) : 1;
    const z = 1000 - Math.round(abs);

    // center stage at middle; cards positioned from center
    return `
      transform:
        translate(-50%, -50%)
        translate(${x}px, ${y}px)
        rotate(${rot}deg)
        scale(${scale});
      opacity:${op};
      z-index:${z};
    `;
  }

  const isActive = (i: number) => i === selected;

  onMount(() => {
    /* nothing else needed */
  });
</script>

<div
  class="arc-carousel"
  role="region"
  aria-roledescription="carousel"
  aria-label="Arc carousel"
>
  <div class="nav">
    <button class="navbtn" onclick={prev} aria-label="Previous">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m6.56 11.09 5.83 5.82a.5.5 0 0 0 .71 0l.35-.35a.51.51 0 0 0 0-.71l-5.12-5.12 5.12-5.11a.51.51 0 0 0 0-.71l-.35-.35a.5.5 0 0 0-.71 0l-5.83 5.82a.51.51 0 0 0 0 .71Z"
        /></svg
      >
    </button>
    <button class="navbtn" onclick={next} aria-label="Next">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.45 10.38 9.62 4.56a.48.48 0 0 0-.7 0l-.36.35a.51.51 0 0 0 0 .71l5.12 5.12-5.12 5.11a.51.51 0 0 0 0 .71l.36.35a.48.48 0 0 0 .7 0l5.83-5.82a.51.51 0 0 0 0-.71Z"
        /></svg
      >
    </button>
  </div>

  <div
    class="stage"
    bind:this={stageEl}
    tabindex="0"
    style={`height:${arcHeight}px`}
    onkeydown={onKey}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    onmouseleave={onPointerUp}
  >
    <!-- center origin for math -->
    <div class="origin">
      {#each items as item, i}
        <a
          class={"card " + (isActive(i) ? "active" : "")}
          href={item.href || "#"}
          aria-label={item.name}
          style={cardStyle(i)}
        >
          <div
            class="image"
            style={`background-image:url('${item.image}')`}
          ></div>
          <div class="footer">
            <p class="name">{item.name}</p>
            {#if item.href}<span class="cta">View</span>{/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .arc-carousel {
    position: relative;
    width: 100%;
  }

  .nav {
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    pointer-events: none;
  }
  .navbtn {
    pointer-events: auto;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(6px);
    cursor: pointer;
    transition:
      transform 0.15s ease,
      opacity 0.2s ease;
  }
  .navbtn:hover {
    transform: scale(1.05);
  }

  .stage {
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
  }
  .origin {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateZ(0); /* promote layer */
  }

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(420px, 70vw);
    height: clamp(320px, 45vw, 500px);
    border-radius: 18px;
    overflow: hidden;
    text-decoration: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    color: #fff;
    background: #111;
    transition:
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }
  .card.active {
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
  }
  .image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .footer {
    position: absolute;
    inset: auto 0 0 0;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
  }
  .name {
    margin: 0;
    font-weight: 800;
    font-size: clamp(1rem, 1.8vw, 1.3rem);
  }
  .cta {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: #111;
    font-weight: 700;
    font-size: 0.88rem;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }
</style>
