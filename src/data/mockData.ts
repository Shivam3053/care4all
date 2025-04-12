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
  {
    id: "ngo7",
    name: "Elder Care Society",
    regNumber: "NGO678901",
    category: "Elderly Care",
    location: "Pune",
    description:
      "Elder Care Society is dedicated to improving the quality of life for senior citizens through care programs, medical support, and social engagement activities. We strive to create a world where the elderly live with dignity and joy.",
    verified: true,
    trustScore: 87,
    logo: "https://placehold.co/200x200/006969/ffffff?text=EC",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Elder+Care+Society",
    foundedYear: 2013,
    totalRaised: 5500000,
    supporters: 7500,
    upiId: "eldercaresociety@upi",
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
    gallery: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo8",
    name: "Disability Support Network",
    regNumber: "NGO789012",
    category: "Disability Support",
    location: "Chennai",
    description:
      "Disability Support Network focuses on creating an inclusive society for people with disabilities through assistive technology, accessibility advocacy, and skill development programs. We believe in the potential of every individual.",
    verified: true,
    trustScore: 90,
    logo: "https://placehold.co/200x200/004646/ffffff?text=DS",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Disability+Support+Network",
    foundedYear: 2009,
    totalRaised: 11000000,
    supporters: 13500,
    upiId: "disabilitysupport@upi",
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
    gallery: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo9",
    name: "Disaster Relief Corps",
    regNumber: "NGO890123",
    category: "Disaster Relief",
    location: "Hyderabad",
    description:
      "Disaster Relief Corps is dedicated to providing immediate assistance and long-term rehabilitation support to communities affected by natural disasters. We focus on emergency response, shelter, food, medical aid, and rebuilding efforts.",
    verified: true,
    trustScore: 95,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=DR",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Disaster+Relief+Corps",
    foundedYear: 2005,
    totalRaised: 25000000,
    supporters: 30000,
    upiId: "disasterreliefcorps@upi",
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
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo10",
    name: "Poverty Alleviation Trust",
    regNumber: "NGO901234",
    category: "Poverty Alleviation",
    location: "Delhi",
    description:
      "Poverty Alleviation Trust works towards eradicating poverty through sustainable livelihood programs, microfinance initiatives, skill training, and community development. We believe in empowering communities to break the cycle of poverty.",
    verified: true,
    trustScore: 88,
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=PA",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Poverty+Alleviation+Trust",
    foundedYear: 2010,
    totalRaised: 14000000,
    supporters: 17500,
    upiId: "povertyalleviation@upi",
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
    gallery: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo11",
    name: "Digital Education Initiative",
    regNumber: "NGO112233",
    category: "Education",
    location: "Bangalore",
    description:
      "Digital Education Initiative aims to bridge the digital divide by providing technology education and resources to underprivileged students. We focus on computer literacy, coding skills, and digital resource access in rural and urban schools.",
    verified: true,
    trustScore: 91,
    logo: "https://placehold.co/200x200/006969/ffffff?text=DE",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Digital+Education+Initiative",
    foundedYear: 2014,
    totalRaised: 8000000,
    supporters: 10000,
    upiId: "digitaleducation@upi",
    achievements: [
      {
        id: "deach1",
        title: "100 Digital Labs Established",
        description:
          "Set up 100 computer labs in schools serving underprivileged communities.",
        date: "2022-11-12",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+1",
      },
      {
        id: "deach2",
        title: "15,000 Students Trained",
        description:
          "Provided digital literacy and coding training to 15,000 students.",
        date: "2021-08-25",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+2",
      },
    ],
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
    gallery: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo12",
    name: "Clean Water Foundation",
    regNumber: "NGO445566",
    category: "Healthcare",
    location: "Mumbai",
    description:
      "Clean Water Foundation is committed to providing access to clean and safe drinking water in water-scarce regions. We focus on water purification systems, rainwater harvesting, and hygiene education to prevent waterborne diseases.",
    verified: true,
    trustScore: 92,
    logo: "https://placehold.co/200x200/004646/ffffff?text=CW",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Clean+Water+Foundation",
    foundedYear: 2011,
    totalRaised: 13000000,
    supporters: 16000,
    upiId: "cleanwaterfoundation@upi",
    achievements: [
      {
        id: "cwach1",
        title: "500 Water Purification Systems",
        description:
          "Installed 500 water purification systems in villages and schools.",
        date: "2023-02-10",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+1",
      },
      {
        id: "cwach2",
        title: "250,000 People with Clean Water",
        description:
          "Provided clean drinking water access to 250,000 people in water-scarce regions.",
        date: "2022-05-05",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "cwteam1",
        name: "Vishal Patil",
        role: "Founder & Executive Director",
        image: "https://placehold.co/300x300/004646/ffffff?text=VP",
      },
      {
        id: "cwteam2",
        name: "Dr. Sunita Rao",
        role: "Water Quality Specialist",
        image: "https://placehold.co/300x300/004646/ffffff?text=SR",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo13",
    name: "Reforestation Alliance",
    regNumber: "NGO778899",
    category: "Environment",
    location: "Dehradun",
    description:
      "Reforestation Alliance is dedicated to restoring forest ecosystems through tree planting, conservation, and community participation. We work to combat deforestation, protect biodiversity, and mitigate climate change impacts.",
    verified: true,
    trustScore: 89,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=RA",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Reforestation+Alliance",
    foundedYear: 2012,
    totalRaised: 9500000,
    supporters: 12500,
    upiId: "reforestationalliance@upi",
    achievements: [
      {
        id: "raach1",
        title: "1 Million Trees Planted",
        description:
          "Successfully planted and nurtured 1 million trees across the Himalayan foothills.",
        date: "2023-06-05",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "raach2",
        title: "5,000 Hectares Restored",
        description:
          "Restored 5,000 hectares of degraded forest land through sustainable practices.",
        date: "2021-12-10",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "rateam1",
        name: "Arun Joshi",
        role: "Founder & Conservation Director",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=AJ",
      },
      {
        id: "rateam2",
        name: "Deepa Rawat",
        role: "Community Outreach Head",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=DR",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo14",
    name: "Street Animal Rescue",
    regNumber: "NGO334455",
    category: "Animal Welfare",
    location: "Ahmedabad",
    description:
      "Street Animal Rescue is committed to helping stray animals through rescue operations, medical care, sterilization programs, and adoption services. We believe in creating a compassionate society for all living beings.",
    verified: true,
    trustScore: 87,
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=SA",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Street+Animal+Rescue",
    foundedYear: 2013,
    totalRaised: 4500000,
    supporters: 8000,
    upiId: "streetanimalrescue@upi",
    achievements: [
      {
        id: "saach1",
        title: "10,000 Animals Rescued",
        description:
          "Successfully rescued and provided care to 10,000 stray animals in urban areas.",
        date: "2022-09-22",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+1",
      },
      {
        id: "saach2",
        title: "5,000 Sterilizations",
        description:
          "Conducted 5,000 animal sterilizations to control stray population humanely.",
        date: "2021-07-15",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "sateam1",
        name: "Kavita Patel",
        role: "Founder & Animal Welfare Activist",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=KP",
      },
      {
        id: "sateam2",
        name: "Dr. Nikhil Shah",
        role: "Chief Veterinarian",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=NS",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo15",
    name: "Rural Health Connect",
    regNumber: "NGO667788",
    category: "Healthcare",
    location: "Lucknow",
    description:
      "Rural Health Connect bridges the healthcare gap in remote villages through mobile clinics, telemedicine, and health worker training. We focus on preventive care, maternal health, and managing chronic diseases in underserved areas.",
    verified: true,
    trustScore: 93,
    logo: "https://placehold.co/200x200/006969/ffffff?text=RH",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Rural+Health+Connect",
    foundedYear: 2008,
    totalRaised: 16000000,
    supporters: 19000,
    upiId: "ruralhealthconnect@upi",
    achievements: [
      {
        id: "rhach1",
        title: "50 Mobile Clinics",
        description:
          "Deployed 50 mobile healthcare clinics serving remote villages in Uttar Pradesh.",
        date: "2023-03-18",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+1",
      },
      {
        id: "rhach2",
        title: "300,000 Patients Treated",
        description:
          "Provided medical care to 300,000 patients in rural areas with limited healthcare access.",
        date: "2022-01-25",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "rhteam1",
        name: "Dr. Alok Mishra",
        role: "Founder & Medical Director",
        image: "https://placehold.co/300x300/006969/ffffff?text=AM",
      },
      {
        id: "rhteam2",
        name: "Reena Singh",
        role: "Rural Outreach Coordinator",
        image: "https://placehold.co/300x300/006969/ffffff?text=RS",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo16",
    name: "Child Rights Foundation",
    regNumber: "NGO998877",
    category: "Children",
    location: "Kolkata",
    description:
      "Child Rights Foundation works to protect children from abuse, exploitation, and trafficking. We focus on rescue operations, rehabilitation, education, and advocacy for stronger child protection laws and awareness.",
    verified: true,
    trustScore: 95,
    logo: "https://placehold.co/200x200/004646/ffffff?text=CR",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Child+Rights+Foundation",
    foundedYear: 2007,
    totalRaised: 18000000,
    supporters: 22000,
    upiId: "childrightsfoundation@upi",
    achievements: [
      {
        id: "crach1",
        title: "2,000 Children Rescued",
        description:
          "Successfully rescued 2,000 children from trafficking, labor, and abusive situations.",
        date: "2023-08-12",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+1",
      },
      {
        id: "crach2",
        title: "10 Child-Friendly Villages",
        description:
          "Developed 10 model child-friendly villages with comprehensive protection mechanisms.",
        date: "2022-03-20",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "crteam1",
        name: "Sonali Mukherjee",
        role: "Founder & Child Rights Activist",
        image: "https://placehold.co/300x300/004646/ffffff?text=SM",
      },
      {
        id: "crteam2",
        name: "Ravi Ghosh",
        role: "Rescue Operations Head",
        image: "https://placehold.co/300x300/004646/ffffff?text=RG",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo17",
    name: "Women's Legal Aid",
    regNumber: "NGO223344",
    category: "Women Empowerment",
    location: "Delhi",
    description:
      "Women's Legal Aid provides free legal assistance, counseling, and support to women facing domestic violence, discrimination, and injustice. We work to empower women through legal awareness and advocacy for gender equality.",
    verified: true,
    trustScore: 91,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=WL",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Women's+Legal+Aid",
    foundedYear: 2009,
    totalRaised: 7500000,
    supporters: 9500,
    upiId: "womenslegalaid@upi",
    achievements: [
      {
        id: "wlach1",
        title: "5,000 Cases Supported",
        description:
          "Provided legal assistance in 5,000 cases of women facing violence and discrimination.",
        date: "2023-04-25",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "wlach2",
        title: "100 Legal Awareness Camps",
        description:
          "Conducted 100 legal awareness camps in urban slums and rural communities.",
        date: "2022-07-08",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "wlteam1",
        name: "Adv. Seema Verma",
        role: "Founder & Legal Director",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=SV",
      },
      {
        id: "wlteam2",
        name: "Adv. Farhan Ahmed",
        role: "Senior Legal Counsel",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=FA",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo18",
    name: "Skill Development Hub",
    regNumber: "NGO556677",
    category: "Education",
    location: "Pune",
    description:
      "Skill Development Hub focuses on equipping unemployed youth with market-relevant skills through vocational training, apprenticeships, and job placement support. We bridge the gap between education and employment needs.",
    verified: true,
    trustScore: 88,
    logo: "https://placehold.co/200x200/008c8c/ffffff?text=SD",
    coverImage: "https://placehold.co/1200x400/008c8c/ffffff?text=Skill+Development+Hub",
    foundedYear: 2012,
    totalRaised: 6800000,
    supporters: 8900,
    upiId: "skilldevelopment@upi",
    achievements: [
      {
        id: "sdach1",
        title: "12,000 Youth Trained",
        description:
          "Provided vocational training to 12,000 unemployed youth from underserved backgrounds.",
        date: "2022-10-15",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+1",
      },
      {
        id: "sdach2",
        title: "75% Placement Rate",
        description:
          "Achieved 75% job placement rate for our training program graduates.",
        date: "2021-06-22",
        image: "https://placehold.co/600x400/008c8c/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "sdteam1",
        name: "Avinash Tiwari",
        role: "Founder & CEO",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=AT",
      },
      {
        id: "sdteam2",
        name: "Meenakshi Iyer",
        role: "Training & Placement Director",
        image: "https://placehold.co/300x300/008c8c/ffffff?text=MI",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/008c8c/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo19",
    name: "Sustainable Villages Project",
    regNumber: "NGO112233",
    category: "Rural Development",
    location: "Ahmedabad",
    description:
      "Sustainable Villages Project works to transform rural communities through integrated development approaches focusing on agriculture, water management, renewable energy, education, and healthcare. We create model villages that are self-reliant and environmentally sustainable.",
    verified: true,
    trustScore: 92,
    logo: "https://placehold.co/200x200/006969/ffffff?text=SV",
    coverImage: "https://placehold.co/1200x400/006969/ffffff?text=Sustainable+Villages+Project",
    foundedYear: 2011,
    totalRaised: 12500000,
    supporters: 15000,
    upiId: "sustainablevillages@upi",
    achievements: [
      {
        id: "svach1",
        title: "25 Model Villages",
        description:
          "Developed 25 model villages with integrated sustainability practices across Gujarat.",
        date: "2023-02-28",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+1",
      },
      {
        id: "svach2",
        title: "50 Solar Microgrids",
        description:
          "Installed 50 solar microgrids providing clean energy to off-grid rural communities.",
        date: "2022-05-12",
        image: "https://placehold.co/600x400/006969/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "svteam1",
        name: "Narendra Patel",
        role: "Founder & Rural Development Expert",
        image: "https://placehold.co/300x300/006969/ffffff?text=NP",
      },
      {
        id: "svteam2",
        name: "Leela Modi",
        role: "Sustainable Agriculture Head",
        image: "https://placehold.co/300x300/006969/ffffff?text=LM",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/006969/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo20",
    name: "Mental Health Alliance",
    regNumber: "NGO889977",
    category: "Healthcare",
    location: "Bangalore",
    description:
      "Mental Health Alliance is dedicated to improving mental health awareness, providing counseling services, and reducing stigma. We work through helplines, therapy sessions, awareness campaigns, and training programs for communities.",
    verified: true,
    trustScore: 89,
    logo: "https://placehold.co/200x200/004646/ffffff?text=MH",
    coverImage: "https://placehold.co/1200x400/004646/ffffff?text=Mental+Health+Alliance",
    foundedYear: 2013,
    totalRaised: 5800000,
    supporters: 7800,
    upiId: "mentalhealthalliance@upi",
    achievements: [
      {
        id: "mhach1",
        title: "24/7 Helpline Service",
        description:
          "Established a 24/7 mental health helpline that has assisted over 50,000 individuals.",
        date: "2022-12-05",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+1",
      },
      {
        id: "mhach2",
        title: "1,000 Mental Health Workshops",
        description:
          "Conducted 1,000 mental health awareness workshops in schools, colleges, and corporate offices.",
        date: "2021-10-10",
        image: "https://placehold.co/600x400/004646/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "mhteam1",
        name: "Dr. Rohini Nair",
        role: "Founder & Clinical Psychologist",
        image: "https://placehold.co/300x300/004646/ffffff?text=RN",
      },
      {
        id: "mhteam2",
        name: "Dr. Vikram Seth",
        role: "Psychiatrist & Program Director",
        image: "https://placehold.co/300x300/004646/ffffff?text=VS",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/004646/ffffff?text=Gallery+3",
    ],
  },
  {
    id: "ngo21",
    name: "Senior Citizens Welfare Trust",
    regNumber: "NGO445566",
    category: "Elderly Care",
    location: "Chennai",
    description:
      "Senior Citizens Welfare Trust is dedicated to providing care, companionship, and support services to the elderly. We operate retirement homes, day care centers, medical assistance programs, and social engagement activities to ensure dignified aging.",
    verified: true,
    trustScore: 90,
    logo: "https://placehold.co/200x200/00afaf/ffffff?text=SC",
    coverImage: "https://placehold.co/1200x400/00afaf/ffffff?text=Senior+Citizens+Welfare+Trust",
    foundedYear: 2010,
    totalRaised: 7200000,
    supporters: 9200,
    upiId: "seniorcitizenstrust@upi",
    achievements: [
      {
        id: "scach1",
        title: "10 Elder Care Homes",
        description:
          "Established and manage 10 elder care homes providing residence to 500 senior citizens.",
        date: "2023-01-08",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+1",
      },
      {
        id: "scach2",
        title: "Free Healthcare for 3,000 Seniors",
        description:
          "Provided free healthcare services to 3,000 elderly people through our medical camps.",
        date: "2022-04-15",
        image: "https://placehold.co/600x400/00afaf/ffffff?text=Achievement+2",
      },
    ],
    team: [
      {
        id: "scteam1",
        name: "V. Subramanian",
        role: "Founder & Chairman",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=VS",
      },
      {
        id: "scteam2",
        name: "Dr. Lakshmi Raman",
        role: "Geriatric Care Specialist",
        image: "https://placehold.co/300x300/00afaf/ffffff?text=LR",
      },
    ],
    gallery: [
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+1",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+2",
      "https://placehold.co/600x400/00afaf/ffffff?text=Gallery+3",
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
