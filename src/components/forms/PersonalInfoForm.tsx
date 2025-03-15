
import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };
  
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                placeholder="John"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={personalInfo.title}
                onChange={handleChange}
                placeholder="Software Engineer"
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-1 pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="mt-1 pl-10"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <Label htmlFor="address">Location</Label>
              <div className="relative">
                <Input
                  id="address"
                  name="address"
                  value={personalInfo.address}
                  onChange={handleChange}
                  placeholder="San Francisco, CA"
                  className="mt-1 pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="relative">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Input
                id="website"
                name="website"
                value={personalInfo.website}
                onChange={handleChange}
                placeholder="yourwebsite.com"
                className="mt-1 pl-10"
              />
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="relative">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="relative">
              <Input
                id="linkedin"
                name="linkedin"
                value={personalInfo.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/johndoe"
                className="mt-1 pl-10"
              />
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="relative">
            <Label htmlFor="github">GitHub</Label>
            <div className="relative">
              <Input
                id="github"
                name="github"
                value={personalInfo.github}
                onChange={handleChange}
                placeholder="github.com/johndoe"
                className="mt-1 pl-10"
              />
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalInfoForm;
