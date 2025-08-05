'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Gift, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  TrendingUp,
  DollarSign,
  UserPlus,
  Award,
  Bell,
  Mail
} from 'lucide-react';

interface Referral {
  id: string;
  candidateId: string;
  candidateName: string;
  referredByEmployeeId: string;
  referredByEmployeeName: string;
  referralDate: string;
  hireDate?: string;
  bonusEligibleDate?: string;
  status: 'pending' | 'hired' | 'bonus_paid' | 'expired';
  bonusAmount: number;
  notes?: string;
  lastContact?: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  totalReferrals: number;
  totalBonuses: number;
  activeReferrals: number;
}

export function CVReferralTracker() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  useEffect(() => {
    const mockReferrals: Referral[] = [
      {
        id: '1',
        candidateId: '2',
        candidateName: 'שרה כהן',
        referredByEmployeeId: 'emp1',
        referredByEmployeeName: 'יוסי כהן',
        referralDate: '2023-07-15',
        hireDate: '2023-08-01',
        bonusEligibleDate: '2024-02-01',
        status: 'hired',
        bonusAmount: 5000,
        notes: 'Data Scientist מצוינת, התקבלה לתפקיד Senior DS'
      },
      {
        id: '2',
        candidateId: '3',
        candidateName: 'מיכאל רוזנברג',
        referredByEmployeeId: 'emp2',
        referredByEmployeeName: 'דנה לוי',
        referralDate: '2023-09-20',
        hireDate: '2023-10-15',
        bonusEligibleDate: '2024-04-15',
        status: 'hired',
        bonusAmount: 5000,
        notes: 'DevOps Engineer מנוסה, התקבל לתפקיד Lead DevOps'
      },
      {
        id: '3',
        candidateId: '4',
        candidateName: 'נועה אברהם',
        referredByEmployeeId: 'emp3',
        referredByEmployeeName: 'רון שפירא',
        referralDate: '2023-11-10',
        status: 'pending',
        bonusAmount: 5000,
        notes: 'Frontend Developer צעירה, בתהליך ראיונות'
      }
    ];

    const mockEmployees: Employee[] = [
      {
        id: 'emp1',
        name: 'יוסי כהן',
        email: 'yossi.cohen@company.com',
        department: 'Engineering',
        totalReferrals: 8,
        totalBonuses: 25000,
        activeReferrals: 2
      },
      {
        id: 'emp2',
        name: 'דנה לוי',
        email: 'dana.levy@company.com',
        department: 'Product',
        totalReferrals: 5,
        totalBonuses: 15000,
        activeReferrals: 1
      },
      {
        id: 'emp3',
        name: 'רון שפירא',
        email: 'ron.shapira@company.com',
        department: 'Sales',
        totalReferrals: 3,
        totalBonuses: 0,
        activeReferrals: 1
      }
    ];

    setReferrals(mockReferrals);
    setEmployees(mockEmployees);
  }, []);

  const getStatusColor = (status: Referral['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-blue-100 text-blue-800';
      case 'bonus_paid': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Referral['status']) => {
    switch (status) {
      case 'pending': return 'בתהליך';
      case 'hired': return 'הועסק';
      case 'bonus_paid': return 'מענק שולם';
      case 'expired': return 'פג תוקף';
    }
  };

  const getStatusIcon = (status: Referral['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'hired': return <CheckCircle className="w-4 h-4" />;
      case 'bonus_paid': return <Award className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const isBonusEligible = (referral: Referral) => {
    if (referral.status !== 'hired' || !referral.bonusEligibleDate) return false;
    const eligibleDate = new Date(referral.bonusEligibleDate);
    const today = new Date();
    return today >= eligibleDate;
  };

  const eligibleBonuses = referrals.filter(isBonusEligible);

  const totalBonusesPaid = employees.reduce((sum, emp) => sum + emp.totalBonuses, 0);
  const totalActiveReferrals = employees.reduce((sum, emp) => sum + emp.activeReferrals, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">מעקב הפניות - חבר מביא חבר</h2>
              <p className="text-gray-600">ניהול אוטומטי של מענקי הפניות</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center space-x-2 space-x-reverse px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>התראות</span>
              {eligibleBonuses.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {eligibleBonuses.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">הפניות פעילות</p>
              <p className="text-2xl font-bold text-gray-900">{totalActiveReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">מענקים ששולמו</p>
              <p className="text-2xl font-bold text-gray-900">{totalBonusesPaid.toLocaleString()} ₪</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">מענקים זכאים</p>
              <p className="text-2xl font-bold text-gray-900">{eligibleBonuses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">אחוז הצלחה</p>
              <p className="text-2xl font-bold text-gray-900">67%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            התראות מענקים
          </h3>
          
          {eligibleBonuses.length > 0 ? (
            <div className="space-y-4">
              {eligibleBonuses.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Award className="w-6 h-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {referral.referredByEmployeeName} זכאי למענק עבור {referral.candidateName}
                      </p>
                      <p className="text-sm text-gray-600">
                        סכום: {referral.bonusAmount.toLocaleString()} ₪ | תאריך זכאות: {referral.bonusEligibleDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      אישור תשלום
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">אין מענקים זכאים כרגע</p>
          )}
        </div>
      )}

      {/* Referrals Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">הפניות במערכת</h3>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">כל העובדים</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מועמד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מפנה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך הפניה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך העסקה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  זכאות למענק
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals
                .filter(ref => !selectedEmployee || ref.referredByEmployeeId === selectedEmployee)
                .map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{referral.candidateName}</div>
                    <div className="text-sm text-gray-500">{referral.notes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{referral.referredByEmployeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(referral.referralDate).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {referral.hireDate ? new Date(referral.hireDate).toLocaleDateString('he-IL') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {referral.bonusEligibleDate ? new Date(referral.bonusEligibleDate).toLocaleDateString('he-IL') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {referral.bonusAmount.toLocaleString()} ₪
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(referral.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                        {getStatusText(referral.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {isBonusEligible(referral) && (
                        <button className="text-green-600 hover:text-green-900">
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">המפנים המובילים</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employees
            .sort((a, b) => b.totalReferrals - a.totalReferrals)
            .slice(0, 3)
            .map((employee) => (
            <div key={employee.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{employee.name}</h4>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">הפניות:</span>
                  <span className="font-medium text-gray-900 mr-1">{employee.totalReferrals}</span>
                </div>
                <div>
                  <span className="text-gray-500">מענקים:</span>
                  <span className="font-medium text-gray-900 mr-1">{employee.totalBonuses.toLocaleString()} ₪</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 