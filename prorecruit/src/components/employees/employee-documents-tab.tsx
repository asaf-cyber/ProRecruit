'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  File,
  Image,
} from 'lucide-react';

interface EmployeeDocumentsTabProps {
  employeeId: string;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'id' | 'salary' | 'performance' | 'training' | 'other';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'active' | 'expired' | 'pending';
  description?: string;
}

export function EmployeeDocumentsTab({ employeeId }: EmployeeDocumentsTabProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockDocuments: Document[] = [
      {
        id: '1',
        name: 'חוזה העסקה',
        type: 'contract',
        fileName: 'employment_contract_2023.pdf',
        fileSize: '2.5 MB',
        uploadDate: '2023-01-15',
        uploadedBy: 'שרה כהן',
        status: 'active',
        description: 'חוזה העסקה המקורי'
      },
      {
        id: '2',
        name: 'תעודת זהות',
        type: 'id',
        fileName: 'id_card.jpg',
        fileSize: '1.2 MB',
        uploadDate: '2023-01-10',
        uploadedBy: 'דוד לוי',
        status: 'active'
      },
      {
        id: '3',
        name: 'טפסי שכר - ינואר 2024',
        type: 'salary',
        fileName: 'salary_forms_jan_2024.pdf',
        fileSize: '3.1 MB',
        uploadDate: '2024-01-05',
        uploadedBy: 'מיכל רוזן',
        status: 'active'
      },
      {
        id: '4',
        name: 'סקירת ביצועים - Q4 2023',
        type: 'performance',
        fileName: 'performance_review_q4_2023.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2024-01-15',
        uploadedBy: 'יוסי כהן',
        status: 'active',
        description: 'סקירת ביצועים רבעונית'
      },
      {
        id: '5',
        name: 'תעודת הכשרה - React',
        type: 'training',
        fileName: 'react_certification.pdf',
        fileSize: '0.8 MB',
        uploadDate: '2023-12-20',
        uploadedBy: 'דוד לוי',
        status: 'active'
      },
      {
        id: '6',
        name: 'חוזה העסקה - גרסה ישנה',
        type: 'contract',
        fileName: 'old_employment_contract.pdf',
        fileSize: '2.1 MB',
        uploadDate: '2022-12-01',
        uploadedBy: 'שרה כהן',
        status: 'expired',
        description: 'חוזה העסקה הקודם - פג תוקף'
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'id':
        return <Image className="w-5 h-5 text-green-600" />;
      case 'salary':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'performance':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'training':
        return <FileText className="w-5 h-5 text-orange-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'contract': 'bg-blue-100 text-blue-800',
      'id': 'bg-green-100 text-green-800',
      'salary': 'bg-red-100 text-red-800',
      'performance': 'bg-purple-100 text-purple-800',
      'training': 'bg-orange-100 text-orange-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    const labels = {
      'contract': 'חוזה',
      'id': 'תעודה',
      'salary': 'שכר',
      'performance': 'ביצועים',
      'training': 'הכשרה',
      'other': 'אחר'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type as keyof typeof colors]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      'active': 'פעיל',
      'expired': 'פג תוקף',
      'pending': 'ממתין'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredDocuments = documents.filter(doc => {
    if (selectedType === 'all') return true;
    return doc.type === selectedType;
  });

  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    expired: documents.filter(d => d.status === 'expired').length,
    pending: documents.filter(d => d.status === 'pending').length
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">מסמכים</h2>
        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>העלה מסמך</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">סה"כ מסמכים</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">{stats.total}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FileText className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">פעילים</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">{stats.active}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FileText className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-900">פגי תוקף</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2">{stats.expired}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FileText className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-900">ממתינים</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm font-medium text-gray-700">סוג מסמך:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המסמכים</option>
            <option value="contract">חוזים</option>
            <option value="id">תעודות</option>
            <option value="salary">שכר</option>
            <option value="performance">ביצועים</option>
            <option value="training">הכשרות</option>
            <option value="other">אחר</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מסמך
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סוג
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  גודל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך העלאה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  הועלה על ידי
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
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {getDocumentIcon(document.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                        <div className="text-sm text-gray-500">{document.fileName}</div>
                        {document.description && (
                          <div className="text-xs text-gray-400">{document.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getTypeBadge(document.type)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {document.fileSize}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(document.uploadDate).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {document.uploadedBy}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(document.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">אין מסמכים</p>
        </div>
      )}
    </div>
  );
} 