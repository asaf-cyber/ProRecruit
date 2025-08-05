'use client';

import { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Settings,
  Zap,
  Brain,
  X,
  Edit,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  Calendar,
  Star
} from 'lucide-react';

interface ParsedCV {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn?: string;
    website?: string;
  };
  professionalSummary: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa?: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications: {
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
  confidence: number;
}

interface CVParserProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (parsedData: ParsedCV, generatedPDF?: Blob) => void;
}

export function CVParser({ isOpen, onClose, onSave }: CVParserProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedCV | null>(null);
  const [generatedPDF, setGeneratedPDF] = useState<Blob | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'preview' | 'edit'>('upload');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setActiveTab('preview');
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      setActiveTab('preview');
    }
  };

  const parseCV = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock parsed data based on file name and type
      const mockParsedData: ParsedCV = {
        personalInfo: {
          firstName: 'דניאל',
          lastName: 'שמואל',
          email: 'daniel.samuel@email.com',
          phone: '+972-54-123-4567',
          address: 'תל אביב, ישראל',
          linkedIn: 'linkedin.com/in/daniel-samuel',
          website: 'danielsamuel.dev'
        },
        professionalSummary: 'מפתח Full Stack בעל 5 שנות ניסיון בפיתוח אפליקציות web ו-mobile מתקדמות. מתמחה ב-React, Node.js ו-Python. ניסיון רב בעבודה עם צוותים גדולים ופרויקטים מורכבים.',
        experience: [
          {
            company: 'TechCorp Ltd',
            position: 'Senior Full Stack Developer',
            startDate: '2021-03',
            endDate: 'נוכחי',
            description: 'פיתוח והובלת פרויקטים מורכבים בטכנולוגיות מתקדמות',
            achievements: [
              'פיתח מערכת CRM שהגדילה יעילות המכירות ב-40%',
              'הוביל צוות של 5 מפתחים',
              'יישם ארכיטקטורת microservices'
            ]
          },
          {
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            startDate: '2019-01',
            endDate: '2021-02',
            description: 'פיתוח מוצר מאפס בסביבה של סטארטאפ',
            achievements: [
              'בנה את המוצר הראשי של החברה',
              'עבד ישירות עם מייסדים ומשקיעים',
              'פיתח API המשרת מעל מיליון משתמשים'
            ]
          }
        ],
        education: [
          {
            institution: 'אוניברסיטת תל אביב',
            degree: 'תואר ראשון',
            field: 'מדעי המחשב',
            graduationYear: '2018',
            gpa: '90'
          }
        ],
        skills: {
          technical: ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB'],
          soft: ['הנהגת צוותים', 'פתרון בעיות', 'יצירתיות', 'תקשורת'],
          languages: ['עברית - שפת אם', 'אנגלית - רמה גבוהה', 'ספרדית - רמה בסיסית']
        },
        certifications: [
          {
            name: 'AWS Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2022-06',
            expiryDate: '2025-06'
          },
          {
            name: 'React Advanced Patterns',
            issuer: 'Meta',
            date: '2021-12'
          }
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'פלטפורמת מסחר אלקטרוני מלאה עם ניהול מלאי ותשלומים',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            url: 'github.com/daniel/ecommerce'
          },
          {
            name: 'Task Management App',
            description: 'אפליקציית ניהול משימות עם יכולות שיתוף בזמן אמת',
            technologies: ['React Native', 'Firebase', 'Redux'],
            url: 'taskmaster.app'
          }
        ],
        confidence: 92
      };

      setParsedData(mockParsedData);
      setActiveTab('edit');
    } catch (error) {
      console.error('Error parsing CV:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateStandardizedPDF = async () => {
    if (!parsedData) return;

    setIsGeneratingPDF(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock PDF blob
      const pdfContent = `
CV חדש - ${parsedData.personalInfo.firstName} ${parsedData.personalInfo.lastName}

פרטים אישיים:
שם: ${parsedData.personalInfo.firstName} ${parsedData.personalInfo.lastName}
אימייל: ${parsedData.personalInfo.email}
טלפון: ${parsedData.personalInfo.phone}
כתובת: ${parsedData.personalInfo.address}

תקציר מקצועי:
${parsedData.professionalSummary}

ניסיון תעסוקתי:
${parsedData.experience.map(exp => `
${exp.position} ב-${exp.company} (${exp.startDate} - ${exp.endDate})
${exp.description}
`).join('\n')}

השכלה:
${parsedData.education.map(edu => `
${edu.degree} ב-${edu.field}, ${edu.institution} (${edu.graduationYear})
`).join('\n')}

מיומנויות טכניות:
${parsedData.skills.technical.join(', ')}

נוצר באמצעות מערכת ProRecruitment
`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      setGeneratedPDF(blob);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSave = () => {
    if (parsedData) {
      onSave(parsedData, generatedPDF || undefined);
      onClose();
    }
  };

  const renderUploadTab = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <Brain size={48} className="mx-auto text-orange-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          העלאת קורות חיים לעיבוד AI
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          העלה קובץ קורות חיים והמערכת תנתח ותסדר אותו באופן אוטומטי
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-orange-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          גרור קובץ לכאן או לחץ להעלאה
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          תומך בקבצי PDF, DOC, DOCX (עד 10MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText size={20} className="text-blue-600 ml-2" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={parseCV}
              disabled={isProcessing}
              className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg transition-colors"
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={16} className="animate-spin ml-2" />
                  מעבד...
                </>
              ) : (
                <>
                  <Zap size={16} className="ml-2" />
                  עבד עם AI
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderEditTab = () => {
    if (!parsedData) return null;

    return (
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <User size={16} className="ml-2" />
              פרטים אישיים
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  שם פרטי
                </label>
                <input
                  type="text"
                  value={parsedData.personalInfo.firstName}
                  onChange={(e) => setParsedData({
                    ...parsedData,
                    personalInfo: { ...parsedData.personalInfo, firstName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  שם משפחה
                </label>
                <input
                  type="text"
                  value={parsedData.personalInfo.lastName}
                  onChange={(e) => setParsedData({
                    ...parsedData,
                    personalInfo: { ...parsedData.personalInfo, lastName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  אימייל
                </label>
                <input
                  type="email"
                  value={parsedData.personalInfo.email}
                  onChange={(e) => setParsedData({
                    ...parsedData,
                    personalInfo: { ...parsedData.personalInfo, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  טלפון
                </label>
                <input
                  type="tel"
                  value={parsedData.personalInfo.phone}
                  onChange={(e) => setParsedData({
                    ...parsedData,
                    personalInfo: { ...parsedData.personalInfo, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Star size={16} className="ml-2" />
              תקציר מקצועי
            </h4>
            <textarea
              value={parsedData.professionalSummary}
              onChange={(e) => setParsedData({
                ...parsedData,
                professionalSummary: e.target.value
              })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Experience */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Briefcase size={16} className="ml-2" />
              ניסיון תעסוקתי
            </h4>
            <div className="space-y-4">
              {parsedData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <input
                      type="text"
                      value={exp.position}
                      placeholder="תפקיד"
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      placeholder="חברה"
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    placeholder="תיאור התפקיד"
                    rows={2}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Zap size={16} className="ml-2" />
              מיומנויות
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  מיומנויות טכניות
                </label>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">עיבוד קורות חיים</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">ניתוח וסידור אוטומטי באמצעות AI</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              {parsedData && (
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircle size={16} className="ml-1" />
                  רמת ביטחון: {parsedData.confidence}%
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 space-x-reverse mt-4">
            {[
              { id: 'upload', label: 'העלאה', icon: Upload },
              { id: 'preview', label: 'תצוגה מקדימה', icon: Eye, disabled: !uploadedFile },
              { id: 'edit', label: 'עריכה', icon: Edit, disabled: !parsedData }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
                  disabled={tab.disabled}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                      : tab.disabled
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'upload' && renderUploadTab()}
          {activeTab === 'preview' && uploadedFile && (
            <div className="p-6 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                קובץ מועלה: {uploadedFile.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                לחץ על "עבד עם AI" כדי להתחיל בניתוח הקובץ
              </p>
              <button
                onClick={parseCV}
                disabled={isProcessing}
                className="flex items-center justify-center mx-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg transition-colors"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={20} className="animate-spin ml-2" />
                    מעבד קורות חיים...
                  </>
                ) : (
                  <>
                    <Brain size={20} className="ml-2" />
                    עבד עם AI
                  </>
                )}
              </button>
            </div>
          )}
          {activeTab === 'edit' && renderEditTab()}
        </div>

        {/* Footer */}
        {parsedData && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={generateStandardizedPDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  {isGeneratingPDF ? (
                    <>
                      <RefreshCw size={16} className="animate-spin ml-2" />
                      יוצר PDF...
                    </>
                  ) : (
                    <>
                      <Download size={16} className="ml-2" />
                      יצר PDF מסודר
                    </>
                  )}
                </button>
                
                {generatedPDF && (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircle size={14} className="ml-1" />
                    PDF מוכן להורדה
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} className="ml-2" />
                  שמור מועמד
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}