<script>
  import subteam from "$lib/Subteams";
  import team from "$lib/team.js";
  import Button from "$lib/components/Button.svelte";

  let selected = $state(0);
  // helpers
  const n = $derived(subteam.length);

  // circular distance from selected index, snapped to the shortest path
  function ringOffset(i) {
    // put offsets in (-n/2 .. +n/2]
    return ((i - selected + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
  }

  function select(i) {
    selected = (i + n) % n;
  }
  const prev = () => select(selected - 1);
  const next = () => select(selected + 1);

  function handleKeys(e) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }
</script>

<section>
  <h2>Subteams</h2>

  <div class="controls">
    <button class="arrow" on:click={prev} aria-label="Previous"
      ><svg width="24" height="24"
        ><path
          d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"
          fill="currentColor"
        /></svg
      ></button
    >

    <!-- Carousel track: we don't scroll; we translate items -->
    <div class="subteamList">
      {#each subteam as label, i}
        <!-- Each item is absolutely positioned via translateX based on ringOffset(i) -->
        <div class="item" style={`--shift:${ringOffset(i)};`}>
          <Button
            class={i === selected ? "selected" : ""}
            onclick={() => select(i)}
          >
            {label}
          </Button>
        </div>
      {/each}
    </div>

    <button class="arrow" on:click={next} aria-label="Next"
      ><svg width="24" height="24"
        ><path
          d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
          fill="currentColor"
        /></svg
      ></button
    >
  </div>

  <h1 class="current">{(subteam[selected] ?? "").toUpperCase()}</h1>
</section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    color: rgba(255, 255, 255, 0.2);
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 220;
    font-size: 10em;
    text-align: center;
  }
  h2 {
    color: rgba(255, 255, 255, 0.8);
    font-family: "Bull", monospace;
    font-variation-settings: "wght" 180;
    font-size: 3em;
  }

  .controls {
      position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    /*gap: 0.75rem;*/
    width: 60vw;
    margin-right: 7em;
  }
  .arrow {
    /*position: absolute;*/
    border-radius: 9999px;
    padding: 0.7rem 0.7rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.12);
    color: white;
    backdrop-filter: blur(15px);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.09);
    }

    /*&:nth-child(1){
        margin-left: 6em;
    }
    &:nth-child(3){
        margin-left: 65em;
    }*/
  }
  .subteamList {
    position: relative;
    width: 60vw;
    height: 56px;
    overflow: hidden;

    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 20%,
      #000 50%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 20%,
      #000 50%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  /* Item “cells”: fixed width so motion is consistent */
  :root {
    --item-w: 220px;
    --gap: 16px;
  }
  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--item-w);
    transform: translate(-50%, -50%)
      translateX(calc(var(--shift) * (var(--item-w) + var(--gap))));
    transition: transform 300ms ease-in-out /* motion */
    will-change: transform;
  }

  /* Button appearance within each cell */
  .item :global(button) {
    min-width: var(--item-w);
    text-align: center;
    justify-content: center;
  }

  :global(.selected) {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
</style>
