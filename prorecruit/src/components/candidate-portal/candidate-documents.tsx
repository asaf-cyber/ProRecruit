'use client';

import { useState, useRef } from 'react';
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  FileText, 
  File, 
  Image, 
  FileArchive,
  Calendar,
  User,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface CandidateDocument {
  id: string;
  name: string;
  type: 'cv' | 'certificate' | 'portfolio' | 'other';
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'active' | 'archived' | 'pending';
  url: string;
  description?: string;
}

export function CandidateDocuments() {
  const [documents, setDocuments] = useState<CandidateDocument[]>([
    {
      id: '1',
      name: 'קורות חיים - דוד כהן.pdf',
      type: 'cv',
      size: '2.3 MB',
      uploadedAt: '2024-01-10',
      uploadedBy: 'דוד כהן',
      status: 'active',
      url: '/documents/cv-david-cohen.pdf',
      description: 'קורות חיים מעודכנים'
    },
    {
      id: '2',
      name: 'תעודת הסמכה React.pdf',
      type: 'certificate',
      size: '1.1 MB',
      uploadedAt: '2024-01-08',
      uploadedBy: 'דוד כהן',
      status: 'active',
      url: '/documents/react-certificate.pdf',
      description: 'תעודת הסמכה בקורס React'
    },
    {
      id: '3',
      name: 'פורטפוליו פרויקטים.zip',
      type: 'portfolio',
      size: '15.7 MB',
      uploadedAt: '2024-01-05',
      uploadedBy: 'דוד כהן',
      status: 'active',
      url: '/documents/portfolio.zip',
      description: 'אוסף פרויקטים לדוגמה'
    },
    {
      id: '4',
      name: 'מכתב המלצה.pdf',
      type: 'other',
      size: '0.8 MB',
      uploadedAt: '2024-01-03',
      uploadedBy: 'דוד כהן',
      status: 'active',
      url: '/documents/recommendation.pdf',
      description: 'מכתב המלצה מהמעסיק הקודם'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'cv':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'certificate':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'portfolio':
        return <FileArchive className="w-5 h-5 text-purple-600" />;
      case 'other':
        return <File className="w-5 h-5 text-gray-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDocumentTypeText = (type: string) => {
    switch (type) {
      case 'cv':
        return 'קורות חיים';
      case 'certificate':
        return 'תעודה';
      case 'portfolio':
        return 'פורטפוליו';
      case 'other':
        return 'אחר';
      default:
        return 'מסמך';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'archived':
        return 'בארכיון';
      case 'pending':
        return 'ממתין';
      default:
        return 'לא ידוע';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newDocument: CandidateDocument = {
        id: Date.now().toString(),
        name: files[0].name,
        type: 'other',
        size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: 'דוד כהן',
        status: 'active',
        url: `/documents/${files[0].name}`,
        description: ''
      };

      setDocuments(prev => [newDocument, ...prev]);
      setUploading(false);
      setShowUploadModal(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleDeleteDocument = (documentId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק מסמך זה?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    }
  };

  const handleDownload = (document: CandidateDocument) => {
    // In real app, this would trigger actual file download
    const link = window.document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handleView = (document: CandidateDocument) => {
    // In real app, this would open document preview
    window.open(document.url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">מסמכים</h1>
          <p className="text-gray-600">ניהול קבצים ומסמכים</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>העלה מסמך</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">סה&quot;כ מסמכים</p>
              <p className="text-xl font-semibold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">קורות חיים</p>
              <p className="text-xl font-semibold text-gray-900">
                {documents.filter(d => d.type === 'cv').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileArchive className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">פורטפוליו</p>
              <p className="text-xl font-semibold text-gray-900">
                {documents.filter(d => d.type === 'portfolio').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">תעודות</p>
              <p className="text-xl font-semibold text-gray-900">
                {documents.filter(d => d.type === 'certificate').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש במסמכים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסוגים</option>
            <option value="cv">קורות חיים</option>
            <option value="certificate">תעודות</option>
            <option value="portfolio">פורטפוליו</option>
            <option value="other">אחר</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="active">פעיל</option>
            <option value="archived">בארכיון</option>
            <option value="pending">ממתין</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">רשימת מסמכים</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <div key={document.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {getDocumentTypeIcon(document.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 space-x-reverse mb-1">
                        <h3 className="font-medium text-gray-900">{document.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                          {getStatusText(document.status)}
                        </span>
                        <span className="text-xs text-gray-500">{getDocumentTypeText(document.type)}</span>
                      </div>
                      {document.description && (
                        <p className="text-sm text-gray-600 mb-1">{document.description}</p>
                      )}
                      <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(document.uploadedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <User className="w-3 h-3" />
                          <span>{document.uploadedBy}</span>
                        </div>
                        <span>{document.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleView(document)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="צפה במסמך"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="הורד מסמך"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(document.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="מחק מסמך"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">לא נמצאו מסמכים</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">העלה מסמך חדש</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  סוג מסמך
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="cv">קורות חיים</option>
                  <option value="certificate">תעודה</option>
                  <option value="portfolio">פורטפוליו</option>
                  <option value="other">אחר</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור (אופציונלי)
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="תיאור קצר של המסמך..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  בחר קובץ
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    גרור קובץ לכאן או לחץ לבחירה
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.zip,.rar,.jpg,.jpeg,.png"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    disabled={uploading}
                  >
                    {uploading ? 'מעלה...' : 'בחר קובץ'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                ביטול
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={uploading}
              >
                {uploading ? 'מעלה...' : 'העלה'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 