'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { VendorsHeader } from '@/components/vendors/vendors-header';
import { VendorsFilters } from '@/components/vendors/vendors-filters';
import { VendorsTable } from '@/components/vendors/vendors-table';
import { 
  Plus, 
  Truck, 
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
  AlertTriangle,
  Building,
  Award,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'agency';
  specialization: string[];
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  rating: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website?: string;
  establishedYear: number;
  employeeCount: string;
  // Financial details
  totalBilled: number;
  outstandingPayments: number;
  averageRate: number;
  paymentTerms: string;
  // Performance metrics
  completedProjects: number;
  successRate: number;
  averageDeliveryTime: number;
  clientSatisfactionScore: number;
  // Professional details
  certifications: string[];
  languages: string[];
  availableFrom: string;
  maxCapacity: number;
  currentCapacity: number;
  // Relationship details
  accountManager: {
    id: string;
    name: string;
    email: string;
  };
  contractStartDate: string;
  contractEndDate: string;
  lastActivity: string;
  // Documents and compliance
  documents: Array<{
    id: string;
    name: string;
    type: 'contract' | 'insurance' | 'license' | 'certificate' | 'tax' | 'other';
    status: 'valid' | 'expired' | 'pending';
    expiryDate?: string;
    url: string;
    uploadDate: string;
  }>;
  // Project history
  projects: Array<{
    id: string;
    name: string;
    clientName: string;
    status: 'active' | 'completed' | 'cancelled' | 'on_hold';
    startDate: string;
    endDate?: string;
    budget: number;
    actualCost: number;
    rating?: number;
    feedback?: string;
  }>;
  // Communications
  communications: Array<{
    id: string;
    type: 'email' | 'call' | 'meeting' | 'whatsapp';
    subject: string;
    date: string;
    author: string;
    summary: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  }>;
  // Performance tracking
  performanceMetrics: {
    qualityScore: number;
    timeliness: number;
    communication: number;
    costEffectiveness: number;
    reliability: number;
  };
  tags: string[];
  notes: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  preferredPaymentMethod: string;
  taxId: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'individual' | 'company' | 'agency'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4+' | '3+' | '2+'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'analytics'>('cards');
  const [isLoading, setIsLoading] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showNewVendorModal, setShowNewVendorModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced Mock vendor data
  const mockVendors: Vendor[] = [
    {
      id: '1',
      name: 'TechSolutions Ltd',
      type: 'company',
      specialization: ['Full Stack Development', 'DevOps', 'Cloud Architecture'],
      status: 'active',
      rating: 4.8,
      contactName: 'דוד כהן',
      contactEmail: 'david@techsolutions.co.il',
      contactPhone: '+972-50-123-4567',
      address: 'הרצל 45, תל אביב',
      website: 'techsolutions.co.il',
      establishedYear: 2015,
      employeeCount: '50-100',
      totalBilled: 2500000,
      outstandingPayments: 150000,
      averageRate: 350,
      paymentTerms: 'Net 30',
      completedProjects: 45,
      successRate: 96,
      averageDeliveryTime: 18,
      clientSatisfactionScore: 94,
      certifications: ['ISO 27001', 'AWS Certified', 'Microsoft Partner'],
      languages: ['עברית', 'English', 'العربية'],
      availableFrom: '2024-03-01',
      maxCapacity: 15,
      currentCapacity: 8,
      accountManager: {
        id: 'am1',
        name: 'שרה לוי',
        email: 'sarah.levy@company.com'
      },
      contractStartDate: '2023-01-15',
      contractEndDate: '2025-01-14',
      lastActivity: '2024-01-20',
      documents: [
        {
          id: 'doc1',
          name: 'חוזה שירותים מתקדם',
          type: 'contract',
          status: 'valid',
          expiryDate: '2025-01-14',
          url: '/documents/techsolutions-contract.pdf',
          uploadDate: '2023-01-10'
        },
        {
          id: 'doc2',
          name: 'ביטוח אחריות מקצועית',
          type: 'insurance',
          status: 'valid',
          expiryDate: '2024-06-30',
          url: '/documents/techsolutions-insurance.pdf',
          uploadDate: '2023-06-15'
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'מערכת CRM ללקוח Microsoft',
          clientName: 'Microsoft ישראל',
          status: 'active',
          startDate: '2024-01-01',
          budget: 350000,
          actualCost: 280000,
          rating: 5
        },
        {
          id: 'proj2',
          name: 'פיתוח אפליקציה מובילית',
          clientName: 'Google ישראל',
          status: 'completed',
          startDate: '2023-10-01',
          endDate: '2024-01-15',
          budget: 250000,
          actualCost: 245000,
          rating: 4,
          feedback: 'עבודה מעולה, דרישות יוצאות דופן'
        }
      ],
      communications: [
        {
          id: 'comm1',
          type: 'email',
          subject: 'עדכון סטטוס פרויקט CRM',
          date: '2024-01-18',
          author: 'דוד כהן',
          summary: 'הפרויקט מתקדם לפי לוח הזמנים',
          priority: 'medium'
        }
      ],
      performanceMetrics: {
        qualityScore: 95,
        timeliness: 92,
        communication: 88,
        costEffectiveness: 94,
        reliability: 97
      },
      tags: ['מומלץ', 'טכנולוגיה', 'אמין'],
      notes: 'ספק מעולה עם ניסיון רב בפרויקטים מורכבים',
      riskLevel: 'low',
      preferredPaymentMethod: 'העברה בנקאית',
      taxId: '123456789',
      bankDetails: {
        bankName: 'בנק הפועלים',
        accountNumber: '12345678',
        routingNumber: '12'
      }
    },
    {
      id: '2',
      name: 'מיכל רוזן - יועצת UX/UI',
      type: 'individual',
      specialization: ['UX/UI Design', 'Product Design', 'User Research'],
      status: 'active',
      rating: 4.9,
      contactName: 'מיכל רוזן',
      contactEmail: 'michal.rosen@gmail.com',
      contactPhone: '+972-52-987-6543',
      address: 'שדרות רוטשילד 15, תל אביב',
      website: 'michalrosen.design',
      establishedYear: 2018,
      employeeCount: '1',
      totalBilled: 850000,
      outstandingPayments: 25000,
      averageRate: 450,
      paymentTerms: 'Net 15',
      completedProjects: 28,
      successRate: 100,
      averageDeliveryTime: 12,
      clientSatisfactionScore: 98,
      certifications: ['Google UX Design', 'Adobe Certified Expert'],
      languages: ['עברית', 'English'],
      availableFrom: '2024-02-15',
      maxCapacity: 3,
      currentCapacity: 2,
      accountManager: {
        id: 'am2',
        name: 'יוסי גולדברג',
        email: 'yossi.goldberg@company.com'
      },
      contractStartDate: '2023-06-01',
      contractEndDate: '2024-05-31',
      lastActivity: '2024-01-19',
      documents: [
        {
          id: 'doc3',
          name: 'חוזה יועצת עצמאית',
          type: 'contract',
          status: 'valid',
          expiryDate: '2024-05-31',
          url: '/documents/michal-contract.pdf',
          uploadDate: '2023-05-25'
        }
      ],
      projects: [
        {
          id: 'proj3',
          name: 'עיצוב מערכת ניהול תוכן',
          clientName: 'חברת הטכנולוגיה',
          status: 'completed',
          startDate: '2023-11-01',
          endDate: '2024-01-10',
          budget: 120000,
          actualCost: 115000,
          rating: 5,
          feedback: 'עבודה יוצאת דופן!'
        }
      ],
      communications: [
        {
          id: 'comm2',
          type: 'whatsapp',
          subject: 'בקשת הצעת מחיר חדשה',
          date: '2024-01-17',
          author: 'מיכל רוזן',
          summary: 'שלחה הצעת מחיר לפרויקט חדש',
          priority: 'high'
        }
      ],
      performanceMetrics: {
        qualityScore: 98,
        timeliness: 95,
        communication: 97,
        costEffectiveness: 89,
        reliability: 99
      },
      tags: ['מעצבת מובילה', 'יצירתית', 'מקצועית'],
      notes: 'מעצבת מעולה עם ניסיון בחברות הייטק מובילות',
      riskLevel: 'low',
      preferredPaymentMethod: 'העברה בנקאית',
      taxId: '987654321'
    },
    {
      id: '3',
      name: 'SecureCode Agency',
      type: 'agency',
      specialization: ['Cybersecurity', 'Penetration Testing', 'Security Audits'],
      status: 'active',
      rating: 4.6,
      contactName: 'אלון שפירא',
      contactEmail: 'alon@securecode.co.il',
      contactPhone: '+972-54-456-7890',
      address: 'הנחשול 8, הרצלייה',
      website: 'securecode.co.il',
      establishedYear: 2012,
      employeeCount: '20-50',
      totalBilled: 1800000,
      outstandingPayments: 95000,
      averageRate: 500,
      paymentTerms: 'Net 45',
      completedProjects: 32,
      successRate: 91,
      averageDeliveryTime: 25,
      clientSatisfactionScore: 89,
      certifications: ['ISO 27001', 'CISSP', 'CEH'],
      languages: ['עברית', 'English'],
      availableFrom: '2024-04-01',
      maxCapacity: 8,
      currentCapacity: 6,
      accountManager: {
        id: 'am3',
        name: 'רונית דוד',
        email: 'ronit.david@company.com'
      },
      contractStartDate: '2023-03-15',
      contractEndDate: '2025-03-14',
      lastActivity: '2024-01-21',
      documents: [
        {
          id: 'doc4',
          name: 'הסכם סודיות מתקדם',
          type: 'contract',
          status: 'valid',
          expiryDate: '2025-03-14',
          url: '/documents/securecode-nda.pdf',
          uploadDate: '2023-03-10'
        },
        {
          id: 'doc5',
          name: 'רישיון אבטחת מידע',
          type: 'license',
          status: 'valid',
          expiryDate: '2024-12-31',
          url: '/documents/securecode-license.pdf',
          uploadDate: '2024-01-01'
        }
      ],
      projects: [
        {
          id: 'proj4',
          name: 'ביקורת אבטחה לרפאל',
          clientName: 'רפאל מערכות לחימה',
          status: 'active',
          startDate: '2024-01-05',
          budget: 280000,
          actualCost: 220000
        }
      ],
      communications: [],
      performanceMetrics: {
        qualityScore: 91,
        timeliness: 87,
        communication: 85,
        costEffectiveness: 88,
        reliability: 94
      },
      tags: ['ביטחוני', 'אבטחת מידע', 'מוסמך'],
      notes: 'ספק אמין לפרויקטים ביטחוניים רגישים',
      riskLevel: 'medium',
      preferredPaymentMethod: 'העברה בנקאית',
      taxId: '456789123'
    },
    {
      id: '4',
      name: 'יוסי כהן - מפתח בכיר',
      type: 'individual',
      specialization: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      status: 'pending',
      rating: 4.3,
      contactName: 'יוסי כהן',
      contactEmail: 'yossi.cohen.dev@gmail.com',
      contactPhone: '+972-50-555-7777',
      address: 'יפו 123, ירושלים',
      establishedYear: 2020,
      employeeCount: '1',
      totalBilled: 420000,
      outstandingPayments: 0,
      averageRate: 320,
      paymentTerms: 'Net 30',
      completedProjects: 12,
      successRate: 89,
      averageDeliveryTime: 22,
      clientSatisfactionScore: 86,
      certifications: ['AWS Developer', 'React Certified'],
      languages: ['עברית', 'English'],
      availableFrom: '2024-02-01',
      maxCapacity: 2,
      currentCapacity: 0,
      accountManager: {
        id: 'am4',
        name: 'מיכל דוד',
        email: 'michal.david@company.com'
      },
      contractStartDate: '2023-08-01',
      contractEndDate: '2024-07-31',
      lastActivity: '2024-01-15',
      documents: [],
      projects: [
        {
          id: 'proj5',
          name: 'אתר אינטרנט חדש',
          clientName: 'startup חדש',
          status: 'completed',
          startDate: '2023-12-01',
          endDate: '2024-01-12',
          budget: 85000,
          actualCost: 88000,
          rating: 4
        }
      ],
      communications: [],
      performanceMetrics: {
        qualityScore: 85,
        timeliness: 83,
        communication: 90,
        costEffectiveness: 92,
        reliability: 87
      },
      tags: ['מפתח צעיר', 'פוטנציאל'],
      notes: 'מפתח צעיר עם פוטנציאל גבוה, זקוק להכשרה נוספת',
      riskLevel: 'medium',
      preferredPaymentMethod: 'העברה בנקאית',
      taxId: '789123456'
    }
  ];

  // Enhanced filtering logic
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                  vendor.specialization.some(spec => spec.includes(selectedSpecialization));
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesType = selectedType === 'all' || vendor.type === selectedType;
    const matchesRating = ratingFilter === 'all' || 
                         (ratingFilter === '5' && vendor.rating >= 4.5) ||
                         (ratingFilter === '4+' && vendor.rating >= 4.0) ||
                         (ratingFilter === '3+' && vendor.rating >= 3.0) ||
                         (ratingFilter === '2+' && vendor.rating >= 2.0);
    
    return matchesSearch && matchesSpecialization && matchesStatus && matchesType && matchesRating;
  });

  // Enhanced statistics calculation
  const stats = {
    totalVendors: mockVendors.length,
    activeVendors: mockVendors.filter(v => v.status === 'active').length,
    pendingVendors: mockVendors.filter(v => v.status === 'pending').length,
    totalBilled: mockVendors.reduce((sum, vendor) => sum + vendor.totalBilled, 0),
    outstandingPayments: mockVendors.reduce((sum, vendor) => sum + vendor.outstandingPayments, 0),
    averageRating: Math.round((mockVendors.reduce((sum, vendor) => sum + vendor.rating, 0) / mockVendors.length) * 10) / 10,
    activeProjects: mockVendors.reduce((sum, vendor) => sum + vendor.projects.filter(p => p.status === 'active').length, 0),
    totalCapacity: mockVendors.reduce((sum, vendor) => sum + vendor.maxCapacity, 0),
    usedCapacity: mockVendors.reduce((sum, vendor) => sum + vendor.currentCapacity, 0),
    expiredDocuments: mockVendors.reduce((sum, vendor) => sum + vendor.documents.filter(doc => doc.status === 'expired').length, 0)
  };

  // AI Insights for vendors
  const aiInsights = [
    {
      type: 'performance',
      title: 'ביצועים יוצאי דופן',
      message: 'מיכל רוזן מציגה ציון שביעות רצון של 98% - כדאי להגדיל את היקף העבודה איתה',
      priority: 'high',
      confidence: 96,
      action: 'הרחב שיתוף פעולה'
    },
    {
      type: 'risk',
      title: 'זיהוי סיכון',
      message: '3 ספקים עם מסמכים שפגים - נדרשת פעולה מיידית לחידוש',
      priority: 'urgent',
      confidence: 100,
      action: 'חדש מסמכים'
    },
    {
      type: 'cost',
      title: 'חיסכון בעלויות',
      message: 'העברת 20% מהעבודה לספקים בדירוג גבוה יחסוך 15% בעלויות',
      priority: 'medium',
      confidence: 87,
      action: 'בצע אופטימיזציה'
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
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-red-600">
                  <Truck size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ספקים ונותני שירותים</h1>
                  <p className="text-orange-700 dark:text-orange-300">ניהול ספקים מתקדם עם מעקב ביצועים ו-AI</p>
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
                onClick={() => setShowNewVendorModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                ספק חדש
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAIInsights && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">תובנות AI לספקים</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">המלצות חכמות לניהול ואופטימיזציה</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">סה"כ ספקים</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalVendors}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+2 החודש</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Truck size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ספקים פעילים</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.activeVendors}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">מתוך {stats.totalVendors}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">סה"כ חויבו</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">₪{(stats.totalBilled / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">השנה</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <DollarSign size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ניצול קיבולת</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{Math.round((stats.usedCapacity / stats.totalCapacity) * 100)}%</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{stats.usedCapacity} / {stats.totalCapacity}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Target size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">דירוג ממוצע</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.averageRating}</p>
                <div className="flex items-center mt-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">מתוך 5</span>
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
                  placeholder="חיפוש לפי שם ספק, התמחות, איש קשר או תגים..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="active">פעיל</option>
                  <option value="pending">ממתין</option>
                  <option value="inactive">לא פעיל</option>
                  <option value="blacklisted">ברשימה שחורה</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סוג:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="individual">עצמאי</option>
                  <option value="company">חברה</option>
                  <option value="agency">סוכנות</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">דירוג:</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="5">5 כוכבים</option>
                  <option value="4+">4+ כוכבים</option>
                  <option value="3+">3+ כוכבים</option>
                  <option value="2+">2+ כוכבים</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">התמחות:</label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="Development">פיתוח</option>
                  <option value="Design">עיצוב</option>
                  <option value="Security">אבטחה</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Testing">בדיקות</option>
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
          <span>מציג {filteredVendors.length} מתוך {mockVendors.length} ספקים</span>
          <div className="flex items-center gap-4">
            <span>חיפוש: "{searchQuery || 'הכל'}"</span>
            {(selectedStatus !== 'all' || selectedType !== 'all' || ratingFilter !== 'all' || selectedSpecialization !== 'all') && (
              <span>מסונן: {[selectedStatus, selectedType, ratingFilter, selectedSpecialization].filter(f => f !== 'all').join(', ')}</span>
            )}
          </div>
        </div>

        {/* Enhanced Vendors Display */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      vendor.type === 'company' ? 'bg-blue-100 dark:bg-blue-900' :
                      vendor.type === 'agency' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      {vendor.type === 'company' ? <Building size={24} className="text-blue-600 dark:text-blue-400" /> :
                       vendor.type === 'agency' ? <Briefcase size={24} className="text-purple-600 dark:text-purple-400" /> :
                       <Users size={24} className="text-green-600 dark:text-green-400" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{vendor.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.specialization.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      vendor.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      vendor.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {vendor.status === 'active' ? 'פעיל' :
                       vendor.status === 'pending' ? 'ממתין' :
                       vendor.status === 'inactive' ? 'לא פעיל' : 'חסום'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{vendor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{vendor.completedProjects}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">פרויקטים</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{vendor.successRate}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">הצלחה</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users size={14} />
                    <span>{vendor.contactName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail size={14} />
                    <span>{vendor.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone size={14} />
                    <span>{vendor.contactPhone}</span>
                  </div>
                </div>

                {/* Capacity */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">קיבולת זמינה</span>
                    <span className="font-medium text-gray-900 dark:text-white">{vendor.maxCapacity - vendor.currentCapacity} / {vendor.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(vendor.currentCapacity / vendor.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {vendor.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Risk Level Indicator */}
                <div className={`flex items-center gap-2 mb-4 p-2 rounded-lg ${
                  vendor.riskLevel === 'low' ? 'bg-green-50 dark:bg-green-900/20' :
                  vendor.riskLevel === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                  vendor.riskLevel === 'high' ? 'bg-orange-50 dark:bg-orange-900/20' :
                  'bg-red-50 dark:bg-red-900/20'
                }`}>
                  <ShieldCheck size={16} className={
                    vendor.riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                    vendor.riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    vendor.riskLevel === 'high' ? 'text-orange-600 dark:text-orange-400' :
                    'text-red-600 dark:text-red-400'
                  } />
                  <span className={`text-sm font-medium ${
                    vendor.riskLevel === 'low' ? 'text-green-700 dark:text-green-300' :
                    vendor.riskLevel === 'medium' ? 'text-yellow-700 dark:text-yellow-300' :
                    vendor.riskLevel === 'high' ? 'text-orange-700 dark:text-orange-300' :
                    'text-red-700 dark:text-red-300'
                  }`}>
                    סיכון: {vendor.riskLevel === 'low' ? 'נמוך' : vendor.riskLevel === 'medium' ? 'בינוני' : vendor.riskLevel === 'high' ? 'גבוה' : 'קריטי'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">₪{vendor.averageRate}/שעה</span>
                    {vendor.outstandingPayments > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle size={14} className="text-orange-500" />
                        <span className="text-sm text-orange-600 dark:text-orange-400">תשלום ממתין</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVendor(vendor)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      פרטים
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                      הזמן
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'table' && (
          <VendorsTable
            searchQuery={searchQuery}
            specializationFilter={selectedSpecialization}
            statusFilter={selectedStatus}
          />
        )}

        {viewMode === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">אנליטיקה מתקדמת</h3>
              <p className="text-gray-600 dark:text-gray-400">תצוגת אנליטיקה מפורטת לספקים תתווסף בקרוב</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Truck size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">לא נמצאו ספקים</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">נסה לשנות את הפילטרים או הוסף ספק חדש</p>
            <button
              onClick={() => setShowNewVendorModal(true)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              הוסף ספק חדש
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 