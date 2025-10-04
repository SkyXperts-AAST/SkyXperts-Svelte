<script lang="ts">
  import ArcCarousel from "$lib/components/team/ArcCarousel.svelte";
  import { permanentRoster, type Role } from "$lib/data/seasons";
  import { memberById } from "$lib/data/members";

  // Which leadership roles to show in this carousel
  const LEADERSHIP_ROLES: Role[] = ["Mentor", "Supervisor"];

  // Merge static person data from members with permanentRoster assignments
  const expandedPermanent = (permanentRoster ?? []).map((slot) => {
    const person = memberById[slot.personId] ?? {};
    return {
      ...slot,
      name: person.name ?? slot.personId,
      src: person.src ?? "",
      department: person?.department ?? "",
      personTags: person?.tags ?? [],
    };
  });

  // Build ArcCarousel items for Mentors and Supervisors
  const items = expandedPermanent
    // keep only people who have any of the target roles
    .filter((member) =>
      (member.assignments ?? []).some((assignment) =>
        assignment.roles.some((role) => LEADERSHIP_ROLES.includes(role)),
      ),
    )
    .map((member) => {
      // find which roles they have (intersection with target roles)
      const matchedRoles = (member.assignments ?? [])
        .flatMap((assignment) => assignment.roles)
        .filter((role) => LEADERSHIP_ROLES.includes(role));

      // find which subteams they serve in for those roles
      const leadershipSubteams = (member.assignments ?? [])
        .filter((assignment) =>
          assignment.roles.some((role) => LEADERSHIP_ROLES.includes(role)),
        )
        .map((assignment) => assignment.subteam);

      // pick a display title (Supervisor takes priority over Mentor)
      const displayRole = matchedRoles.includes("Supervisor")
        ? "Supervisor"
        : "Mentor";

      return {
        name: member.name,
        image: member.src,
        href: `/team/${member.personId}`,
        title: displayRole,
        tags: member.tags ?? member.personTags ?? [],
        subteam: leadershipSubteams, // use .join(", ") if ArcCarousel expects a string
        department: member.department ?? "",
      };
    });
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
      margin-bottom: -3rem;
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
