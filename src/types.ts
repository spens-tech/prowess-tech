export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  iconName: string;
  benefits: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'video' | 'design' | 'social' | 'campaigns';
  description: string;
  longDescription: string;
  clientName: string;
  year: string;
  impactLabel: string;
  impactValue: string;
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  initials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface ProjectInquiry {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  goals: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}
