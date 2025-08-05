'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  User, 
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface VendorEmployeesProps {
  vendorId: string;
}

interface VendorUser {
  id: string;
  name: string;
  type: 'employee' | 'candidate';
  position: string;
  serviceType: string;
  serviceDate: string;
  cost: number;
  status: 'completed' | 'in_progress' | 'scheduled';
  notes: string;
}

export function VendorEmployees({ vendorId }: VendorEmployeesProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'all' | 'employee' | 'candidate'>('all');

  // Mock vendor users data
  const vendorUsers: VendorUser[] = [
    {
      id: '1',
      name: 'דוד כהן',
      type: 'employee',
      position: 'מפתח Full Stack',
      serviceType: 'בדיקה רפואית כללית',
      serviceDate: '2024-01-15',
      cost: 1500,
      status: 'completed',
      notes: 'בדיקה תקינה, כשיר לעבודה'
    },
    {
      id: '2',
      name: 'מיכל ישראלי',
      type: 'candidate',
      position: 'מפתחת Frontend',
      serviceType: 'בדיקת ראייה',
      serviceDate: '2024-01-12',
      cost: 800,
      status: 'completed',
      notes: 'תוצאות טובות, מתאימה לתפקיד'
    },
    {
      id: '3',
      name: 'יוסי גולדברג',
      type: 'employee',
      position: 'מנהל פרויקטים',
      serviceType: 'בדיקת שמיעה',
      serviceDate: '2024-01-10',
      cost: 600,
      status: 'completed',
      notes: 'בדיקה תקינה'
    },
    {
      id: '4',
      name: 'רונית שפירא',
      type: 'candidate',
      position: 'מפתחת Backend',
      serviceType: 'בדיקה רפואית כללית',
      serviceDate: '2024-01-20',
      cost: 1500,
      status: 'in_progress',
      notes: 'בדיקה בתהליך'
    },
    {
      id: '5',
      name: 'אבי לוי',
      type: 'employee',
      position: 'מפתח DevOps',
      serviceType: 'בדיקת ראייה',
      serviceDate: '2024-02-01',
      cost: 800,
      status: 'scheduled',
      notes: 'תור לבדיקה'
    },
    {
      id: '6',
      name: 'שרה כהן',
      type: 'candidate',
      position: 'מנהלת מוצר',
      serviceType: 'בדיקה רפואית כללית',
      serviceDate: '2024-01-18',
      cost: 1500,
      status: 'completed',
      notes: 'בדיקה תקינה, מומלץ לגיוס'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: { 
        label: 'הושלם', 
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle
      },
      in_progress: { 
        label: 'בתהליך', 
        color: 'bg-blue-100 text-blue-800',
        icon: Clock
      },
      scheduled: { 
        label: 'מתוזמן', 
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertCircle
      }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="h-3 w-3 ml-1" />
        {badge.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    if (type === 'employee') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <User className="h-3 w-3 ml-1" />
          עובד
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <Users className="h-3 w-3 ml-1" />
        מועמד
      </span>
    );
  };

  const handleViewUser = (userId: string, type: string) => {
    if (type === 'employee') {
      router.push(`/employees/${userId}`);
    } else {
      router.push(`/candidates/${userId}`);
    }
  };

  // Filter users based on selected type
  const filteredUsers = selectedType === 'all' 
    ? vendorUsers 
    : vendorUsers.filter(user => user.type === selectedType);

  const totalCost = filteredUsers.reduce((sum, user) => sum + user.cost, 0);
  const completedServices = filteredUsers.filter(user => user.status === 'completed').length;
  const pendingServices = filteredUsers.filter(user => user.status !== 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">עובדים ומועמדים</h3>
          <p className="text-sm text-gray-500 mt-1">רשימת עובדים ומועמדים שהשתמשו בשירותי הספק</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'employee' | 'candidate')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המשתמשים</option>
            <option value="employee">עובדים בלבד</option>
            <option value="candidate">מועמדים בלבד</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-blue-600">סה&quot;כ משתמשים</p>
              <p className="text-lg font-semibold text-blue-900">{filteredUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-green-600">שירותים שהושלמו</p>
              <p className="text-lg font-semibold text-green-900">{completedServices}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-purple-600">סה&quot;כ עלות</p>
              <p className="text-lg font-semibold text-purple-900">₪{totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סוג
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                משרה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שירות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עלות
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(user.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.serviceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(user.serviceDate).toLocaleDateString('he-IL')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">₪{user.cost.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewUser(user.id, user.type)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">לא נמצאו משתמשים</h3>
          <p className="mt-1 text-sm text-gray-500">נסה לשנות את הסינון שלך.</p>
        </div>
      )}
    </div>
  );
} 