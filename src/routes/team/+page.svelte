<script>
  import Hero from "$lib/components/Hero.svelte";
  import Join from "$lib/components/Join.svelte";
  import Subteam from "$lib/components/Subteam.svelte";
  import team from "$lib/team.js";
  import teamBg from "$lib/assets/imgs/team-building.jpeg";
</script>

<Hero title="The Team" bg={teamBg} parallaxBg={0.5} parallaxText={-0.12} />
<Subteam />

<Join />

<style>
  section {
    display: flex;
    height: 100vh;
    margin: 0;
    background-color: #00162b;
  }
</style>
