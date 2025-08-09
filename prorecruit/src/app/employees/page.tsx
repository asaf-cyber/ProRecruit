'use client';

import { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { EmployeesHeader } from '@/components/employees/employees-header';
import { EmployeesFilters } from '@/components/employees/employees-filters';
import { EmployeesTable } from '@/components/employees/employees-table';
import { EmployeeCardsGrid } from '@/components/employees/employee-cards-grid';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  manager: string;
  hireDate: string;
  avatar: string;
  status: 'active' | 'inactive' | 'on_leave' | 'probation';
  riskLevel: 'low' | 'medium' | 'high';
  performanceScore: number;
  salary: number;
  location: string;
  skills: string[];
  certifications: string[];
  projects: Array<{
    id: string;
    name: string;
    status: 'active' | 'completed' | 'paused';
    progress: number;
  }>;
  personalDetails: {
    birthDate: string;
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
    address: string;
  };
  contract: {
    type: 'permanent' | 'contract' | 'intern';
    startDate: string;
    endDate?: string;
    workHours: number;
  };
  benefits: {
    healthInsurance: boolean;
    pensionPlan: boolean;
    carAllowance: boolean;
    phoneAllowance: boolean;
    educationBudget: number;
  };
  documents: Array<{
    id: string;
    name: string;
    type: 'contract' | 'id' | 'certificate' | 'other';
    uploadDate: string;
    url: string;
  }>;
  timeline: Array<{
    id: string;
    type: 'hired' | 'promotion' | 'performance_review' | 'project_assignment' | 'training';
    title: string;
    description: string;
    date: string;
    author: string;
  }>;
}

export default function EmployeesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data מורחב - בפועל זה יגיע מה-API
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'דוד לוי',
        email: 'david.levy@company.com',
        phone: '+972-50-123-4567',
        role: 'מפתח Full Stack',
        department: 'פיתוח',
        manager: 'שרה כהן',
        hireDate: '2023-01-15',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 92,
        salary: 25000,
        location: 'תל אביב',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        certifications: ['AWS Certified Developer', 'Scrum Master'],
        projects: [
          { id: 'p1', name: 'מערכת CRM חדשה', status: 'active', progress: 75 },
          { id: 'p2', name: 'אתר לקוחות', status: 'completed', progress: 100 }
        ],
        personalDetails: {
          birthDate: '1990-05-15',
          emergencyContact: {
            name: 'רחל לוי',
            phone: '+972-50-999-8888',
            relationship: 'בן/בת זוג'
          },
          address: 'תל אביב, רחוב הרצל 15'
        },
        contract: {
          type: 'permanent',
          startDate: '2023-01-15',
          workHours: 42
        },
        benefits: {
          healthInsurance: true,
          pensionPlan: true,
          carAllowance: true,
          phoneAllowance: true,
          educationBudget: 5000
        },
        documents: [
          { id: 'd1', name: 'חוזה עבודה', type: 'contract', uploadDate: '2023-01-10', url: '/documents/contract1.pdf' },
          { id: 'd2', name: 'תעודת זהות', type: 'id', uploadDate: '2023-01-10', url: '/documents/id1.pdf' }
        ],
        timeline: [
          {
            id: 't1',
            type: 'hired',
            title: 'נשכר לחברה',
            description: 'הצטרף כמפתח Full Stack בצוות הפיתוח',
            date: '2023-01-15',
            author: 'מערכת משאבי אנוש'
          }
        ]
      },
      {
        id: '2',
        name: 'מיכל רוזן',
        email: 'michal.rosen@company.com',
        phone: '+972-52-987-6543',
        role: 'מעצבת UX/UI',
        department: 'עיצוב',
        manager: 'יוסי כהן',
        hireDate: '2023-03-20',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'medium',
        performanceScore: 88,
        salary: 22000,
        location: 'חיפה',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
        projects: [
          { id: 'p3', name: 'ממשק משתמש חדש', status: 'active', progress: 60 }
        ],
        personalDetails: {
          birthDate: '1988-11-22',
          emergencyContact: {
            name: 'אביגיל רוזן',
            phone: '+972-54-777-6666',
            relationship: 'אחות'
          },
          address: 'חיפה, שדרות בן גוריון 32'
        },
        contract: {
          type: 'permanent',
          startDate: '2023-03-20',
          workHours: 40
        },
        benefits: {
          healthInsurance: true,
          pensionPlan: true,
          carAllowance: false,
          phoneAllowance: true,
          educationBudget: 4000
        },
        documents: [
          { id: 'd3', name: 'חוזה עבודה', type: 'contract', uploadDate: '2023-03-15', url: '/documents/contract2.pdf' }
        ],
        timeline: [
          {
            id: 't2',
            type: 'hired',
            title: 'נשכרה לחברה',
            description: 'הצטרפה כמעצבת UX/UI בצוות העיצוב',
            date: '2023-03-20',
            author: 'מערכת משאבי אנוש'
          }
        ]
      },
      {
        id: '3',
        name: 'יוסי כהן',
        email: 'yossi.cohen@company.com',
        phone: '+972-54-456-7890',
        role: 'מנהל פרויקטים',
        department: 'ניהול',
        manager: 'דוד לוי',
        hireDate: '2022-11-10',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 95,
        salary: 32000,
        location: 'ירושלים',
        skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
        certifications: ['PMP Certified', 'Agile Certified Practitioner'],
        projects: [
          { id: 'p4', name: 'טרנספורמציה דיגיטלית', status: 'active', progress: 45 },
          { id: 'p5', name: 'מיגרציה לענן', status: 'completed', progress: 100 }
        ],
        personalDetails: {
          birthDate: '1985-08-03',
          emergencyContact: {
            name: 'דינה כהן',
            phone: '+972-50-555-4444',
            relationship: 'בן/בת זוג'
          },
          address: 'ירושלים, רחוב יפו 45'
        },
        contract: {
          type: 'permanent',
          startDate: '2022-11-10',
          workHours: 45
        },
        benefits: {
          healthInsurance: true,
          pensionPlan: true,
          carAllowance: true,
          phoneAllowance: true,
          educationBudget: 8000
        },
        documents: [
          { id: 'd4', name: 'חוזה עבודה', type: 'contract', uploadDate: '2022-11-05', url: '/documents/contract3.pdf' },
          { id: 'd5', name: 'תעודת PMP', type: 'certificate', uploadDate: '2022-11-05', url: '/documents/pmp.pdf' }
        ],
        timeline: [
          {
            id: 't3',
            type: 'hired',
            title: 'נשכר לחברה',
            description: 'הצטרף כמנהל פרויקטים בצוות הניהול',
            date: '2022-11-10',
            author: 'מערכת משאבי אנוש'
          },
          {
            id: 't4',
            type: 'promotion',
            title: 'קודם לתפקיד בכיר',
            description: 'קודם למנהל פרויקטים בכיר',
            date: '2023-06-01',
            author: 'דוד לוי'
          }
        ]
      }
    ];

    setTimeout(() => {
      setEmployees(mockEmployees);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesManager = selectedManager === 'all' || employee.manager === selectedManager;
    const matchesRole = selectedRole === 'all' || employee.role.includes(selectedRole);
    
    return matchesSearch && matchesDepartment && matchesManager && matchesRole;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <EmployeesHeader />
        
        <div className="flex items-center justify-between">
          <EmployeesFilters
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedManager={selectedManager}
            onManagerChange={setSelectedManager}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List size={16} className="ml-2" />
              טבלה
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid size={16} className="ml-2" />
              כרטיסים
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'table' ? (
          <EmployeesTable
            department={selectedDepartment}
            manager={selectedManager}
            role={selectedRole}
            searchQuery={searchQuery}
          />
        ) : (
          <EmployeeCardsGrid
            employees={filteredEmployees}
            isLoading={isLoading}
          />
        )}
      </div>
    </MainLayout>
  );
} 