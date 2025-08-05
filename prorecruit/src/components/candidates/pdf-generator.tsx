'use client';

import { useState } from 'react';
import { 
  Download, 
  FileText, 
  Settings, 
  Eye,
  RefreshCw,
  CheckCircle,
  Building,
  Palette,
  Layout,
  Type,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  location: string;
  status: string;
  source: string;
  appliedDate: string;
  lastActivity: string;
  recruiter: string;
}

interface CompanyTemplate {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  headerStyle: 'modern' | 'classic' | 'minimal';
  layout: 'single-column' | 'two-column' | 'sidebar';
  includeCompanyInfo: boolean;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

interface PDFGeneratorProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (pdfBlob: Blob, template: CompanyTemplate) => void;
}

export function PDFGenerator({ candidate, isOpen, onClose, onGenerate }: PDFGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<CompanyTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'customize' | 'preview'>('templates');

  const defaultTemplates: CompanyTemplate[] = [
    {
      id: 'modern',
      name: 'מודרני',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      fontFamily: 'Inter',
      headerStyle: 'modern',
      layout: 'single-column',
      includeCompanyInfo: true,
      companyInfo: {
        name: 'ProRecruitment Solutions',
        address: 'רחוב הטכנולוגיה 1, תל אביב',
        phone: '03-1234567',
        email: 'info@prorecruitment.com',
        website: 'www.prorecruitment.com'
      }
    },
    {
      id: 'classic',
      name: 'קלאסי',
      primaryColor: '#059669',
      secondaryColor: '#047857',
      fontFamily: 'Times New Roman',
      headerStyle: 'classic',
      layout: 'two-column',
      includeCompanyInfo: true,
      companyInfo: {
        name: 'ProRecruitment Solutions',
        address: 'רחוב הטכנולוגיה 1, תל אביב',
        phone: '03-1234567',
        email: 'info@prorecruitment.com',
        website: 'www.prorecruitment.com'
      }
    },
    {
      id: 'minimal',
      name: 'מינימליסטי',
      primaryColor: '#6366F1',
      secondaryColor: '#4F46E5',
      fontFamily: 'Arial',
      headerStyle: 'minimal',
      layout: 'sidebar',
      includeCompanyInfo: false,
      companyInfo: {
        name: 'ProRecruitment Solutions',
        address: 'רחוב הטכנולוגיה 1, תל אביב',
        phone: '03-1234567',
        email: 'info@prorecruitment.com',
        website: 'www.prorecruitment.com'
      }
    }
  ];

  const [customTemplate, setCustomTemplate] = useState<CompanyTemplate>(defaultTemplates[0]);

  const generatePDF = async () => {
    const template = selectedTemplate || customTemplate;
    setIsGenerating(true);

    try {
      // Simulate PDF generation with company template
      await new Promise(resolve => setTimeout(resolve, 3000));

      const pdfContent = `
=== קורות חיים מסודרים ===
${template.includeCompanyInfo ? `
${template.companyInfo.name}
${template.companyInfo.address}
טל: ${template.companyInfo.phone}
מייל: ${template.companyInfo.email}
אתר: ${template.companyInfo.website}

-------------------
` : ''}

פרטי המועמד:
שם: ${candidate.firstName} ${candidate.lastName}
אימייל: ${candidate.email}
טלפון: ${candidate.phone}
תפקיד נוכחי: ${candidate.currentRole}
חברה נוכחית: ${candidate.company}
מיקום: ${candidate.location}

פרטי התהליך:
סטטוס: ${candidate.status}
מקור: ${candidate.source}
תאריך הגשה: ${candidate.appliedDate}
פעילות אחרונה: ${candidate.lastActivity}
מגייס אחראי: ${candidate.recruiter}

-------------------

תבנית עיצוב: ${template.name}
צבע ראשי: ${template.primaryColor}
פריסה: ${template.layout}
גופן: ${template.fontFamily}

נוצר במערכת ProRecruitment
תאריך יצירה: ${new Date().toLocaleDateString('he-IL')}
      `;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      onGenerate(blob, template);
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplatesTab = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">בחר תבנית</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {defaultTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => {
              setSelectedTemplate(template);
              setActiveTab('preview');
            }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="aspect-[3/4] mb-3 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
              <div
                className="w-full h-full p-2"
                style={{
                  background: `linear-gradient(135deg, ${template.primaryColor}22, ${template.secondaryColor}11)`
                }}  
              >
                <div
                  className="w-full h-6 rounded mb-2"
                  style={{ backgroundColor: template.primaryColor }}
                ></div>
                <div className="space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 bg-gray-300 dark:bg-gray-600 rounded"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{template.name}</h4>
            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: template.primaryColor }}
              ></div>
              <span>{template.layout}</span>
              <span>•</span>
              <span>{template.fontFamily}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomizeTab = () => (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">התאמה אישית</h3>
      
      {/* Colors */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Palette size={16} className="ml-2" />
          צבעים
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              צבע ראשי
            </label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="color"
                value={customTemplate.primaryColor}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  primaryColor: e.target.value
                })}
                className="w-12 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={customTemplate.primaryColor}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  primaryColor: e.target.value
                })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              צבע משני
            </label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="color"
                value={customTemplate.secondaryColor}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  secondaryColor: e.target.value
                })}
                className="w-12 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={customTemplate.secondaryColor}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  secondaryColor: e.target.value
                })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Layout size={16} className="ml-2" />
          פריסה
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'single-column', label: 'עמודה אחת' },
            { value: 'two-column', label: 'שתי עמודות' },
            { value: 'sidebar', label: 'סיידבר' }
          ].map((layout) => (
            <button
              key={layout.value}
              onClick={() => setCustomTemplate({
                ...customTemplate,
                layout: layout.value as any
              })}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                customTemplate.layout === layout.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 text-gray-700 dark:text-gray-300'
              }`}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Type size={16} className="ml-2" />
          גופן
        </h4>
        <select
          value={customTemplate.fontFamily}
          onChange={(e) => setCustomTemplate({
            ...customTemplate,
            fontFamily: e.target.value
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      {/* Company Info */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Building size={16} className="ml-2" />
          פרטי חברה
        </h4>
        
        <div className="mb-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={customTemplate.includeCompanyInfo}
              onChange={(e) => setCustomTemplate({
                ...customTemplate,
                includeCompanyInfo: e.target.checked
              })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
              כלול פרטי חברה ב-PDF
            </span>
          </label>
        </div>

        {customTemplate.includeCompanyInfo && (
          <div className="space-y-3">
            <input
              type="text"
              value={customTemplate.companyInfo.name}
              onChange={(e) => setCustomTemplate({
                ...customTemplate,
                companyInfo: {
                  ...customTemplate.companyInfo,
                  name: e.target.value
                }
              })}
              placeholder="שם החברה"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              value={customTemplate.companyInfo.address}
              onChange={(e) => setCustomTemplate({
                ...customTemplate,
                companyInfo: {
                  ...customTemplate.companyInfo,
                  address: e.target.value
                }
              })}
              placeholder="כתובת"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={customTemplate.companyInfo.phone}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  companyInfo: {
                    ...customTemplate.companyInfo,
                    phone: e.target.value
                  }
                })}
                placeholder="טלפון"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                value={customTemplate.companyInfo.email}
                onChange={(e) => setCustomTemplate({
                  ...customTemplate,
                  companyInfo: {
                    ...customTemplate.companyInfo,
                    email: e.target.value
                  }
                })}
                placeholder="אימייל"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <input
              type="text"
              value={customTemplate.companyInfo.website}
              onChange={(e) => setCustomTemplate({
                ...customTemplate,
                companyInfo: {
                  ...customTemplate.companyInfo,
                  website: e.target.value
                }
              })}
              placeholder="אתר אינטרנט"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderPreviewTab = () => {
    const template = selectedTemplate || customTemplate;
    
    return (
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">תצוגה מקדימה</h3>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <div 
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md mx-auto"
            style={{ fontFamily: template.fontFamily }}
          >
            {/* Header */}
            <div 
              className="p-4 rounded-lg mb-4 text-white"
              style={{ backgroundColor: template.primaryColor }}
            >
              <h2 className="text-xl font-bold">
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p className="text-sm opacity-90">{candidate.currentRole}</p>
            </div>

            {/* Company Info */}
            {template.includeCompanyInfo && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <h4 className="font-medium text-sm mb-2" style={{ color: template.secondaryColor }}>
                  {template.companyInfo.name}
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{template.companyInfo.address}</p>
                  <p>{template.companyInfo.phone} | {template.companyInfo.email}</p>
                </div>
              </div>
            )}

            {/* Candidate Info */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2" style={{ color: template.secondaryColor }}>
                  פרטי קשר
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{candidate.email}</p>
                  <p>{candidate.phone}</p>
                  <p>{candidate.location}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2" style={{ color: template.secondaryColor }}>
                  פרטי תהליך
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>סטטוס: {candidate.status}</p>
                  <p>מקור: {candidate.source}</p>
                  <p>מגייס: {candidate.recruiter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center justify-center mx-auto px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="animate-spin ml-2" />
                יוצר PDF...
              </>
            ) : (
              <>
                <Download size={20} className="ml-2" />
                יצר PDF
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">יצירת PDF מותאם</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {candidate.firstName} {candidate.lastName}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 space-x-reverse mt-4">
            {[
              { id: 'templates', label: 'תבניות', icon: Layout },
              { id: 'customize', label: 'התאמה', icon: Settings },
              { id: 'preview', label: 'תצוגה מקדימה', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
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
        <div className="flex-1 max-h-[60vh] overflow-y-auto">
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'customize' && renderCustomizeTab()}
          {activeTab === 'preview' && renderPreviewTab()}
        </div>
      </div>
    </div>
  );
}