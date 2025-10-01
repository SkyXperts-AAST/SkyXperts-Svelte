<script>
  import { sponsorSections, contentSections } from "$lib/data/sponsors";
</script>

<main>
  <h1>Why Sponsor Sky<span style="color:red">X</span>perts?</h1>
  <div class="grid-wrap">
    {#each contentSections as section, i}
      <div class="row" class:reverse={i % 2 === 1}>
        <div class="content">
          <h1>&#x2771;{i + 1}&#x2770;</h1>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </div>
        <div class="image">
          <img src={section.src} alt={section.alt} />
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    min-height: 100svh;
  }
  h1 {
    font-size: clamp(1.8rem, -7.8rem + 17.0667vw, 5rem);
    font-synthesis: none;
    color: white;
    margin-left: 2rem;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2rem;
    margin-block: 2.5rem;
    grid-auto-flow: dense;

    h1 {
      font-size: clamp(2rem, -7rem + 16vw, 5rem);
      font-synthesis: none;
      color: #dc0d40;
      margin: 0;
    }
  }
  .content {
    grid-column: 1;
    padding: 0 2rem;
  }
  .image {
    grid-column: 2;
    display: flex;
    align-items: center; /* center vertically */
    justify-content: center; /* center horizontally */
  }

  .row.reverse .content {
    grid-column: 2;
  }
  .row.reverse .image {
    grid-column: 1;
  }

  /* Just some niceties */
  h2 {
    color: #dc0d40;
    font-size: clamp(1.625rem, -0.7rem + 4.1333vw, 2.4rem);
    position: relative;
    margin-top: 0;
  }
  p {
    color: white;
    font-synthesis: none;
    font-size: clamp(1.25rem, 0.5rem + 1.3333vw, 1.5rem);
    text-align: left;
    margin: 0;
  }

  img {
    max-width: 90%;
    height: auto;
    display: block;
    border-radius: 0.75rem;
  }

  /* Make it stack cleanly on small screens */
  @media (max-width: 900px) {
    h1 {
      display: flex;
      justify-content: center;
      margin: 0;
    }
    .row {
      grid-template-columns: 1fr;
      text-align: center; /* Center text inside the row */
    }

    .row.reverse .content,
    .row.reverse .image {
      grid-column: 1 !important;
      grid-row: auto !important; /* <-- the important part */
    }

    .content,
    .image {
      grid-column: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content h2,
    .content p {
      text-align: center; /* Override text alignment */
    }

    img {
      max-width: 100%; /* Use full width on mobile */
    }
  }
</style>
