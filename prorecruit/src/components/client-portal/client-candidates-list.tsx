'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  User,
  MapPin,
  Briefcase,
  Star,
  Phone,
  Mail
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  location: string;
  experience: string;
  education: string;
  status: 'active' | 'hired' | 'rejected' | 'interviewing';
  rating: number;
  phone: string;
  email: string;
  lastActivity: string;
  avatar?: string;
}

interface ClientCandidatesListProps {
  jobId: string;
  onBack: () => void;
}

export function ClientCandidatesList({ jobId, onBack }: ClientCandidatesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'דוד כהן',
      position: 'מפתח Full Stack',
      location: 'תל אביב',
      experience: '5 שנים',
      education: 'תואר ראשון במדעי המחשב',
      status: 'active',
      rating: 4.8,
      phone: '050-1234567',
      email: 'david.cohen@email.com',
      lastActivity: '2024-01-15'
    },
    {
      id: '2',
      name: 'שרה לוי',
      position: 'מנהלת פרויקטים',
      location: 'ירושלים',
      experience: '7 שנים',
      education: 'תואר שני בניהול',
      status: 'interviewing',
      rating: 4.6,
      phone: '052-9876543',
      email: 'sarah.levy@email.com',
      lastActivity: '2024-01-14'
    },
    {
      id: '3',
      name: 'יוסי רוזן',
      position: 'מעצב UX/UI',
      location: 'חיפה',
      experience: '3 שנים',
      education: 'תואר ראשון בעיצוב',
      status: 'hired',
      rating: 4.9,
      phone: '054-5555555',
      email: 'yossi.rozen@email.com',
      lastActivity: '2024-01-10'
    },
    {
      id: '4',
      name: 'מיכל גולדברג',
      position: 'מנתחת נתונים',
      location: 'באר שבע',
      experience: '4 שנים',
      education: 'תואר שני בסטטיסטיקה',
      status: 'rejected',
      rating: 4.2,
      phone: '053-1111111',
      email: 'michal.goldberg@email.com',
      lastActivity: '2024-01-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'interviewing':
        return 'בראיון';
      case 'hired':
        return 'הועסק';
      case 'rejected':
        return 'נדחה';
      default:
        return status;
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">מועמדים</h2>
          <p className="text-gray-600">ניהול מועמדים ותהליכי גיוס</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          הוסף מועמד
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש מועמדים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="active">פעיל</option>
            <option value="interviewing">בראיון</option>
            <option value="hired">הועסק</option>
            <option value="rejected">נדחה</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCandidate(candidate)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{candidate.rating}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 ml-2" />
                {candidate.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 ml-2" />
                {candidate.experience} ניסיון
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 ml-2" />
                פעילות אחרונה: {candidate.lastActivity}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                {getStatusText(candidate.status)}
              </span>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="צפייה">
                  <Eye size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="הורדת קורות חיים">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">פרטי מועמד</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedCandidate.name}</h4>
                  <p className="text-sm text-gray-600">{selectedCandidate.position}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 ml-2 text-gray-400" />
                  <span>{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 ml-2 text-gray-400" />
                  <span>{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 ml-2 text-gray-400" />
                  <span>{selectedCandidate.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Briefcase className="w-4 h-4 ml-2 text-gray-400" />
                  <span>{selectedCandidate.experience} ניסיון</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.status)}`}>
                  {getStatusText(selectedCandidate.status)}
                </span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{selectedCandidate.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{candidates.length}</div>
            <div className="text-sm text-gray-600">סה"כ מועמדים</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {candidates.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">פעילים</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {candidates.filter(c => c.status === 'interviewing').length}
            </div>
            <div className="text-sm text-gray-600">בראיון</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {candidates.filter(c => c.status === 'hired').length}
            </div>
            <div className="text-sm text-gray-600">הועסקו</div>
          </div>
        </div>
      </div>
    </div>
  );
} 