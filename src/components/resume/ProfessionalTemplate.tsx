
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/date-utils';
import { Phone, Mail, Globe, MapPin, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfessionalTemplateProps {
  data: ResumeData;
  className?: string;
}

export function ProfessionalTemplate({ data, className }: ProfessionalTemplateProps) {
  const { personalInfo, profile, workExperience, education, skills, languages, awards, customSections } = data;
  
  return (
    <div className={cn("h-full flex flex-col font-sans text-[#333]", className)}>
      {/* Header */}
      <header className="bg-[#2c3e50] text-white p-12 pb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl mt-2 text-[#ecf0f1]">{personalInfo.title}</p>
        
        <div className="flex flex-wrap mt-6 gap-x-6 gap-y-2 text-sm">
          {personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center space-x-2">
              <Globe size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center space-x-2">
              <Github size={14} className="text-[#bdc3c7]" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 p-12 pt-8">
        {/* Profile Summary */}
        {profile && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#2c3e50] mb-3">Professional Profile</h2>
            <p className="text-base leading-relaxed">{profile}</p>
          </section>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">Experience</h2>
                <div className="space-y-6">
                  {workExperience.map((experience) => (
                    <div key={experience.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{experience.position}</h3>
                          <p className="text-[#7f8c8d] font-medium">{experience.company} | {experience.location}</p>
                        </div>
                        <div className="text-sm bg-[#ecf0f1] px-3 py-1 rounded-full font-medium">
                          {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                        </div>
                      </div>
                      
                      {experience.description && (
                        <p className="mt-2">{experience.description}</p>
                      )}
                      
                      {experience.achievements.length > 0 && (
                        <ul className="mt-2 list-disc list-inside space-y-1">
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
              <section>
                <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">Education</h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{edu.degree} in {edu.field}</h3>
                          <p className="text-[#7f8c8d] font-medium">{edu.institution} | {edu.location}</p>
                        </div>
                        <div className="text-sm bg-[#ecf0f1] px-3 py-1 rounded-full font-medium">
                          {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </div>
                      </div>
                      
                      {edu.description && (
                        <p className="mt-2">{edu.description}</p>
                      )}
                      
                      {edu.achievements.length > 0 && (
                        <ul className="mt-2 list-disc list-inside space-y-1">
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
            
            {/* Custom Sections */}
            {customSections.map((section) => (
              section.items.length > 0 && (
                <section key={section.id}>
                  <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">{section.title}</h2>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      item.title && (
                        <div key={item.id}>
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            {item.date && <span className="text-sm bg-[#ecf0f1] px-3 py-1 rounded-full font-medium">{formatDate(item.date)}</span>}
                          </div>
                          {item.subtitle && <p className="text-[#7f8c8d] font-medium">{item.subtitle}</p>}
                          {item.description && <p className="mt-2">{item.description}</p>}
                          
                          {item.bullets && item.bullets.length > 0 && (
                            <ul className="mt-2 list-disc list-inside space-y-1">
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
          
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    skill.name && (
                      <div key={skill.id}>
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <div className="w-full bg-[#ecf0f1] rounded-full h-2.5 mt-1">
                          <div
                            className="bg-[#3498db] h-2.5 rounded-full"
                            style={{ width: `${skill.level * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}
            
            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">Languages</h2>
                <div className="space-y-3">
                  {languages.map((language) => (
                    language.name && (
                      <div key={language.id} className="flex justify-between items-center">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-sm bg-[#ecf0f1] px-3 py-1 rounded-full">{language.proficiency}</span>
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}
            
            {/* Awards */}
            {awards.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#2c3e50] border-b-2 border-[#e7e7e7] pb-2 mb-4">Awards & Achievements</h2>
                <div className="space-y-4">
                  {awards.map((award) => (
                    award.title && (
                      <div key={award.id}>
                        <h3 className="font-bold">{award.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#7f8c8d]">{award.issuer}</span>
                          <span className="text-sm bg-[#ecf0f1] px-3 py-1 rounded-full">{formatDate(award.date)}</span>
                        </div>
                        {award.description && <p className="mt-2 text-sm">{award.description}</p>}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfessionalTemplate;
