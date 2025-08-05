'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Star, 
  Calendar,
  User,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

interface EmployeePerformanceTabProps {
  employeeId: string;
}

interface PerformanceReview {
  id: string;
  date: string;
  reviewer: string;
  overallScore: number;
  categories: {
    technical: number;
    communication: number;
    leadership: number;
    teamwork: number;
    initiative: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  comments: string;
  status: 'completed' | 'pending' | 'overdue';
}

interface Feedback360 {
  id: string;
  date: string;
  reviewer: string;
  reviewerRole: 'manager' | 'peer' | 'subordinate';
  overallRating: number;
  comments: string;
  strengths: string[];
  areasForImprovement: string[];
}

export function EmployeePerformanceTab({ employeeId }: EmployeePerformanceTabProps) {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [feedback360, setFeedback360] = useState<Feedback360[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockReviews: PerformanceReview[] = [
      {
        id: '1',
        date: '2024-01-15',
        reviewer: 'שרה כהן',
        overallScore: 92,
        categories: {
          technical: 95,
          communication: 88,
          leadership: 85,
          teamwork: 90,
          initiative: 94
        },
        strengths: [
          'יכולות טכניות מעולות',
          'עבודת צוות מצוינת',
          'יוזמה גבוהה'
        ],
        areasForImprovement: [
          'יכולות מנהיגות',
          'תקשורת עם לקוחות'
        ],
        goals: [
          'השתתפות בקורס מנהיגות',
          'שיפור מיומנויות תקשורת'
        ],
        comments: 'עובד מצוין עם פוטנציאל גבוה. מומלץ לפתח יכולות מנהיגות.',
        status: 'completed'
      },
      {
        id: '2',
        date: '2023-07-15',
        reviewer: 'דוד לוי',
        overallScore: 88,
        categories: {
          technical: 90,
          communication: 85,
          leadership: 80,
          teamwork: 88,
          initiative: 87
        },
        strengths: [
          'יכולות טכניות טובות',
          'עבודת צוות'
        ],
        areasForImprovement: [
          'יוזמה',
          'יכולות מנהיגות'
        ],
        goals: [
          'לקיחת אחריות על פרויקטים',
          'שיפור יוזמה'
        ],
        comments: 'עובד טוב עם מקום לשיפור. התקדמות טובה.',
        status: 'completed'
      }
    ];

    const mockFeedback360: Feedback360[] = [
      {
        id: '1',
        date: '2024-01-10',
        reviewer: 'מיכל רוזן',
        reviewerRole: 'peer',
        overallRating: 4.5,
        comments: 'עובד מצוין, תמיד מוכן לעזור ולשתף ידע.',
        strengths: ['ידע טכני', 'עזרה לעמיתים'],
        areasForImprovement: ['תקשורת עם מנהלים']
      },
      {
        id: '2',
        date: '2024-01-08',
        reviewer: 'יוסי כהן',
        reviewerRole: 'subordinate',
        overallRating: 4.2,
        comments: 'מנהל טוב, מסביר היטב ומדריך בצורה ברורה.',
        strengths: ['הדרכה', 'סבלנות'],
        areasForImprovement: ['זמינות']
      }
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      setFeedback360(mockFeedback360);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

  const getStatusBadge = (status: string) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    const labels = {
      'completed': 'הושלם',
      'pending': 'ממתין',
      'overdue': 'מעוכב'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      'manager': 'מנהל',
      'peer': 'עמית',
      'subordinate': 'כפיף'
    };
    return labels[role as keyof typeof labels] || role;
  };

  const averageScore = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.overallScore, 0) / reviews.length 
    : 0;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">ביצועים ומשוב</h2>
        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>סקירת ביצועים חדשה</span>
        </button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">ציון ממוצע</span>
          </div>
          <div className={`text-3xl font-bold mt-2 ${getScoreColor(averageScore)}`}>
            {averageScore.toFixed(1)}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">סקירות ביצועים</span>
          </div>
          <div className="text-3xl font-bold text-green-600 mt-2">{reviews.length}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">משוב 360°</span>
          </div>
          <div className="text-3xl font-bold text-purple-600 mt-2">{feedback360.length}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">התקדמות</span>
          </div>
          <div className="text-3xl font-bold text-orange-600 mt-2">+12%</div>
        </div>
      </div>

      {/* Performance Reviews */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">סקירות ביצועים</h3>
        
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`text-2xl font-bold ${getScoreColor(review.overallScore)}`}>
                    {review.overallScore}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">סקירת ביצועים</h4>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(review.date).toLocaleDateString('he-IL')}</span>
                      <User className="w-4 h-4" />
                      <span>מבקר: {review.reviewer}</span>
                      {getStatusBadge(review.status)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">טכני</div>
                  <div className={`text-lg font-bold ${getScoreColor(review.categories.technical)}`}>
                    {review.categories.technical}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">תקשורת</div>
                  <div className={`text-lg font-bold ${getScoreColor(review.categories.communication)}`}>
                    {review.categories.communication}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">מנהיגות</div>
                  <div className={`text-lg font-bold ${getScoreColor(review.categories.leadership)}`}>
                    {review.categories.leadership}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">עבודת צוות</div>
                  <div className={`text-lg font-bold ${getScoreColor(review.categories.teamwork)}`}>
                    {review.categories.teamwork}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">יוזמה</div>
                  <div className={`text-lg font-bold ${getScoreColor(review.categories.initiative)}`}>
                    {review.categories.initiative}
                  </div>
                </div>
              </div>
              
              {/* Strengths and Areas for Improvement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 mb-2">חוזקות</h5>
                  <ul className="space-y-1">
                    {review.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-700 mb-2">תחומים לשיפור</h5>
                  <ul className="space-y-1">
                    {review.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-sm text-gray-600">• {area}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {review.comments && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">הערות</h5>
                  <p className="text-sm text-gray-600">{review.comments}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 360° Feedback */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">משוב 360°</h3>
        
        <div className="space-y-4">
          {feedback360.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {getRatingStars(feedback.overallRating)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feedback.reviewer}</h4>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                      <span>{getRoleLabel(feedback.reviewerRole)}</span>
                      <span>•</span>
                      <span>{new Date(feedback.date).toLocaleDateString('he-IL')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{feedback.comments}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 mb-1 text-sm">חוזקות</h5>
                  <ul className="space-y-1">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-xs text-gray-600">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-700 mb-1 text-sm">תחומים לשיפור</h5>
                  <ul className="space-y-1">
                    {feedback.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-xs text-gray-600">• {area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {feedback360.length === 0 && (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">אין משוב 360° זמין</p>
          </div>
        )}
      </div>
    </div>
  );
} 