<script>
  import subteam from "$lib/subteams.js";
  import Button from "$lib/components/Button.svelte";

  // NEW: import season data helpers (from the seasons structure I proposed)
  import {
    CURRENT_SEASON_ID,
    getExpandedRoster,
    ALL_SEASON_IDS,
  } from "$lib/data/seasons";

  // Pick a season (you can bind this to a <select> in markup if you want)
  let seasonId = $state(CURRENT_SEASON_ID);

  // Derive the active team's roster for the chosen season
  const team = $derived(getExpandedRoster(seasonId));

  // --- your existing carousel logic ---
  let selected = $state(2);
  const n = $derived(subteam.length);

  function ringOffset(i) {
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

  const norm = (s) => (s ?? "").toString().trim().toLowerCase();
  const titlesOf = (m) =>
    Array.isArray(m.title) ? m.title.map(norm) : [norm(m.title)];
  const hasRole = (m, roles) => {
    const set = titlesOf(m);
    return roles.some((r) => set.includes(norm(r)));
  };

  // Selected subteam title (normalized)
  const currentTitle = $derived(norm(subteam[selected]?.title));

  // Filter by subteam (string or array) — now reads from the season roster
  const filteredTeam = $derived(
    team.filter((member) => {
      const v = member.subteam;
      if (Array.isArray(v)) return v.map(norm).includes(currentTitle);
      return norm(v) === currentTitle;
    }),
  );

  // Current subteam description (unchanged)
  const currentSubteam = $derived(
    subteam[selected] ?? { title: "", description: "" },
  );
  const currentDescription = $derived(
    (currentSubteam.description ?? "").trim(),
  );
</script>

<section class="layout">
  <div class="layout-grid">
    <!-- LEFT: season switcher -->
    <div class="sidebar">
      <div class="season-switcher">
        <label>
          Season
          <select bind:value={seasonId}>
            {#each ALL_SEASON_IDS as id}
              <option value={id}>{id}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>

    <!-- RIGHT: everything else (title stays absolute inside this box) -->
    <div class="main">
      <div class="subteam-list">
        <h2>Subteams</h2>
        <div class="controls">
          <button class="arrow" onclick={prev} aria-label="Previous"
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
                  {label.title}
                </Button>
              </div>
            {/each}
          </div>

          <button class="arrow" onclick={next} aria-label="Next"
            ><svg width="24" height="24"
              ><path
                d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
                fill="currentColor"
              /></svg
            ></button
          >
        </div>
      </div>
      <h1 class="current">{(subteam[selected].title ?? "").toUpperCase()}</h1>

      <div class="team-container">
        <!-- Heads -->
        <div class="heads-container">
          {#each filteredTeam.filter( (m) => hasRole( m, ["head", "co-head", "mentor"], ), ) as head}
            <span class="member">
              <div class="head-card">
                <img src={head.src} alt={head.name} />
              </div>
              <ul>
                <li>{head.name}</li>
                <li>
                  {Array.isArray(head.title) ? head.title[0] : head.title}
                </li>
                <li>{head.department}</li>
              </ul>
            </span>
          {/each}
        </div>
        <div class="members-container">
          <!-- Non-head members -->
          {#each filteredTeam.filter((m) => hasRole(m, ["member"])) as member}
            <span class="member">
              <div class="head-card">
                <img src={member.src} alt={member.name} />
              </div>
              <ul>
                <li>{member.name}</li>
                <li>{member.title}</li>
                <!-- <li>{member.department}</li> -->
              </ul>
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- UNDER the grid -->
  {#if currentDescription}
    <p class="subteam-description" aria-live="polite">
      {currentDescription}
    </p>
  {:else}
    <p
      class="subteam-description subteam-description--empty"
      aria-live="polite"
    >
      (Add a description for the {currentSubteam.title} subteam in
      <code>subteams.js</code>.)
    </p>
  {/if}
</section>

<style>
  /* Item “cells”: fixed width so motion is consistent */
  :root {
    --item-w: clamp(10rem, -1.25rem + 20vw, 13.75rem);
    --gap: 16px;
  }

  .layout {
    min-height: 100svh;
    width: 100%;
    display: grid;
    row-gap: clamp(
      1.25rem,
      2vw,
      2rem
    ); /* gap between grid and the description */
    padding-block: clamp(2rem, 3vw, 4rem);

    .layout-grid {
      display: grid;
      /*grid-template-columns: minmax(220px, 1fr) minmax(0, 3fr);*/
      /*gap: clamp(1rem, 2.5vw, 2rem);*/
      align-items: start;

      /* LEFT column */
      .sidebar {
        /*position: sticky;*/
        top: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        /*width: 20em;*/

        label {
          color: #dc0d40;
          display: flex;
          position: relative;
          flex-direction: column;
          align-items: center;
          font-size: 2rem;
        }

        label,
        select {
          /*color: white;*/
          font-family: "Bull", monospace;
          font-variation-settings: "wght" 180;
          font-synthesis: none;
        }

        label select {
          background-color: transparent;
          color: white;
          appearance: none;
          border: none;
          font-size: 5rem;
          cursor: pointer;
          /*width: inherit;*/
        }
      }

      /* RIGHT column container: allows .current to be positioned within */
      .main {
        position: relative;
        display: grid;
        align-items: start;
        row-gap: clamp(1rem, 2vw, 2rem);

        .subteam-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          h2 {
            color: rgba(255, 255, 255, 0.8);
            font-family: "Bull", monospace;
            font-variation-settings: "wght" 180;
            font-size: clamp(2rem, -1rem + 5.3333vw, 3rem);
            margin: 1rem;
          }

          .controls {
            position: relative;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            width: 60vw;
            margin-right: 7em;
            z-index: 2;

            .arrow {
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
            }
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

            .item {
              position: absolute;
              top: 50%;
              left: 50%;
              width: var(--item-w);
              transform: translate(-50%, -50%)
                translateX(calc(var(--shift) * (var(--item-w) + var(--gap))));
              transition: transform 300ms ease-in-out; /* motion */
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
          }
        }

        .current {
          color: rgba(255, 255, 255, 0.1);
          font-family: "Bull", monospace;
          font-variation-settings: "wght" 220;
          font-size: clamp(2.5rem, -25rem + 37.3333vw, 10rem);
          text-align: center;
          position: absolute;
          z-index: 1;
          top: 24rem; /* pushes it down from the top */
          left: 50%; /* centers horizontally */
          transform: translateX(-50%); /* perfect centering */
          /*margin-top: 10rem;*/
        }

        .team-container {
          display: grid;
          position: relative;
          z-index: 2;
          grid-template-rows: auto auto; /* heads row, members row */
          row-gap: clamp(3rem, 4vw, 4rem);
          align-items: start;
          justify-items: center;
          width: min(100%, 1200px);
          margin-inline: auto;
          padding-block: clamp(1rem, 2vw, 2rem);
          margin-top: 5rem;

          .heads-container,
          .members-container {
            position: static;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: clamp(0.75rem, 1.5vw, 1.25rem);
            width: 100%;
            justify-items: center;
          }

          .member {
            display: grid;
            grid-template-rows: auto auto;
            gap: 0.5rem;

            ul {
              li {
                &:nth-child(1) {
                  font-size: 1.5rem;
                  color: #dc0d40;
                  font-family: "Bull", monospace;
                  font-variation-settings: "wght" 220;
                }
                &:nth-child(2) {
                  font-size: 1.2rem;
                  margin-top: 0.5rem;
                  color: white;
                  font-family: "Bull", monospace;
                  font-variation-settings: "wght" 180;
                  font-synthesis: none;
                }
                &:nth-child(3) {
                  color: rgba(255, 255, 255, 0.8);
                  font-family: "Bull", monospace;
                  font-variation-settings: "wght" 180;
                  font-synthesis: none;
                }
              }
            }

            .head-card {
              width: 200px;
              aspect-ratio: 1 / 1; /* keeps card square even before image loads */
              overflow: hidden;
              border-radius: 20px;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
              }
            }
          }

          .members-container {
            grid-template-columns: repeat(
              auto-fit,
              minmax(min(180px, 100%), 1fr)
            );
            gap: clamp(1.625rem, -8.5rem + 18vw, 5rem);
            width: 79%;
            .member {
              justify-items: center;
              gap: 0.5rem;

              ul {
                li {
                  margin-top: 0.2rem;
                  text-align: center;
                }
              }

              .head-card {
                border-radius: 100em;
              }
            }
          }
        }
      }
    }

    .subteam-description {
      font-family: "Bull", monospace;
      font-variation-settings: "wght" 180;
      font-synthesis: none;
      max-width: min(70ch, 85svw);
      margin: 2rem auto 0;
      line-height: 1.6;
      font-size: clamp(1rem, 0.6rem + 1vw, 1.25rem);
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
    }

    .subteam-description--empty {
      opacity: 0.6;
    }
  }

  @media (max-width: 1200px) {
    .current {
      display: none;
    }
  }
</style>
