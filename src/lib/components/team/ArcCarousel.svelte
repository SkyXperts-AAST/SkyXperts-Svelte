<script lang="ts">
  import { onMount } from "svelte";

  const {
    items = [],
    radius = 520, // arc radius (px)
    stepDeg = 18, // angular spacing between items (deg)
    rotateWithPath = true, // rotate cards to follow arc tangent
    sideScale = 0.92, // scale at edges vs center
    focusScale = 1, // scale for center
    fadeEdges = true, // opacity falloff toward edges
    arcHeight = 340, // stage height (px)
    stageHeight = "clamp(420px, 90vh, 900px)", // NEW: fixed-ish, responsive cap
    footerGap = "56px", // NEW: space below arc for footers
  } = $props();

  let stageEl: HTMLDivElement;
  let isDragging = $state(false);
  let theta = $state(0); // global angle offset (deg)
  let startX = 0,
    lastX = 0,
    vx = 0;

  let animId = 0;
  let isAnimating = $state(false);
  let targetIndex = $state(0);

  const maxIndex = $derived(items.length ? items.length - 1 : 0);

  const currentIndex = () => Math.round(theta / stepDeg);
  const clampIndex = (i: number) => Math.max(0, Math.min(maxIndex, i));

  const maxTheta = $derived((items.length ? items.length - 1 : 0) * stepDeg);

  const atStart = $derived(theta <= 0 + 0.1);
  const atEnd = $derived(theta >= maxTheta - 0.1);

  const selected = $derived(() =>
    isAnimating ? targetIndex : clampIndex(currentIndex()),
  );

  function prev() {
    setTarget(-1);
  }
  function next() {
    setTarget(+1);
  }

  function setTarget(delta: number) {
    const base = isAnimating ? targetIndex : currentIndex();
    targetIndex = clampIndex(base + delta);
    animateToIndex(targetIndex);
  }

  function animateToIndex(idx: number) {
    cancelAnimationFrame(animId);
    isAnimating = true;

    const start = theta;
    const end = idx * stepDeg;
    const distance = Math.abs(end - start) / stepDeg;

    // Snappy but smooth — tweak if you want even faster/slower
    const dur = Math.max(140, Math.min(260, distance * 160));
    const t0 = performance.now();

    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4); // fast ease-out
      theta = start + (end - start) * e;

      if (k < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        theta = end; // HARD SNAP
        isAnimating = false;
      }
    };

    animId = requestAnimationFrame(tick);
  }

  function onPointerDown(e: PointerEvent) {
    if (isAnimating) return; // optional: block drag while animating
    isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX = lastX = e.clientX;
    vx = 0;
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging || isAnimating) return;
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

    const targetDeg = Math.round((theta + fling) / stepDeg) * stepDeg;
    targetIndex = clampIndex(Math.round(targetDeg / stepDeg));
    animateToIndex(targetIndex);
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
    const a = i * stepDeg - theta; // 0deg => front-center
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
    const setH = () => {
      if (!stageEl) return;
      stageEl.style.setProperty("--stage-h", getComputedStyle(stageEl).height);
    };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(stageEl);
    return () => ro.disconnect();
  });
</script>

<div
  class="arc-carousel"
  role="region"
  aria-roledescription="carousel"
  aria-label="Arc carousel"
  style={`--footer-gap:${footerGap};`}
>
  <div class="nav">
    <button
      class="navbtn"
      onclick={prev}
      disabled={atStart}
      aria-label="Previous"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"
        ><path
          fill="white"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m6.56 11.09 5.83 5.82a.5.5 0 0 0 .71 0l.35-.35a.51.51 0 0 0 0-.71l-5.12-5.12 5.12-5.11a.51.51 0 0 0 0-.71l-.35-.35a.5.5 0 0 0-.71 0l-5.83 5.82a.51.51 0 0 0 0 .71Z"
        /></svg
      >
    </button>
    <button class="navbtn" onclick={next} disabled={atEnd} aria-label="Next">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"
        ><path
          fill="white"
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
    style={`height:${stageHeight};`}
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
        <div class="item" style={cardStyle(i)}>
          <a
            class={"card " + (isActive(i) ? "active" : "")}
            href={item.href || "#"}
            aria-label={`${item.name}${item.title ? `, ${item.title}` : ""}`}
          >
            <div
              class="image"
              style={`background-image:url('${item.image}')`}
            ></div>
          </a>

          <div class="footer">
            <div class="meta">
              <ul>
                <li>{item.name}</li>
                {#if item.title}<li class="role">
                    {Array.isArray(item.title) ? item.title[1] : item.title}
                  </li>{/if}
                {#if item.tags && item.tags.length}
                  {#each item.tags as t}
                    <li class="tag">{t}</li>
                  {/each}
                {:else if item.department}
                  <li>{item.department}</li>
                {/if}
              </ul>
            </div>
            <!-- {#if item.href}<span class="cta">View</span>{/if} -->
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .arc-carousel {
    position: relative;
    width: 100%;
    padding-bottom: var(--footer-gap, 56px);
  }

  .nav {
    position: absolute;
    right: 10em;
    top: 5rem;
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
      opacity 0.2s ease,
      background 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
      transform: none;
    }
  }

  .stage {
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
    contain: layout paint;
    --stage-h: 1px;

    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      /*rgba(0, 0, 0, 0) 10%,*/ #000 50%,
      /*rgba(0, 0, 0, 0) 0%,*/ rgba(0, 0, 0, 0) 100%
    );
  }

  @media (max-width: 900px) {
    .stage {
      mask-image: none;
    }
  }
  .origin {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateZ(0); /* promote layer */
  }

  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    will-change: transform, opacity;
  }

  .card {
    position: relative;
    display: block;
    width: min(420px, 70vw);
    height: clamp(320px, 45vw, 500px);
    /*width: clamp(220px, calc(var(--stage-h, 600px) * 0.55), 520px);
    height: clamp(220px, calc(var(--stage-h, 600px) * 0.72), 560px);*/
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
    background-position: top center;
  }
  .footer {
    position: relative;
    /*inset: auto 0 0 0;*/
    width: 100%;
    margin-top: 10px;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    /*background: linear-gradient(
      to top,
      rgba(220, 13, 64, 0.55),
      rgba(0, 0, 0, 0)
    );*/

    .meta {
      display: grid;
      gap: 4px;
    }

    ul {
      li {
        &:nth-child(1) {
          font-size: 1.5rem;
          /*color: white;*/
          color: #00162b;
          font-variation-settings: "wght" 220;
        }
        &:nth-child(2) {
          font-size: 1.3rem;
          margin-top: 0.5rem;
          color: white;
          /*color: rgba(255, 255, 255, 0.8);*/
          font-variation-settings: "wght" 180;
          font-synthesis: none;
        }
        &:nth-child(3) {
          margin-top: 0.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-variation-settings: "wght" 180;
          font-synthesis: none;
        }
      }
    }
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
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
  }
</style>
