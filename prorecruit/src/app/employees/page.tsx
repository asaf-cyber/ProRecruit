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
  role: string;
  department: string;
  manager: string;
  hireDate: string;
  avatar: string;
  status: 'active' | 'inactive' | 'on_leave';
  riskLevel: 'low' | 'medium' | 'high';
  performanceScore: number;
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
    // Mock data - בפועל זה יגיע מה-API
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'דוד לוי',
        role: 'מפתח Full Stack',
        department: 'פיתוח',
        manager: 'שרה כהן',
        hireDate: '2023-01-15',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 92
      },
      {
        id: '2',
        name: 'מיכל רוזן',
        role: 'מעצבת UX/UI',
        department: 'עיצוב',
        manager: 'יוסי כהן',
        hireDate: '2023-03-20',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'medium',
        performanceScore: 88
      },
      {
        id: '3',
        name: 'יוסי כהן',
        role: 'מנהל פרויקטים',
        department: 'ניהול',
        manager: 'דוד לוי',
        hireDate: '2022-11-10',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 95
      },
      {
        id: '4',
        name: 'שרה כהן',
        role: 'אנליסט נתונים',
        department: 'נתונים',
        manager: 'מיכל רוזן',
        hireDate: '2023-06-05',
        avatar: '/api/placeholder/40/40',
        status: 'on_leave',
        riskLevel: 'high',
        performanceScore: 75
      },
      {
        id: '5',
        name: 'אבי ישראלי',
        role: 'מפתח Backend',
        department: 'פיתוח',
        manager: 'דוד לוי',
        hireDate: '2023-02-28',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 90
      },
      {
        id: '6',
        name: 'רחל גולדברג',
        role: 'מנהלת משאבי אנוש',
        department: 'משאבי אנוש',
        manager: 'יוסי כהן',
        hireDate: '2022-09-01',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 93
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