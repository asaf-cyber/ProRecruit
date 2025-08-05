'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  Users, 
  Building, 
  Calendar,
  FileText,
  Mail,
  Phone,
  Laptop,
  Key,
  Plus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: 'employee' | 'manager' | 'hr' | 'it' | 'finance';
  dueDate: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'documentation' | 'equipment' | 'access' | 'meeting' | 'training';
  isAutomated: boolean;
}

interface OnboardingChecklistProps {
  employeeId: string;
  employeeName: string;
  department: string;
}

export function OnboardingChecklist({ employeeId, employeeName, department }: OnboardingChecklistProps) {
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddTask, setShowAddTask] = useState(false);

  // Mock data - תבנית מותאמת למפתח תוכנה
  const mockTasks: OnboardingTask[] = [
    {
      id: '1',
      title: 'מילוי טופס קליטה דיגיטלי',
      description: 'העובד צריך למלא טופס קליטה מקוון עם פרטים אישיים ומקצועיים',
      status: 'completed',
      assignedTo: 'employee',
      dueDate: '2024-01-20',
      completedDate: '2024-01-18',
      priority: 'high',
      category: 'documentation',
      isAutomated: true
    },
    {
      id: '2',
      title: 'הזמנת ציוד מחשב',
      description: 'הזמנת מחשב נייד, עכבר, מקלדת וציוד נוסף לעובד',
      status: 'in_progress',
      assignedTo: 'it',
      dueDate: '2024-01-25',
      priority: 'high',
      category: 'equipment',
      isAutomated: false
    },
    {
      id: '3',
      title: 'הגדרת הרשאות מערכות',
      description: 'יצירת חשבון Gmail, Slack, CRM ושאר מערכות החברה',
      status: 'todo',
      assignedTo: 'it',
      dueDate: '2024-01-26',
      priority: 'high',
      category: 'access',
      isAutomated: true
    },
    {
      id: '4',
      title: 'פגישת היכרות עם המנהל',
      description: 'פגישה ראשונית עם המנהל הישיר להכרות ותיאום ציפיות',
      status: 'todo',
      assignedTo: 'manager',
      dueDate: '2024-01-27',
      priority: 'medium',
      category: 'meeting',
      isAutomated: false
    },
    {
      id: '5',
      title: 'הכנת כרטיס עובד',
      description: 'יצירת כרטיס עובד עם תמונה ופרטים בסיסיים',
      status: 'todo',
      assignedTo: 'hr',
      dueDate: '2024-01-28',
      priority: 'low',
      category: 'documentation',
      isAutomated: false
    },
    {
      id: '6',
      title: 'הדרכה על מערכות החברה',
      description: 'הדרכה מקוונת על השימוש במערכות החברה והנהלים',
      status: 'todo',
      assignedTo: 'hr',
      dueDate: '2024-01-29',
      priority: 'medium',
      category: 'training',
      isAutomated: true
    }
  ];

  const categories = [
    { value: 'all', label: 'כל הקטגוריות', icon: FileText },
    { value: 'documentation', label: 'מסמכים', icon: FileText },
    { value: 'equipment', label: 'ציוד', icon: Laptop },
    { value: 'access', label: 'הרשאות', icon: Key },
    { value: 'meeting', label: 'פגישות', icon: Users },
    { value: 'training', label: 'הדרכות', icon: Building }
  ];

  const getStatusColor = (status: OnboardingTask['status']) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: OnboardingTask['status']) => {
    switch (status) {
      case 'todo': return 'לעשות';
      case 'in_progress': return 'בתהליך';
      case 'completed': return 'הושלם';
      case 'overdue': return 'עבר זמנו';
    }
  };

  const getStatusIcon = (status: OnboardingTask['status']) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAssignedToText = (assignedTo: OnboardingTask['assignedTo']) => {
    switch (assignedTo) {
      case 'employee': return 'עובד';
      case 'manager': return 'מנהל';
      case 'hr': return 'משאבי אנוש';
      case 'it': return 'IT';
      case 'finance': return 'כספים';
    }
  };

  const getPriorityColor = (priority: OnboardingTask['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
    }
  };

  const filteredTasks = selectedCategory === 'all' 
    ? mockTasks 
    : mockTasks.filter(task => task.category === selectedCategory);

  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">רשימת משימות קליטה</h3>
          <p className="text-sm text-gray-600">עובד: {employeeName} | מחלקה: {department}</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>הוסף משימה</span>
        </button>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">התקדמות כללית</span>
          <span className="text-sm text-gray-500">{completedTasks}/{totalTasks} משימות הושלמו</span>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">{progressPercentage}%</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(task.status)}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'גבוה' : task.priority === 'medium' ? 'בינוני' : 'נמוך'}
                  </span>
                  {task.isAutomated && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      אוטומטי
                    </span>
                  )}
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span>{getAssignedToText(task.assignedTo)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>יעד: {new Date(task.dueDate).toLocaleDateString('he-IL')}</span>
                  </div>
                  {task.completedDate && (
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>הושלם: {new Date(task.completedDate).toLocaleDateString('he-IL')}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse mr-4">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין משימות בקטגוריה זו</h3>
          <p className="mt-1 text-sm text-gray-500">
            בחר קטגוריה אחרת או הוסף משימה חדשה.
          </p>
        </div>
      )}
    </div>
  );
} 