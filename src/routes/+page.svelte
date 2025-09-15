<script>
  import Hero from "$lib/components/Hero.svelte";
  import teamBg from "$lib/assets/Events/Alamein-Airshow-24/alameinairshow-team.jpg";
</script>

<Hero
  title={`Sky<span style="color:red">X</span>perts`}
  subtitle="UAVs Club"
  bg={teamBg}
  parallaxBg={0.5}
  parallaxText={-0.12}
/>

<section>HIII</section>

<style>
  section {
    height: 100vh;
    width: 100vw;

    background-color: #00162b;
  }
</style>
