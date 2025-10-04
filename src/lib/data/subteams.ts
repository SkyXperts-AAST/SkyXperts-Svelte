export type SubteamKey =
  | "General"
  | "Electrical"
  | "Mechanical"
  | "Computer Vision"
  | "Control"
  | "Web Dev"
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
    description:
      "Operations, admin, coordination, partnerships, and logistics.",
  },
  Electrical: {
    key: "Electrical",
    title: "Electrical",
    description:
      "Designs and integrates power distribution, ESCs, wiring harnesses, and onboard electronics. Owns PCB design, EMI mitigation, and bench testing.",
  },
  Mechanical: {
    key: "Mechanical",
    title: "Mechanical",
    description:
      "Builds frames, mounts, and payload interfaces. Optimizes weight and stiffness, runs FEA, and oversees manufacturing & assembly tolerances.",
  },
  "Computer Vision": {
    key: "Computer Vision",
    title: "Computer Vision",
    description:
      "Develops perception pipelines: detection, tracking, SLAM, and pose estimation. Curates datasets and deploys models on edge hardware.",
  },
  Control: {
    key: "Control",
    title: "Control",
    description:
      "Implements flight control, state estimation, and path planning. Tunes PID/MPC, runs simulations, and validates in HIL/SIL and flight tests.",
  },
  "Web Dev": {
    key: "Web Dev",
    title: "Web Dev",
    description:
      "Responsible for developing and maintaining the team’s website and digital platforms.",
  },
  Media: {
    key: "Media",
    title: "Media",
    description:
      "Tells the team’s story. Handles branding, video, socials, documentation, and event visuals to showcase our engineering and results.",
  },
};
