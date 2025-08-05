'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ExternalLink, 
  RefreshCw, 
  QrCode,
  Smartphone,
  Globe,
  Settings,
  Users,
  Search,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';

interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

export function WhatsAppViewer() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const mockContacts: WhatsAppContact[] = [
    {
      id: '1',
      name: 'דוד כהן - מועמד',
      phone: '+972-50-123-4567',
      lastMessage: 'תודה על ההזמנה לראיון, אני מאשר הגעתי מחר בשעה 10:00',
      lastMessageTime: '14:30',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '2', 
      name: 'מיכל ישראלי - מועמדת',
      phone: '+972-52-987-6543',
      lastMessage: 'שלום, האם יש עדכון לגבי המשרה?',
      lastMessageTime: '13:45',
      unreadCount: 2,
      isOnline: false
    },
    {
      id: '3',
      name: 'יוסי גולדברג - מועמד',
      phone: '+972-54-456-7890',
      lastMessage: 'קיבלתי את המייל עם פרטי הראיון',
      lastMessageTime: '12:20',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '4',
      name: 'רונית שפירא - מועמדת',
      phone: '+972-53-111-2222',
      lastMessage: 'מצורף קורות החיים המעודכנים',
      lastMessageTime: '11:15',
      unreadCount: 1,
      isOnline: false
    }
  ];

  const connectToWhatsApp = async () => {
    setIsLoading(true);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      setShowQR(false);
    } catch (error) {
      console.error('Failed to connect to WhatsApp:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsAppWeb = () => {
    window.open('https://web.whatsapp.com', '_blank');
  };

  const scanQRCode = () => {
    setShowQR(true);
    // In a real implementation, this would show the actual QR code from WhatsApp Web API
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-green-600 ml-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp Business</h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            חיבור ל-WhatsApp Business
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            חבר את החשבון שלך כדי לנהל שיחות WhatsApp עם מועמדים ישירות מהמערכת
          </p>

          {showQR ? (
            <div className="space-y-4">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode size={120} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                סרוק את הקוד עם אפליקציית WhatsApp בטלפון שלך
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                ביטול
              </button>
            </div>
          ) : (
            <div className="space-y-3 w-full max-w-xs">
              <button
                onClick={scanQRCode}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
              >
                {isLoading ? (
                  <RefreshCw size={16} className="animate-spin ml-2" />
                ) : (
                  <QrCode size={16} className="ml-2" />
                )}
                סרוק QR Code
              </button>
              
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-3 text-xs text-gray-500 dark:text-gray-400">או</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              
              <button
                onClick={openWhatsAppWeb}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ExternalLink size={16} className="ml-2" />
                פתח WhatsApp Web
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
              <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp Business</h3>
              <p className="text-xs text-green-600 dark:text-green-400">מחובר</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setIsConnected(false)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded"
              title="התנתק"
            >
              <Settings size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="חיפוש שיחות..."
            className="w-full pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {mockContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setSelectedContact(contact.id)}
            className={`w-full p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              selectedContact === contact.id ? 'bg-green-50 dark:bg-green-900/20' : ''
            }`}
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {contact.name.split(' ')[0].charAt(0)}{contact.name.split(' ')[1]?.charAt(0)}
                  </span>
                </div>
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {contact.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {contact.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {contact.name}
                  </h4>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate text-right">
                  {contact.lastMessage}
                </p>
                
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {contact.phone}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Contact Actions */}
      {selectedContact && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {mockContacts.find(c => c.id === selectedContact)?.name}
            </span>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => {
                  const contact = mockContacts.find(c => c.id === selectedContact);
                  if (contact) {
                    const cleanPhone = contact.phone.replace(/[^\d]/g, '');
                    const internationalPhone = cleanPhone.startsWith('0') 
                      ? '972' + cleanPhone.substring(1) 
                      : cleanPhone;
                    window.open(`https://web.whatsapp.com/send?phone=${internationalPhone}`, '_blank');
                  }
                }}
                className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20"
                title="פתח שיחה"
              >
                <MessageSquare size={16} />
              </button>
              <button
                className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20"
                title="שיחת וידאו"
              >
                <Video size={16} />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="עוד אפשרויות"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="p-2 bg-green-50 dark:bg-green-900/20 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-xs text-green-700 dark:text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          מחובר ל-WhatsApp Business • {mockContacts.length} שיחות פעילות
        </div>
      </div>
    </div>
  );
}