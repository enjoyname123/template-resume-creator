
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ResumeTheme, WorkExperience, Education, Skill, Language, Award, CustomSection } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  theme: ResumeTheme;
  setTheme: React.Dispatch<React.SetStateAction<ResumeTheme>>;
  resetData: () => void;
  updatePersonalInfo: (personalInfo: Partial<ResumeData['personalInfo']>) => void;
  updateProfile: (profile: string) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addAward: () => void;
  updateAward: (id: string, data: Partial<Award>) => void;
  removeAward: (id: string) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, data: Partial<any>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;
  loadSampleData: () => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    title: '',
    photo: '',
  },
  profile: '',
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  awards: [],
  customSections: []
};

const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    address: 'San Francisco, CA',
    website: 'janesmith.com',
    linkedin: 'linkedin.com/in/janesmith',
    github: 'github.com/janesmith',
    title: 'Senior Product Designer',
    photo: '',
  },
  profile: 'Experienced product designer with 7+ years of creating user-centered digital experiences for leading tech companies. Passionate about solving complex problems through elegant design solutions. Skilled in UX research, interaction design, and design systems.',
  workExperience: [
    {
      id: uuidv4(),
      company: 'Design Co.',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Lead designer for flagship product with 2M+ users',
      achievements: [
        'Redesigned core user flows resulting in 32% improvement in task completion rates',
        'Established design system that reduced design-to-development time by 40%',
        'Mentored junior designers and conducted bi-weekly design critiques'
      ]
    },
    {
      id: uuidv4(),
      company: 'Tech Solutions Inc.',
      position: 'UX Designer',
      location: 'Los Angeles, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Designed interfaces and experiences for mobile applications',
      achievements: [
        'Created wireframes, prototypes and high-fidelity designs for 10+ products',
        'Collaborated with research team to conduct user testing and implement feedback',
        'Improved customer satisfaction scores by 28% through data-driven design improvements'
      ]
    }
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'Stanford University',
      degree: 'Master of Fine Arts',
      field: 'Design',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2018-05',
      current: false,
      description: 'Focus on human-computer interaction and digital product design',
      achievements: [
        'Thesis project featured in university innovation showcase',
        'Teaching assistant for Intro to Visual Communication'
      ]
    },
    {
      id: uuidv4(),
      institution: 'Rhode Island School of Design',
      degree: 'Bachelor of Fine Arts',
      field: 'Graphic Design',
      location: 'Providence, RI',
      startDate: '2012-09',
      endDate: '2016-05',
      current: false,
      description: 'Comprehensive study of visual design principles and practices',
      achievements: [
        'Dean\'s List: 2013-2016',
        'Senior portfolio selected for annual exhibition'
      ]
    }
  ],
  skills: [
    { id: uuidv4(), name: 'User Interface Design', level: 5 },
    { id: uuidv4(), name: 'User Experience Design', level: 5 },
    { id: uuidv4(), name: 'Design Systems', level: 4 },
    { id: uuidv4(), name: 'Figma', level: 5 },
    { id: uuidv4(), name: 'Adobe Creative Suite', level: 4 },
    { id: uuidv4(), name: 'User Research', level: 4 },
    { id: uuidv4(), name: 'Prototyping', level: 5 },
    { id: uuidv4(), name: 'Information Architecture', level: 4 },
  ],
  languages: [
    { id: uuidv4(), name: 'English', proficiency: 'Native' as const },
    { id: uuidv4(), name: 'Spanish', proficiency: 'Professional Working' as const },
    { id: uuidv4(), name: 'French', proficiency: 'Limited Working' as const }
  ],
  awards: [
    {
      id: uuidv4(),
      title: 'Design Excellence Award',
      date: '2022-11',
      issuer: 'San Francisco Design Week',
      description: 'Recognized for exceptional product design and innovation'
    },
    {
      id: uuidv4(),
      title: 'Best Mobile Experience',
      date: '2020-06',
      issuer: 'Mobile UX Awards',
      description: 'Awarded for outstanding mobile application design'
    }
  ],
  customSections: [
    {
      id: uuidv4(),
      title: 'Publications',
      items: [
        {
          id: uuidv4(),
          title: 'Designing for Impact: Creating Digital Products That Matter',
          subtitle: 'UX Collective',
          date: '2022-04',
          description: 'Article on designing products with measurable positive impact',
          bullets: []
        },
        {
          id: uuidv4(),
          title: 'The Future of Design Systems',
          subtitle: 'Medium - Design+',
          date: '2021-09',
          description: 'Analysis of evolving design system methodologies',
          bullets: []
        }
      ]
    }
  ]
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [theme, setTheme] = useState<ResumeTheme>('minimal');

  const resetData = () => {
    setResumeData(defaultResumeData);
    toast.success('Resume data reset to default');
  };

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...personalInfo
      }
    }));
  };

  const updateProfile = (profile: string) => {
    setResumeData(prev => ({
      ...prev,
      profile
    }));
  };

  const addWorkExperience = () => {
    const newWorkExperience: WorkExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };

    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newWorkExperience]
    }));
  };

  const updateWorkExperience = (id: string, data: Partial<WorkExperience>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };

    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: '',
      level: 3
    };

    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, data: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...data } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: uuidv4(),
      name: '',
      proficiency: 'Professional Working'
    };

    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (id: string, data: Partial<Language>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, ...data } : lang
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  const addAward = () => {
    const newAward: Award = {
      id: uuidv4(),
      title: '',
      date: '',
      issuer: '',
      description: ''
    };

    setResumeData(prev => ({
      ...prev,
      awards: [...prev.awards, newAward]
    }));
  };

  const updateAward = (id: string, data: Partial<Award>) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map(award => 
        award.id === id ? { ...award, ...data } : award
      )
    }));
  };

  const removeAward = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter(award => award.id !== id)
    }));
  };

  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: uuidv4(),
      title: 'New Section',
      items: []
    };

    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
  };

  const updateCustomSection = (id: string, data: Partial<CustomSection>) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section => 
        section.id === id ? { ...section, ...data } : section
      )
    }));
  };

  const removeCustomSection = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== id)
    }));
  };

  const addCustomSectionItem = (sectionId: string) => {
    const newItem = {
      id: uuidv4(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
      bullets: ['']
    };

    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section => 
        section.id === sectionId 
          ? { ...section, items: [...section.items, newItem] } 
          : section
      )
    }));
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, data: Partial<any>) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items.map(item => 
                item.id === itemId ? { ...item, ...data } : item
              ) 
            } 
          : section
      )
    }));
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items.filter(item => item.id !== itemId)
            } 
          : section
      )
    }));
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      localStorage.setItem('resumeTheme', theme);
      toast.success('Resume saved successfully');
      return true;
    } catch (error) {
      console.error('Failed to save resume data:', error);
      toast.error('Failed to save resume data');
      return false;
    }
  };

  const loadFromLocalStorage = (): boolean => {
    try {
      const savedResumeData = localStorage.getItem('resumeData');
      const savedTheme = localStorage.getItem('resumeTheme');
      
      if (savedResumeData) {
        setResumeData(JSON.parse(savedResumeData));
      }
      
      if (savedTheme && ['minimal', 'professional', 'creative', 'executive', 'modern'].includes(savedTheme)) {
        setTheme(savedTheme as ResumeTheme);
      }
      
      if (savedResumeData || savedTheme) {
        toast.success('Resume loaded successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to load resume data:', error);
      toast.error('Failed to load resume data');
      return false;
    }
  };

  const loadSampleData = () => {
    setResumeData(sampleResumeData);
    toast.success('Sample resume data loaded');
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        theme,
        setTheme,
        resetData,
        updatePersonalInfo,
        updateProfile,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addAward,
        updateAward,
        removeAward,
        addCustomSection,
        updateCustomSection,
        removeCustomSection,
        addCustomSectionItem,
        updateCustomSectionItem,
        removeCustomSectionItem,
        saveToLocalStorage,
        loadFromLocalStorage,
        loadSampleData
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
