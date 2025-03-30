
export interface NGO {
  id: string;
  name: string;
  regNumber: string;
  category: string;
  location: string;
  description: string;
  verified: boolean;
  trustScore: number;
  logo: string;
  coverImage: string;
  foundedYear: number;
  totalRaised: number;
  supporters: number;
  upiId: string;
  achievements: Achievement[];
  team: TeamMember[];
  gallery: string[];
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
    regNumber: "NGO123456",
    category: "Education",
    location: "Mumbai",
    description:
      "EduReach Foundation is dedicated to providing quality education to underprivileged children across India. We focus on building schools in rural areas, training teachers, and providing educational materials to students who cannot afford them.",
    verified: true,
    trustScore: 94,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=ER",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=EduReach+Foundation",
    foundedYear: 2010,
    totalRaised: 15000000,
    supporters: 25000,
    upiId: "edureachfoundation@upi",
    achievements: [
      {
        id: "erach1",
        title: "10,000 Students Educated",
        description:
          "Reached the milestone of providing education to 10,000 students in rural Maharashtra.",
        date: "2022-06-15",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "erach2",
        title: "50 Schools Built",
        description:
          "Successfully constructed 50 schools in remote villages across India.",
        date: "2021-03-10",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "erteam1",
        name: "Rajiv Sharma",
        role: "Founder & CEO",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=RS",
      },
      {
        id: "erteam2",
        name: "Anita Patel",
        role: "Education Director",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=AP",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo2",
    name: "GreenEarth Initiative",
    regNumber: "NGO789012",
    category: "Environment",
    location: "Bangalore",
    description:
      "GreenEarth Initiative works towards environmental conservation through tree plantation drives, waste management programs, and raising awareness about climate change. We believe in creating a sustainable future for all living beings.",
    verified: true,
    trustScore: 88,
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=GE",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=GreenEarth+Initiative",
    foundedYear: 2015,
    totalRaised: 8500000,
    supporters: 12000,
    upiId: "greenearthinitiative@upi",
    achievements: [
      {
        id: "geach1",
        title: "100,000 Trees Planted",
        description:
          "Successfully planted 100,000 trees across urban and rural areas in southern India.",
        date: "2023-01-20",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+1",
      },
      {
        id: "geach2",
        title: "30 Clean-up Drives",
        description:
          "Conducted 30 major clean-up drives in lakes, beaches, and public spaces.",
        date: "2022-07-05",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "geteam1",
        name: "Meera Krishnan",
        role: "Founder & Environmental Scientist",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=MK",
      },
      {
        id: "geteam2",
        name: "Arjun Reddy",
        role: "Operations Head",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=AR",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo3",
    name: "HealthCare For All",
    regNumber: "NGO345678",
    category: "Healthcare",
    location: "Delhi",
    description:
      "HealthCare For All is committed to providing medical assistance to those who cannot afford quality healthcare. We run mobile clinics, health camps, and awareness programs in rural and urban slum areas.",
    verified: true,
    trustScore: 91,
    logo: "https://placehold.co/200x200/006969/ffffff?text=HC",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=HealthCare+For+All",
    foundedYear: 2008,
    totalRaised: 20000000,
    supporters: 18000,
    upiId: "healthcareforall@upi",
    achievements: [
      {
        id: "hcach1",
        title: "500,000 Patients Treated",
        description:
          "Provided medical care to half a million patients through our various programs.",
        date: "2023-04-10",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+1",
      },
      {
        id: "hcach2",
        title: "200 Health Camps",
        description:
          "Organized 200 health camps in remote villages and urban slums.",
        date: "2022-11-15",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "hcteam1",
        name: "Dr. Sunil Verma",
        role: "Founder & Medical Director",
        image: "https://placehold.co/300x300/006969/ffffff?text=SV",
      },
      {
        id: "hcteam2",
        name: "Dr. Priya Singh",
        role: "Chief Medical Officer",
        image: "https://placehold.co/300x300/006969/ffffff?text=PS",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo4",
    name: "Animal Rescue Network",
    regNumber: "NGO901234",
    category: "Animal Welfare",
    location: "Jaipur",
    description:
      "Animal Rescue Network is dedicated to rescuing, rehabilitating, and rehoming abandoned and injured animals. We also work towards creating awareness about animal rights and welfare.",
    verified: true,
    trustScore: 86,
    logo: "https://placehold.co/200x200/004646/ffffff?text=AR",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Animal+Rescue+Network",
    foundedYear: 2012,
    totalRaised: 6000000,
    supporters: 8500,
    upiId: "animalrescuenetwork@upi",
    achievements: [
      {
        id: "arach1",
        title: "5,000 Animals Rescued",
        description:
          "Successfully rescued and rehabilitated 5,000 animals from various situations.",
        date: "2023-02-28",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+1",
      },
      {
        id: "arach2",
        title: "3 Animal Shelters Built",
        description:
          "Established 3 well-equipped animal shelters across Rajasthan.",
        date: "2021-09-12",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "arteam1",
        name: "Vikram Choudhary",
        role: "Founder & Director",
        image: "https://placehold.co/300x300/004646/ffffff?text=VC",
      },
      {
        id: "arteam2",
        name: "Dr. Ritu Chauhan",
        role: "Chief Veterinarian",
        image: "https://placehold.co/300x300/004646/ffffff?text=RC",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo5",
    name: "Hope for Children",
    regNumber: "NGO567890",
    category: "Children",
    location: "Chennai",
    description:
      "Hope for Children works towards providing a better future for orphaned and underprivileged children through education, healthcare, and overall development. We believe every child deserves a chance to thrive.",
    verified: true,
    trustScore: 93,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=HC",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Hope+for+Children",
    foundedYear: 2007,
    totalRaised: 12000000,
    supporters: 16000,
    upiId: "hopeforchildren@upi",
    achievements: [
      {
        id: "hfcach1",
        title: "3,000 Children Supported",
        description:
          "Provided comprehensive support to 3,000 orphaned and underprivileged children.",
        date: "2022-12-10",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "hfcach2",
        title: "15 Children's Homes",
        description:
          "Established and run 15 children's homes across Tamil Nadu.",
        date: "2021-05-20",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "hfcteam1",
        name: "Lakshmi Venkatesh",
        role: "Founder & President",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=LV",
      },
      {
        id: "hfcteam2",
        name: "Raj Kumar",
        role: "Child Development Specialist",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=RK",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo6",
    name: "Women's Empowerment Collective",
    regNumber: "NGO234567",
    category: "Women Empowerment",
    location: "Kolkata",
    description:
      "Women's Empowerment Collective is dedicated to uplifting women through skill development, education, and entrepreneurship opportunities. We strive to create a society where women have equal rights and opportunities.",
    verified: true,
    trustScore: 89,
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=WE",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Women's+Empowerment+Collective",
    foundedYear: 2011,
    totalRaised: 9000000,
    supporters: 11000,
    upiId: "womensempowerment@upi",
    achievements: [
      {
        id: "weach1",
        title: "8,000 Women Trained",
        description:
          "Provided vocational training to 8,000 women to help them become financially independent.",
        date: "2023-03-08",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+1",
      },
      {
        id: "weach2",
        title: "500 Businesses Started",
        description:
          "Facilitated the start of 500 women-led small businesses through micro-loans and mentorship.",
        date: "2022-09-15",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "weteam1",
        name: "Sneha Banerjee",
        role: "Founder & Executive Director",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=SB",
      },
      {
        id: "weteam2",
        name: "Tanya Mukherjee",
        role: "Program Director",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=TM",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
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
