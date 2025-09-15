<script>
  import favicon from "$lib/assets/favicon.svg";
  import NavBar from "$lib/components/NavBar.svelte";

  let { children } = $props();
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
  :global(ul, li) {
    list-style: none;
  }
</style>
