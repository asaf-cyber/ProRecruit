'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClientsList } from '@/components/clients/clients-list';
import { ClientDetailsModal } from '@/components/clients/client-details-modal';
import { 
  Plus, 
  Building2, 
  Filter, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  FileText,
  CreditCard,
  Users,
  Calendar,
  Star,
  Eye,
  Settings,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Clock,
  Target,
  Zap,
  Brain,
  BarChart3,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  type: 'civil' | 'security';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website?: string;
  paymentTerms: string;
  openJobs: number;
  placedEmployees: number;
  outstandingDebt: number;
  overdueAmount: number;
  lastActivity: string;
  // Enhanced fields
  status: 'active' | 'inactive' | 'prospect' | 'suspended';
  priority: 'low' | 'medium' | 'high' | 'critical';
  industry: string;
  establishedYear: number;
  employeeCount: string;
  revenue: number;
  satisfactionScore: number;
  contractValue: number;
  renewalDate: string;
  accountManager: {
    id: string;
    name: string;
    email: string;
  };
  purchaseOrders: Array<{
    id: string;
    poNumber: string;
    amount: number;
    status: 'pending' | 'approved' | 'completed' | 'cancelled';
    date: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
    }>;
  }>;
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    amount: number;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
    dueDate: string;
    issueDate: string;
    poId?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    status: 'active' | 'completed' | 'on_hold';
    progress: number;
    budget: number;
    startDate: string;
    endDate?: string;
  }>;
  meetings: Array<{
    id: string;
    title: string;
    date: string;
    attendees: string[];
    notes: string;
    type: 'sales' | 'review' | 'planning' | 'support';
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: 'contract' | 'proposal' | 'report' | 'presentation';
    url: string;
    uploadDate: string;
  }>;
  communications: Array<{
    id: string;
    type: 'email' | 'call' | 'meeting' | 'whatsapp';
    subject: string;
    date: string;
    author: string;
    summary: string;
  }>;
  tags: string[];
  notes: string;
}

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<'all' | 'civil' | 'security'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'prospect' | 'suspended'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'analytics'>('cards');
  const [isLoading, setIsLoading] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced Mock data with comprehensive client information
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Microsoft ישראל',
      type: 'civil',
      status: 'active',
      priority: 'high',
      contactName: 'יוסי כהן',
      contactEmail: 'yossi@microsoft.com',
      contactPhone: '050-1234567',
      address: 'הרצל 234, תל אביב',
      website: 'microsoft.com',
      paymentTerms: 'שוטף + 30',
      openJobs: 12,
      placedEmployees: 45,
      outstandingDebt: 250000,
      overdueAmount: 50000,
      lastActivity: '2024-01-18',
      industry: 'טכנולוגיה',
      establishedYear: 1975,
      employeeCount: '10,000+',
      revenue: 50000000,
      satisfactionScore: 94,
      contractValue: 2500000,
      renewalDate: '2024-12-31',
      accountManager: {
        id: 'am1',
        name: 'שרה כהן',
        email: 'sarah.cohen@company.com'
      },
      purchaseOrders: [
        {
          id: 'po1',
          poNumber: 'MS-2024-001',
          amount: 350000,
          status: 'approved',
          date: '2024-01-15',
          items: [
            { description: 'פיתוח Full Stack - 5 עמדות', quantity: 5, unitPrice: 35000 },
            { description: 'ניהול פרויקטים - 3 חודשים', quantity: 3, unitPrice: 45000 }
          ]
        }
      ],
      invoices: [
        {
          id: 'inv1',
          invoiceNumber: 'INV-2024-001',
          amount: 120000,
          status: 'paid',
          dueDate: '2024-02-15',
          issueDate: '2024-01-15',
          poId: 'po1'
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'Azure Migration Project',
          status: 'active',
          progress: 75,
          budget: 800000,
          startDate: '2024-01-01',
          endDate: '2024-06-30'
        }
      ],
      meetings: [
        {
          id: 'meet1',
          title: 'סקירת פרויקט רבעונית',
          date: '2024-01-25',
          attendees: ['יוסי כהן', 'שרה כהן', 'דוד לוי'],
          notes: 'הפרויקט מתקדם לפי לוח הזמנים',
          type: 'review'
        }
      ],
      documents: [
        {
          id: 'doc1',
          name: 'חוזה שירותי פיתוח 2024',
          type: 'contract',
          url: '/documents/ms-contract-2024.pdf',
          uploadDate: '2024-01-01'
        }
      ],
      communications: [
        {
          id: 'comm1',
          type: 'email',
          subject: 'עדכון סטטוס פרויקט',
          date: '2024-01-20',
          author: 'שרה כהן',
          summary: 'דיווח על התקדמות בפרויקט הנוכחי'
        }
      ],
      tags: ['VIP', 'טכנולוגיה', 'לקוח אסטרטגי'],
      notes: 'לקוח אסטרטגי חשוב עם פוטנציאל לצמיחה משמעותית'
    },
    {
      id: '2',
      name: 'רפאל מערכות לחימה',
      type: 'security',
      status: 'active',
      priority: 'critical',
      contactName: 'שרה לוי',
      contactEmail: 'sarah@rafael.co.il',
      contactPhone: '050-9876543',
      address: 'דרך חיפה 350, חיפה',
      website: 'rafael.co.il',
      paymentTerms: 'שוטף + 60',
      openJobs: 8,
      placedEmployees: 23,
      outstandingDebt: 450000,
      overdueAmount: 0,
      lastActivity: '2024-01-20',
      industry: 'ביטחון ותעופה',
      establishedYear: 1948,
      employeeCount: '5,000-10,000',
      revenue: 25000000,
      satisfactionScore: 98,
      contractValue: 4500000,
      renewalDate: '2024-11-15',
      accountManager: {
        id: 'am2',
        name: 'מיכל דוד',
        email: 'michal.david@company.com'
      },
      purchaseOrders: [
        {
          id: 'po2',
          poNumber: 'RAF-2024-003',
          amount: 680000,
          status: 'approved',
          date: '2024-01-10',
          items: [
            { description: 'מהנדסי תוכנה בכירים - 8 עמדות', quantity: 8, unitPrice: 45000 },
            { description: 'אנליסטי מערכות - 5 עמדות', quantity: 5, unitPrice: 38000 }
          ]
        }
      ],
      invoices: [
        {
          id: 'inv2',
          invoiceNumber: 'INV-2024-008',
          amount: 195000,
          status: 'paid',
          dueDate: '2024-03-10',
          issueDate: '2024-01-10',
          poId: 'po2'
        }
      ],
      projects: [
        {
          id: 'proj2',
          name: 'פרויקט טיל חדש',
          status: 'active',
          progress: 60,
          budget: 1200000,
          startDate: '2023-11-01',
          endDate: '2024-08-31'
        }
      ],
      meetings: [],
      documents: [
        {
          id: 'doc2',
          name: 'הסכם סודיות מתקדם',
          type: 'contract',
          url: '/documents/rafael-nda-2024.pdf',
          uploadDate: '2024-01-05'
        }
      ],
      communications: [],
      tags: ['ביטחוני', 'סודי', 'אסטרטגי'],
      notes: 'לקוח ביטחוני רגיש - נדרש סיווג ביטחוני לכל העובדים'
    },
    {
      id: '3',
      name: 'Google ישראל',
      type: 'civil',
      status: 'active',
      priority: 'high',
      contactName: 'דוד ישראלי',
      contactEmail: 'david@google.com',
      contactPhone: '050-5555555',
      address: 'יגאל אלון 98, תל אביב',
      website: 'google.com',
      paymentTerms: 'שוטף + 45',
      openJobs: 6,
      placedEmployees: 67,
      outstandingDebt: 180000,
      overdueAmount: 30000,
      lastActivity: '2024-01-15',
      industry: 'טכנולוגיה ואינטרנט',
      establishedYear: 1998,
      employeeCount: '10,000+',
      revenue: 45000000,
      satisfactionScore: 91,
      contractValue: 1800000,
      renewalDate: '2024-10-20',
      accountManager: {
        id: 'am3',
        name: 'יוסי גולדברג',
        email: 'yossi.goldberg@company.com'
      },
      purchaseOrders: [],
      invoices: [
        {
          id: 'inv3',
          invoiceNumber: 'INV-2024-012',
          amount: 85000,
          status: 'overdue',
          dueDate: '2024-01-10',
          issueDate: '2023-12-15'
        }
      ],
      projects: [
        {
          id: 'proj3',
          name: 'Google Cloud Israel',
          status: 'active',
          progress: 85,
          budget: 650000,
          startDate: '2023-09-01',
          endDate: '2024-03-31'
        }
      ],
      meetings: [],
      documents: [],
      communications: [],
      tags: ['FAANG', 'צמיחה מהירה'],
      notes: 'יש חובות פיגורים - נדרש מעקב צמוד'
    },
    {
      id: '4',
      name: 'אלביט מערכות',
      type: 'security',
      status: 'prospect',
      priority: 'medium',
      contactName: 'מיכל רוזנברג',
      contactEmail: 'michal@elbitsystems.com',
      contactPhone: '050-4444444',
      address: 'העמל 8, חיפה',
      website: 'elbitsystems.com',
      paymentTerms: 'שוטף + 90',
      openJobs: 15,
      placedEmployees: 89,
      outstandingDebt: 780000,
      overdueAmount: 120000,
      lastActivity: '2024-01-19',
      industry: 'תעופה וחלל',
      establishedYear: 1966,
      employeeCount: '1,000-5,000',
      revenue: 18000000,
      satisfactionScore: 88,
      contractValue: 3200000,
      renewalDate: '2024-12-01',
      accountManager: {
        id: 'am4',
        name: 'רונית שפירא',
        email: 'ronit.shapira@company.com'
      },
      purchaseOrders: [],
      invoices: [],
      projects: [],
      meetings: [],
      documents: [],
      communications: [],
      tags: ['ביטחוני', 'פוטנציאל גבוה'],
      notes: 'לקוח פוטנציאלי מעניין - במגעים לחוזה גדול'
    }
  ];

  // Enhanced filtering logic
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = clientTypeFilter === 'all' || client.type === clientTypeFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Enhanced statistics calculation
  const stats = {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === 'active').length,
    prospects: mockClients.filter(c => c.status === 'prospect').length,
    totalDebt: mockClients.reduce((sum, client) => sum + client.outstandingDebt, 0),
    overdueDebt: mockClients.reduce((sum, client) => sum + client.overdueAmount, 0),
    activeJobs: mockClients.reduce((sum, client) => sum + client.openJobs, 0),
    totalRevenue: mockClients.reduce((sum, client) => sum + client.contractValue, 0),
    averageSatisfaction: Math.round(mockClients.reduce((sum, client) => sum + client.satisfactionScore, 0) / mockClients.length),
    pendingPOs: mockClients.reduce((sum, client) => sum + client.purchaseOrders.filter(po => po.status === 'pending').length, 0),
    overdueInvoices: mockClients.reduce((sum, client) => sum + client.invoices.filter(inv => inv.status === 'overdue').length, 0)
  };

  // AI Insights data
  const aiInsights = [
    {
      type: 'revenue',
      title: 'הזדמנות הכנסה',
      message: 'רפאל מערכות לחימה מציגה פוטנציאל להגדלת הכנסה ב-35% בהתבסס על היסטורית הפרויקטים',
      priority: 'high',
      confidence: 92,
      action: 'קבע פגישה'
    },
    {
      type: 'risk',
      title: 'זיהוי סיכון',
      message: 'Google ישראל - יש חובות פיגורים. ירידה בשביעות רצון יכולה להוביל לאיבוד הלקוח',
      priority: 'urgent',
      confidence: 87,
      action: 'פעולת מעקב מיידית'
    },
    {
      type: 'opportunity',
      title: 'חידוש חוזה',
      message: '3 לקוחות מתקרבים לחידוש חוזה - זמן מושלם להצעת שירותים חדשים',
      priority: 'medium',
      confidence: 95,
      action: 'הכן הצעות'
    }
  ];

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Enhanced Header with Controls */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-blue-600">
                  <Building2 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">לקוחות והזמנות</h1>
                  <p className="text-green-700 dark:text-green-300">ניהול לקוחות מתקדם עם AI ואנליטיקה</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>עודכן לאחרונה: {currentTime.toLocaleTimeString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>מעקב בזמן אמת</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'מרענן...' : 'רענן נתונים'}
              </button>
              
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Brain size={16} />
                תובנות AI
              </button>
              
              <button
                onClick={() => setShowNewClientModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                לקוח חדש
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAIInsights && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">תובנות AI ללקוחות</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">המלצות חכמות לשיפור קשרי לקוחות</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIInsights(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                    insight.priority === 'urgent'
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                      : insight.priority === 'high'
                      ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
                      : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-medium text-sm ${
                      insight.priority === 'urgent'
                        ? 'text-red-900 dark:text-red-100'
                        : insight.priority === 'high'
                        ? 'text-orange-900 dark:text-orange-100'
                        : 'text-blue-900 dark:text-blue-100'
                    }`}>
                      {insight.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.confidence}% דיוק</span>
                  </div>
                  <p className={`text-xs mb-3 ${
                    insight.priority === 'urgent'
                      ? 'text-red-700 dark:text-red-200'
                      : insight.priority === 'high'
                      ? 'text-orange-700 dark:text-orange-200'
                      : 'text-blue-700 dark:text-blue-200'
                  }`}>
                    {insight.message}
                  </p>
                  <button className={`text-xs font-medium px-3 py-1 rounded-full ${
                    insight.priority === 'urgent'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : insight.priority === 'high'
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}>
                    {insight.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">סה"כ לקוחות</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalClients}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+3 החודש</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">לקוחות פעילים</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.activeClients}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">מתוך {stats.totalClients}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ערך חוזים כולל</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">₪{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">+15% מהרבעון</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <DollarSign size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">חובות בפיגור</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">₪{stats.overdueDebt.toLocaleString()}</p>
                <p className="text-xs text-red-600 dark:text-red-400">{stats.overdueInvoices} חשבוניות</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">שביעות רצון ממוצעת</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.averageSatisfaction}%</p>
                <div className="flex items-center mt-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">מעולה</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש לפי שם לקוח, איש קשר, תעשייה או תגים..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סוג:</label>
                <select
                  value={clientTypeFilter}
                  onChange={(e) => setClientTypeFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="civil">אזרחי</option>
                  <option value="security">ביטחוני</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="active">פעיל</option>
                  <option value="prospect">פוטנציאלי</option>
                  <option value="inactive">לא פעיל</option>
                  <option value="suspended">מושעה</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">עדיפות:</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="critical">קריטי</option>
                  <option value="high">גבוה</option>
                  <option value="medium">בינוני</option>
                  <option value="low">נמוך</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { key: 'cards', label: 'כרטיסים', icon: Target },
                { key: 'table', label: 'טבלה', icon: BarChart3 },
                { key: 'analytics', label: 'אנליטיקה', icon: TrendingUp }
              ].map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.key}
                    onClick={() => setViewMode(mode.key as any)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode.key
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <span>מציג {filteredClients.length} מתוך {mockClients.length} לקוחות</span>
          <div className="flex items-center gap-4">
            <span>חיפוש: "{searchQuery || 'הכל'}"</span>
            {(clientTypeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all') && (
              <span>מסונן: {[clientTypeFilter, statusFilter, priorityFilter].filter(f => f !== 'all').join(', ')}</span>
            )}
          </div>
        </div>

        {/* Enhanced Clients Display */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      client.priority === 'critical' ? 'bg-red-100 dark:bg-red-900' :
                      client.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900' :
                      client.priority === 'medium' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Building2 size={24} className={
                        client.priority === 'critical' ? 'text-red-600 dark:text-red-400' :
                        client.priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                        client.priority === 'medium' ? 'text-blue-600 dark:text-blue-400' :
                        'text-gray-600 dark:text-gray-400'
                      } />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{client.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{client.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      client.status === 'prospect' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      client.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {client.status === 'active' ? 'פעיל' :
                       client.status === 'prospect' ? 'פוטנציאלי' :
                       client.status === 'inactive' ? 'לא פעיל' : 'מושעה'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      client.type === 'security' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {client.type === 'security' ? 'ביטחוני' : 'אזרחי'}
                    </span>
                  </div>
                </div>

                {/* Client Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{client.openJobs}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">משרות פתוחות</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">₪{(client.contractValue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ערך חוזה</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users size={14} />
                    <span>{client.contactName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail size={14} />
                    <span>{client.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone size={14} />
                    <span>{client.contactPhone}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {client.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{client.satisfactionScore}%</span>
                    </div>
                    {client.overdueAmount > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-sm text-red-600 dark:text-red-400">פיגור</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      פרטים
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                      יצירת PO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'table' && (
          <ClientsList 
            clients={filteredClients}
            onSelectClient={setSelectedClient}
            onCreatePO={(client) => {
              setSelectedClient(client);
            }}
          />
        )}

        {viewMode === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">אנליטיקה מתקדמת</h3>
              <p className="text-gray-600 dark:text-gray-400">תצוגת אנליטיקה מפורטת תתווסף בקרוב</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">לא נמצאו לקוחות</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">נסה לשנות את הפילטרים או הוסף לקוח חדש</p>
            <button
              onClick={() => setShowNewClientModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              הוסף לקוח חדש
            </button>
          </div>
        )}

        {/* Client Details Modal */}
        {selectedClient && (
          <ClientDetailsModal
            isOpen={selectedClient !== null}
            onClose={() => setSelectedClient(null)}
            client={selectedClient}
            onUpdate={(updatedClient) => {
              console.log('Update client:', updatedClient);
            }}
          />
        )}

        {/* New Client Modal */}
        {showNewClientModal && (
          <ClientDetailsModal
            isOpen={showNewClientModal}
            onClose={() => setShowNewClientModal(false)}
            client={null}
            onUpdate={(newClient) => {
              console.log('Create new client:', newClient);
              setShowNewClientModal(false);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
}