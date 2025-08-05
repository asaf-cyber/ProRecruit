'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Upload,
  MessageSquare
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'ממתין' | 'בתהליך' | 'הושלם' | 'בוטל';
  priority: 'נמוך' | 'בינוני' | 'גבוה';
  type: 'פיתוח' | 'תחזוקה' | 'ייעוץ' | 'אימון' | 'אחר';
  assignedBy: string;
  dueDate: string;
  progress: number;
  attachments: string[];
  comments: number;
}

export function VendorTasksTable({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'פיתוח מודול ניהול משתמשים',
      description: 'פיתוח מערכת ניהול משתמשים עם הרשאות מתקדמות',
      status: 'בתהליך',
      priority: 'גבוה',
      type: 'פיתוח',
      assignedBy: 'שרה כהן',
      dueDate: '2024-01-15',
      progress: 75,
      attachments: ['requirements.pdf', 'design.docx'],
      comments: 8
    },
    {
      id: 2,
      title: 'תחזוקת שרת ייצור',
      description: 'בדיקת תקינות ותחזוקה שוטפת לשרת הייצור',
      status: 'ממתין',
      priority: 'בינוני',
      type: 'תחזוקה',
      assignedBy: 'דוד לוי',
      dueDate: '2024-01-20',
      progress: 0,
      attachments: ['server-specs.pdf'],
      comments: 3
    },
    {
      id: 3,
      title: 'ייעוץ אבטחה',
      description: 'בדיקת אבטחה למערכת החדשה',
      status: 'הושלם',
      priority: 'נמוך',
      type: 'ייעוץ',
      assignedBy: 'מיכל רוזן',
      dueDate: '2024-01-10',
      progress: 100,
      attachments: ['security-report.pdf', 'recommendations.docx'],
      comments: 12
    },
    {
      id: 4,
      title: 'אימון צוות פיתוח',
      description: 'הדרכה על טכנולוגיות חדשות',
      status: 'בתהליך',
      priority: 'בינוני',
      type: 'אימון',
      assignedBy: 'יוסי כהן',
      dueDate: '2024-01-25',
      progress: 40,
      attachments: ['training-materials.zip'],
      comments: 5
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const colors = {
      'ממתין': 'bg-gray-100 text-gray-800',
      'בתהליך': 'bg-yellow-100 text-yellow-800',
      'הושלם': 'bg-green-100 text-green-800',
      'בוטל': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'נמוך': 'bg-green-100 text-green-800',
      'בינוני': 'bg-yellow-100 text-yellow-800',
      'גבוה': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {priority}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'פיתוח': 'bg-blue-100 text-blue-800',
      'תחזוקה': 'bg-green-100 text-green-800',
      'ייעוץ': 'bg-purple-100 text-purple-800',
      'אימון': 'bg-orange-100 text-orange-800',
      'אחר': 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type as keyof typeof colors]}`}>
        {type}
      </span>
    );
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setShowStatusModal(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש משימות..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">כל הסטטוסים</option>
              <option value="ממתין">ממתין</option>
              <option value="בתהליך">בתהליך</option>
              <option value="הושלם">הושלם</option>
              <option value="בוטל">בוטל</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">כל העדיפויות</option>
              <option value="נמוך">נמוך</option>
              <option value="בינוני">בינוני</option>
              <option value="גבוה">גבוה</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  משימה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סוג
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  עדיפות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  התקדמות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך יעד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        הוקצה על ידי: {task.assignedBy}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getTypeBadge(task.type)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="px-6 py-4">
                    {getPriorityBadge(task.priority)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowStatusModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        עדכן סטטוס
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowAttachmentModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">עדכן סטטוס משימה</h3>
            <p className="text-gray-600 mb-4">{selectedTask.title}</p>
            <div className="space-y-2">
              {(['ממתין', 'בתהליך', 'הושלם', 'בוטל'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => updateTaskStatus(selectedTask.id, status)}
                  className="w-full text-right p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {status}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Attachment Modal */}
      {showAttachmentModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">קבצים מצורפים</h3>
            <p className="text-gray-600 mb-4">{selectedTask.title}</p>
            
            <div className="space-y-2 mb-4">
              {selectedTask.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{file}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">הורד</button>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">גרור קבצים לכאן או לחץ לבחירה</p>
              <input type="file" className="hidden" multiple />
            </div>

            <button
              onClick={() => setShowAttachmentModal(false)}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 