'use client';

import { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  Shield,
  AlertCircle,
  CheckCircle,
  Pause,
  Play,
  Archive,
  MoreHorizontal,
  UserPlus,
  FileText,
  TrendingUp,
  Star,
  Mail,
  Phone,
  Copy,
  Link,
  Share2,
  Download
} from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';

interface EnhancedJobCardProps {
  job: JobRequisition;
  onEdit: (jobId: string) => void;
  onView: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobRequisition['status']) => void;
  onDuplicate?: (jobId: string) => void;
  onShare?: (jobId: string) => void;
  onExport?: (jobId: string) => void;
}

export function EnhancedJobCard({ 
  job, 
  onEdit, 
  onView, 
  onDelete, 
  onStatusChange, 
  onDuplicate,
  onShare,
  onExport 
}: EnhancedJobCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Status configuration
  const getStatusConfig = (status: JobRequisition['status']) => {
    switch (status) {
      case 'published':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'פורסמה',
          bgAccent: 'bg-green-50'
        };
      case 'draft':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: FileText,
          label: 'טיוטה',
          bgAccent: 'bg-gray-50'
        };
      case 'closed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: Archive,
          label: 'סגורה',
          bgAccent: 'bg-red-50'
        };
      case 'on_hold':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Pause,
          label: 'מושהית',
          bgAccent: 'bg-yellow-50'
        };
    }
  };

  const statusConfig = getStatusConfig(job.status);
  const StatusIcon = statusConfig.icon;

  // Calculate job metrics
  const daysOpen = job.publishDate 
    ? Math.floor((new Date().getTime() - new Date(job.publishDate).getTime()) / (1000 * 3600 * 24))
    : 0;

  const successRate = job.candidatesCount > 0 
    ? Math.round((job.applications.length / job.candidatesCount) * 100)
    : 0;

  // Priority calculation based on various factors
  const calculatePriority = () => {
    let priority = 0;
    if (job.tags.includes('דחוף')) priority += 3;
    if (job.securityClearance) priority += 2;
    if (job.client?.type === 'security') priority += 2;
    if (daysOpen > 30) priority += 1;
    
    if (priority >= 5) return { level: 'high', label: 'גבוהה', color: 'text-red-600 bg-red-100' };
    if (priority >= 3) return { level: 'medium', label: 'בינונית', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'low', label: 'נמוכה', color: 'text-green-600 bg-green-100' };
  };

  const priority = calculatePriority();

  const handleStatusChange = (newStatus: JobRequisition['status']) => {
    onStatusChange(job.id, newStatus);
    setShowActions(false);
  };

  const handleAction = (action: () => void) => {
    action();
    setShowActions(false);
  };

  return (
    <div className={`bg-white rounded-xl border-2 ${statusConfig.color.split(' ')[2]} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
      {/* Header with Status Strip */}
      <div className={`${statusConfig.bgAccent} px-6 py-3 border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <StatusIcon className="w-5 h-5 text-gray-600" />
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
              עדיפות {priority.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm text-gray-500">
              נוצרה {new Date(job.createdDate).toLocaleDateString('he-IL')}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
              
              {showActions && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {/* View Actions */}
                    <button
                      onClick={() => handleAction(() => onView(job.id))}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 ml-3" />
                      הצג פרופיל מלא
                    </button>
                    
                    <button
                      onClick={() => handleAction(() => onEdit(job.id))}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 ml-3" />
                      ערוך משרה
                    </button>

                    <hr className="my-1" />

                    {/* Status Change Actions */}
                    {job.status === 'draft' && (
                      <button
                        onClick={() => handleStatusChange('published')}
                        className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      >
                        <Play className="w-4 h-4 ml-3" />
                        פרסם משרה
                      </button>
                    )}
                    
                    {job.status === 'published' && (
                      <>
                        <button
                          onClick={() => handleStatusChange('on_hold')}
                          className="flex items-center w-full px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                        >
                          <Pause className="w-4 h-4 ml-3" />
                          השהה משרה
                        </button>
                        <button
                          onClick={() => handleStatusChange('closed')}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Archive className="w-4 h-4 ml-3" />
                          סגור משרה
                        </button>
                      </>
                    )}
                    
                    {job.status === 'on_hold' && (
                      <button
                        onClick={() => handleStatusChange('published')}
                        className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      >
                        <Play className="w-4 h-4 ml-3" />
                        חדש פרסום
                      </button>
                    )}

                    <hr className="my-1" />

                    {/* Additional Actions */}
                    {onDuplicate && (
                      <button
                        onClick={() => handleAction(() => onDuplicate(job.id))}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Copy className="w-4 h-4 ml-3" />
                        שכפל משרה
                      </button>
                    )}
                    
                    {onShare && (
                      <button
                        onClick={() => handleAction(() => onShare(job.id))}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Share2 className="w-4 h-4 ml-3" />
                        שתף קישור
                      </button>
                    )}
                    
                    {onExport && (
                      <button
                        onClick={() => handleAction(() => onExport(job.id))}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Download className="w-4 h-4 ml-3" />
                        ייצא לPDF
                      </button>
                    )}

                    <hr className="my-1" />
                    
                    <button
                      onClick={() => handleAction(() => onDelete(job.id))}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 ml-3" />
                      מחק משרה
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Job Title and Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {job.title}
          </h3>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Building2 className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
            
            <div className="flex items-center space-x-1 space-x-reverse">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center space-x-1 space-x-reverse">
              <DollarSign className="w-4 h-4" />
              <span>₪{job.salaryRange.min.toLocaleString()} - ₪{job.salaryRange.max.toLocaleString()}</span>
            </div>
            
            {job.securityClearance && (
              <div className="flex items-center space-x-1 space-x-reverse">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600 font-medium">{job.securityClearance}</span>
              </div>
            )}
          </div>
        </div>

        {/* Client and Manager Info */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.client && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">לקוח</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-900">{job.client.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    job.client.type === 'security' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.client.type === 'security' ? 'ביטחוני' : 'אזרחי'}
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">מנהל מגייס</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {job.recruitingManager.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-900">{job.recruitingManager.name}</div>
                  <div className="text-xs text-gray-500">{job.recruitingManager.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{job.candidatesCount}</div>
            <div className="text-xs text-gray-600">מועמדים</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{successRate}%</div>
            <div className="text-xs text-gray-600">הצלחה</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{daysOpen}</div>
            <div className="text-xs text-gray-600">ימים פתוחה</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{job.averageDaysToHire || 'N/A'}</div>
            <div className="text-xs text-gray-600">ממוצע גיוס</div>
          </div>
        </div>

        {/* Description Preview */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-3">
            {job.description}
          </p>
          {job.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              {isExpanded ? 'הראה פחות' : 'הראה עוד...'}
            </button>
          )}
        </div>

        {/* Tags */}
        {job.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {job.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{job.tags.length - 3} עוד
                </span>
              )}
            </div>
          </div>
        )}

        {/* Purchase Order Info */}
        {job.purchaseOrder && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-green-800">הזמנת רכש</div>
                <div className="text-sm text-green-600">{job.purchaseOrder.poNumber}</div>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-green-800">
                  ₪{job.purchaseOrder.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => onView(job.id)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Eye className="w-4 h-4 ml-2" />
              הצג פרופיל
            </button>
            
            <button
              onClick={() => onEdit(job.id)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              <Edit className="w-4 h-4 ml-2" />
              ערוך
            </button>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>עודכן {new Date(job.updatedDate).toLocaleDateString('he-IL')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}