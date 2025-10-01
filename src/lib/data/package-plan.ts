export interface PackagePlan {
  name: string;
  price: string;
  benefits: {
    [benefit: string]: string | number | boolean;
  };
}

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    name: "Silver Partner",
    price: "$500",
    benefits: {
      "Post on Facebook, Instagram & LinkedIn": true,
      "Distribute stickers, and pins in events": true,
      "Logo on Website & Pit Banners": true,
      "Logo On Drone": "Small",
      "Logo on Team Tshirt": "Back",
      "Social Media Mentions": 3,
    },
  },
  {
    name: "Gold Partner",
    price: "$1500",
    benefits: {
      "Post on Facebook, Instagram & LinkedIn": true,
      "Distribute stickers, and pins in events": true,
      "Logo on Website & Pit Banners": true,
      "Logo On Drone": "Medium",
      "Logo on Team Tshirt": "Chest",
      "Social Media Mentions": 8,
      "Logo on all media Posts": true,
      "Co-branded Video Content": true,
    },
  },
  {
    name: "Platinum Partner",
    price: "$3000+",
    benefits: {
      "Post on Facebook, Instagram & LinkedIn": true,
      "Distribute stickers, and pins in events": true,
      "Logo on Website & Pit Banners": true,
      "Logo On Drone": "Large",
      "Logo on Team Tshirt": "Back & Chest",
      "Social Media Mentions": "15+",
      "Logo on all media Posts": true,
      "Co-branded Video Content": true,
      "Appearance in events under sponsor’s name": true,
      "Take a special photo with Team and drone": true,
    },
  },
];
