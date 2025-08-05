'use client';

import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  Plus,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
}

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onSchedule: (interviewData: InterviewScheduleData) => void;
}

interface InterviewScheduleData {
  candidateId: string;
  type: 'phone' | 'video' | 'in_person';
  date: string;
  time: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  notes?: string;
  sendInvitation: boolean;
  reminderBefore: number;
}

export function ScheduleInterviewModal({ 
  isOpen, 
  onClose, 
  candidate, 
  onSchedule 
}: ScheduleInterviewModalProps) {
  const [formData, setFormData] = useState<Partial<InterviewScheduleData>>({
    type: 'video',
    date: '',
    time: '',
    duration: 60,
    interviewers: ['אסף מנהל'],
    sendInvitation: true,
    reminderBefore: 24
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const availableInterviewers = [
    { id: '1', name: 'אסף מנהל', role: 'מגייס ראשי', available: true },
    { id: '2', name: 'שרה כהן', role: 'מנהלת HR', available: true },
    { id: '3', name: 'דוד לוי', role: 'מגייס בכיר', available: false },
    { id: '4', name: 'מיכל ישראלי', role: 'מנהלת טכנית', available: true },
    { id: '5', name: 'יוסי גולדברג', role: 'מנהל פרויקטים', available: true }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'תאריך חובה';
    if (!formData.time) newErrors.time = 'שעה חובה';
    if (!formData.interviewers || formData.interviewers.length === 0) {
      newErrors.interviewers = 'יש לבחור לפחות מראיין אחד';
    }
    if (formData.type === 'in_person' && !formData.location) {
      newErrors.location = 'מיקום חובה לראיון פרונטלי';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidate || !validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const interviewData: InterviewScheduleData = {
        candidateId: candidate.id,
        type: formData.type!,
        date: formData.date!,
        time: formData.time!,
        duration: formData.duration!,
        location: formData.location,
        meetingLink: formData.type === 'video' ? 'https://zoom.us/j/123456789' : undefined,
        interviewers: formData.interviewers!,
        notes: formData.notes,
        sendInvitation: formData.sendInvitation!,
        reminderBefore: formData.reminderBefore!
      };

      onSchedule(interviewData);
      onClose();
      
      // Reset form
      setFormData({
        type: 'video',
        date: '',
        time: '',
        duration: 60,
        interviewers: ['אסף מנהל'],
        sendInvitation: true,
        reminderBefore: 24
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addInterviewer = (interviewer: string) => {
    if (!formData.interviewers?.includes(interviewer)) {
      updateFormData('interviewers', [...(formData.interviewers || []), interviewer]);
    }
  };

  const removeInterviewer = (interviewer: string) => {
    updateFormData('interviewers', 
      formData.interviewers?.filter(i => i !== interviewer) || []
    );
  };

  const getInterviewTypeIcon = () => {
    switch (formData.type) {
      case 'phone':
        return <Phone className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'in_person':
        return <Users className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          פרטי הראיון הבסיסיים
        </h3>
        
        {/* Interview Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            סוג הראיון
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'phone', label: 'שיחת טלפון', icon: Phone, color: 'blue' },
              { value: 'video', label: 'ועידת וידאו', icon: Video, color: 'green' },
              { value: 'in_person', label: 'פרונטלי', icon: Users, color: 'purple' }
            ].map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateFormData('type', type.value)}
                  className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                    formData.type === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    formData.type === type.value 
                      ? `text-${type.color}-600` 
                      : 'text-gray-400'
                  }`} />
                  <div className={`text-sm font-medium ${
                    formData.type === type.value 
                      ? `text-${type.color}-600` 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {type.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              תאריך *
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              שעה *
            </label>
            <select
              value={formData.time}
              onChange={(e) => updateFormData('time', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.time ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">בחר שעה</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            משך הראיון (דקות)
          </label>
          <select
            value={formData.duration}
            onChange={(e) => updateFormData('duration', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value={30}>30 דקות</option>
            <option value={45}>45 דקות</option>
            <option value={60}>60 דקות</option>
            <option value={90}>90 דקות</option>
            <option value={120}>120 דקות</option>
          </select>
        </div>

        {/* Location for in-person interviews */}
        {formData.type === 'in_person' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              מיקום הראיון *
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="כתובת המשרד או מקום הראיון"
                className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          מראיינים ופרטים נוספים
        </h3>

        {/* Interviewers */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            מראיינים *
          </label>
          
          {/* Selected Interviewers */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {formData.interviewers?.map((interviewer, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                >
                  <User size={12} className="ml-1" />
                  {interviewer}
                  <button
                    type="button"
                    onClick={() => removeInterviewer(interviewer)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            {errors.interviewers && <p className="text-red-500 text-xs mt-1">{errors.interviewers}</p>}
          </div>

          {/* Available Interviewers */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              מראיינים זמינים
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableInterviewers.map((interviewer) => (
                <div
                  key={interviewer.id}
                  className={`flex items-center justify-between p-2 rounded ${
                    interviewer.available
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      interviewer.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {interviewer.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {interviewer.role}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addInterviewer(interviewer.name)}
                    disabled={!interviewer.available || formData.interviewers?.includes(interviewer.name)}
                    className="p-1 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            הערות נוספות
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => updateFormData('notes', e.target.value)}
            rows={3}
            placeholder="הערות למראיינים או למועמד..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            הגדרות התראות
          </h4>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.sendInvitation}
                onChange={(e) => updateFormData('sendInvitation', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                שלח הזמנה למועמד ולמראיינים
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                תזכורת לפני הראיון
              </label>
              <select
                value={formData.reminderBefore}
                onChange={(e) => updateFormData('reminderBefore', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={30}>30 דקות לפני</option>
                <option value={60}>שעה לפני</option>
                <option value={120}>שעתיים לפני</option>
                <option value={360}>6 שעות לפני</option>
                <option value={1440}>יום לפני</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          סיכום פרטי הראיון
        </h3>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            {getInterviewTypeIcon()}
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mr-3">
              ראיון עם {candidate?.firstName} {candidate?.lastName}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">סוג הראיון:</span>
              <p className="text-gray-900 dark:text-white">
                {formData.type === 'phone' && 'שיחת טלפון'}
                {formData.type === 'video' && 'ועידת וידאו'}
                {formData.type === 'in_person' && 'ראיון פרונטלי'}
              </p>
            </div>

            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">תאריך ושעה:</span>
              <p className="text-gray-900 dark:text-white">
                {new Date(formData.date!).toLocaleDateString('he-IL')} בשעה {formData.time}
              </p>
            </div>

            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">משך הראיון:</span>
              <p className="text-gray-900 dark:text-white">{formData.duration} דקות</p>
            </div>

            {formData.location && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">מיקום:</span>
                <p className="text-gray-900 dark:text-white">{formData.location}</p>
              </div>
            )}

            <div className="col-span-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">מראיינים:</span>
              <p className="text-gray-900 dark:text-white">
                {formData.interviewers?.join(', ')}
              </p>
            </div>

            {formData.notes && (
              <div className="col-span-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">הערות:</span>
                <p className="text-gray-900 dark:text-white">{formData.notes}</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle size={16} className="ml-2 text-green-500" />
              <span>
                {formData.sendInvitation ? 'הזמנה תישלח אוטומטית' : 'לא תישלח הזמנה אוטומטית'} • 
                תזכורת {formData.reminderBefore! < 60 ? `${formData.reminderBefore} דקות` : 
                        formData.reminderBefore! < 1440 ? `${formData.reminderBefore! / 60} שעות` : 
                        `${formData.reminderBefore! / 1440} ימים`} לפני
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  קביעת ראיון
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {candidate.firstName} {candidate.lastName} • {candidate.currentRole}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>פרטים בסיסיים</span>
            <span>מראיינים</span>
            <span>סיכום</span>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderSummary()}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 space-x-reverse">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  הקודם
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ביטול
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 1 && validateForm()) {
                      setCurrentStep(2);
                    } else if (currentStep === 2) {
                      setCurrentStep(3);
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                >
                  הבא
                  <ArrowLeft size={16} className="mr-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      קובע ראיון...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="ml-2" />
                      קבע ראיון
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}