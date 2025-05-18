
export interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface Bull {
  id: string;
  name: string;
  breed: string;
  dateOfBirth: string;
  sireName: string;
  damName: string;
  geneticMerit: {
    fatPercentage: number;
    proteinPercentage: number;
    cellCount: number;
    fertilityIndex: number;
    calvingEase: string;
  };
  healthStatus: string;
  location: string;
  owner: string;
  notes: string;
  imageUrl: string;
  imageHint: string;
}

export const tools: Tool[] = [
  {
    id: "1",
    name: "Heavy Duty Tractor",
    description: "Powerful tractor for large-scale farming operations and heavy tillage.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "tractor agriculture",
  },
  {
    id: "2",
    name: "Precision Seeder",
    description: "Advanced seeder for accurate and efficient planting of various crops.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "seeder farming",
  },
  {
    id: "3",
    name: "Automated Irrigation System",
    description: "Smart irrigation system to optimize water usage and ensure crop health.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "irrigation system",
  },
  {
    id: "4",
    name: "Crop Sprayer",
    description: "Versatile sprayer for applying fertilizers, pesticides, and herbicides.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "crop sprayer",
  },
  {
    id: "5",
    name: "Combine Harvester",
    description: "High-capacity harvester for efficient grain and crop collection.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "combine harvester",
  },
  {
    id: "6",
    name: "Livestock Feed Mixer",
    description: "Durable mixer for preparing balanced and nutritious feed for livestock.",
    imageUrl: "https://placehold.co/300x200.png",
    imageHint: "feed mixer",
  },
];

export const bulls: Bull[] = [
  {
    id: "B001",
    name: "Maximus",
    breed: "Angus",
    dateOfBirth: "2020-03-15",
    sireName: "Titan",
    damName: "Bella",
    geneticMerit: {
      fatPercentage: 4.2,
      proteinPercentage: 3.5,
      cellCount: 150000,
      fertilityIndex: 105,
      calvingEase: "Easy",
    },
    healthStatus: "Excellent",
    location: "Green Valley Ranch",
    owner: "John Doe",
    notes: "Top performer in recent evaluations. Excellent temperament.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "angus bull",
  },
  {
    id: "B002",
    name: "Hercules",
    breed: "Hereford",
    dateOfBirth: "2019-07-22",
    sireName: "Zeus",
    damName: "Daisy",
    geneticMerit: {
      fatPercentage: 3.9,
      proteinPercentage: 3.2,
      cellCount: 180000,
      fertilityIndex: 102,
      calvingEase: "Very Easy",
    },
    healthStatus: "Good",
    location: "Sunset Farms",
    owner: "Jane Smith",
    notes: "Known for docility and good maternal traits in offspring.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "hereford bull",
  },
  {
    id: "B003",
    name: "Thunder",
    breed: "Simmental",
    dateOfBirth: "2021-01-10",
    sireName: "Storm",
    damName: "Luna",
    geneticMerit: {
      fatPercentage: 4.5,
      proteinPercentage: 3.8,
      cellCount: 120000,
      fertilityIndex: 110,
      calvingEase: "Moderate",
    },
    healthStatus: "Excellent",
    location: "Highland Pastures",
    owner: "Robert Brown",
    notes: "Rapid growth rate and high milk production in daughters.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "simmental bull",
  },
  {
    id: "B004",
    name: "Rocky",
    breed: "Charolais",
    dateOfBirth: "2020-11-05",
    sireName: "Boulder",
    damName: "Gemma",
    geneticMerit: {
      fatPercentage: 3.8,
      proteinPercentage: 3.3,
      cellCount: 200000,
      fertilityIndex: 98,
      calvingEase: "Easy",
    },
    healthStatus: "Good",
    location: "Rocky Ridge Ranch",
    owner: "Emily White",
    notes: "Produces heavily muscled calves. Suitable for crossbreeding.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "charolais bull",
  },
  {
    id: "B005",
    name: "Spike",
    breed: "Limousin",
    dateOfBirth: "2022-02-20",
    sireName: "Blade",
    damName: "Ruby",
    geneticMerit: {
      fatPercentage: 4.0,
      proteinPercentage: 3.6,
      cellCount: 160000,
      fertilityIndex: 108,
      calvingEase: "Very Easy",
    },
    healthStatus: "Excellent",
    location: "Valley View Farms",
    owner: "Michael Green",
    notes: "High feed conversion efficiency and lean meat yield.",
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "limousin bull",
  },
];

export const getBullById = (id: string): Bull | undefined => {
  return bulls.find(bull => bull.id === id);
};
