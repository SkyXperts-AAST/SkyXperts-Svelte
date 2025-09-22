<script>
  import Hero from "$lib/components/Hero.svelte";
  import teamBg from "$lib/assets/Events/Orientation-24/drone.jpeg";
</script>

<Hero title="Our Drones" bg={teamBg} parallaxBg={0.5} parallaxText={-0.12} />

<section></section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00162b;
  }
</style>
