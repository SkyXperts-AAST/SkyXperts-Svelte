<script>
  import Package from "$lib/components/sponsors/Package.svelte";
  import Button from "$lib/components/Button.svelte";
</script>

<main>
  <h1>Sponsorship</h1>
  <h1 class="title">Packages</h1>
  <span class="packages">
    <Package />
  </span>
  <!-- <h3>Don't see a package that perfectly aligns with your company's goals?</h3>
  <Button>Contact Us</Button> -->
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100svh;
    width: 100%;

    h1 {
      color: white;
      font-size: clamp(2rem, -13rem + 26.6667vw, 7rem);
      font-synthesis: none;
      margin: 0;
    }
    h3 {
      color: white;
      font-size: 2rem;
      font-synthesis: none;
      margin: 0;
      margin-bottom: 2rem;
    }

    .title {
      position: absolute;
      top: 0;
      color: rgba(255, 255, 255, 0.3);
      font-size: clamp(5rem, -40rem + 80vw, 20rem);
      /*font-synthesis: none;*/
      margin: 0;
    }
    .packages {
      margin-top: 9rem;
      margin-bottom: 3rem;
    }

    @media (max-width: 900px) {
      .packages {
        margin-top: 6rem;
      }
    }
  }
</style>
