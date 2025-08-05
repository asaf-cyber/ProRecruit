'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  MessageCircle, 
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Brain,
  TrendingUp,
  Users,
  FileText,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  matchScore: number;
  lastUpdated: string;
  status: 'active' | 'contacted' | 'placed' | 'archived';
  source: 'upload' | 'referral' | 'linkedin' | 'website';
  referredBy?: string;
  aiInsights: string;
  originalResume: string;
  standardizedResume: string;
  lastContact?: string;
  notes?: string;
}

interface CVSmartTableProps {
  skills: string[];
  experience: string;
  location: string;
  searchQuery: string;
}

export function CVSmartTable({
  skills,
  experience,
  location,
  searchQuery
}: CVSmartTableProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'matchScore' | 'name' | 'lastUpdated'>('matchScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        name: 'דוד לוי',
        email: 'david.levy@email.com',
        phone: '050-1234567',
        location: 'תל אביב',
        experience: '5 שנים',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        matchScore: 95,
        lastUpdated: '2024-01-15',
        status: 'active',
        source: 'upload',
        aiInsights: 'מומחה בפיתוח Full Stack עם ניסיון ב-3 חברות סטארט-אפ בתחום הסייבר',
        originalResume: '/resumes/david_levy_original.pdf',
        standardizedResume: '/resumes/david_levy_standard.pdf'
      },
      {
        id: '2',
        name: 'שרה כהן',
        email: 'sarah.cohen@email.com',
        phone: '052-9876543',
        location: 'ירושלים',
        experience: '3 שנים',
        skills: ['Python', 'Machine Learning', 'Data Science', 'AWS'],
        matchScore: 88,
        lastUpdated: '2024-01-14',
        status: 'contacted',
        source: 'referral',
        referredBy: 'יוסי כהן',
        aiInsights: 'Data Scientist עם התמחות ב-NLP וניסיון בפרויקטים של Big Data',
        originalResume: '/resumes/sarah_cohen_original.pdf',
        standardizedResume: '/resumes/sarah_cohen_standard.pdf',
        lastContact: '2024-01-10'
      },
      {
        id: '3',
        name: 'מיכאל רוזנברג',
        email: 'michael.rosenberg@email.com',
        phone: '054-5551234',
        location: 'חיפה',
        experience: '7 שנים',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
        matchScore: 92,
        lastUpdated: '2024-01-13',
        status: 'active',
        source: 'linkedin',
        aiInsights: 'DevOps Engineer מוביל עם ניסיון בבניית תשתיות ענן מורכבות',
        originalResume: '/resumes/michael_rosenberg_original.pdf',
        standardizedResume: '/resumes/michael_rosenberg_standard.pdf'
      },
      {
        id: '4',
        name: 'נועה אברהם',
        email: 'noa.abraham@email.com',
        phone: '050-7778889',
        location: 'באר שבע',
        experience: '2 שנים',
        skills: ['JavaScript', 'React', 'CSS', 'HTML'],
        matchScore: 75,
        lastUpdated: '2024-01-12',
        status: 'active',
        source: 'website',
        aiInsights: 'Frontend Developer צעירה עם כישרון לעיצוב UI/UX',
        originalResume: '/resumes/noa_abraham_original.pdf',
        standardizedResume: '/resumes/noa_abraham_standard.pdf'
      }
    ];
    setCandidates(mockCandidates);
  }, []);

  // Filter and sort candidates
  useEffect(() => {
    let filtered = candidates;

    // Apply filters
    if (skills.length > 0) {
      filtered = filtered.filter(candidate =>
        skills.some(skill => candidate.skills.includes(skill))
      );
    }

    if (experience !== 'all') {
      const experienceYears = parseInt(experience);
      filtered = filtered.filter(candidate => {
        const candidateYears = parseInt(candidate.experience);
        switch (experience) {
          case 'junior': return candidateYears <= 3;
          case 'mid': return candidateYears > 3 && candidateYears <= 5;
          case 'senior': return candidateYears > 5;
          default: return true;
        }
      });
    }

    if (location !== 'all') {
      filtered = filtered.filter(candidate => candidate.location === location);
    }

    if (searchQuery) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candidate.aiInsights.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort candidates
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'matchScore':
          comparison = a.matchScore - b.matchScore;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'lastUpdated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredCandidates(filtered);
    setCurrentPage(1);
  }, [candidates, skills, experience, location, searchQuery, sortBy, sortOrder]);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'placed': return 'bg-purple-100 text-purple-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Candidate['status']) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'contacted': return 'נוצר קשר';
      case 'placed': return 'הוצב';
      case 'archived': return 'בארכיון';
    }
  };

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h3 className="text-lg font-semibold text-gray-900">מועמדים במאגר</h3>
            <span className="text-sm text-gray-500">
              {filteredCandidates.length} מתוך {candidates.length} מועמדים
            </span>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            {selectedCandidates.length > 0 && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm text-gray-600">
                  נבחרו {selectedCandidates.length} מועמדים
                </span>
                <button className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>שלח הודעה</span>
                </button>
              </div>
            )}
            
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="flex items-center space-x-1 space-x-reverse px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span>המלצות AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Recommendations Panel */}
      {showRecommendations && (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <Brain className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium text-purple-900">המלצות AI חכמות</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">מועמדים מובילים</span>
              </div>
              <p className="text-xs text-gray-600">דוד לוי ומיכאל רוזנברג מתאימים במיוחד למשרות Full Stack ו-DevOps</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">הפניות מומלצות</span>
              </div>
              <p className="text-xs text-gray-600">שרה כהן הופנתה על ידי עובד פנימי - מעקב אחר 6 חודשי העסקה</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">פעולות נדרשות</span>
              </div>
              <p className="text-xs text-gray-600">נועה אברהם לא נוצר קשר מזה 2 שבועות - מומלץ ליצור קשר</p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right">
                <input
                  type="checkbox"
                  checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מועמד
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('matchScore')}
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>ציון התאמה</span>
                  {sortBy === 'matchScore' && (
                    <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                כישורים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מיקום
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>עודכן לאחרונה</span>
                  {sortBy === 'lastUpdated' && (
                    <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleSelectCandidate(candidate.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                      <div className="text-xs text-gray-400">{candidate.experience} ניסיון</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${candidate.matchScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{candidate.matchScore}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{candidate.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(candidate.lastUpdated).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                    {getStatusText(candidate.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              מציג {((currentPage - 1) * itemsPerPage) + 1} עד {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} מתוך {filteredCandidates.length} תוצאות
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                הקודם
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                הבא
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 