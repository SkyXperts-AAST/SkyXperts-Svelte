<script lang="ts">
  import defaultImg from "$lib/assets/Team/default.webp";
  import Button from "$lib/components/Button.svelte";
  import type { SubteamKey } from "$lib/data/subteams";

  import {
    CURRENT_SEASON_ID,
    getExpandedRoster,
    getActiveSubteams,
    ALL_SEASON_IDS,
    hasRoleInSubteam,
    rolesInSubteam,
    type Role,
  } from "$lib/data/seasons";

  // --- state ---
  let seasonId = $state(CURRENT_SEASON_ID);

  const team = $derived(getExpandedRoster(seasonId));
  const activeSubteams = $derived(getActiveSubteams(seasonId));

  // carousel
  let selected = $state(2);
  const n = $derived(activeSubteams.length);
  $effect(() => {
    const _ = seasonId + n;
    if (selected >= n) selected = 0;
  });

  function ringOffset(i: number) {
    return ((i - selected + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
  }
  const select = (i: number) => (selected = (i + n) % n);
  const prev = () => select(selected - 1);
  const next = () => select(selected + 1);

  // current subteam key/title/description
  const current = $derived(
    activeSubteams[selected] ?? {
      key: "" as SubteamKey,
      title: "",
      description: "",
    },
  );
  const currentKey = $derived(current.key as SubteamKey);

  // filter within the selected subteam
  const filteredTeam = $derived(
    team.filter((m) => rolesInSubteam(m, currentKey).length > 0),
  );

  const heads = $derived(
    filteredTeam.filter((m) =>
      hasRoleInSubteam(m, currentKey, ["Head", "Co-Head"]),
    ),
  );

  const members = $derived(
    filteredTeam.filter((m) => hasRoleInSubteam(m, currentKey, ["Member"])),
  );

  // Optional: global board (across subteams) — keep if you like
  const norm = (s: unknown) => (s ?? "").toString().trim().toLowerCase();
  const titlesOf = (m: any) =>
    (m.assignments ?? []).flatMap((a: any) => a.roles.map(norm));
  const hasAnyRole = (m: any, roles: string[]) => {
    const set = titlesOf(m);
    return roles.some((r) => set.includes(norm(r)));
  };
  const ceos = $derived(team.filter((m) => hasAnyRole(m, ["ceo"])));
  const ctos = $derived(team.filter((m) => hasAnyRole(m, ["cto"])));

  const pickRole = (roles: Role[], preferred: Role[]) => {
    const lower = roles.map((t) => t.toLowerCase());
    const i = preferred.findIndex((p) => lower.includes(p.toLowerCase()));
    return i !== -1 ? preferred[i] : roles[0];
  };
</script>

<section class="layout">
  <div class="layout-grid">
    <!-- LEFT: season switcher -->
    <div class="sidebar">
      <div class="season-switcher">
        <label>
          &#10097; See All Seasons &#10096;
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
      <div class="board-list">
        <h2>Board</h2>

        <!-- CEO -->
        <div class="board-container">
          {#if ceos.length}
            {#each ceos as board}
              <span class="member">
                <div class="head-card">
                  <img src={board.src || defaultImg} alt={board.name} />
                </div>
                <ul>
                  <li>{board.name}</li>
                  <li>
                    {pickRole(
                      board.assignments.flatMap((a) => a.roles),
                      ["CEO"],
                    )}
                  </li>
                  <li>{board.department}</li>
                </ul>
              </span>
            {/each}
          {/if}

          {#if ctos.length}
            {#each ctos as board}
              <span class="member">
                <div class="head-card">
                  <img src={board.src || defaultImg} alt={board.name} />
                </div>
                <ul>
                  <li>{board.name}</li>
                  <li>
                    {pickRole(
                      board.assignments.flatMap((a) => a.roles),
                      ["CTO"],
                    )}
                  </li>
                  <li>{board.department}</li>
                </ul>
              </span>
            {/each}
          {/if}
        </div>

        <!-- Fallback if neither exists -->
        {#if !ceos.length && !ctos.length}
          <p class="board-empty">No CEO/CTO found for this subteam/season.</p>
        {/if}
      </div>

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
            {#each activeSubteams as meta, i}
              <div class="item" style={`--shift:${ringOffset(i)};`}>
                <Button
                  class={i === selected ? "selected" : ""}
                  onclick={() => select(i)}
                >
                  {meta.title}
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

      <h1 class="current">{(current.title ?? "").toUpperCase()}</h1>

      <div class="team-container">
        <!-- Heads -->
        <div class="heads-container">
          {#each heads as head}
            <span class="member">
              <div class="head-card">
                <img src={head.src || defaultImg} alt={head.name} />
              </div>
              <ul>
                <li>{head.name}</li>
                <li>
                  {pickRole(rolesInSubteam(head, currentKey), [
                    "Head",
                    "Co-Head",
                  ])}
                </li>
                <li>{head.department}</li>
              </ul>
            </span>
          {/each}
        </div>
        <div class="members-container">
          <!-- Non-head members -->
          {#each members as member}
            <span class="member">
              <div class="head-card">
                <img src={member.src || defaultImg} alt={member.name} />
              </div>
              <ul>
                <li>{member.name}</li>
                <li>
                  {pickRole(rolesInSubteam(member, currentKey), ["Member"])}
                </li>
                <li>{member.department}</li>
              </ul>
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- UNDER the grid -->
  {#if current.description}
    <p class="subteam-description" aria-live="polite">{current.description}</p>
  {:else}
    <p
      class="subteam-description subteam-description--empty"
      aria-live="polite"
    >
      (Add a description for the {current.title} subteam in
      <code>subteams.ts</code>.)
    </p>
  {/if}
</section>

<style>
  :root {
    --item-w: clamp(10rem, -1.25rem + 20vw, 13.75rem);
    --gap: 16px;
  }

  .layout {
    min-height: 100svh;
    width: 100%;
    display: grid;
    position: relative;
    row-gap: clamp(1.25rem, 2vw, 2rem);
    padding-block: clamp(2rem, 3vw, 4rem);

    .layout-grid {
      display: grid;
      /*grid-template-columns: minmax(220px, 1fr) minmax(0, 3fr);*/
      /*gap: clamp(1rem, 2.5vw, 2rem);*/
      align-items: start;
      margin-top: 2rem;

      /* LEFT column */
      .sidebar {
        position: relative;
        /*top: 7rem;*/
        display: flex;
        justify-content: center;
        align-items: center;

        /*&::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 10%;
          height: 1rem;
          background-color: #dc0d40;

          mask-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 30%,
            rgba(0, 0, 0, 0) 42%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 58%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(0, 0, 0, 0) 100%
          );
        }*/

        .line {
          position: absolute;
          width: 100%;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        label {
          color: #dc0d40;
          display: flex;
          position: relative;
          flex-direction: column;
          align-items: center;
          font-size: clamp(2rem, -1rem + 5.3333vw, 3rem);
          text-transform: uppercase;
          cursor: pointer;

          /*&::after {
            content: "";
            position: absolute;
            pointer-events: none;
            transform: translateY(80%);
            width: 40px;
            height: 40px;
            background-image: url("data:image/svg+xml;utf8,\
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23dc0d40'>\
          <path d='M5.64 7.64 10 12l4.36-4.36-1.41-1.41L10 9.17 7.05 6.23 5.64 7.64z'/>\
          </svg>");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            opacity: 0.9;
          }*/
        }

        label,
        select {
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
          margin-top: 1rem;
        }
      }

      /* RIGHT column container: allows .current to be positioned within */
      .main {
        position: relative;
        display: grid;
        align-items: start;
        /*row-gap: clamp(1rem, 2vw, 2rem);*/

        h2 {
          color: rgba(255, 255, 255, 0.8);
          font-variation-settings: "wght" 180;
          font-size: clamp(2rem, -1rem + 5.3333vw, 3rem);
          margin: 1rem;
        }

        .subteam-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

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
              rgba(0, 0, 0, 0) 10%,
              #000 50%,
              rgba(0, 0, 0, 0) 90%,
              rgba(0, 0, 0, 0) 100%
            );
            -webkit-mask-image: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 10%,
              #000 50%,
              rgba(0, 0, 0, 0) 90%,
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
          font-variation-settings: "wght" 220;
          font-size: clamp(2.5rem, -25rem + 37.3333vw, 10rem);
          text-align: center;
          position: absolute;
          z-index: 1;
          letter-spacing: 2rem;
          top: 7rem;
          left: 50%; /* centers horizontally */
          transform: translateX(-50%); /* perfect centering */
          display: none;
          /*margin-top: 10rem;*/
        }
        .board-list,
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
          margin-top: 2rem;

          .board-container,
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
                  font-variation-settings: "wght" 220;
                }
                &:nth-child(2) {
                  font-size: 1.2rem;
                  margin-top: 0.5rem;
                  color: white;
                  font-variation-settings: "wght" 180;
                  font-synthesis: none;
                }
                &:nth-child(3) {
                  color: rgba(255, 255, 255, 0.8);
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
              /*border: 5px solid #3432ca;*/

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
              }
            }
          }

          .heads-container {
            .head-card {
              /*border: 5px solid #dc0d40;*/
              /*box-shadow: rgba(220, 13, 64, 0.) 0px 5px 15px;*/
              /*box-shadow: rgba(52, 50, 202, 0.5) 0px 5px 15px;*/
            }
          }

          /*.board-container,*/
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
            }
          }
          .members-container .head-card {
            border-radius: 100em;
          }
        }
        .board-list {
          margin-top: 0;
          row-gap: clamp(2rem, 3vw, 3rem);
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

  @media (max-width: 900px) {
    .layout .layout-grid .sidebar {
      &::before {
        background-color: transparent;
      }
    }
  }

  @media (max-width: 1200px) {
    .current {
      display: none;
    }
  }
</style>
