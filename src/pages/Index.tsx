
import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { resumeTemplates } from '@/components/resume/templates';
import { getTemplateById } from '@/components/resume/templates';
import ResumePreview from '@/components/ui/resume-preview';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ProfileForm from '@/components/forms/ProfileForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import { Download, FileText, Save, User } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { resumeData, theme, setTheme, saveToLocalStorage, loadSampleData } = useResume();
  const [activeTab, setActiveTab] = useState('edit');

  const handleSave = () => {
    const saved = saveToLocalStorage();
    if (saved) {
      toast.success('Resume saved successfully');
    }
  };

  const handleLoadSample = () => {
    loadSampleData();
    toast.success('Sample resume loaded');
  };

  console.log("Current theme:", theme);
  console.log("Available templates:", resumeTemplates.map(t => t.id));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <FileText className="mr-2" /> Resume Builder
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleLoadSample}>
              Load Sample
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {/* Template selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-700">Template:</span>
              <select
                className="border rounded p-1 text-sm"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {resumeTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TabsContent value="edit" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left sidebar - form navigation */}
              <div className="md:col-span-1">
                <Card className="p-4">
                  <h2 className="text-lg font-medium mb-4">Resume Sections</h2>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Experience
                    </Button>
                    {/* Add more section buttons as needed */}
                  </div>
                </Card>
              </div>

              {/* Right area - forms */}
              <div className="md:col-span-2">
                <Card className="p-6">
                  <PersonalInfoForm />
                  <ProfileForm />
                  <ExperienceForm />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-[calc(100vh-200px)]">
            <Card className="h-full">
              <ResumePreview 
                data={resumeData} 
                template={getTemplateById(theme, resumeData)}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
