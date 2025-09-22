<script>
  import Hero from "$lib/components/Hero.svelte";
  import Board from "$lib/components/team/Board.svelte";
  import Subteam from "$lib/components/team/Subteam.svelte";
  import BecomeAMember from "$lib/components/team/BecomeAMember.svelte";
  import teamBg from "$lib/assets/imgs/team-building.jpeg";
</script>

<Hero
  title="The Team"
  bg={teamBg}
  parallaxBg={0.5}
  parallaxText={-0.12}
  fadeColor="#dc0d40"
/>
<Board />
<Subteam />

<!-- <BecomeAMember /> -->

<style>
</style>
