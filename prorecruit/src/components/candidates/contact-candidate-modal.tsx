'use client';

import { useState } from 'react';
import { X, Mail, Phone, MessageCircle, Send, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { WhatsAppIntegration } from './whatsapp-integration';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
}

interface ContactCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export function ContactCandidateModal({ isOpen, onClose, candidate }: ContactCandidateModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'phone' | 'sms' | 'whatsapp'>('email');
  const [emailData, setEmailData] = useState({
    subject: '',
    message: ''
  });
  const [smsMessage, setSmsMessage] = useState('');
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Email templates
  const emailTemplates = [
    {
      name: 'הזמנה לראיון',
      subject: `הזמנה לראיון - ${candidate?.currentRole || 'תפקיד'}`,
      message: `שלום ${candidate?.firstName || ''},

אני שמח/ה ליידע אותך שהמועמדות שלך למשרת ${candidate?.currentRole || 'התפקיד'} ב${candidate?.company || 'החברה'} זכתה להתעניינות.

נשמח להזמינך לראיון אישי. אנא חזר/י אלי בהקדם האפשרי כדי לתאם מועד המתאים לך.

בברכה,
אסף מנהל
מחלקת גיוס`
    },
    {
      name: 'בקשת מידע נוסף',
      subject: 'בקשת מידע נוסף לגבי המועמדות שלך',
      message: `שלום ${candidate?.firstName || ''},

תודה על המועמדות שלך למשרת ${candidate?.currentRole || 'התפקיד'}.

נשמח לקבל מידע נוסף:
• קורות חיים מעודכנים
• המלצות מעבודות קודמות
• זמינות להתחלת עבודה

אנא שלח/י את המידע בהקדם האפשרי.

בברכה,
אסף מנהל`
    },
    {
      name: 'עדכון סטטוס',
      subject: 'עדכון לגבי המועמדות שלך',
      message: `שלום ${candidate?.firstName || ''},

רציתי לעדכן אותך לגבי סטטוס המועמדות שלך למשרת ${candidate?.currentRole || 'התפקיד'}.

נשמח לשמור על קשר ולעדכן אותך בהתפתחויות.

בברכה,
אסף מנהל`
    }
  ];

  // SMS templates
  const smsTemplates = [
    `שלום ${candidate?.firstName || ''}, זו הזמנה לראיון למשרת ${candidate?.currentRole || 'התפקיד'}. אנא חזר/י בהקדם. תודה, אסף מנהל`,
    `שלום ${candidate?.firstName || ''}, תודה על המועמדות. נשמח לקבל קורות חיים מעודכנים. בברכה, אסף מנהל`,
    `שלום ${candidate?.firstName || ''}, עדכון: המועמדות שלך עוברת לשלב הבא. נחזור אליך בקרוב. אסף מנהל`
  ];

  const handleEmailTemplateSelect = (template: typeof emailTemplates[0]) => {
    setEmailData({
      subject: template.subject,
      message: template.message
    });
  };

  const handleSendEmail = async () => {
    if (!candidate || !emailData.subject || !emailData.message) return;

    setIsSending(true);
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mailto link as fallback
      const mailtoLink = `mailto:${candidate.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`;
      window.open(mailtoLink);
      
      alert('האימייל נשלח בהצלחה!');
      onClose();
    } catch (error) {
      alert('שגיאה בשליחת האימייל');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendSMS = async () => {
    if (!candidate || !smsMessage) return;

    setIsSending(true);
    try {
      // Simulate SMS sending - in real app this would call SMS API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`SMS נשלח ל-${candidate.phone}`);
      onClose();
    } catch (error) {
      alert('שגיאה בשליחת SMS');
    } finally {
      setIsSending(false);
    }
  };

  const handlePhoneCall = () => {
    if (!candidate) return;
    
    // Create tel link
    const telLink = `tel:${candidate.phone.replace(/[^\d+]/g, '')}`;
    window.open(telLink);
    
    // Also copy to clipboard
    navigator.clipboard.writeText(candidate.phone);
    alert(`מספר הטלפון הועתק: ${candidate.phone}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('הועתק ללוח!');
  };

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            יצירת קשר עם {candidate.firstName} {candidate.lastName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Candidate Info */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.currentRole}</p>
              <div className="flex items-center space-x-4 space-x-reverse mt-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail size={14} className="ml-1" />
                  {candidate.email}
                  <button
                    onClick={() => copyToClipboard(candidate.email)}
                    className="mr-2 text-blue-600 hover:text-blue-700"
                  >
                    <Copy size={12} />
                  </button>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone size={14} className="ml-1" />
                  {candidate.phone}
                  <button
                    onClick={() => copyToClipboard(candidate.phone)}
                    className="mr-2 text-blue-600 hover:text-blue-700"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Mail size={16} className="inline ml-2" />
              אימייל
            </button>
            <button
              onClick={() => setActiveTab('phone')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'phone'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Phone size={16} className="inline ml-2" />
              טלפון
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sms'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <MessageCircle size={16} className="inline ml-2" />
              SMS
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'whatsapp'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <MessageSquare size={16} className="inline ml-2" />
              WhatsApp
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              {/* Email Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תבניות אימייל
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {emailTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmailTemplateSelect(template)}
                      className="text-right p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{template.subject}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  נושא האימייל
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="נושא האימייל..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תוכן האימייל
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="תוכן האימייל..."
                />
              </div>

              <button
                onClick={handleSendEmail}
                disabled={isSending || !emailData.subject || !emailData.message}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    שולח...
                  </>
                ) : (
                  <>
                    <Send size={16} className="ml-2" />
                    שלח אימייל
                  </>
                )}
              </button>
            </div>
          )}

          {/* Phone Tab */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Phone size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  התקשר ל-{candidate.firstName}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  מספר טלפון: {candidate.phone}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handlePhoneCall}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Phone size={16} className="ml-2" />
                    התקשר עכשיו
                  </button>
                  <button
                    onClick={() => copyToClipboard(candidate.phone)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Copy size={16} className="ml-2" />
                    העתק מספר טלפון
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SMS Tab */}
          {activeTab === 'sms' && (
            <div className="space-y-4">
              {/* SMS Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תבניות SMS
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {smsTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setSmsMessage(template)}
                      className="text-right p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-sm text-gray-900 dark:text-white">{template}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SMS Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  הודעת SMS
                </label>
                <textarea
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  rows={4}
                  maxLength={160}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="תוכן הודעת SMS..."
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {smsMessage.length}/160 תווים
                </div>
              </div>

              <button
                onClick={handleSendSMS}
                disabled={isSending || !smsMessage}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    שולח...
                  </>
                ) : (
                  <>
                    <MessageCircle size={16} className="ml-2" />
                    שלח SMS
                  </>
                )}
              </button>
            </div>
          )}

          {/* WhatsApp Tab */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <MessageSquare size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  WhatsApp - {candidate.firstName}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  שלח הודעת WhatsApp ל-{candidate.phone}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowWhatsApp(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <MessageSquare size={16} className="ml-2" />
                    פתח צ'אט WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    נדרש WhatsApp Business API • עלות: ₪0.15 להודעה
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Integration Modal */}
      {showWhatsApp && candidate && (
        <WhatsAppIntegration
          candidateId={candidate.id}
          candidateName={`${candidate.firstName} ${candidate.lastName}`}
          candidatePhone={candidate.phone}
          isOpen={showWhatsApp}
          onClose={() => setShowWhatsApp(false)}
        />
      )}
    </div>
  );
}