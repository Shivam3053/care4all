
export interface NGO {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  category: string;
  location: string;
  foundedYear: number;
  totalRaised: number;
  supporters: number;
  verified: boolean;
  featured?: boolean;
  trustScore: number;
  regNumber: string;
  upiId: string;
  phone: string;
  email: string;
  website?: string;
  team: TeamMember[];
  achievements: Achievement[];
  images: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const categories = [
  "Education",
  "Healthcare",
  "Environment",
  "Animal Welfare",
  "Children",
  "Women Empowerment",
  "Elderly Care",
  "Disability Support",
  "Disaster Relief",
  "Poverty Alleviation",
];

export const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export const mockNGOs: NGO[] = [
  {
    id: "ngo1",
    name: "EduReach Foundation",
    description:
      "EduReach Foundation is dedicated to providing quality education to underprivileged children across India. We focus on building schools in rural areas, training teachers, and providing educational materials to students who cannot afford them.",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=facearea&w=200&h=200&q=80", // smiling teacher face
    coverImage: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80", // classroom/kids
    foundedYear: 2010,
    totalRaised: 15000000,
    supporters: 25000,
    verified: true,
    trustScore: 94,
    regNumber: "NGO123456",
    upiId: "edureachfoundation@upi",
    phone: "1234567890",
    email: "edureachfoundation@example.com",
    website: "www.edureachfoundation.com",
    team: [
      {
        id: "erteam1",
        name: "Rajiv Sharma",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "erteam2",
        name: "Anita Patel",
        role: "Education Director",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "erach1",
        title: "10,000 Students Educated",
        description:
          "Reached the milestone of providing education to 10,000 students in rural Maharashtra.",
        date: "2022-06-15",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "erach2",
        title: "50 Schools Built",
        description:
          "Successfully constructed 50 schools in remote villages across India.",
        date: "2021-03-10",
        image: "https://images.unsplash.com/photo-1509228627150-48d55d4c4a5b?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Education",
    location: "Delhi",
  },
  {
    id: "ngo2",
    name: "GreenEarth Initiative",
    description:
      "GreenEarth Initiative works towards environmental conservation through tree plantation drives, waste management programs, and raising awareness about climate change. We believe in creating a sustainable future for all living beings.",
    logo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=200&h=200&q=80", // symbolic earth/environment
    coverImage: "https://images.unsplash.com/photo-1465101178521-c1a478c1505d?auto=format&fit=crop&w=1200&q=80", // lush green forest/trees
    foundedYear: 2015,
    totalRaised: 8500000,
    supporters: 12000,
    verified: true,
    trustScore: 88,
    regNumber: "NGO789012",
    upiId: "greenearthinitiative@upi",
    phone: "9876543210",
    email: "greenearthinitiative@example.com",
    website: "www.greenearthinitiative.com",
    team: [
      {
        id: "geteam1",
        name: "Meera Krishnan",
        role: "Founder & Environmental Scientist",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "geteam2",
        name: "Arjun Reddy",
        role: "Operations Head",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "geach1",
        title: "100,000 Trees Planted",
        description:
          "Successfully planted 100,000 trees across urban and rural areas in southern India.",
        date: "2023-01-20",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "geach2",
        title: "30 Clean-up Drives",
        description:
          "Conducted 30 major clean-up drives in lakes, beaches, and public spaces.",
        date: "2022-07-05",
        image: "https://images.unsplash.com/photo-1465101178521-c1a478c1505d?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
    ],
    category: "Environment",
    location: "Delhi",
  },
  {
    id: "ngo3",
    name: "HealthCare For All",
    description:
      "HealthCare For All is committed to providing medical assistance to those who cannot afford quality healthcare. We run mobile clinics, health camps, and awareness programs in rural and urban slum areas.",
    logo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=200&h=200&q=80", // doctor face/medical
    coverImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80", // medical/clinic outreach
    foundedYear: 2008,
    totalRaised: 20000000,
    supporters: 18000,
    verified: true,
    trustScore: 91,
    regNumber: "NGO345678",
    upiId: "healthcareforall@upi",
    phone: "5555555555",
    email: "healthcareforall@example.com",
    website: "www.healthcareforall.com",
    team: [
      {
        id: "hcteam1",
        name: "Dr. Sunil Verma",
        role: "Founder & Medical Director",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "hcteam2",
        name: "Dr. Priya Singh",
        role: "Chief Medical Officer",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "hcach1",
        title: "500,000 Patients Treated",
        description:
          "Provided medical care to half a million patients through our various programs.",
        date: "2023-04-10",
        image: "https://images.unsplash.com/photo-1519494080410-f9aa76743b6c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "hcach2",
        title: "200 Health Camps",
        description:
          "Organized 200 health camps in remote villages and urban slums.",
        date: "2022-11-15",
        image: "https://images.unsplash.com/photo-1485841890310-6a055c88698a?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588776814546-ec7e5f1146b0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?auto=format&fit=crop&w=600&q=80"
    ],
    category: "Healthcare",
    location: "Delhi",
  },
  {
    id: "ngo4",
    name: "Animal Rescue Network",
    description:
      "Animal Rescue Network is dedicated to rescuing, rehabilitating, and rehoming abandoned and injured animals. We also work towards creating awareness about animal rights and welfare.",
    logo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2012,
    totalRaised: 6000000,
    supporters: 8500,
    verified: true,
    trustScore: 86,
    regNumber: "NGO901234",
    upiId: "animalrescuenetwork@upi",
    phone: "1111111111",
    email: "animalrescuenetwork@example.com",
    website: "www.animalrescuenetwork.com",
    team: [
      {
        id: "arteam1",
        name: "Vikram Choudhary",
        role: "Founder & Director",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "arteam2",
        name: "Dr. Ritu Chauhan",
        role: "Chief Veterinarian",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "arach1",
        title: "5,000 Animals Rescued",
        description:
          "Successfully rescued and rehabilitated 5,000 animals from various situations.",
        date: "2023-02-28",
        image: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "arach2",
        title: "3 Animal Shelters Built",
        description:
          "Established 3 well-equipped animal shelters across Rajasthan.",
        date: "2021-09-12",
        image: "https://images.unsplash.com/photo-1556520930-057131c51a46?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Animal Welfare",
    location: "Delhi",
  },
  {
    id: "ngo5",
    name: "Hope for Children",
    description:
      "Hope for Children works towards providing a better future for orphaned and underprivileged children through education, healthcare, and overall development. We believe every child deserves a chance to thrive.",
    logo: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2007,
    totalRaised: 12000000,
    supporters: 16000,
    verified: true,
    trustScore: 93,
    regNumber: "NGO567890",
    upiId: "hopeforchildren@upi",
    phone: "2222222222",
    email: "hopeforchildren@example.com",
    website: "www.hopeforchildren.com",
    team: [
      {
        id: "hfcteam1",
        name: "Lakshmi Venkatesh",
        role: "Founder & President",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "hfcteam2",
        name: "Raj Kumar",
        role: "Child Development Specialist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "hfcach1",
        title: "3,000 Children Supported",
        description:
          "Provided comprehensive support to 3,000 orphaned and underprivileged children.",
        date: "2022-12-10",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "hfcach2",
        title: "15 Children's Homes",
        description:
          "Established and run 15 children's homes across Tamil Nadu.",
        date: "2021-05-20",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Children",
    location: "Delhi",
  },
  {
    id: "ngo6",
    name: "Women's Empowerment Collective",
    description:
      "Women's Empowerment Collective is dedicated to uplifting women through skill development, education, and entrepreneurship opportunities. We strive to create a society where women have equal rights and opportunities.",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2011,
    totalRaised: 9000000,
    supporters: 11000,
    verified: true,
    trustScore: 89,
    regNumber: "NGO234567",
    upiId: "womensempowerment@upi",
    phone: "3333333333",
    email: "womensempowerment@example.com",
    website: "www.womensempowerment.com",
    team: [
      {
        id: "weteam1",
        name: "Sneha Banerjee",
        role: "Founder & Executive Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "weteam2",
        name: "Tanya Mukherjee",
        role: "Program Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "weach1",
        title: "8,000 Women Trained",
        description:
          "Provided vocational training to 8,000 women to help them become financially independent.",
        date: "2023-03-08",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "weach2",
        title: "500 Businesses Started",
        description:
          "Facilitated the start of 500 women-led small businesses through micro-loans and mentorship.",
        date: "2022-09-15",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573497019236-61e7a0258ab7?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Women Empowerment",
    location: "Delhi",
  },
  {
    id: "ngo7",
    name: "Elder Care Society",
    description:
      "Elder Care Society is dedicated to improving the quality of life for senior citizens through care programs, medical support, and social engagement activities. We strive to create a world where the elderly live with dignity and joy.",
    logo: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2013,
    totalRaised: 5500000,
    supporters: 7500,
    verified: true,
    trustScore: 87,
    regNumber: "NGO678901",
    upiId: "eldercaresociety@upi",
    phone: "4444444444",
    email: "eldercaresociety@example.com",
    website: "www.eldercaresociety.com",
    team: [
      {
        id: "ecteam1",
        name: "Prakash Joshi",
        role: "Founder & Chairman",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "ecteam2",
        name: "Dr. Maya Desai",
        role: "Medical Director",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "ecach1",
        title: "20 Elder Care Centers",
        description:
          "Established 20 elder care centers across Maharashtra to provide day care and medical support.",
        date: "2022-04-18",
        image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "ecach2",
        title: "5,000 Elderly Supported",
        description:
          "Provided comprehensive support to 5,000 elderly people through various programs.",
        date: "2021-11-30",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Elderly Care",
    location: "Delhi",
  },
  {
    id: "ngo8",
    name: "Disability Support Network",
    description:
      "Disability Support Network focuses on creating an inclusive society for people with disabilities through assistive technology, accessibility advocacy, and skill development programs. We believe in the potential of every individual.",
    logo: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2009,
    totalRaised: 11000000,
    supporters: 13500,
    verified: true,
    trustScore: 90,
    regNumber: "NGO789012",
    upiId: "disabilitysupport@upi",
    phone: "5555555555",
    email: "disabilitysupport@example.com",
    website: "www.disabilitysupport.com",
    team: [
      {
        id: "dsteam1",
        name: "Rahul Menon",
        role: "Founder & Disability Rights Activist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "dsteam2",
        name: "Priya Lakshmi",
        role: "Inclusion Program Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "dsach1",
        title: "2,000 Assistive Devices",
        description:
          "Distributed 2,000 assistive devices to people with various disabilities.",
        date: "2023-05-15",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dsach2",
        title: "50 Accessible Public Spaces",
        description:
          "Advocated for and helped implement accessibility in 50 public spaces.",
        date: "2022-08-22",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Disability Support",
    location: "Delhi",
  }
];

// Helper function to get an NGO by ID
export const getNGOById = (id: string): NGO | undefined => {
  return mockNGOs.find(ngo => ngo.id === id);
};
