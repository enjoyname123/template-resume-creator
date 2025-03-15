
export interface ResumeData {
  personalInfo: PersonalInfo;
  profile: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  awards: Award[];
  customSections: CustomSection[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  title: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native';
}

export interface Award {
  id: string;
  title: string;
  date: string;
  issuer: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
  component: React.ComponentType<{ data: ResumeData }>;
  description: string;
}

export type ResumeTheme = 'minimal' | 'professional' | 'creative' | 'executive' | 'modern';
