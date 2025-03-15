
import { ResumeData, ResumeTemplate } from '@/types/resume';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/templates/minimal.png',
    component: MinimalTemplate,
    description: 'Clean and simple design with a focus on content.'
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/templates/professional.png',
    component: ProfessionalTemplate,
    description: 'Polished and structured layout for a corporate look.'
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/templates/modern.png',
    component: ModernTemplate,
    description: 'Contemporary design with a creative but professional edge.'
  }
];

export const getTemplateById = (
  id: string,
  data: ResumeData
): React.ReactNode => {
  const template = resumeTemplates.find(t => t.id === id);
  
  if (!template) {
    // Default to minimal template if not found
    const MinimalComponent = resumeTemplates[0].component;
    return <MinimalComponent data={data} />;
  }
  
  const TemplateComponent = template.component;
  return <TemplateComponent data={data} />;
};
