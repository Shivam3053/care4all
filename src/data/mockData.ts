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
  // EduReach Foundation
  {
    id: "ngo1",
    name: "EduReach Foundation",
    description:
      "EduReach Foundation is dedicated to providing quality education to underprivileged children across India. We focus on building schools in rural areas, training teachers, and providing educational materials to students who cannot afford them.",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=facearea&w=200&h=200&facepad=2&q=80", // smiling teacher face
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
  // GreenEarth Initiative
  {
    id: "ngo2",
    name: "GreenEarth Initiative",
    description:
      "GreenEarth Initiative works towards environmental conservation through tree plantation drives, waste management programs, and raising awareness about climate change. We believe in creating a sustainable future for all living beings.",
    logo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=200&h=200&q=80", // earth/environment logo
    coverImage: "https://images.unsplash.com/photo-1465101178521-c1a478c1505d?auto=format&fit=crop&w=1200&q=80", // forest/trees
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
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Environment",
    location: "Delhi",
  },
  // HealthCare For All
  {
    id: "ngo3",
    name: "HealthCare For All",
    description:
      "HealthCare For All is committed to providing medical assistance to those who cannot afford quality healthcare. We run mobile clinics, health camps, and awareness programs in rural and urban slum areas.",
    logo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Healthcare",
    location: "Delhi",
  },
  // Animal Rescue Network
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
  },
  {
    id: "ngo9",
    name: "Disaster Relief Corps",
    description:
      "Disaster Relief Corps is dedicated to providing immediate assistance and long-term rehabilitation support to communities affected by natural disasters. We focus on emergency response, shelter, food, medical aid, and rebuilding efforts.",
    logo: "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2005,
    totalRaised: 25000000,
    supporters: 30000,
    verified: true,
    trustScore: 95,
    regNumber: "NGO890123",
    upiId: "disasterreliefcorps@upi",
    phone: "6666666666",
    email: "disasterreliefcorps@example.com",
    website: "www.disasterreliefcorps.com",
    team: [
      {
        id: "drteam1",
        name: "Karthik Reddy",
        role: "Founder & Emergency Response Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "drteam2",
        name: "Sarita Kumari",
        role: "Logistics & Relief Coordinator",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "drach1",
        title: "25 Major Disaster Responses",
        description:
          "Successfully responded to 25 major natural disasters across India and South Asia.",
        date: "2023-07-28",
        image: "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "drach2",
        title: "100,000 People Assisted",
        description:
          "Provided emergency relief to over 100,000 people affected by disasters.",
        date: "2022-10-05",
        image: "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Disaster Relief",
    location: "Delhi",
  },
  {
    id: "ngo10",
    name: "Poverty Alleviation Trust",
    description:
      "Poverty Alleviation Trust works towards eradicating poverty through sustainable livelihood programs, microfinance initiatives, skill training, and community development. We believe in empowering communities to break the cycle of poverty.",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2010,
    totalRaised: 14000000,
    supporters: 17500,
    verified: true,
    trustScore: 88,
    regNumber: "NGO901234",
    upiId: "povertyalleviation@upi",
    phone: "7777777777",
    email: "povertyalleviation@example.com",
    website: "www.povertyalleviation.com",
    team: [
      {
        id: "pateam1",
        name: "Amar Singh",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "pateam2",
        name: "Nisha Sharma",
        role: "Microfinance Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "paach1",
        title: "10,000 Livelihoods Created",
        description:
          "Helped create sustainable livelihoods for 10,000 individuals from marginalized communities.",
        date: "2023-01-15",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "paach2",
        title: "2,000 Microenterprises",
        description:
          "Supported the establishment of 2,000 microenterprises through training and financial assistance.",
        date: "2022-06-30",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Poverty Alleviation",
    location: "Delhi",
  },
  {
    id: "ngo11",
    name: "Digital Education Initiative",
    description:
      "Digital Education Initiative aims to bridge the digital divide by providing technology education and resources to underprivileged students. We focus on computer literacy, coding skills, and digital resource access in rural and urban schools.",
    logo: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2014,
    totalRaised: 8000000,
    supporters: 10000,
    verified: true,
    trustScore: 91,
    regNumber: "NGO112233",
    upiId: "digitaleducation@upi",
    phone: "8888888888",
    email: "digitaleducation@example.com",
    website: "www.digitaleducation.com",
    team: [
      {
        id: "deteam1",
        name: "Rajesh Kumar",
        role: "Founder & Technology Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "deteam2",
        name: "Ananya Gupta",
        role: "Education Program Head",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "deach1",
        title: "100 Digital Labs Established",
        description:
          "Set up 100 computer labs in schools serving underprivileged communities.",
        date: "2022-11-12",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "deach2",
        title: "15,000 Students Trained",
        description:
          "Provided digital literacy and coding training to 15,000 students.",
        date: "2021-08-25",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Digital Education",
    location: "Delhi",
  },
  {
    id: "ngo12",
    name: "Clean Water Foundation",
    description:
      "Clean Water Foundation is committed to providing access to clean and safe drinking water in water-scarce regions. We focus on water purification systems, rainwater harvesting, and hygiene education to prevent waterborne diseases.",
    logo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2011,
    totalRaised: 13000000,
    supporters: 16000,
    verified: true,
    trustScore: 92,
    regNumber: "NGO445566",
    upiId: "cleanwaterfoundation@upi",
    phone: "9999999999",
    email: "cleanwaterfoundation@example.com",
    website: "www.cleanwaterfoundation.com",
    team: [
      {
        id: "cwteam1",
        name: "Vishal Patil",
        role: "Founder & Executive Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "cwteam2",
        name: "Dr. Sunita Rao",
        role: "Water Quality Specialist",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "cwach1",
        title: "500 Water Purification Systems",
        description:
          "Installed 500 water purification systems in villages and schools.",
        date: "2023-02-10",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "cwach2",
        title: "250,000 People with Clean Water",
        description:
          "Provided clean drinking water access to 250,000 people in water-scarce regions.",
        date: "2022-05-05",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Clean Water",
    location: "Delhi",
  },
  {
    id: "ngo13",
    name: "Reforestation Alliance",
    description:
      "Reforestation Alliance is dedicated to restoring forest ecosystems through tree planting, conservation, and community participation. We work to combat deforestation, protect biodiversity, and mitigate climate change impacts.",
    logo: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2012,
    totalRaised: 9500000,
    supporters: 12500,
    verified: true,
    trustScore: 89,
    regNumber: "NGO778899",
    upiId: "reforestationalliance@upi",
    phone: "1010101010",
    email: "reforestationalliance@example.com",
    website: "www.reforestationalliance.com",
    team: [
      {
        id: "rateam1",
        name: "Arun Joshi",
        role: "Founder & Conservation Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "rateam2",
        name: "Deepa Rawat",
        role: "Community Outreach Head",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "raach1",
        title: "1 Million Trees Planted",
        description:
          "Successfully planted and nurtured 1 million trees across the Himalayan foothills.",
        date: "2023-06-05",
        image: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "raach2",
        title: "5,000 Hectares Restored",
        description:
          "Restored 5,000 hectares of degraded forest land through sustainable practices.",
        date: "2021-12-10",
        image: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Reforestation",
    location: "Delhi",
  },
  {
    id: "ngo14",
    name: "Street Animal Rescue",
    description:
      "Street Animal Rescue is committed to helping stray animals through rescue operations, medical care, sterilization programs, and adoption services. We believe in creating a compassionate society for all living beings.",
    logo: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2013,
    totalRaised: 4500000,
    supporters: 8000,
    verified: true,
    trustScore: 87,
    regNumber: "NGO334455",
    upiId: "streetanimalrescue@upi",
    phone: "1111111111",
    email: "streetanimalrescue@example.com",
    website: "www.streetanimalrescue.com",
    team: [
      {
        id: "sateam1",
        name: "Kavita Patel",
        role: "Founder & Animal Welfare Activist",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "sateam2",
        name: "Dr. Nikhil Shah",
        role: "Chief Veterinarian",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "saach1",
        title: "10,000 Animals Rescued",
        description:
          "Successfully rescued and provided care to 10,000 stray animals in urban areas.",
        date: "2022-09-22",
        image: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "saach2",
        title: "5,000 Sterilizations",
        description:
          "Conducted 5,000 animal sterilizations to control stray population humanely.",
        date: "2021-07-15",
        image: "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518715308788-300575fab5be?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Street Animal Rescue",
    location: "Delhi",
  },
  {
    id: "ngo15",
    name: "Rural Health Connect",
    description:
      "Rural Health Connect bridges the healthcare gap in remote villages through mobile clinics, telemedicine, and health worker training. We focus on preventive care, maternal health, and managing chronic diseases in underserved areas.",
    logo: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2008,
    totalRaised: 16000000,
    supporters: 19000,
    verified: true,
    trustScore: 93,
    regNumber: "NGO667788",
    upiId: "ruralhealthconnect@upi",
    phone: "1212121212",
    email: "ruralhealthconnect@example.com",
    website: "www.ruralhealthconnect.com",
    team: [
      {
        id: "rhteam1",
        name: "Dr. Alok Mishra",
        role: "Founder & Medical Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "rhteam2",
        name: "Reena Singh",
        role: "Rural Outreach Coordinator",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "rhach1",
        title: "50 Mobile Clinics",
        description:
          "Deployed 50 mobile healthcare clinics serving remote villages in Uttar Pradesh.",
        date: "2023-03-18",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rhach2",
        title: "300,000 Patients Treated",
        description:
          "Provided medical care to 300,000 patients in rural areas with limited healthcare access.",
        date: "2022-01-25",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Rural Health",
    location: "Delhi",
  },
  {
    id: "ngo16",
    name: "Child Rights Foundation",
    description:
      "Child Rights Foundation works to protect children from abuse, exploitation, and trafficking. We focus on rescue operations, rehabilitation, education, and advocacy for stronger child protection laws and awareness.",
    logo: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2007,
    totalRaised: 18000000,
    supporters: 22000,
    verified: true,
    trustScore: 95,
    regNumber: "NGO998877",
    upiId: "childrightsfoundation@upi",
    phone: "1313131313",
    email: "childrightsfoundation@example.com",
    website: "www.childrightsfoundation.com",
    team: [
      {
        id: "crteam1",
        name: "Sonali Mukherjee",
        role: "Founder & Child Rights Activist",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "crteam2",
        name: "Ravi Ghosh",
        role: "Rescue Operations Head",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "crach1",
        title: "2,000 Children Rescued",
        description:
          "Successfully rescued 2,000 children from trafficking, labor, and abusive situations.",
        date: "2023-08-12",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "crach2",
        title: "10 Child-Friendly Villages",
        description:
          "Developed 10 model child-friendly villages with comprehensive protection mechanisms.",
        date: "2022-03-20",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Child Rights",
    location: "Delhi",
  },
  {
    id: "ngo17",
    name: "Women's Legal Aid",
    description:
      "Women's Legal Aid provides free legal assistance, counseling, and support to women facing domestic violence, discrimination, and injustice. We work to empower women through legal awareness and advocacy for gender equality.",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2009,
    totalRaised: 7500000,
    supporters: 9500,
    verified: true,
    trustScore: 91,
    regNumber: "NGO223344",
    upiId: "womenslegalaid@upi",
    phone: "1414141414",
    email: "womenslegalaid@example.com",
    website: "www.womenslegalaid.com",
    team: [
      {
        id: "wlteam1",
        name: "Adv. Seema Verma",
        role: "Founder & Legal Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "wlteam2",
        name: "Adv. Farhan Ahmed",
        role: "Senior Legal Counsel",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "wlach1",
        title: "5,000 Cases Supported",
        description:
          "Provided legal assistance in 5,000 cases of women facing violence and discrimination.",
        date: "2023-04-25",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "wlach2",
        title: "100 Legal Awareness Camps",
        description:
          "Conducted 100 legal awareness camps in urban slums and rural communities.",
        date: "2022-07-08",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Women's Legal Aid",
    location: "Delhi",
  },
  {
    id: "ngo18",
    name: "Skill Development Hub",
    description:
      "Skill Development Hub focuses on equipping unemployed youth with market-relevant skills through vocational training, apprenticeships, and job placement support. We bridge the gap between education and employment needs.",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2012,
    totalRaised: 6800000,
    supporters: 8900,
    verified: true,
    trustScore: 88,
    regNumber: "NGO556677",
    upiId: "skilldevelopment@upi",
    phone: "1515151515",
    email: "skilldevelopment@example.com",
    website: "www.skilldevelopment.com",
    team: [
      {
        id: "sdteam1",
        name: "Avinash Tiwari",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "sdteam2",
        name: "Meenakshi Iyer",
        role: "Training & Placement Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "sdach1",
        title: "12,000 Youth Trained",
        description:
          "Provided vocational training to 12,000 unemployed youth from underserved backgrounds.",
        date: "2022-10-15",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "sdach2",
        title: "75% Placement Rate",
        description:
          "Achieved 75% job placement rate for our training program graduates.",
        date: "2021-06-22",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Skill Development",
    location: "Delhi",
  },
  {
    id: "ngo19",
    name: "Sustainable Villages Project",
    description:
      "Sustainable Villages Project works to transform rural communities through integrated development approaches focusing on agriculture, water management, renewable energy, education, and healthcare. We create model villages that are self-reliant and environmentally sustainable.",
    logo: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2011,
    totalRaised: 12500000,
    supporters: 15000,
    verified: true,
    trustScore: 92,
    regNumber: "NGO112233",
    upiId: "sustainablevillages@upi",
    phone: "1616161616",
    email: "sustainablevillages@example.com",
    website: "www.sustainablevillages.com",
    team: [
      {
        id: "svteam1",
        name: "Narendra Patel",
        role: "Founder & Rural Development Expert",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "svteam2",
        name: "Leela Modi",
        role: "Sustainable Agriculture Head",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "svach1",
        title: "25 Model Villages",
        description:
          "Developed 25 model villages with integrated sustainability practices across Gujarat.",
        date: "2023-02-28",
        image: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "svach2",
        title: "50 Solar Microgrids",
        description:
          "Installed 50 solar microgrids providing clean energy to off-grid rural communities.",
        date: "2022-05-12",
        image: "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101177527-4892b0e05efc?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Sustainable Villages",
    location: "Delhi",
  },
  {
    id: "ngo20",
    name: "Mental Health Alliance",
    description:
      "Mental Health Alliance is dedicated to improving mental health awareness, providing counseling services, and reducing stigma. We work through helplines, therapy sessions, awareness campaigns, and training programs for communities.",
    logo: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2013,
    totalRaised: 5800000,
    supporters: 7800,
    verified: true,
    trustScore: 89,
    regNumber: "NGO889977",
    upiId: "mentalhealthalliance@upi",
    phone: "1717171717",
    email: "mentalhealthalliance@example.com",
    website: "www.mentalhealthalliance.com",
    team: [
      {
        id: "mhteam1",
        name: "Dr. Rohini Nair",
        role: "Founder & Clinical Psychologist",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "mhteam2",
        name: "Dr. Vikram Seth",
        role: "Psychiatrist & Program Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "mhach1",
        title: "24/7 Helpline Service",
        description:
          "Established a 24/7 mental health helpline that has assisted over 50,000 individuals.",
        date: "2022-12-05",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mhach2",
        title: "1,000 Mental Health Workshops",
        description:
          "Conducted 1,000 mental health awareness workshops in schools, colleges, and corporate offices.",
        date: "2021-10-10",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Mental Health",
    location: "Delhi",
  },
  {
    id: "ngo21",
    name: "Senior Citizens Welfare Trust",
    description:
      "Senior Citizens Welfare Trust is dedicated to providing care, companionship, and support services to the elderly. We operate retirement homes, day care centers, medical assistance programs, and social engagement activities to ensure dignified aging.",
    logo: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2010,
    totalRaised: 7200000,
    supporters: 9200,
    verified: true,
    trustScore: 90,
    regNumber: "NGO445566",
    upiId: "seniorcitizenstrust@upi",
    phone: "1818181818",
    email: "seniorcitizenstrust@example.com",
    website: "www.seniorcitizenstrust.com",
    team: [
      {
        id: "scteam1",
        name: "V. Subramanian",
        role: "Founder & Chairman",
        image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=facearea&w=300&h=300&q=80"
      },
      {
        id: "scteam2",
        name: "Dr. Lakshmi Raman",
        role: "Geriatric Care Specialist",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80"
      },
    ],
    achievements: [
      {
        id: "scach1",
        title: "10 Elder Care Homes",
        description:
          "Established and manage 10 elder care homes providing residence to 500 senior citizens.",
        date: "2023-01-08",
        image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "scach2",
        title: "Free Healthcare for 3,000 Seniors",
        description:
          "Provided free healthcare services to 3,000 elderly people through our medical camps.",
        date: "2022-04-15",
        image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80"
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Senior Citizens",
    location: "Delhi",
  },
];

export function getNGOs() {
  return mockNGOs;
}

export function getNGOById(id: string) {
  return mockNGOs.find((ngo) => ngo.id === id);
}

export function getNGOsByCategory(category: string) {
  if (category === "All") return mockNGOs;
  return mockNGOs.filter((ngo) => ngo.category === category);
}

export function getNGOsByLocation(location: string) {
  if (location === "All") return mockNGOs;
  return mockNGOs.filter((ngo) => ngo.location === location);
}

export function getVerifiedNGOs() {
  return mockNGOs.filter((ngo) => ngo.verified);
}

export function getFeaturedNGOs(limit = 3) {
  return mockNGOs
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, limit);
}
