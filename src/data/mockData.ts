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
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
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
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    ],
  },
  {
    id: "2",
    name: "EcoLife Initiative",
    category: "Environment",
    description: "Working towards a sustainable future through conservation efforts.",
    location: "Bengaluru, Karnataka",
    logo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=facearea&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
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
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80"
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
  }
];

export const categories = [
  "Children & Youth",
  "Environment",
  "Healthcare",
  "Women Empowerment",
  "Rural Development",
];

export const locations = [
  "Mumbai, Maharashtra",
  "Bengaluru, Karnataka",
  "Delhi, NCR",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
];

export const getNGOById = (id: string): NGO | undefined => {
  return mockNGOs.find((ngo) => ngo.id === id);
};
