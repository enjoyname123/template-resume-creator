
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/date-utils';
import { Phone, Mail, Globe, MapPin, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalTemplateProps {
  data: ResumeData;
  className?: string;
}

export function MinimalTemplate({ data, className }: MinimalTemplateProps) {
  const { personalInfo, profile, workExperience, education, skills, languages, awards, customSections } = data;
  
  return (
    <div className={cn("p-12 font-sans text-[#333] h-full flex flex-col", className)}>
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg text-[#666] mt-1">{personalInfo.title}</p>
          </div>
          
          <div className="text-sm space-y-1">
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center space-x-2">
                <Globe size={14} />
                <span>{personalInfo.website}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <Linkedin size={14} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center space-x-2">
                <Github size={14} />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Profile Summary */}
      {profile && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Professional Profile</h2>
          <p className="text-sm leading-relaxed">{profile}</p>
        </section>
      )}
      
      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Experience</h2>
          <div className="space-y-4">
            {workExperience.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{experience.position}</h3>
                    <p className="text-sm text-[#666]">{experience.company} | {experience.location}</p>
                  </div>
                  <div className="text-sm text-[#666]">
                    {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                  </div>
                </div>
                
                {experience.description && (
                  <p className="text-sm mt-1">{experience.description}</p>
                )}
                
                {experience.achievements.length > 0 && (
                  <ul className="text-sm mt-1 list-disc list-inside">
                    {experience.achievements.map((achievement, index) => (
                      achievement.trim() && <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-[#666]">{edu.institution} | {edu.location}</p>
                  </div>
                  <div className="text-sm text-[#666]">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
                
                {edu.achievements.length > 0 && (
                  <ul className="text-sm mt-1 list-disc list-inside">
                    {edu.achievements.map((achievement, index) => (
                      achievement.trim() && <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              skill.name && (
                <div key={skill.id} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                  {skill.name}
                </div>
              )
            ))}
          </div>
        </section>
      )}
      
      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Languages</h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((language) => (
              language.name && (
                <div key={language.id} className="text-sm">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-[#666] ml-2">({language.proficiency})</span>
                </div>
              )
            ))}
          </div>
        </section>
      )}
      
      {/* Awards */}
      {awards.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">Awards & Achievements</h2>
          <div className="space-y-3">
            {awards.map((award) => (
              award.title && (
                <div key={award.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">{award.title}</h3>
                    <span className="text-sm text-[#666]">{formatDate(award.date)}</span>
                  </div>
                  <p className="text-sm text-[#666]">{award.issuer}</p>
                  {award.description && <p className="text-sm mt-1">{award.description}</p>}
                </div>
              )
            ))}
          </div>
        </section>
      )}
      
      {/* Custom Sections */}
      {customSections.map((section) => (
        section.items.length > 0 && (
          <section key={section.id} className="mb-6">
            <h2 className="text-lg font-bold border-b border-[#eee] pb-1 mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                item.title && (
                  <div key={item.id}>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      {item.date && <span className="text-sm text-[#666]">{formatDate(item.date)}</span>}
                    </div>
                    {item.subtitle && <p className="text-sm text-[#666]">{item.subtitle}</p>}
                    {item.description && <p className="text-sm mt-1">{item.description}</p>}
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="text-sm mt-1 list-disc list-inside">
                        {item.bullets.map((bullet, index) => (
                          bullet.trim() && <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}

export default MinimalTemplate;
