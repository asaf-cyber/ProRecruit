'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Download, 
  Edit, 
  Plus,
  Tag,
  Clock,
  Calendar,
  User,
  Building2
} from 'lucide-react';

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

interface CandidateHeaderProps {
  candidate: Candidate;
  getStatusBadge: (status: string) => React.ReactElement;
}

export function CandidateHeader({ candidate, getStatusBadge }: CandidateHeaderProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-20 z-10">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 space-x-reverse">
          {/* Profile Picture */}
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          
          {/* Candidate Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 space-x-reverse mb-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {candidate.firstName} {candidate.lastName}
              </h1>
              {getStatusBadge(candidate.status)}
            </div>
            
            {/* Current Role */}
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Building2 size={16} className="ml-1" />
                {candidate.currentRole} ב-{candidate.company}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="ml-1" />
                {candidate.experience} ניסיון
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
              <div className="flex items-center">
                <Phone size={16} className="ml-1" />
                {candidate.phone}
              </div>
              <div className="flex items-center">
                <Mail size={16} className="ml-1" />
                {candidate.email}
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="ml-1" />
                {candidate.address}
              </div>
              <div className="flex items-center">
                <Linkedin size={16} className="ml-1" />
                <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50" title="ערוך מועמד">
            <Edit size={20} />
          </button>
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50" title="הורד קורות חיים">
            <Download size={20} />
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2">
            <Plus size={16} className="ml-2" />
            קבע ראיון
          </button>
        </div>
      </div>
      
      {/* Tags and Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm font-medium text-gray-700">תגים:</span>
            <div className="flex space-x-2 space-x-reverse">
              {candidate.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag size={12} className="ml-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium">מקור:</span>
              <span className="mr-2">{candidate.source}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">פעילות אחרונה:</span>
              <span className="mr-2">{new Date(candidate.lastActivity).toLocaleDateString('he-IL')}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">התקדמות בתהליך</span>
          <span className="text-sm text-gray-500">שלב 3 מתוך 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>הוגשה מועמדות</span>
          <span>שיחת טלפון</span>
          <span>בראיון</span>
          <span>הצעה</span>
          <span>הועסק</span>
        </div>
      </div>
    </div>
  );
} 