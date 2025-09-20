<script>
  import Hero from "$lib/components/Hero.svelte";
  import BecomeAMember from "$lib/components/team/BecomeAMember.svelte";
  import Subteam from "$lib/components/team/Subteam.svelte";
  import teamBg from "$lib/assets/imgs/team-building.jpeg";
</script>

<Hero title="The Team" bg={teamBg} parallaxBg={0.5} parallaxText={-0.12} />
<Subteam />

<BecomeAMember />

<style>
  section {
    display: flex;
    height: 100vh;
    margin: 0;
    background-color: #00162b;
  }
</style>
