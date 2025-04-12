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
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=ER",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=EduReach+Foundation",
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
        image: "https://placehold.co/300x300/00afaf/ffffff?text=RS",
      },
      {
        id: "erteam2",
        name: "Anita Patel",
        role: "Education Director",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=AP",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
    category: "Education",
    location: "Delhi",
  },
  {
    id: "ngo2",
    name: "GreenEarth Initiative",
    description:
      "GreenEarth Initiative works towards environmental conservation through tree plantation drives, waste management programs, and raising awareness about climate change. We believe in creating a sustainable future for all living beings.",
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=GE",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=GreenEarth+Initiative",
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
        image: "https://placehold.co/300x300/008c8c/ffffff?text=MK",
      },
      {
        id: "geteam2",
        name: "Arjun Reddy",
        role: "Operations Head",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=AR",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
    category: "Environment",
    location: "Delhi",
  },
  {
    id: "ngo3",
    name: "HealthCare For All",
    description:
      "HealthCare For All is committed to providing medical assistance to those who cannot afford quality healthcare. We run mobile clinics, health camps, and awareness programs in rural and urban slum areas.",
    logo: "https://placehold.co/200x200/006969/ffffff?text=HC",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=HealthCare+For+All",
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
        image: "https://placehold.co/300x300/006969/ffffff?text=SV",
      },
      {
        id: "hcteam2",
        name: "Dr. Priya Singh",
        role: "Chief Medical Officer",
        image: "https://placehold.co/300x300/006969/ffffff?text=PS",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
    category: "Healthcare",
    location: "Delhi",
  },
  {
    id: "ngo4",
    name: "Animal Rescue Network",
    description:
      "Animal Rescue Network is dedicated to rescuing, rehabilitating, and rehoming abandoned and injured animals. We also work towards creating awareness about animal rights and welfare.",
    logo: "https://placehold.co/200x200/004646/ffffff?text=AR",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Animal+Rescue+Network",
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
        image: "https://placehold.co/300x300/004646/ffffff?text=VC",
      },
      {
        id: "arteam2",
        name: "Dr. Ritu Chauhan",
        role: "Chief Veterinarian",
        image: "https://placehold.co/300x300/004646/ffffff?text=RC",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
    category: "Animal Welfare",
    location: "Delhi",
  },
  {
    id: "ngo5",
    name: "Hope for Children",
    description:
      "Hope for Children works towards providing a better future for orphaned and underprivileged children through education, healthcare, and overall development. We believe every child deserves a chance to thrive.",
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=HC",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Hope+for+Children",
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
        image: "https://placehold.co/300x300/00afaf/ffffff?text=LV",
      },
      {
        id: "hfcteam2",
        name: "Raj Kumar",
        role: "Child Development Specialist",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=RK",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
    category: "Children",
    location: "Delhi",
  },
  {
    id: "ngo6",
    name: "Women's Empowerment Collective",
    description:
      "Women's Empowerment Collective is dedicated to uplifting women through skill development, education, and entrepreneurship opportunities. We strive to create a society where women have equal rights and opportunities.",
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=WE",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Women's+Empowerment+Collective",
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
        image: "https://placehold.co/300x300/008c8c/ffffff?text=SB",
      },
      {
        id: "weteam2",
        name: "Tanya Mukherjee",
        role: "Program Director",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=TM",
      },
    ],
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
    images: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
    category: "Women Empowerment",
    location: "Delhi",
  },
  {
    id: "ngo7",
    name: "Elder Care Society",
    description:
      "Elder Care Society is dedicated to improving the quality of life for senior citizens through care programs, medical support, and social engagement activities. We strive to create a world where the elderly live with dignity and joy.",
    logo: "https://placehold.co/200x200/006969/ffffff?text=EC",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Elder+Care+Society",
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
        image: "https://placehold.co/300x300/006969/ffffff?text=PJ",
      },
      {
        id: "ecteam2",
        name: "Dr. Maya Desai",
        role: "Medical Director",
        image: "https://placehold.co/300x300/006969/ffffff?text=MD",
      },
    ],
    achievements: [
      {
        id: "ecach1",
        title: "20 Elder Care Centers",
        description:
          "Established 20 elder care centers across Maharashtra to provide day care and medical support.",
        date: "2022-04-18",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+1",
      },
      {
        id: "ecach2",
        title: "5,000 Elderly Supported",
        description:
          "Provided comprehensive support to 5,000 elderly people through various programs.",
        date: "2021-11-30",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+2",
      },
    ],
    images: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
    category: "Elderly Care",
    location: "Delhi",
  },
  {
    id: "ngo8",
    name: "Disability Support Network",
    description:
      "Disability Support Network focuses on creating an inclusive society for people with disabilities through assistive technology, accessibility advocacy, and skill development programs. We believe in the potential of every individual.",
    logo: "https://placehold.co/200x200/004646/ffffff?text=DS",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Disability+Support+Network",
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
        image: "https://placehold.co/300x300/004646/ffffff?text=RM",
      },
      {
        id: "dsteam2",
        name: "Priya Lakshmi",
        role: "Inclusion Program Director",
        image: "https://placehold.co/300x300/004646/ffffff?text=PL",
      },
    ],
    achievements: [
      {
        id: "dsach1",
        title: "2,000 Assistive Devices",
        description:
          "Distributed 2,000 assistive devices to people with various disabilities.",
        date: "2023-05-15",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+1",
      },
      {
        id: "dsach2",
        title: "50 Accessible Public Spaces",
        description:
          "Advocated for and helped implement accessibility in 50 public spaces.",
        date: "2022-08-22",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+2",
      },
    ],
    images: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
    category: "Disability Support",
    location: "Delhi",
  },
  {
    id: "ngo9",
    name: "Disaster Relief Corps",
    description:
      "Disaster Relief Corps is dedicated to providing immediate assistance and long-term rehabilitation support to communities affected by natural disasters. We focus on emergency response, shelter, food, medical aid, and rebuilding efforts.",
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=DR",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Disaster+Relief+Corps",
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
        image: "https://placehold.co/300x300/00afaf/ffffff?text=KR",
      },
      {
        id: "drteam2",
        name: "Sarita Kumari",
        role: "Logistics & Relief Coordinator",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=SK",
      },
    ],
    achievements: [
      {
        id: "drach1",
        title: "25 Major Disaster Responses",
        description:
          "Successfully responded to 25 major natural disasters across India and South Asia.",
        date: "2023-07-28",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "drach2",
        title: "100,000 People Assisted",
        description:
          "Provided emergency relief to over 100,000 people affected by disasters.",
        date: "2022-10-05",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    images: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
    category: "Disaster Relief",
    location: "Delhi",
  },
  {
    id: "ngo10",
    name: "Poverty Alleviation Trust",
    description:
      "Poverty Alleviation Trust works towards eradicating poverty through sustainable livelihood programs, microfinance initiatives, skill training, and community development. We believe in empowering communities to break the cycle of poverty.",
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=PA",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Poverty+Alleviation+Trust",
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
        image: "https://placehold.co/300x300/008c8c/ffffff?text=AS",
      },
      {
        id: "pateam2",
        name: "Nisha Sharma",
        role: "Microfinance Director",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=NS",
      },
    ],
    achievements: [
      {
        id: "paach1",
        title: "10,000 Livelihoods Created",
        description:
          "Helped create sustainable livelihoods for 10,000 individuals from marginalized communities.",
        date: "2023-01-15",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+1",
      },
      {
        id: "paach2",
        title: "2,000 Microenterprises",
        description:
          "Supported the establishment of 2,000 microenterprises through training and financial assistance.",
        date: "2022-06-30",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+2",
      },
    ],
    images: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
    category: "Poverty Alleviation",
    location: "Delhi",
  },
  {
    id: "ngo11",
    name: "Digital Education Initiative",
    description:
      "Digital Education Initiative aims to bridge the digital divide by providing technology education and resources to underprivileged students. We focus on computer literacy, coding skills, and digital resource access in rural and urban schools.",
    logo: "https://placehold.co/200x200/006969/ffffff?text=DE",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Digital+Education+Initiative",
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
        image: "https://placehold.co/300x300/006969/ffffff?text=RK",
      },
      {
        id: "deteam2",
        name: "Ananya Gupta",
        role: "Education Program Head",
        image: "https://placehold.co/300x300/006969/ffffff?text=AG",
      },
    ],
    achievements: [
      {
        id: "deach1",
        title: "100 Digital Labs Established",
        description:
          "Set up 100 computer labs in schools serving underprivileged communities.",
        date: "2022-11-12",
        image: "https://placehold.co/600x400/00
