'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  Brain,
  File
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'original' | 'standardized' | 'client_summary';
  candidateId: string;
  candidateName: string;
  createdAt: string;
  fileSize: string;
  status: 'ready' | 'generating' | 'error';
  url: string;
}

interface ClientSummary {
  id: string;
  candidateId: string;
  candidateName: string;
  resumeFile: string;
  aiSummary: string;
  phoneCallNotes: string;
  createdAt: string;
  status: 'draft' | 'ready' | 'sent';
}

export function CVDocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [clientSummaries, setClientSummaries] = useState<ClientSummary[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [showCreateSummary, setShowCreateSummary] = useState(false);
  const [phoneCallNotes, setPhoneCallNotes] = useState('');

  // Mock data
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'דוד לוי - קורות חיים מקוריים',
      type: 'original',
      candidateId: '1',
      candidateName: 'דוד לוי',
      createdAt: '2024-01-15',
      fileSize: '2.3 MB',
      status: 'ready',
      url: '/resumes/david_levy_original.pdf'
    },
    {
      id: '2',
      name: 'דוד לוי - קורות חיים אחידים',
      type: 'standardized',
      candidateId: '1',
      candidateName: 'דוד לוי',
      createdAt: '2024-01-15',
      fileSize: '1.8 MB',
      status: 'ready',
      url: '/resumes/david_levy_standard.pdf'
    },
    {
      id: '3',
      name: 'שרה כהן - סיכום ללקוח',
      type: 'client_summary',
      candidateId: '2',
      candidateName: 'שרה כהן',
      createdAt: '2024-01-14',
      fileSize: '3.1 MB',
      status: 'ready',
      url: '/summaries/sarah_cohen_client_summary.pdf'
    }
  ];

  const mockClientSummaries: ClientSummary[] = [
    {
      id: '1',
      candidateId: '2',
      candidateName: 'שרה כהן',
      resumeFile: '/resumes/sarah_cohen_standard.pdf',
      aiSummary: 'Data Scientist מוכשרת עם התמחות ב-NLP וניסיון בפרויקטים של Big Data. עבדה ב-2 חברות טכנולוגיה מובילות ומומחית בפיתוח מודלים של למידת מכונה.',
      phoneCallNotes: 'שרה מאוד מעוניינת במשרות בתחום ה-AI/ML. זמינה לפגישה בשבוע הבא. דיברה על ניסיון שלה עם Python, TensorFlow ו-PyTorch.',
      createdAt: '2024-01-14',
      status: 'ready'
    }
  ];

  const handleCreateClientSummary = () => {
    if (selectedCandidate && phoneCallNotes.trim()) {
      const newSummary: ClientSummary = {
        id: Date.now().toString(),
        candidateId: selectedCandidate,
        candidateName: 'דוד לוי', // In real app, get from selected candidate
        resumeFile: '/resumes/david_levy_standard.pdf',
        aiSummary: 'מומחה בפיתוח Full Stack עם ניסיון ב-3 חברות סטארט-אפ בתחום הסייבר. מומחיות ב-React, Node.js ו-TypeScript.',
        phoneCallNotes: phoneCallNotes,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'draft'
      };
      
      setClientSummaries([...clientSummaries, newSummary]);
      setPhoneCallNotes('');
      setShowCreateSummary(false);
    }
  };

  const getDocumentTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'original': return <FileText className="w-4 h-4 text-gray-600" />;
              case 'standardized': return <File className="w-4 h-4 text-blue-600" />;
      case 'client_summary': return <MessageSquare className="w-4 h-4 text-purple-600" />;
    }
  };

  const getDocumentTypeText = (type: Document['type']) => {
    switch (type) {
      case 'original': return 'מקורי';
      case 'standardized': return 'אחיד';
      case 'client_summary': return 'סיכום ללקוח';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'generating': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Management Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">ניהול מסמכים</h2>
              <p className="text-gray-600">יצירת מסמכים אחידים וסיכומים ללקוחות</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateSummary(true)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>צור סיכום ללקוח</span>
          </button>
        </div>
      </div>

      {/* Create Client Summary Modal */}
      {showCreateSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">צור סיכום מועמד ללקוח</h3>
              <button
                onClick={() => setShowCreateSummary(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  בחר מועמד
                </label>
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">בחר מועמד...</option>
                  <option value="1">דוד לוי - Full Stack Developer</option>
                  <option value="2">שרה כהן - Data Scientist</option>
                  <option value="3">מיכאל רוזנברג - DevOps Engineer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  סיכום שיחה טלפונית
                </label>
                <textarea
                  value={phoneCallNotes}
                  onChange={(e) => setPhoneCallNotes(e.target.value)}
                  placeholder="תכתוב כאן את סיכום השיחה עם המועמד..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">AI ייצור אוטומטית:</span>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• קובץ PDF מעוצב עם קורות החיים האחידים</li>
                  <li>• סיכום מבוסס AI של המועמד</li>
                  <li>• מסמך מאוחד עם סיכום השיחה</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowCreateSummary(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleCreateClientSummary}
                disabled={!selectedCandidate || !phoneCallNotes.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                צור מסמך
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">מסמכים במערכת</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockDocuments.map((document) => (
            <div key={document.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {getDocumentTypeIcon(document.type)}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{document.name}</h4>
                    <div className="flex items-center space-x-4 space-x-reverse mt-1">
                      <span className="text-xs text-gray-500">{document.candidateName}</span>
                      <span className="text-xs text-gray-500">{document.fileSize}</span>
                      <span className="text-xs text-gray-500">{document.createdAt}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {getDocumentTypeText(document.type)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getStatusIcon(document.status)}
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-purple-600 hover:text-purple-900">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Summaries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">סיכומים ללקוחות</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockClientSummaries.map((summary) => (
            <div key={summary.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{summary.candidateName}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      summary.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {summary.status === 'ready' ? 'מוכן' : 'טיוטה'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">סיכום AI:</h5>
                      <p className="text-sm text-gray-600">{summary.aiSummary}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-2">הערות שיחה:</h5>
                      <p className="text-sm text-gray-600">{summary.phoneCallNotes}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse mt-3 text-xs text-gray-500">
                    <span>נוצר: {summary.createdAt}</span>
                    <span>קובץ: {summary.resumeFile.split('/').pop()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse mr-4">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-purple-600 hover:text-purple-900">
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 