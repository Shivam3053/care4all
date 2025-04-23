export interface NGO {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  logo: string;
  coverImage: string;
  foundedYear: number;
  totalRaised: number;
  supporters: number;
  verified: boolean;
  trustScore: number;
  regNumber: string;
  upiId: string;
  phone: string;
  email: string;
  website: string;
  team: TeamMember[];
  achievements: Achievement[];
  images: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export const mockNGOs: NGO[] = [
  {
    id: "1",
    name: "Children First Foundation",
    category: "Children & Youth",
    description: "Supporting underprivileged children with education and healthcare.",
    location: "Mumbai, Maharashtra",
    logo: "public/lovable-uploads/0b97af41-93fe-4a56-a2c0-0ceb222508a3.png",
    coverImage: "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png",
    foundedYear: 2012,
    totalRaised: 3200000,
    supporters: 1200,
    verified: true,
    trustScore: 91,
    regNumber: "CFF-112233",
    upiId: "childrenfirst@upi",
    phone: "918376342111",
    email: "info@childrenfirst.org",
    website: "https://childrenfirst.org",
    team: [
      {
        id: "t1",
        name: "Sophia Mehta",
        role: "Founder & Director",
        image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=facearea&w=300&h=300&q=80",
      },
      {
        id: "t2",
        name: "Ankit Joshi",
        role: "Program Manager",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&w=300&h=300&q=80",
      }
    ],
    achievements: [
      {
        id: "a1",
        title: "1000+ Children Educated",
        description: "Provided educational support and scholarships to over 1000 children in Mumbai slums.",
        date: "2023-06-22",
        image: "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png"
      }
    ],
    images: [
      "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png",
      "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png",
      "public/lovable-uploads/0b97af41-93fe-4a56-a2c0-0ceb222508a3.png"
    ],
  },
  {
    id: "2",
    name: "EcoLife Initiative",
    category: "Environment",
    description: "Working towards a sustainable future through conservation efforts.",
    location: "Bengaluru, Karnataka",
    logo: "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png",
    coverImage: "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png",
    foundedYear: 2016,
    totalRaised: 1500000,
    supporters: 850,
    verified: true,
    trustScore: 88,
    regNumber: "ECO-445566",
    upiId: "ecolife@upi",
    phone: "919898765432",
    email: "hello@ecolife.org",
    website: "https://ecolife.org",
    team: [
      {
        id: "t3",
        name: "Priya Kapoor",
        role: "Co-Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=300&h=300&q=80"
      }
    ],
    achievements: [
      {
        id: "a2",
        title: "10,000 Trees Planted",
        description: "Planted over 10,000 trees in green belts around Bangalore.",
        date: "2022-10-13",
        image: "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png"
      }
    ],
    images: [
      "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png",
      "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png"
    ],
  },
  {
    id: "3",
    name: "Healthcare For All",
    category: "Healthcare",
    description: "Providing medical assistance to underserved communities.",
    location: "Delhi, NCR",
    logo: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    foundedYear: 2014,
    totalRaised: 2750000,
    supporters: 950,
    verified: true,
    trustScore: 94,
    regNumber: "HCFA-778899",
    upiId: "healthforall@upi",
    phone: "917617161234",
    email: "support@healthforall.org",
    website: "https://healthforall.org",
    team: [
      {
        id: "t4",
        name: "Dr. Amit Sharma",
        role: "Chief Medical Officer",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=300&h=300&q=80",
      }
    ],
    achievements: [
      {
        id: "a3",
        title: "Mobile Clinics Launched",
        description: "Operates 5 mobile health clinics reaching remote villages.",
        date: "2023-02-11",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    ],
  },
  {
    id: "4",
    name: "Women Empowerment Trust",
    category: "Education",
    description: "Empowering women through education and skill development.",
    location: "Jaipur, Rajasthan",
    logo: "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png",
    coverImage: "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png",
    foundedYear: 2015,
    totalRaised: 2100000,
    supporters: 710,
    verified: true,
    trustScore: 89,
    regNumber: "WET-556677",
    upiId: "womenempower@upi",
    phone: "917547453321",
    email: "info@womenempowertrust.org",
    website: "https://womenempowertrust.org",
    team: [
      {
        id: "t5",
        name: "Rekha Sharma",
        role: "Founder & Chairperson",
        image: "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png"
      },
      {
        id: "t6",
        name: "Sunita Desai",
        role: "Program Coordinator",
        image: "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png"
      }
    ],
    achievements: [
      {
        id: "a4",
        title: "5000+ Women Trained",
        description: "Facilitated vocational and soft skills training for over 5000 women in Rajasthan.",
        date: "2021-09-12",
        image: "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png"
      },
      {
        id: "a5",
        title: "Scholarship Program Launched",
        description: "Launched a scholarship fund supporting girls to complete their secondary education.",
        date: "2022-12-10",
        image: "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png"
      }
    ],
    images: [
      "public/lovable-uploads/4eeb56b0-06dc-42af-9f1a-4d5068f2f9fb.png",
      "public/lovable-uploads/62acc31e-4e29-4998-ad01-1b10c61fe64b.png",
      "public/lovable-uploads/0b97af41-93fe-4a56-a2c0-0ceb222508a3.png"
    ],
  },
  {
    id: "5",
    name: "Rural Development Initiative",
    category: "Rural Development",
    description: "Advancing development in rural Uttar Pradesh through education, healthcare, and infrastructure solutions.",
    location: "Lucknow, Uttar Pradesh",
    logo: "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png",
    coverImage: "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png",
    foundedYear: 2010,
    totalRaised: 4300000,
    supporters: 1840,
    verified: true,
    trustScore: 86,
    regNumber: "RDI-334422",
    upiId: "ruraldev@upi",
    phone: "919812345678",
    email: "contact@ruraldevinitiative.org",
    website: "https://ruraldevinitiative.org",
    team: [
      {
        id: "t7",
        name: "Anil Srivastava",
        role: "Founder",
        image: "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png"
      },
      {
        id: "t8",
        name: "Seema Verma",
        role: "Project Lead",
        image: "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png"
      }
    ],
    achievements: [
      {
        id: "a6",
        title: "Clean Water Project",
        description: "Established water purification units in 20 rural villages, benefitting over 10,000 residents.",
        date: "2023-01-21",
        image: "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png"
      },
      {
        id: "a7",
        title: "Healthcare Camps Conducted",
        description: "Organized over 30 free healthcare camps across rural districts.",
        date: "2022-05-17",
        image: "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png"
      }
    ],
    images: [
      "public/lovable-uploads/85974241-010b-4aaf-8de8-9158dfc2d451.png",
      "public/lovable-uploads/e7cba6d9-3362-4e2f-b39f-0f8df255d342.png"
    ]
  }
];

export const categories = [
  "Children & Youth",
  "Environment",
  "Healthcare",
  "Education",
  "Rural Development"
];

export const locations = [
  "Mumbai, Maharashtra",
  "Bengaluru, Karnataka",
  "Delhi, NCR",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh"
];

export const getNGOById = (id: string): NGO | undefined => {
  return mockNGOs.find((ngo) => ngo.id === id);
};

export const getFeaturedNGOs = (count: number = 3): NGO[] => {
  return mockNGOs.slice(0, count);
};
