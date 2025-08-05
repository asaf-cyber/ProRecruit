'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Check, 
  CheckCheck, 
  Clock,
  AlertCircle,
  User,
  Phone
} from 'lucide-react';

interface WhatsAppMessage {
  id: string;
  message: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  isOutbound: boolean;
  candidateName: string;
  candidatePhone: string;
}

interface WhatsAppIntegrationProps {
  candidateId: string;
  candidateName: string;
  candidatePhone: string;
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppIntegration({ 
  candidateId, 
  candidateName, 
  candidatePhone, 
  isOpen, 
  onClose 
}: WhatsAppIntegrationProps) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      message: 'שלום! זוהי תזכורת לראיון שלך מחר בשעה 10:00. אנא אשר הגעתך.',
      timestamp: '2024-01-18T14:30:00',
      status: 'read',
      isOutbound: true,
      candidateName,
      candidatePhone
    },
    {
      id: '2',
      message: 'שלום, תודה על התזכורת. אני מאשר הגעתי לראיון מחר בשעה 10:00.',
      timestamp: '2024-01-18T14:35:00',
      status: 'delivered',
      isOutbound: false,
      candidateName,
      candidatePhone
    },
    {
      id: '3',
      message: 'מעולה! הראיון יתקיים במשרדינו ברח\' הירקון 1, תל אביב. קומה 5.',
      timestamp: '2024-01-18T14:36:00',
      status: 'delivered',
      isOutbound: true,
      candidateName,
      candidatePhone
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messageTemplates = [
    'שלום! זוהי תזכורת לראיון שלך מחר בשעה [TIME]. אנא אשר הגעתך.',
    'תודה על הגשת המועמדות. נחזור אליך בהקדם האפשרי.',
    'מזל טוב! עברת לשלב הבא בתהליך הגיוס. נתאם ראיון בקרוב.',
    'תודה על השתתפותך בראיון. נחזור אליך תוך 3-5 ימי עסקים.',
    'ברצוננו לעדכן אותך שהתפקיד מולא. תודה על ההשתתפות בתהליך.',
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-gray-500" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-500" />;
      case 'failed':
        return <AlertCircle size={12} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sending': return 'שולח...';
      case 'sent': return 'נשלח';
      case 'delivered': return 'נמסר';
      case 'read': return 'נקרא';
      case 'failed': return 'נכשל';
      default: return status;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    
    const message: WhatsAppMessage = {
      id: Date.now().toString(),
      message: newMessage,
      timestamp: new Date().toISOString(),
      status: 'sending',
      isOutbound: true,
      candidateName,
      candidatePhone
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      // Simulate API call to WhatsApp Business API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update message status to sent
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, status: 'sent' }
          : msg
      ));

      // Simulate delivery confirmation after another delay
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' }
            : msg
        ));
      }, 1000);

    } catch (error) {
      // Update message status to failed
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, status: 'failed' }
          : msg
      ));
    } finally {
      setIsSending(false);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setNewMessage(template);
  };

  const openWhatsAppWeb = () => {
    const cleanPhone = candidatePhone.replace(/[^\d]/g, '');
    const internationalPhone = cleanPhone.startsWith('0') 
      ? '972' + cleanPhone.substring(1) 
      : cleanPhone;
    
    const url = `https://web.whatsapp.com/send?phone=${internationalPhone}&text=${encodeURIComponent(newMessage)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 mr-3">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                WhatsApp - {candidateName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Phone size={12} className="ml-1" />
                {candidatePhone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOutbound ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isOutbound
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <div className={`flex items-center justify-end mt-1 text-xs ${
                  message.isOutbound ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <span className="ml-1">
                    {new Date(message.timestamp).toLocaleTimeString('he-IL', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {message.isOutbound && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">תבניות מהירות:</h4>
          <div className="flex flex-wrap gap-2">
            {messageTemplates.slice(0, 3).map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {template.substring(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex space-x-3 space-x-reverse">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="הקלד הודעה..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors flex items-center"
              >
                {isSending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                ) : (
                  <Send size={16} className="ml-2" />
                )}
                שלח
              </button>
              <button
                onClick={openWhatsAppWeb}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center text-xs"
              >
                <MessageSquare size={14} className="ml-1" />
                WhatsApp Web
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            הודעות נשלחות דרך WhatsApp Business API • צפויה עלות של ₪0.15 להודעה
          </div>
        </div>
      </div>
    </div>
  );
}