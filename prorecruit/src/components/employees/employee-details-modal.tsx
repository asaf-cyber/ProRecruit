'use client';

import { useState, useEffect } from 'react';
import {
  X,
  User,
  Edit,
  Save,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  CreditCard,
  FileText,
  Clock,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  Star,
  Users,
  Target,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Briefcase,
  Heart,
  Home,
  Car,
  Baby,
  Plus,
  Minus,
  Eye,
  EyeOff
} from 'lucide-react';

interface EmployeeDetails {
  id: string;
  // פרטים אישיים
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalPhone?: string;
  dateOfBirth: string;
  idNumber: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // פרטי עבודה
  employeeNumber: string;
  position: string;
  department: string;
  manager: string;
  hireDate: string;
  employmentType: 'full_time' | 'part_time' | 'contractor' | 'intern';
  workLocation: 'office' | 'remote' | 'hybrid';
  salary: number;
  salaryType: 'monthly' | 'hourly';
  
  // כישורים וחינוך
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    field: string;
  }>;
  skills: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }>;
  
  // ביצועים וקריירה
  performanceScore: number;
  goals: Array<{
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    dueDate: string;
  }>;
  promotions: Array<{
    date: string;
    from: string;
    to: string;
    reason: string;
  }>;
  
  // בנפיטים וחופשות
  vacationDays: {
    total: number;
    used: number;
    remaining: number;
  };
  sickDays: {
    total: number;
    used: number;
    remaining: number;
  };
  benefits: Array<{
    type: string;
    description: string;
    value?: number;
  }>;
  
  // מסמכים וקבצים
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
  }>;
  
  // סטטוס ובטיחות
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  riskLevel: 'low' | 'medium' | 'high';
  securityClearance?: string;
  accessPermissions: string[];
  
  // הערות ופעילות
  notes: Array<{
    id: string;
    content: string;
    author: string;
    date: string;
    type: 'general' | 'performance' | 'disciplinary' | 'achievement';
  }>;
}

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  mode: 'view' | 'edit';
  onModeChange: (mode: 'view' | 'edit') => void;
}

export function EmployeeDetailsModal({ 
  isOpen, 
  onClose, 
  employeeId, 
  mode, 
  onModeChange 
}: EmployeeDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  useEffect(() => {
    if (isOpen && employeeId) {
      loadEmployeeDetails();
    }
  }, [isOpen, employeeId]);

  const loadEmployeeDetails = async () => {
    setIsLoading(true);
    // Mock data - בפועל זה יגיע מה-API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockEmployee: EmployeeDetails = {
      id: employeeId,
      firstName: 'דוד',
      lastName: 'לוי',
      email: 'david.levy@company.com',
      phone: '050-1234567',
      personalPhone: '052-9876543',
      dateOfBirth: '1990-05-15',
      idNumber: '123456789',
      address: 'רחוב הרצל 123, תל אביב',
      emergencyContact: {
        name: 'שרה לוי',
        relationship: 'אשה',
        phone: '050-9876543'
      },
      employeeNumber: 'EMP001',
      position: 'מפתח Full Stack Senior',
      department: 'פיתוח',
      manager: 'שרה כהן',
      hireDate: '2023-01-15',
      employmentType: 'full_time',
      workLocation: 'hybrid',
      salary: 25000,
      salaryType: 'monthly',
      education: [
        {
          degree: 'תואר ראשון',
          institution: 'האוניברסיטה העברית',
          year: '2015',
          field: 'מדעי המחשב'
        },
        {
          degree: 'תואר שני',
          institution: 'הטכניון',
          year: '2017',
          field: 'הנדסת תוכנה'
        }
      ],
      skills: [
        { name: 'React', level: 'expert', category: 'Frontend' },
        { name: 'Node.js', level: 'advanced', category: 'Backend' },
        { name: 'TypeScript', level: 'expert', category: 'Programming' },
        { name: 'AWS', level: 'intermediate', category: 'Cloud' }
      ],
      certifications: [
        {
          name: 'AWS Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023-03-15',
          expiryDate: '2026-03-15'
        }
      ],
      performanceScore: 92,
      goals: [
        {
          title: 'השלמת פרויקט האפליקציה החדשה',
          description: 'פיתוח וההשקה של אפליקציית המובייל החדשה',
          status: 'in_progress',
          dueDate: '2024-06-30'
        }
      ],
      promotions: [
        {
          date: '2023-07-01',
          from: 'מפתח Full Stack',
          to: 'מפתח Full Stack Senior',
          reason: 'ביצועים מצוינים ומנהיגות טכנית'
        }
      ],
      vacationDays: { total: 22, used: 8, remaining: 14 },
      sickDays: { total: 12, used: 2, remaining: 10 },
      benefits: [
        { type: 'ביטוח בריאות', description: 'ביטוח פרטי מורחב', value: 500 },
        { type: 'רכב צמוד', description: 'רכב חברה או החזר נסיעות', value: 2000 },
        { type: 'קורסים', description: 'תקציב להשתלמויות', value: 5000 }
      ],
      documents: [
        { id: '1', name: 'חוזה עבודה', type: 'PDF', uploadDate: '2023-01-15', size: '2.5 MB' },
        { id: '2', name: 'תעודת זהות', type: 'PDF', uploadDate: '2023-01-15', size: '1.2 MB' }
      ],
      status: 'active',
      riskLevel: 'low',
      securityClearance: 'ביטחוני בסיסי',
      accessPermissions: ['משרד ראשי', 'מעבדת פיתוח', 'חדר שרתים'],
      notes: [
        {
          id: '1',
          content: 'עובד מצוין עם יכולות מנהיגות גבוהות',
          author: 'שרה כהן',
          date: '2024-01-15',
          type: 'performance'
        }
      ]
    };
    
    setEmployee(mockEmployee);
    setIsLoading(false);
  };

  const tabs = [
    { id: 'personal', label: 'פרטים אישיים', icon: User },
    { id: 'work', label: 'פרטי עבודה', icon: Briefcase },
    { id: 'skills', label: 'כישורים וחינוך', icon: GraduationCap },
    { id: 'performance', label: 'ביצועים וקריירה', icon: Target },
    { id: 'benefits', label: 'בנפיטים וחופשות', icon: Heart },
    { id: 'documents', label: 'מסמכים', icon: FileText },
    { id: 'security', label: 'בטיחות וגישה', icon: Shield },
    { id: 'notes', label: 'הערות', icon: BookOpen }
  ];

  const handleSave = async () => {
    // כאן נשמור את השינויים
    console.log('שומר שינויים...');
    onModeChange('view');
  };

  const handleDelete = async () => {
    if (confirm('האם אתה בטוח שברצונך למחוק את העובד? פעולה זו אינה ניתנת לביטול.')) {
      console.log('מוחק עובד...');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <User size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isLoading ? 'טוען...' : `${employee?.firstName} ${employee?.lastName}`}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLoading ? '' : employee?.position}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            {mode === 'view' ? (
              <button
                onClick={() => onModeChange('edit')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} className="ml-2" />
                ערוך
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={16} className="ml-2" />
                  שמור
                </button>
                <button
                  onClick={() => onModeChange('view')}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ביטול
                </button>
              </>
            )}
            
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} className="ml-2" />
              מחק
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-80px)]">
          {/* Sidebar עם טאבים */}
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={18} className="ml-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* תוכן ראשי */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div>
                  {activeTab === 'personal' && (
                    <PersonalTab employee={employee!} mode={mode} showSensitive={showSensitiveInfo} onToggleSensitive={setShowSensitiveInfo} />
                  )}
                  {activeTab === 'work' && (
                    <WorkTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'skills' && (
                    <SkillsTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'performance' && (
                    <PerformanceTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'benefits' && (
                    <BenefitsTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'documents' && (
                    <DocumentsTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'security' && (
                    <SecurityTab employee={employee!} mode={mode} />
                  )}
                  {activeTab === 'notes' && (
                    <NotesTab employee={employee!} mode={mode} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// רכיב פרטים אישיים
function PersonalTab({ employee, mode, showSensitive, onToggleSensitive }: { 
  employee: EmployeeDetails; 
  mode: 'view' | 'edit';
  showSensitive: boolean;
  onToggleSensitive: (show: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פרטים אישיים</h3>
        <button
          onClick={() => onToggleSensitive(!showSensitive)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          {showSensitive ? <EyeOff size={16} className="ml-1" /> : <Eye size={16} className="ml-1" />}
          {showSensitive ? 'הסתר מידע רגיש' : 'הצג מידע רגיש'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">שם פרטי</label>
            {mode === 'edit' ? (
              <input
                type="text"
                defaultValue={employee.firstName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{employee.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">שם משפחה</label>
            {mode === 'edit' ? (
              <input
                type="text"
                defaultValue={employee.lastName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{employee.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">אימייל</label>
            <div className="flex items-center">
              <Mail size={16} className="text-gray-400 ml-2" />
              {mode === 'edit' ? (
                <input
                  type="email"
                  defaultValue={employee.email}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">טלפון</label>
            <div className="flex items-center">
              <Phone size={16} className="text-gray-400 ml-2" />
              {mode === 'edit' ? (
                <input
                  type="tel"
                  defaultValue={employee.phone}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {showSensitive && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תעודת זהות</label>
                {mode === 'edit' ? (
                  <input
                    type="text"
                    defaultValue={employee.idNumber}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white font-mono">{employee.idNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תאריך לידה</label>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 ml-2" />
                  {mode === 'edit' ? (
                    <input
                      type="date"
                      defaultValue={employee.dateOfBirth}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">
                      {new Date(employee.dateOfBirth).toLocaleDateString('he-IL')}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">כתובת</label>
            <div className="flex items-start">
              <MapPin size={16} className="text-gray-400 ml-2 mt-1" />
              {mode === 'edit' ? (
                <textarea
                  defaultValue={employee.address}
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.address}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">איש קשר לחרום</label>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="font-medium text-gray-900 dark:text-white">{employee.emergencyContact.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.emergencyContact.relationship}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// רכיב פרטי עבודה
function WorkTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פרטי עבודה</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">מספר עובד</label>
            <p className="text-gray-900 dark:text-white font-mono">{employee.employeeNumber}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תפקיד</label>
            {mode === 'edit' ? (
              <input
                type="text"
                defaultValue={employee.position}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{employee.position}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">מחלקה</label>
            <div className="flex items-center">
              <Building2 size={16} className="text-gray-400 ml-2" />
              {mode === 'edit' ? (
                <select className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="פיתוח">פיתוח</option>
                  <option value="עיצוב">עיצוב</option>
                  <option value="ניהול">ניהול</option>
                  <option value="נתונים">נתונים</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.department}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">מנהל ישיר</label>
            <div className="flex items-center">
              <Users size={16} className="text-gray-400 ml-2" />
              <p className="text-gray-900 dark:text-white">{employee.manager}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תאריך קליטה</label>
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-400 ml-2" />
              <p className="text-gray-900 dark:text-white">
                {new Date(employee.hireDate).toLocaleDateString('he-IL')}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">סוג העסקה</label>
            {mode === 'edit' ? (
              <select
                defaultValue={employee.employmentType}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="full_time">משרה מלאה</option>
                <option value="part_time">משרה חלקית</option>
                <option value="contractor">קבלן</option>
                <option value="intern">מתמחה</option>
              </select>
            ) : (
              <p className="text-gray-900 dark:text-white">
                {employee.employmentType === 'full_time' && 'משרה מלאה'}
                {employee.employmentType === 'part_time' && 'משרה חלקית'}
                {employee.employmentType === 'contractor' && 'קבלן'}
                {employee.employmentType === 'intern' && 'מתמחה'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">מיקום עבודה</label>
            {mode === 'edit' ? (
              <select
                defaultValue={employee.workLocation}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="office">משרד</option>
                <option value="remote">מהבית</option>
                <option value="hybrid">היברידי</option>
              </select>
            ) : (
              <p className="text-gray-900 dark:text-white">
                {employee.workLocation === 'office' && 'משרד'}
                {employee.workLocation === 'remote' && 'מהבית'}
                {employee.workLocation === 'hybrid' && 'היברידי'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">שכר</label>
            <div className="flex items-center">
              <CreditCard size={16} className="text-gray-400 ml-2" />
              <p className="text-gray-900 dark:text-white">
                ₪{employee.salary.toLocaleString()} {employee.salaryType === 'monthly' ? 'לחודש' : 'לשעה'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// רכיב כישורים וחינוך
function SkillsTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case 'expert': return 'מומחה';
      case 'advanced': return 'מתקדם';
      case 'intermediate': return 'בינוני';
      case 'beginner': return 'מתחיל';
      default: return 'לא ידוע';
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">כישורים וחינוך</h3>

      {/* השכלה */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <GraduationCap size={20} className="ml-2" />
          השכלה
        </h4>
        <div className="space-y-4">
          {employee.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.field}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* כישורים */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Star size={20} className="ml-2" />
          כישורים
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employee.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{skill.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}>
                {getSkillLevelLabel(skill.level)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* הסמכות */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Award size={20} className="ml-2" />
          הסמכות
        </h4>
        <div className="space-y-4">
          {employee.certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{cert.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    הונפק: {new Date(cert.date).toLocaleDateString('he-IL')}
                  </p>
                  {cert.expiryDate && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      פוגה: {new Date(cert.expiryDate).toLocaleDateString('he-IL')}
                    </p>
                  )}
                </div>
                {cert.expiryDate && new Date(cert.expiryDate) < new Date() && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    פג תוקף
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// רכיב ביצועים וקריירה
function PerformanceTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ביצועים וקריירה</h3>

      {/* ציון ביצועים */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">ציון ביצועים</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{employee.performanceScore}%</p>
            </div>
            <TrendingUp size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* יעדים */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Target size={20} className="ml-2" />
          יעדים נוכחיים
        </h4>
        <div className="space-y-4">
          {employee.goals.map((goal, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">{goal.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    יעד עד: {new Date(goal.dueDate).toLocaleDateString('he-IL')}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                  goal.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {goal.status === 'completed' && 'הושלם'}
                  {goal.status === 'in_progress' && 'בתהליך'}
                  {goal.status === 'pending' && 'ממתין'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* קידומים */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp size={20} className="ml-2" />
          היסטוריית קידומים
        </h4>
        <div className="space-y-4">
          {employee.promotions.map((promotion, index) => (
            <div key={index} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {promotion.from} → {promotion.to}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{promotion.reason}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(promotion.date).toLocaleDateString('he-IL')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// רכיב בנפיטים וחופשות
function BenefitsTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">בנפיטים וחופשות</h3>

      {/* חופשות */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h4 className="text-md font-medium text-blue-700 dark:text-blue-300 mb-4">ימי חופשה</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">סך הכל:</span>
              <span className="font-medium">{employee.vacationDays.total} ימים</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">נוצלו:</span>
              <span className="font-medium">{employee.vacationDays.used} ימים</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">נותרו:</span>
              <span className="font-medium text-blue-600">{employee.vacationDays.remaining} ימים</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h4 className="text-md font-medium text-yellow-700 dark:text-yellow-300 mb-4">ימי מחלה</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">סך הכל:</span>
              <span className="font-medium">{employee.sickDays.total} ימים</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">נוצלו:</span>
              <span className="font-medium">{employee.sickDays.used} ימים</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">נותרו:</span>
              <span className="font-medium text-yellow-600">{employee.sickDays.remaining} ימים</span>
            </div>
          </div>
        </div>
      </div>

      {/* בנפיטים */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Heart size={20} className="ml-2" />
          בנפיטים
        </h4>
        <div className="space-y-4">
          {employee.benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{benefit.type}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
                {benefit.value && (
                  <span className="text-sm font-medium text-green-600">
                    ₪{benefit.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// רכיב מסמכים
function DocumentsTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">מסמכים</h3>
        {mode === 'edit' && (
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} className="ml-2" />
            העלה מסמך חדש
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employee.documents.map((doc) => (
          <div key={doc.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <FileText size={20} className="text-gray-400 ml-3 mt-1" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{doc.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.type} • {doc.size}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    הועלה: {new Date(doc.uploadDate).toLocaleDateString('he-IL')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50">
                  <Eye size={16} />
                </button>
                {mode === 'edit' && (
                  <button className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// רכיב בטיחות וגישה
function SecurityTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'terminated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'inactive': return 'לא פעיל';
      case 'on_leave': return 'בחופשה';
      case 'terminated': return 'הופסק';
      default: return 'לא ידוע';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">בטיחות וגישה</h3>

      {/* סטטוס ורמת סיכון */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">סטטוס עובד</h4>
          <span className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(employee.status)}`}>
            {getStatusLabel(employee.status)}
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">רמת סיכון</h4>
          <span className={`px-3 py-2 rounded-full text-sm font-medium ${getRiskColor(employee.riskLevel)}`}>
            רמת סיכון {employee.riskLevel === 'low' ? 'נמוכה' : employee.riskLevel === 'medium' ? 'בינונית' : 'גבוהה'}
          </span>
        </div>
      </div>

      {/* סיווג ביטחוני */}
      {employee.securityClearance && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h4 className="text-md font-medium text-blue-700 dark:text-blue-300 mb-4 flex items-center">
            <Shield size={20} className="ml-2" />
            סיווג ביטחוני
          </h4>
          <p className="text-gray-900 dark:text-white">{employee.securityClearance}</p>
        </div>
      )}

      {/* הרשאות גישה */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">הרשאות גישה</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {employee.accessPermissions.map((permission, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CheckCircle size={16} className="text-green-500 ml-2" />
              <span className="text-gray-900 dark:text-white">{permission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// רכיב הערות
function NotesTab({ employee, mode }: { employee: EmployeeDetails; mode: 'view' | 'edit' }) {
  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-green-100 text-green-800';
      case 'disciplinary': return 'bg-red-100 text-red-800';
      case 'achievement': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNoteTypeLabel = (type: string) => {
    switch (type) {
      case 'performance': return 'ביצועים';
      case 'disciplinary': return 'משמעתי';
      case 'achievement': return 'הישג';
      case 'general': return 'כללי';
      default: return 'כללי';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">הערות</h3>
        {mode === 'edit' && (
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} className="ml-2" />
            הוסף הערה
          </button>
        )}
      </div>

      <div className="space-y-4">
        {employee.notes.map((note) => (
          <div key={note.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNoteTypeColor(note.type)}`}>
                  {getNoteTypeLabel(note.type)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {note.author} • {new Date(note.date).toLocaleDateString('he-IL')}
                </span>
              </div>
              {mode === 'edit' && (
                <button className="p-1 text-red-600 hover:text-red-800 rounded hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <p className="text-gray-900 dark:text-white">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}