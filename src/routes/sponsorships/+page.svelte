<script>
  import Hero from "$lib/components/Hero.svelte";
  import teamBg from "$lib/assets/Events/Rally-24/rally-team.jpeg";
  import WhySponsor from "$lib/components/sponsors/WhySponsor.svelte";
  import Plans from "$lib/components/sponsors/Plans.svelte";
</script>

<Hero title="Sponsorships" bg={teamBg} parallaxBg={0.5} parallaxText={-0.12} />
<WhySponsor />
<Plans />

<!-- <section>HIII</section> -->

<style>
  section {
    height: 100vh;
    width: 100vw;

    background-color: #00162b;
  }
</style>
