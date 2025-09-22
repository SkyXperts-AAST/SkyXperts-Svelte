import type { Person } from "./members";
import { memberById } from "./members";

export type Role =
  | "Supervisor"
  | "Mentor"
  | "Head"
  | "Co-Head"
  | "Member"
  | "CTO"
  | "CEO";
export type Subteam =
  | "General"
  | "Electrical"
  | "Mechanical"
  | "Computer Vision"
  | "Control"
  | "Media";

export type SeasonMember = {
  personId: string; // references people.ts
  title: Role | Role[]; // supports multi-roles
  subteam: Subteam | Subteam[]; // supports multi-subteams
  tags?: string[]; // season-specific tags if you need
  department?: string;
};

export type Season = {
  id: string; // e.g. "2024-25"
  label: string; // e.g. "Season 2024/2025"
  start?: string; // ISO date if you want timelines
  end?: string;
  roster: SeasonMember[];
};

export const seasons: Season[] = [
  {
    id: "24-25",
    label: "Season 2024/2025",
    start: "2024-09-01",
    end: "2025-07-01",
    roster: [
      {
        personId: "moustafa-adly",
        title: ["CEO"],
        subteam: "General",
      },
      {
        personId: "omar-ossama",
        title: "Head",
        subteam: ["Electrical"],
      },
      { personId: "abdelrahman-hikal", title: "Head", subteam: "Mechanical" },
      {
        personId: "fares-fathy",
        title: ["Head", "CTO"],
        subteam: ["Computer Vision", "Control"],
      },
      {
        personId: "habiba-amr",
        title: "Member",
        subteam: ["Computer Vision", "Control"],
      },
      {
        personId: "maya-hossam",
        title: "Member",
        subteam: ["Computer Vision", "Control"],
      },
      {
        personId: "yehia-sharawy",
        title: "Member",
        subteam: ["Computer Vision"],
      },
      {
        personId: "nour-allam",
        title: "Member",
        subteam: ["Computer Vision"],
      },
      {
        personId: "yasmin-ahmed",
        title: "Member",
        subteam: ["Computer Vision"],
      },
      {
        personId: "mohamed-nabil",
        title: "Member",
        subteam: ["Computer Vision"],
      },
      {
        personId: "yehia-alaa",
        title: "Member",
        subteam: ["Mechanical"],
      },
    ],
  },
  {
    id: "25-26",
    label: "Season 2025/2026",
    start: "2025-09-01",
    end: "2026-08-01",
    roster: [
      {
        personId: "omar-ossama",
        title: ["Head", "CEO"],
        subteam: ["Electrical"],
      },
      { personId: "fares-fathy", title: "CTO", subteam: "General" },
      { personId: "abdelrahman-hikal", title: "Head", subteam: "Mechanical" },
      {
        personId: "habiba-amr",
        title: "Head",
        subteam: ["Computer Vision", "Control"],
      },
      {
        personId: "maya-hossam",
        title: "Co-Head",
        subteam: ["Computer Vision", "Control"],
      },
      {
        personId: "yehia-sharawy",
        title: "Member",
        subteam: ["Computer Vision", "Mechanical", "Control"],
      },
      {
        personId: "yehia-alaa",
        title: "Member",
        subteam: ["Media", "Mechanical", "Electrical", "Control"],
      },
    ],
  },
];

export const permanentRoster = [
  {
    personId: "prof-mohamed-abo-el-azm",
    title: "Supervisor",
    subteam: "General",
    tags: ["Dean of Student Affairs"],
  },
  { personId: "mohamed-ragab", title: "Mentor", subteam: "General" },
  { personId: "omar-aman", title: "Mentor", subteam: "General" },
  { personId: "youssef-mehanna", title: "Mentor", subteam: "General" },
  { personId: "ahmed-mohamed", title: "Mentor", subteam: "General" },
  { personId: "osama-hesham", title: "Mentor", subteam: "General" },
  { personId: "belal-abo-elkheir", title: "Mentor", subteam: "General" },
  {
    personId: "aya-ashraf",
    title: ["Head", "Mentor"],
    subteam: ["General", "Media"],
  },
  { personId: "moustafa-adly", title: "Mentor", subteam: "General" },
  { personId: "fares-fathy", title: "Mentor", subteam: "General" },
  { personId: "abdelrahman-hikal", title: "Mentor", subteam: "Mechanical" },
];

// Utility: expand a season roster by pulling person info
export function getExpandedRoster(seasonId: string) {
  const season = seasons.find((s) => s.id === seasonId);
  if (!season) return [];

  return [...permanentRoster, ...season.roster].map((slot) => {
    const person = memberById[slot.personId];
    return {
      ...slot,
      // Merge in person info; UI can use these directly
      name: person?.name ?? slot.personId,
      department: person?.department ?? "",
      linkedin: person?.linkedin ?? "",
      src: person?.src ?? "",
      personTags: person?.tags ?? [],
    };
  });
}

// Optional constants to make UI easy:
export const CURRENT_SEASON_ID = "24-25";
export const ALL_SEASON_IDS = seasons.map((s) => s.id);
