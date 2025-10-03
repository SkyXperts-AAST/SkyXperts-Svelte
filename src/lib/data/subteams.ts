export type SubteamKey =
  | "General"
  | "Electrical"
  | "Mechanical"
  | "Computer Vision"
  | "Control"
  | "Media";

export type SubteamMeta = {
  key: SubteamKey;
  title: string;
  description: string;
};

export const SUBTEAM_CATALOG: Record<SubteamKey, SubteamMeta> = {
  General: {
    key: "General",
    title: "General",
    description: "Ops, admin, coordination.",
  },
  Electrical: {
    key: "Electrical",
    title: "Electrical",
    description: "Power, boards, wiring.",
  },
  Mechanical: {
    key: "Mechanical",
    title: "Mechanical",
    description: "Design, CAD, fabrication.",
  },
  "Computer Vision": {
    key: "Computer Vision",
    title: "Computer Vision",
    description: "Perception & ML.",
  },
  Control: {
    key: "Control",
    title: "Control",
    description: "Control algorithms & firmware.",
  },
  Media: {
    key: "Media",
    title: "Media",
    description: "Brand, social, content.",
  },
};
