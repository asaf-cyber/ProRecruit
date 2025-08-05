'use client';

import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Download, 
  Edit, 
  Plus,
  Building2,
  GraduationCap,
  FileText,
  Search,
  Eye,
  Calendar,
  User,
  Briefcase,
  Trash2,
  Save,
  X,
  EditIcon
} from 'lucide-react';
import { FileViewerModal } from './file-viewer-modal';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  currentRole: string;
  company: string;
  experience: string;
  education: string;
  source: string;
  status: string;
  tags: string[];
  lastActivity: string;
  resumeUrl: string;
  uniformResumeUrl: string;
}

interface CandidateDetailsProps {
  candidate: Candidate;
}

export function CandidateDetails({ candidate }: CandidateDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    id: string;
    name: string;
    type: 'pdf' | 'doc' | 'docx' | 'image';
    url: string;
    size?: string;
    uploadDate?: string;
    candidateName: string;
  } | null>(null);

  // Mock work experience data
  const workExperience = [
    {
      id: '1',
      company: 'TechCorp',
      role: 'מפתח Full Stack',
      period: '2022 - הווה',
      description: 'פיתוח אפליקציות web מתקדמות עם React, Node.js ו-Python'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'מפתח Frontend',
      period: '2020 - 2022',
      description: 'פיתוח ממשקי משתמש עם React ו-TypeScript'
    },
    {
      id: '3',
      company: 'BigTech Inc',
      role: 'מתכנת מתחיל',
      period: '2019 - 2020',
      description: 'פיתוח אפליקציות Java ו-Spring Boot'
    }
  ];

  // Mock education data
  const education = [
    {
      id: '1',
      institution: 'אוניברסיטת תל אביב',
      degree: 'תואר ראשון במדעי המחשב',
      period: '2016 - 2019',
      gpa: '85'
    },
    {
      id: '2',
      institution: 'בית הספר התיכון',
      degree: 'תעודת בגרות',
      period: '2012 - 2016',
      gpa: '95'
    }
  ];

  // Mock skills data
  const skills = [
    { name: 'JavaScript', level: 'מתקדם' },
    { name: 'React', level: 'מתקדם' },
    { name: 'Node.js', level: 'מתקדם' },
    { name: 'Python', level: 'בינוני' },
    { name: 'TypeScript', level: 'מתקדם' },
    { name: 'SQL', level: 'בינוני' },
    { name: 'Git', level: 'מתקדם' },
    { name: 'Docker', level: 'בינוני' }
  ];

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">מידע אישי</h3>
            <div className="flex items-center space-x-1 space-x-reverse">
              <button
                onClick={() => alert('מציג פרטי מועמד')}
                className="p-2 rounded-lg hover:bg-gray-200 text-blue-600"
                title="צפה"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-lg hover:bg-gray-200 text-green-600"
                title="ערוך"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => confirm('האם אתה בטוח שברצונך למחוק את המידע האישי?')}
                className="p-2 rounded-lg hover:bg-gray-200 text-red-600"
                title="מחק"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">שם מלא</label>
              <p className="mt-1 text-sm text-gray-900">{candidate.firstName} {candidate.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">טלפון</label>
              <div className="mt-1 flex items-center">
                <Phone size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.phone}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">אימייל</label>
              <div className="mt-1 flex items-center">
                <Mail size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">כתובת</label>
              <div className="mt-1 flex items-center">
                <MapPin size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.address}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <div className="mt-1 flex items-center">
                <Linkedin size={16} className="ml-2 text-gray-400" />
                <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
                  {candidate.linkedin}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">מידע מקצועי</h3>
            <div className="flex items-center space-x-1 space-x-reverse">
              <button
                onClick={() => alert('מציג מידע מקצועי')}
                className="p-2 rounded-lg hover:bg-gray-200 text-blue-600"
                title="צפה"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => alert('עורך מידע מקצועי')}
                className="p-2 rounded-lg hover:bg-gray-200 text-green-600"
                title="ערוך"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => confirm('האם אתה בטוח שברצונך למחוק את המידע המקצועי?')}
                className="p-2 rounded-lg hover:bg-gray-200 text-red-600"
                title="מחק"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">תפקיד נוכחי</label>
              <div className="mt-1 flex items-center">
                <Building2 size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.currentRole} ב-{candidate.company}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ניסיון</label>
              <div className="mt-1 flex items-center">
                <Briefcase size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.experience}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">השכלה</label>
              <div className="mt-1 flex items-center">
                <GraduationCap size={16} className="ml-2 text-gray-400" />
                <p className="text-sm text-gray-900">{candidate.education}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">מקור</label>
              <p className="mt-1 text-sm text-gray-900">{candidate.source}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">קורות חיים</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">קובץ מקורי</h4>
              <div className="flex space-x-2 space-x-reverse">
                <button 
                  onClick={() => setSelectedFile({
                    id: '1',
                    name: 'resume.pdf',
                    type: 'pdf',
                    url: candidate.resumeUrl,
                    size: '2.3 MB',
                    uploadDate: '2024-01-15',
                    candidateName: `${candidate.firstName} ${candidate.lastName}`
                  })}
                  className="p-1 rounded hover:bg-gray-200" 
                  title="צפייה"
                >
                  <Eye size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-200" title="הורדה">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <FileText size={20} className="text-gray-400 ml-2" />
              <span className="text-sm text-gray-600">resume.pdf</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">פורמט אחיד</h4>
              <div className="flex space-x-2 space-x-reverse">
                <button 
                  onClick={() => setSelectedFile({
                    id: '2',
                    name: 'uniform-resume.pdf',
                    type: 'pdf',
                    url: candidate.uniformResumeUrl,
                    size: '1.8 MB',
                    uploadDate: '2024-01-15',
                    candidateName: `${candidate.firstName} ${candidate.lastName}`
                  })}
                  className="p-1 rounded hover:bg-gray-200" 
                  title="צפייה"
                >
                  <Eye size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-200" title="חיפוש בקורות חיים">
                  <Search size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-200" title="הורדה">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <FileText size={20} className="text-gray-400 ml-2" />
              <span className="text-sm text-gray-600">uniform-resume.pdf</span>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">ניסיון תעסוקתי</h3>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <Plus size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          {workExperience.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{job.role}</h4>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.period}</p>
                  <p className="text-sm text-gray-700 mt-2">{job.description}</p>
                </div>
                <button className="p-1 rounded hover:bg-gray-200">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">השכלה</h3>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <Plus size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.period}</p>
                  <p className="text-sm text-gray-700 mt-2">ממוצע: {edu.gpa}</p>
                </div>
                <button className="p-1 rounded hover:bg-gray-200">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">כישורים טכניים</h3>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {skill.name} - {skill.level}
            </span>
          ))}
        </div>
      </div>

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={selectedFile !== null}
        onClose={() => setSelectedFile(null)}
        file={selectedFile}
      />
    </div>
  );
} 