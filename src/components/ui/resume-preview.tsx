
import { useEffect, useRef, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useResume } from '@/contexts/ResumeContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumePreviewProps {
  data: ResumeData;
  template: React.ReactNode;
  className?: string;
}

export function ResumePreview({ data, template, className }: ResumePreviewProps) {
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { saveToLocalStorage } = useResume();

  // Ensure personal info is not empty
  const hasPersonalInfo = data.personalInfo.firstName || data.personalInfo.lastName;

  const generatePDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we prepare your resume."
      });
      
      const resumeElement = resumeRef.current;
      
      // Save current scale
      const currentScale = scale;
      // Reset scale for PDF generation
      setScale(1);
      
      // Wait for the next render cycle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const name = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_resume`.replace(/\s+/g, '_').toLowerCase();
      pdf.save(`${name || 'resume'}.pdf`);
      
      // Restore scale
      setScale(currentScale);
      
      toast({
        title: "PDF Generated!",
        description: "Your resume has been downloaded as a PDF file."
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "Error generating PDF",
        description: "Please try again or contact support."
      });
      
      // Restore scale in case of error
      setScale(1);
    }
  };

  const printResume = () => {
    if (!resumeRef.current) return;
    
    try {
      const originalScale = scale;
      setScale(1);
      
      // Wait for state update to apply
      setTimeout(() => {
        window.print();
        // Reset scale after print dialog is closed
        setTimeout(() => {
          setScale(originalScale);
        }, 500);
      }, 100);
    } catch (error) {
      console.error('Error printing resume:', error);
      toast({
        variant: "destructive",
        title: "Error printing resume",
        description: "Please try again or contact support."
      });
    }
  };

  const handleZoomIn = () => {
    if (scale < 2) {
      setScale(prev => prev + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.5) {
      setScale(prev => prev - 0.1);
    }
  };

  // Auto-save when resume data changes
  useEffect(() => {
    if (hasPersonalInfo) {
      const saveTimer = setTimeout(() => {
        saveToLocalStorage();
      }, 2000);
      
      return () => clearTimeout(saveTimer);
    }
  }, [data, hasPersonalInfo, saveToLocalStorage]);

  // Add console log to debug the template
  console.log("Resume template to render:", template);
  console.log("Resume data:", data);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="transition-all hover:bg-muted"
          >
            <ZoomOut size={18} />
          </Button>
          
          <span className="text-sm font-medium w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 2}
            className="transition-all hover:bg-muted"
          >
            <ZoomIn size={18} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={printResume}
            className="transition-all hover:bg-muted"
          >
            <Printer size={16} className="mr-2" />
            Print
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={generatePDF}
            className="transition-all"
          >
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="bg-slate-100 rounded-lg p-8 flex-1 overflow-auto">
        <div
          ref={resumeRef}
          className="bg-white shadow-lg mx-auto transition-all"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: '210mm', // A4 width
            height: '297mm', // A4 height
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {template ? template : <div className="p-8 text-center text-gray-500">No template selected</div>}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
