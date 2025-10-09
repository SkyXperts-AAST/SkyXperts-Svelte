import AdvComponentsImg from "$lib/assets/imgs/adv-components.webp";
import DroneSimImg from "$lib/assets/imgs/drone-sim.jpeg";
import EngineeringImg from "$lib/assets/imgs/team-building.jpeg";

//Sponsors
import AASTImg from "$lib/assets/logos/sponsors/aast.png";
import SolidWorksImg from "$lib/assets/logos/sponsors/solidworks.png";
import SimnetImg from "$lib/assets/logos/sponsors/simnet.png";

// A simple content section type (for alternating grid rows)
export type ContentSection = {
  title: string;
  body: string;
  src: string;
  alt: string;
};

// Content Sections
export const contentSections: ContentSection[] = [
  {
    title: "Acquire Advanced Components",
    body: "Purchase specialized sensors, microcontrollers, and propulsion systems crucial for developing competitive drones for international competitions.",
    src: AdvComponentsImg,
    alt: "Acquire Advanced Components Image",
  },
  {
    title: "Support Manufacturing Costs",
    body: "Cover the expenses associated with prototyping, 3D printing, and material sourcing for our UAVs.",
    src: DroneSimImg,
    alt: "Support Manufacturing Costs Image",
  },
  {
    title: "Invest in the Future of Engineering",
    body: "Directly support the hands-on education of 60 aspiring engineers, preparing them to be future leaders in robotics and technology.",
    src: EngineeringImg,
    alt: "Invest in the Future of Engineering Image",
  },
];

// --- Types ---
export type Sponsor = {
  name: string;
  image: string;
  alt: string;
  link: string;
  description: string;
  tier: "silver" | "gold" | "platinum" | "technical" | "fund" | "custom";
};

export type SponsorSection = {
  sectionTitle: string;
  sponsors: Sponsor[];
};

// Sponsors
export const sponsorSections: SponsorSection[] = [
  {
    sectionTitle: "Fund Sponsors",
    sponsors: [
      {
        name: "AAST",
        image: AASTImg,
        alt: "AAST Logo",
        link: "https://aast.edu/en/",
        description:
          "AAST had many achievements in education, training and research in the fields of maritime transport, engineering and management sciences. This is due to the methodological application of modern technology in these fields.",
        tier: "fund",
      },
    ],
  },
  {
    sectionTitle: "Technical Sponsors",
    sponsors: [
      {
        name: "Simnet",
        image: SimnetImg,
        alt: "Simnet Logo",
        link: "https://www.simnet.aero/",
        description: "Drone Design and Simulation  Powered by the Cloud.",
        tier: "technical",
      },
      {
        name: "SolidWorks",
        image: SolidWorksImg,
        alt: "SolidWorks Logo",
        link: "https://www.solidworks.com/",
        description: "The Solution for 3D CAD, Design and Product Development",
        tier: "technical",
      },
    ],
  },
  {
    sectionTitle: "Silver Sponsors",
    sponsors: [],
  },
  {
    sectionTitle: "Gold Sponsors",
    sponsors: [],
  },
  {
    sectionTitle: "Platinum Sponsors",
    sponsors: [],
  },
];
