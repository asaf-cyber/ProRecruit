'use client';

import { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  User, 
  Star,
  Edit,
  Trash2,
  AtSign
} from 'lucide-react';

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  isPrivate: boolean;
  mentions: string[];
}

interface InterviewFeedback {
  id: string;
  interviewer: string;
  date: string;
  overallScore: number;
  technicalScore: number;
  teamFitScore: number;
  detailedFeedback: string;
  recommendation: 'pass' | 'fail' | 'hold';
}

interface CandidateNotesProps {
  candidateId: string;
}

export function CandidateNotes({ candidateId }: CandidateNotesProps) {
  const [activeTab, setActiveTab] = useState('notes');
  const [newNote, setNewNote] = useState('');
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    overallScore: 5,
    technicalScore: 5,
    teamFitScore: 5,
    detailedFeedback: '',
    recommendation: 'pass'
  });

  // Mock notes data
  const notes: Note[] = [
    {
      id: '1',
      content: 'המועמד מתעניין מאוד בתפקיד ומתאים לתרבות החברה. @שרה_כהן כדאי לקדם אותו לשלב הבא.',
      author: 'דוד לוי',
      timestamp: '2024-01-15T14:30:00',
      isPrivate: true,
      mentions: ['שרה_כהן']
    },
    {
      id: '2',
      content: 'שיחה טלפונית ראשונית - המועמד נראה מקצועי ומתאים לתפקיד. יש לו ניסיון רלוונטי.',
      author: 'מיכל ישראלי',
      timestamp: '2024-01-16T10:15:00',
      isPrivate: true,
      mentions: []
    }
  ];

  // Mock feedback data
  const feedback: InterviewFeedback[] = [
    {
      id: '1',
      interviewer: 'יוסי גולדברג',
      date: '2024-01-17',
      overallScore: 8,
      technicalScore: 9,
      teamFitScore: 7,
      detailedFeedback: 'מועמד מצוין מבחינה טכנית. יש לו ניסיון רב ב-React ו-Node.js. מבחינת התאמה לצוות - נראה טוב אבל צריך לראות איך הוא מתנהג בסביבת עבודה.',
      recommendation: 'pass'
    }
  ];

  const getRecommendationBadge = (recommendation: string) => {
    const config = {
      pass: { label: 'העברה', color: 'bg-green-100 text-green-800' },
      fail: { label: 'דחייה', color: 'bg-red-100 text-red-800' },
      hold: { label: 'החזקה', color: 'bg-yellow-100 text-yellow-800' }
    };
    
    const rec = config[recommendation as keyof typeof config];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rec.color}`}>
        {rec.label}
      </span>
    );
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= score ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would typically save to backend
      console.log('Adding new note:', newNote);
      setNewNote('');
    }
  };

  const handleAddFeedback = () => {
    if (newFeedback.detailedFeedback.trim()) {
      // Here you would typically save to backend
      console.log('Adding new feedback:', newFeedback);
      setShowAddFeedback(false);
      setNewFeedback({
        overallScore: 5,
        technicalScore: 5,
        teamFitScore: 5,
        detailedFeedback: '',
        recommendation: 'pass'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 space-x-reverse">
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            הערות פנימיות
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'feedback'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            משוב מראיונות
          </button>
        </nav>
      </div>

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">הערות פנימיות</h3>
          </div>

          {/* Add Note */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="כתוב הערה... (השתמש ב-@ כדי לתייג משתמשים)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <AtSign size={14} />
                    <span>תייג משתמשים עם @</span>
                  </div>
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    הוסף הערה
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="font-medium text-gray-900">{note.author}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(note.timestamp).toLocaleDateString('he-IL')} {new Date(note.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {note.isPrivate && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">פנימי</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button className="p-1 rounded hover:bg-gray-100">
                          <Edit size={14} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                    {note.mentions.length > 0 && (
                      <div className="flex items-center space-x-2 space-x-reverse mt-2">
                        <span className="text-xs text-gray-500">מתויגים:</span>
                        {note.mentions.map((mention, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            @{mention}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">משוב מראיונות</h3>
            <button
              onClick={() => setShowAddFeedback(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
            >
              <Plus size={16} className="ml-2" />
              הוסף משוב
            </button>
          </div>

          {/* Add Feedback Modal */}
          {showAddFeedback && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">הוסף משוב ראיונות</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ציון כללי</label>
                      {renderStars(newFeedback.overallScore)}
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={newFeedback.overallScore}
                        onChange={(e) => setNewFeedback({ ...newFeedback, overallScore: parseInt(e.target.value) })}
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">יכולות טכניות</label>
                      {renderStars(newFeedback.technicalScore)}
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={newFeedback.technicalScore}
                        onChange={(e) => setNewFeedback({ ...newFeedback, technicalScore: parseInt(e.target.value) })}
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">התאמה לצוות</label>
                      {renderStars(newFeedback.teamFitScore)}
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={newFeedback.teamFitScore}
                        onChange={(e) => setNewFeedback({ ...newFeedback, teamFitScore: parseInt(e.target.value) })}
                        className="w-full mt-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">המלצה</label>
                    <select
                      value={newFeedback.recommendation}
                      onChange={(e) => setNewFeedback({ ...newFeedback, recommendation: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pass">העברה</option>
                      <option value="fail">דחייה</option>
                      <option value="hold">החזקה</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">הערות מפורטות</label>
                    <textarea
                      value={newFeedback.detailedFeedback}
                      onChange={(e) => setNewFeedback({ ...newFeedback, detailedFeedback: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="תיאור מפורט של המשוב..."
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
                  <button
                    onClick={() => setShowAddFeedback(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={handleAddFeedback}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    הוסף משוב
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback List */}
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.interviewer}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  {getRecommendationBadge(item.recommendation)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">ציון כללי:</span>
                    <div className="mt-1">{renderStars(item.overallScore)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">יכולות טכניות:</span>
                    <div className="mt-1">{renderStars(item.technicalScore)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">התאמה לצוות:</span>
                    <div className="mt-1">{renderStars(item.teamFitScore)}</div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">הערות מפורטות:</span>
                  <p className="mt-1 text-gray-700">{item.detailedFeedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 