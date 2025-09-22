<script>
  import Hero from "$lib/components/Hero.svelte";
  import CosmosParagraph from "$lib/components/CosmosParagraph.svelte";
  import teamBg from "$lib/assets/Events/Alamein-Airshow-24/alameinairshow-team.jpg";
</script>

<Hero
  title={'Sky<span style="color:red">X</span>perts'}
  subtitle="UAVs Club"
  bg={teamBg}
  parallaxBg={0.5}
  parallaxText={-0.12}
/>

<section>
  <CosmosParagraph
    text="SkyXperts UAV Club, a leading student-led robotics club at the Arab Academy for Science and Technology (AAST), is seeking a strategic partnership with forward-thinking companies to support our mission of advancing drone technology and nurturing future engineering leaders in Egypt. Your investment will directly fuel our research and development, providing a critical competitive edge as we prepare for international competitions, while also offering your company unparalleled brand visibility and access to top-tier talent."
    align="justify"
    baseAlpha={0.2}
    triggerAt={0.8}
    revealDistancePx={600}
    staggerMs={0}
  />
</section>
<section>HIII</section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: end;
    align-items: start;

    background-color: #00162b;
  }
</style>
