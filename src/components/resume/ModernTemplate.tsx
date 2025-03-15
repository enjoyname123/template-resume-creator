
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/date-utils';
import { Phone, Mail, Globe, MapPin, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernTemplateProps {
  data: ResumeData;
  className?: string;
}

export function ModernTemplate({ data, className }: ModernTemplateProps) {
  const { personalInfo, profile, workExperience, education, skills, languages, awards, customSections } = data;
  
  return (
    <div className={cn("h-full flex font-sans bg-white text-[#333]", className)}>
      {/* Sidebar */}
      <div className="w-1/3 bg-[#f5f5f5] p-8">
        {/* Photo placeholder */}
        {personalInfo.photo ? (
          <img
            src={personalInfo.photo}
            alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-40 h-40 rounded-full mx-auto mb-6 bg-[#e0e0e0] flex items-center justify-center text-4xl font-light text-[#999] border-4 border-white shadow-md">
            {personalInfo.firstName?.charAt(0) || ""}
            {personalInfo.lastName?.charAt(0) || ""}
          </div>
        )}
        
        {/* Contact Info */}
        <div className="space-y-5 mb-8">
          <h2 className="text-lg font-bold border-b-2 border-[#e0e0e0] pb-2 mb-3">Contact</h2>
          
          <div className="space-y-3 text-sm">
            {personalInfo.phone && (
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#0077B6]" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.email && (
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#0077B6]" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-[#0077B6]" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#0077B6]" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-3">
                <Linkedin size={16} className="text-[#0077B6]" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center space-x-3">
                <Github size={16} className="text-[#0077B6]" />
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                skill.name && (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="w-full bg-[#e0e0e0] rounded-full h-1.5">
                      <div
                        className="bg-[#0077B6] h-1.5 rounded-full"
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Languages</h2>
            <div className="space-y-3">
              {languages.map((language) => (
                language.name && (
                  <div key={language.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{language.name}</span>
                      <span className="text-xs text-[#666]">{language.proficiency}</span>
                    </div>
                    <div className="w-full bg-[#e0e0e0] rounded-full h-1.5">
                      <div
                        className="bg-[#0077B6] h-1.5 rounded-full"
                        style={{ 
                          width: language.proficiency === 'Native' ? '100%' : 
                                 language.proficiency === 'Full Professional' ? '80%' :
                                 language.proficiency === 'Professional Working' ? '60%' :
                                 language.proficiency === 'Limited Working' ? '40%' : '20%'
                        }}
                      ></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
        
        {/* Awards */}
        {awards.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Awards</h2>
            <div className="space-y-4">
              {awards.map((award) => (
                award.title && (
                  <div key={award.id}>
                    <h3 className="font-semibold text-sm">{award.title}</h3>
                    <p className="text-xs text-[#666]">{award.issuer} | {formatDate(award.date)}</p>
                    {award.description && <p className="text-xs mt-1">{award.description}</p>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Header */}
        <header className="mb-8 border-b-2 border-[#0077B6] pb-4">
          <h1 className="text-4xl font-bold tracking-tight text-[#0077B6]">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl text-[#666] mt-2">{personalInfo.title}</p>
        </header>
        
        {/* Profile Summary */}
        {profile && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Profile</h2>
            <p className="leading-relaxed">{profile}</p>
          </section>
        )}
        
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Experience</h2>
            <div className="space-y-6">
              {workExperience.map((experience) => (
                <div key={experience.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-[#0077B6] before:rounded-full before:z-[1] before:border-2 before:border-white before:shadow-sm">
                  <div className="absolute left-1.5 top-1.5 bottom-0 w-px bg-[#e0e0e0] -z-[1]"></div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{experience.position}</h3>
                      <span className="text-xs bg-[#f0f0f0] px-2 py-1 rounded">
                        {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-[#666]">{experience.company} | {experience.location}</p>
                    
                    {experience.description && (
                      <p className="mt-2 text-sm">{experience.description}</p>
                    )}
                    
                    {experience.achievements.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                        {experience.achievements.map((achievement, index) => (
                          achievement.trim() && <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-[#0077B6] before:rounded-full before:z-[1] before:border-2 before:border-white before:shadow-sm">
                  <div className="absolute left-1.5 top-1.5 bottom-0 w-px bg-[#e0e0e0] -z-[1]"></div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                      <span className="text-xs bg-[#f0f0f0] px-2 py-1 rounded">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-[#666]">{edu.institution} | {edu.location}</p>
                    
                    {edu.description && (
                      <p className="mt-2 text-sm">{edu.description}</p>
                    )}
                    
                    {edu.achievements.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                        {edu.achievements.map((achievement, index) => (
                          achievement.trim() && <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Custom Sections */}
        {customSections.map((section) => (
          section.items.length > 0 && (
            <section key={section.id} className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-[#e0e0e0] pb-2 mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  item.title && (
                    <div key={item.id}>
                      <div className="flex justify-between">
                        <h3 className="font-bold">{item.title}</h3>
                        {item.date && <span className="text-xs bg-[#f0f0f0] px-2 py-1 rounded">{formatDate(item.date)}</span>}
                      </div>
                      {item.subtitle && <p className="text-sm text-[#666]">{item.subtitle}</p>}
                      {item.description && <p className="mt-2 text-sm">{item.description}</p>}
                      
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
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
    </div>
  );
}

export default ModernTemplate;
