
import { useResume } from '@/contexts/ResumeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Briefcase } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { formatMonthYearForInput } from '@/lib/date-utils';

export function ExperienceForm() {
  const { 
    resumeData, 
    addWorkExperience, 
    updateWorkExperience, 
    removeWorkExperience 
  } = useResume();
  
  const { workExperience } = resumeData;
  
  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateWorkExperience(id, { [field]: value });
  };
  
  const handleAchievementChange = (experienceId: string, index: number, value: string) => {
    const experience = workExperience.find(exp => exp.id === experienceId);
    if (!experience) return;
    
    const newAchievements = [...experience.achievements];
    newAchievements[index] = value;
    
    updateWorkExperience(experienceId, { achievements: newAchievements });
  };
  
  const addAchievement = (experienceId: string) => {
    const experience = workExperience.find(exp => exp.id === experienceId);
    if (!experience) return;
    
    const newAchievements = [...experience.achievements, ''];
    updateWorkExperience(experienceId, { achievements: newAchievements });
  };
  
  const removeAchievement = (experienceId: string, index: number) => {
    const experience = workExperience.find(exp => exp.id === experienceId);
    if (!experience) return;
    
    const newAchievements = experience.achievements.filter((_, i) => i !== index);
    updateWorkExperience(experienceId, { achievements: newAchievements });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {workExperience.length === 0 && (
        <div className="text-center py-10 border border-dashed rounded-lg bg-muted/50">
          <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No work experience added</h3>
          <p className="text-muted-foreground mb-4">Add your work history to showcase your professional background</p>
          <Button onClick={addWorkExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </div>
      )}
      
      {workExperience.map((experience, index) => (
        <Card key={experience.id} className="relative group animate-scale-in">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeWorkExperience(experience.id)}
          >
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor={`position-${experience.id}`}>Position / Job Title</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => handleChange(experience.id, 'position', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
                  placeholder="Acme Inc."
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => handleChange(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={formatMonthYearForInput(experience.startDate)}
                    onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onCheckedChange={(checked) => handleChange(experience.id, 'current', checked)}
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">Current</Label>
                    </div>
                  </div>
                  
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={formatMonthYearForInput(experience.endDate)}
                    onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`description-${experience.id}`}>Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
                placeholder="Briefly describe your role and responsibilities"
                className="mt-1"
              />
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <Label>Key Achievements</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                  className="h-8 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-2 mt-2">
                {experience.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => handleAchievementChange(experience.id, i, e.target.value)}
                      placeholder="Increased revenue by 20% through..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAchievement(experience.id, i)}
                      className="h-10 w-10 flex-shrink-0"
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                
                {experience.achievements.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    Add specific accomplishments that highlight your impact
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {workExperience.length > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={addWorkExperience}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Position
        </Button>
      )}
    </div>
  );
}

export default ExperienceForm;
