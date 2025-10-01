import AdvComponentsImg from "$lib/assets/imgs/adv-components.webp";
import DroneSimImg from "$lib/assets/imgs/drone-sim.jpeg";
import EngineeringImg from "$lib/assets/imgs/team-building.jpeg";

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
    alt: "A",
  },
  {
    title: "Support Manufacturing Costs",
    body: "Cover the expenses associated with prototyping, 3D printing, and material sourcing for our UAVs.",
    src: DroneSimImg,
    alt: "B",
  },
  {
    title: "Invest in the Future of Engineering",
    body: "Directly support the hands-on education of 60 aspiring engineers, preparing them to be future leaders in robotics and technology.",
    src: EngineeringImg,
    alt: "C",
  },
];

// --- Types ---
export type Sponsor = {
  name: string;
  image: string;
  alt: string;
  link: string;
  description: string;
  tier: "gold" | "silver" | "bronze" | "partner";
};

export type SponsorSection = {
  sectionTitle: string;
  sponsors: Sponsor[];
};

// Sponsors
export const sponsorSections: SponsorSection[] = [
  {
    sectionTitle: "Gold Sponsors",
    sponsors: [
      {
        name: "TechCorp",
        image: "/sponsors/techcorp.png",
        alt: "TechCorp Logo",
        link: "https://techcorp.com",
        description: "Leading provider of innovative cloud solutions.",
        tier: "gold",
      },
    ],
  },
  {
    sectionTitle: "Silver Sponsors",
    sponsors: [
      {
        name: "DataWorks",
        image: "/sponsors/dataworks.png",
        alt: "DataWorks Logo",
        link: "https://dataworks.io",
        description: "Data analytics platform for modern enterprises.",
        tier: "silver",
      },
    ],
  },
];
