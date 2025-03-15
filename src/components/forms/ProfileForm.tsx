
import { useResume } from '@/contexts/ResumeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ProfileForm() {
  const { resumeData, updateProfile } = useResume();
  const { profile } = resumeData;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile(e.target.value);
  };
  
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div>
          <Label htmlFor="profile">Professional Summary</Label>
          <Textarea
            id="profile"
            value={profile}
            onChange={handleChange}
            placeholder="Write a compelling summary of your professional background, skills, and career objectives..."
            className="mt-1 min-h-[150px]"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Keep your summary concise (3-5 sentences) and focused on your key strengths and career goals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileForm;
