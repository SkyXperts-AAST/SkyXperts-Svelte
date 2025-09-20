<script>
  import ArcCarousel from "$lib/components/team/ArcCarousel.svelte";
  import { permanentRoster } from "$lib/data/seasons";
  const team = [
    {
      name: "Prof.",
      image:
        "https://img.redbull.com/images/c_fill,g_auto,w_600,h_620,f_auto/redbullcom/2025/9/18/b4p3ykwijigmhgp8inhj/laurent-mekies-team-principal-of-oracle-red-bull-racing",
      href: "/team/laurent-mekies",
    },
    {
      name: "Pierre Waché",
      image:
        "https://img.redbull.com/images/c_fill,g_auto,w_600,h_620,f_auto/redbullcom/2025/5/7/mxts0jwebpa3gvph5try/pierre-wache-technical-director-oracle-red-bull-racing",
      href: "/team/pierre-wache",
    },
    {
      name: "Pierre Waché",
      image:
        "https://img.redbull.com/images/c_fill,g_auto,w_600,h_620,f_auto/redbullcom/2025/5/7/mxts0jwebpa3gvph5try/pierre-wache-technical-director-oracle-red-bull-racing",
      href: "/team/pierre-wache",
    },
  ];
</script>

<section>
  <h1>Leadership</h1>
  <div class="test">
    <ArcCarousel
      items={team}
      radius={1500}
      stepDeg={20}
      rotateWithPath={true}
      arcHeight={593}
    />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    background-color: #dc0d40;

    h1 {
      font-size: 10rem;
      font-synthesis: none;
      color: white;
      margin-left: 2rem;
    }
    .test {
      width: 100%;
      height: 100%;
    }
  }
</style>
