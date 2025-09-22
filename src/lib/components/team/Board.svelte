<script lang="ts">
  import ArcCarousel from "$lib/components/team/ArcCarousel.svelte";
  import { permanentRoster } from "$lib/data/seasons";
  import { memberById } from "$lib/data/members";

  const expanded = (permanentRoster ?? []).map((slot) => {
    const p = memberById[slot.personId] ?? {};
    return {
      ...slot,
      name: p.name ?? slot.personId,
      src: p.src ?? "",
      department: p?.department ?? "",
    };
  });

  const items = expanded.map((m) => ({
    name: m.name,
    image: m.src,
    href: `/team/${m.personId}`,
    title: m.title, // NEW
    tags: m.tags ?? [], // NEW (array)
    subteam: m.subteam ?? "", // optional: string | string[]
    department: m.department ?? "",
  }));
</script>

<section>
  <h1>Leadership</h1>
  <div class="test">
    <ArcCarousel
      {items}
      radius={1900}
      stepDeg={20}
      rotateWithPath
      arcHeight={900}
    />
  </div>
</section>

<style>
  section {
    display: flex;
    /*align-items: center;*/
    /*justify-content: center;*/
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    min-height: 100svh;
    margin: 0;
    background-color: #dc0d40;

    h1 {
      font-size: clamp(4rem, -14rem + 32vw, 10rem);
      font-synthesis: none;
      color: white;
      margin-left: 2rem;
      margin-bottom: 5rem;
    }
    .test {
      width: 100%;
      height: 100%;
      /*margin-bottom: 20em;*/
    }
  }

  @media (max-width: 900px) {
    section {
      align-items: center;
      h1 {
        margin-left: 0;
      }
    }
  }
</style>
