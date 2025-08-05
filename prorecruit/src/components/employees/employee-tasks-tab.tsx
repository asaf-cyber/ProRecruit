'use client';

import { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Clock, 
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User
} from 'lucide-react';

interface EmployeeTasksTabProps {
  employeeId: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedBy: string;
  assignedDate: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
}

export function EmployeeTasksTab({ employeeId }: EmployeeTasksTabProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'פיתוח דף לוגין חדש',
        description: 'יצירת דף לוגין עם אימות דו-שלבי',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2024-01-20',
        assignedBy: 'שרה כהן',
        assignedDate: '2024-01-10',
        estimatedHours: 16,
        actualHours: 8
      },
      {
        id: '2',
        title: 'בדיקת קוד - מודול תשלומים',
        description: 'בדיקת קוד מקיפה למודול תשלומים',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-01-25',
        assignedBy: 'דוד לוי',
        assignedDate: '2024-01-12',
        estimatedHours: 8
      },
      {
        id: '3',
        title: 'תיעוד API',
        description: 'כתיבת תיעוד מלא ל-API החדש',
        status: 'done',
        priority: 'low',
        dueDate: '2024-01-15',
        assignedBy: 'מיכל רוזן',
        assignedDate: '2024-01-08',
        completedDate: '2024-01-14',
        estimatedHours: 4,
        actualHours: 3
      },
      {
        id: '4',
        title: 'אופטימיזציה של ביצועים',
        description: 'שיפור ביצועי המערכת',
        status: 'todo',
        priority: 'high',
        dueDate: '2024-01-30',
        assignedBy: 'יוסי כהן',
        assignedDate: '2024-01-15',
        estimatedHours: 20
      }
    ];

    setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

  const getStatusBadge = (status: string) => {
    const colors = {
      'todo': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'done': 'bg-green-100 text-green-800'
    };
    const labels = {
      'todo': 'לעשות',
      'in_progress': 'בתהליך',
      'done': 'הושלם'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    const labels = {
      'low': 'נמוך',
      'medium': 'בינוני',
      'high': 'גבוה'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {labels[priority as keyof typeof labels]}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return <Square className="w-4 h-4 text-gray-400" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'done':
        return <CheckSquare className="w-4 h-4 text-green-600" />;
      default:
        return <Square className="w-4 h-4 text-gray-400" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'all') return true;
    return task.status === selectedStatus;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => isOverdue(t.dueDate)).length
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
        <h2 className="text-xl font-semibold text-gray-900">ניהול משימות</h2>
        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>הוסף משימה</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <CheckSquare className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">סה"כ</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Square className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">לעשות</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{stats.todo}</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">בתהליך</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">{stats.inProgress}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">הושלם</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">{stats.done}</div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-900">מעוכב</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2">{stats.overdue}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm font-medium text-gray-700">סטטוס:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המשימות</option>
            <option value="todo">לעשות</option>
            <option value="in_progress">בתהליך</option>
            <option value="done">הושלם</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse flex-1">
                {getStatusIcon(task.status)}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                    {isOverdue(task.dueDate) && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        מעוכב
                      </span>
                    )}
                    {isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        קרוב למועד
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>מועד יעד: {new Date(task.dueDate).toLocaleDateString('he-IL')}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <User className="w-4 h-4" />
                      <span>הוקצה על ידי: {task.assignedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="w-4 h-4" />
                      <span>שעות משוערות: {task.estimatedHours}</span>
                    </div>
                    {task.actualHours && (
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <CheckCircle className="w-4 h-4" />
                        <span>שעות בפועל: {task.actualHours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">אין משימות</p>
        </div>
      )}
    </div>
  );
} 