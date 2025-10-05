export type SubteamKey =
  | "General"
  | "Computer Vision"
  | "Control"
  | "Web Dev"
  | "Electrical"
  | "Mechanical"
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
  "Computer Vision": {
    key: "Computer Vision",
    title: "Computer Vision",
    description:
      "Develops and deploys the drone’s perception systems. Builds datasets, annotates mission targets, and trains detection and tracking models such as YOLO and other deep-learning architectures. Optimizes deep learning models for real-time inference on edge hardware. Validates models through controlled and field testing under varied lighting and environmental conditions. Integrates vision-based detection with navigation pipelines for autonomous target pursuit and mission execution. Continuously refines algorithms for robustness, accuracy, and real-world reliability.",
  },
  Control: {
    key: "Control",
    title: "Control",
    description:
      "Implements and validates all flight control and autonomous navigation systems. Integrates flight controllers, GPS, sensors, and telemetry to ensure stability, safety, and responsiveness. Tunes and tests control algorithms such as PID. Simulates full missions in SITL and Gazebo before real-world deployment to reduce risk. Designs and executes autonomous missions with waypoint navigation, obstacle avoidance, and failsafe recovery. Coordinates closely with the Computer Vision subteam to merge perception outputs with flight decision logic.",
  },
  "Web Dev": {
    key: "Web Dev",
    title: "Web Dev",
    description:
      "Develops and maintains the team’s website. Handles layout, responsiveness, and content updates. Ensures that all pages remain functional, consistent, and up to date with current team information. Manages deployment and version control to keep the site stable and accessible.",
  },
  Electrical: {
    key: "Electrical",
    title: "Electrical",
    description:
      "Designs and integrates the drone’s electrical systems, including power distribution, ESCs, wiring harnesses, and onboard electronics. Responsible for PCB design, EMI mitigation, and thorough bench testing of all components before integration",
  },
  Mechanical: {
    key: "Mechanical",
    title: "Mechanical",
    description:
      "The mechanical sub-team is responsible for creating the physical structure of the drones. This includes designing the aircraft in CAD, performing simulations to test structural strength and aerodynamics, selecting materials that are lightweight, strong, and cost-effective, manufacturing components using CNC machining, 3D printing, and composite fabrication, and assembling all parts into a complete drone.",
  },
  Media: {
    key: "Media",
    title: "Media",
    description:
      "Tells the team’s story. Handles branding, video, socials, documentation, and event visuals to showcase our engineering and results.",
  },
};
