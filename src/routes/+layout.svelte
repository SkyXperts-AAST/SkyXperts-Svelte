<script>
  import favicon from "$lib/assets/logos/favicon.png";
  import NavBar from "$lib/components/NavBar.svelte";

  let { children } = $props();
  import "../app.css";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<NavBar />

{@render children?.()}

<style>
  @font-face {
    font-family: "Venus Rising";
    src: url("/src/lib/assets/fonts/VenusRising.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Bull";
    src: url("/src/lib/assets/fonts/Bull.ttf") format("truetype");
    font-weight: 78 220;
    font-style: normal;
    font-display: swap;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #00162b;
  }
  :global(a) {
    text-decoration: none;
  }
  :global(h1, h2, h3, label, select, li, p) {
    font-family: "Bull", monospace;
  }
  :global(ul, li) {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
