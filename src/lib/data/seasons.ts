import { memberById } from "./members";
import { SUBTEAM_CATALOG, type SubteamKey, type SubteamMeta } from "./subteams";

export type Role =
  | "Supervisor"
  | "Mentor"
  | "Head"
  | "Co-Head"
  | "Member"
  | "CTO"
  | "CEO";

export type Assignment = {
  subteam: SubteamKey;
  roles: Role[]; // e.g., ["Head"] or ["Member"]
};

export type SeasonMember = {
  personId: string; // references members.ts
  assignments: Assignment[]; // 🔥 the only way to assign roles now
  tags?: string[];
  department?: string;
};

export type Season = {
  id: string; // e.g. "24-25"
  label: string; // e.g. "Season 2024/2025"
  start?: string; // ISO
  end?: string;
  subteams: SubteamKey[]; // what tabs exist this season
  roster: SeasonMember[];
};

export const seasons: Season[] = [
  {
    id: "24-25",
    label: "Season 2024/2025",
    start: "2024-09-01",
    end: "2025-07-01",
    subteams: [
      "Electrical",
      "Mechanical",
      "Computer Vision",
      "Control",
      "Web Dev",
    ],
    roster: [
      {
        personId: "moustafa-adly",
        assignments: [{ subteam: "General", roles: ["CEO"] }],
      },
      {
        personId: "omar-ossama",
        assignments: [{ subteam: "Electrical", roles: ["Head"] }],
      },
      {
        personId: "abdelrahman-hikal",
        assignments: [{ subteam: "Mechanical", roles: ["Head"] }],
      },
      {
        personId: "fares-fathy",
        assignments: [
          { subteam: "General", roles: ["CTO"] },
          { subteam: "Computer Vision", roles: ["Head"] },
          { subteam: "Control", roles: ["Head"] },
          { subteam: "Web Dev", roles: ["Head"] },
        ],
      },
      {
        personId: "habiba-amr",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Control", roles: ["Member"] },
        ],
      },
      {
        personId: "maya-hossam",
        assignments: [{ subteam: "Computer Vision", roles: ["Member"] }],
      },
      {
        personId: "asmaa-ebeid",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Control", roles: ["Member"] },
        ],
      },
      {
        personId: "mohamed-nabil",
        assignments: [{ subteam: "Computer Vision", roles: ["Member"] }],
      },
      {
        personId: "nour-allam",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Control", roles: ["Member"] },
        ],
      },
      {
        personId: "yasmin-ahmed",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Control", roles: ["Member"] },
        ],
      },
      {
        personId: "yehia-sharawy",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Web Dev", roles: ["Member"] },
        ],
      },
      {
        personId: "yehia-alaa",
        assignments: [{ subteam: "Mechanical", roles: ["Member"] }],
      },
    ],
  },
  {
    id: "25-26",
    label: "Season 2025/2026",
    start: "2025-09-01",
    end: "2026-08-01",
    subteams: [
      "Electrical",
      "Mechanical",
      "Computer Vision",
      "Control",
      "Media",
      "Web Dev",
    ],
    roster: [
      {
        personId: "omar-ossama",
        assignments: [
          { subteam: "General", roles: ["CEO"] },
          { subteam: "Electrical", roles: ["Head"] },
        ],
      },
      {
        personId: "habiba-amr",
        assignments: [{ subteam: "General", roles: ["CTO"] }],
      },
      {
        personId: "abdelrahman-hikal",
        assignments: [{ subteam: "Mechanical", roles: ["Head"] }],
      },
      {
        personId: "habiba-amr",
        assignments: [
          { subteam: "Computer Vision", roles: ["Head"] },
          { subteam: "Control", roles: ["Head"] },
        ],
      },
      {
        personId: "maya-hossam",
        assignments: [
          { subteam: "Computer Vision", roles: ["Co-Head"] },
          { subteam: "Control", roles: ["Co-Head"] },
        ],
      },
      {
        personId: "yehia-sharawy",
        assignments: [
          { subteam: "Computer Vision", roles: ["Member"] },
          { subteam: "Web Dev", roles: ["Head"] },
        ],
      },
      {
        personId: "yehia-alaa",
        assignments: [
          { subteam: "Media", roles: ["Member"] },
          { subteam: "Mechanical", roles: ["Member"] },
        ],
      },
    ],
  },
];

export const permanentRoster: SeasonMember[] = [
  {
    personId: "prof-mohamed-abo-el-azm",
    tags: ["Dean of Student Affairs"],
    assignments: [{ subteam: "General", roles: ["Supervisor"] }],
  },
  {
    personId: "mohamed-ragab",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "omar-aman",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "youssef-mehanna",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "ahmed-mohamed",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "osama-hesham",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "belal-abo-elkheir",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "aya-ashraf",
    assignments: [
      { subteam: "General", roles: ["Head", "Mentor"] },
      { subteam: "Media", roles: ["Head", "Mentor"] },
    ],
  },
  {
    personId: "moustafa-adly",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "fares-fathy",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
  {
    personId: "abdelrahman-hikal",
    assignments: [{ subteam: "General", roles: ["Mentor"] }],
  },
];

// Expand a season roster by pulling person info
export function getExpandedRoster(seasonId: string) {
  const season = seasons.find((s) => s.id === seasonId);
  if (!season) return [];
  return [...permanentRoster, ...season.roster].map((slot) => {
    const person = memberById[slot.personId] as Partial<Person> | undefined;
    return {
      ...slot,
      name: person?.name ?? slot.personId,
      department: person?.department ?? "",
      linkedin: person?.linkedin ?? "",
      src: person?.src ?? "",
      personTags: person?.tags ?? [],
    };
  });
}

/** Active subteams (metadata) for the chosen season */
export function getActiveSubteams(seasonId: string): SubteamMeta[] {
  const season = seasons.find((s) => s.id === seasonId);
  if (!season) return [];
  return season.subteams.map((k) => SUBTEAM_CATALOG[k]);
}

/** Role helpers (per selected subteam) */
const norm = (s: unknown) => (s ?? "").toString().trim().toLowerCase();

export function rolesInSubteam(
  member: ReturnType<typeof getExpandedRoster>[number],
  sub: SubteamKey,
): Role[] {
  return (member.assignments ?? [])
    .filter((a) => norm(a.subteam) === norm(sub))
    .flatMap((a) => a.roles);
}

export function hasRoleInSubteam(
  member: ReturnType<typeof getExpandedRoster>[number],
  sub: SubteamKey,
  roles: Role[],
): boolean {
  const r = rolesInSubteam(member, sub).map(norm);
  return roles.some((wanted) => r.includes(norm(wanted)));
}

export const CURRENT_SEASON_ID = "24-25";
export const ALL_SEASON_IDS = seasons.map((s) => s.id);
