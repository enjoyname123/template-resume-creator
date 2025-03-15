
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
  console.log(`Attempting to get template with id: "${id}"`);
  const template = resumeTemplates.find(t => t.id === id);
  
  if (!template) {
    console.warn(`Template with id "${id}" not found, defaulting to minimal`);
    // Default to minimal template if not found
    const MinimalComponent = resumeTemplates[0].component;
    return <MinimalComponent data={data} />;
  }
  
  console.log(`Rendering template: ${template.name}`);
  const TemplateComponent = template.component;
  return <TemplateComponent data={data} />;
};
