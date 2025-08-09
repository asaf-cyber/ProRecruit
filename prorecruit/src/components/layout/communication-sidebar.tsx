'use client';

import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Bell, 
  Bot,
  Phone,
  Send,
  Users,
  ExternalLink,
  User,
  Building2,
  Truck,
  Briefcase,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Settings
} from 'lucide-react';

interface CommunicationSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

type SidebarTab = 'chat' | 'whatsapp' | 'calendar' | 'notifications' | 'ai' | 'portals';

export function CommunicationSidebar({ isMobile = false, isOpen = false, onClose, collapsed: externalCollapsed }: CommunicationSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isMobile ? false : (externalCollapsed ?? internalCollapsed);
  const [activeTab, setActiveTab] = useState<SidebarTab>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && onClose) {
        const sidebar = document.getElementById('communication-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, onClose]);

  const sampleChatMessages = [
    { id: 1, user: 'שרה כהן', message: 'יש מועמד חדש לתפקיד מפתח', time: '10:30', avatar: 'ש' },
    { id: 2, user: 'דני לוי', message: 'הלקוח אישר את התקציב', time: '10:25', avatar: 'ד' },
    { id: 3, user: 'מיכל גרין', message: 'נדרש אישור נוסף למשרה 234', time: '09:45', avatar: 'מ' },
  ];

  const whatsappContacts = [
    { id: 1, name: 'יוסי מנהל', phone: '+972-54-1234567', lastMessage: 'תודה על העדכון', time: '11:15' },
    { id: 2, name: 'רות ספק', phone: '+972-52-9876543', lastMessage: 'אשלח את המסמכים בקרוב', time: '10:30' },
    { id: 3, name: 'אבי לקוח', phone: '+972-50-5555555', lastMessage: 'מתי נוכל לתזמן ראיון?', time: '09:20' },
  ];

  const calendarEvents = [
    { id: 1, title: 'ראיון עם יעל כהן', time: '14:00', type: 'interview', color: 'bg-blue-500' },
    { id: 2, title: 'חתימת חוזה - חברת ABC', time: '15:30', type: 'signing', color: 'bg-green-500' },
    { id: 3, title: 'פגישת צוות', time: '16:00', type: 'meeting', color: 'bg-purple-500' },
    { id: 4, title: 'סיווג ביטחוני - דוד לוי', time: '17:00', type: 'clearance', color: 'bg-red-500' },
  ];

  const notifications = [
    { id: 1, title: 'מועמד חדש הגיש מועמדות', description: 'יעל כהן הגישה מועמדות לתפקיד מפתח בכיר', time: '5 דק', type: 'candidate', urgent: true },
    { id: 2, title: 'תקציב אושר', description: 'לקוח ABC אישר תקציב של 50,000 ש״ח', time: '15 דק', type: 'budget', urgent: false },
    { id: 3, title: 'ראיון מחר', description: 'תזכורת: ראיון עם דני לוי מחר ב-10:00', time: '1 שעה', type: 'reminder', urgent: false },
    { id: 4, title: 'חוזה יפוג בקרוב', description: 'חוזה עם ספק XYZ יפוג בעוד שבוע', time: '2 שעות', type: 'contract', urgent: true },
  ];

  const portals = [
    { name: 'פורטל לקוח', icon: Building2, href: '/client-portal', description: 'גישה ללקוחות' },
    { name: 'פורטל ספק', icon: Truck, href: '/vendor-portal', description: 'גישה לספקים' },
    { name: 'פורטל מועמד', icon: User, href: '/candidate-portal', description: 'גישה למועמדים' },
    { name: 'פורטל עובד', icon: Users, href: '/employee-portal', description: 'גישה לעובדים' },
    { name: 'פורטל מנהל', icon: Briefcase, href: '/admin-portal', description: 'גישה למנהלי מערכת' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">צ׳אט פנימי</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">תקשורת בין חברי הצוות</p>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {sampleChatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{msg.user}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="הקלד הודעה..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">תקשורת עם לקוחות וספקים</p>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {whatsappContacts.map((contact) => (
                <div key={contact.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Phone size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{contact.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder="שלח הודעת WhatsApp..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">לוח שנה</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">אירועים ומשימות להיום</p>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 ${event.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{event.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {event.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
                הוסף אירוע חדש
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">התראות</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">התראות מערכת חכמות</p>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.urgent 
                    ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${
                          notification.urgent 
                            ? 'text-red-900 dark:text-red-100' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </span>
                        {notification.urgent && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${
                        notification.urgent 
                          ? 'text-red-700 dark:text-red-200' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {notification.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                הצג הכל
              </button>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">עוזר חכם למערכת הגיוס</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-blue-900 dark:text-blue-100">AI Assistant</span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  שלום! אני כאן לעזור לך עם כל מה שקשור למערכת הגיוס. תוכל לשאול אותי על:
                </p>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>• מצב מועמדים ומשרות</p>
                  <p>• דוחות ונתונים</p>
                  <p>• תזמון ראיונות</p>
                  <p>• עדכוני לקוחות</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="שאל את ה-AI..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Bot size={16} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'portals':
        return (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">פורטלים ייעודיים</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">גישה מהירה לכל הפורטלים</p>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {portals.map((portal, index) => {
                const Icon = portal.icon;
                return (
                  <a
                    key={index}
                    href={portal.href}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                      <Icon size={16} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{portal.name}</span>
                        <ExternalLink size={14} className="text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{portal.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sidebarClasses = `
    h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
    ${collapsed ? 'w-16' : 'w-80'}
    ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300' : ''}
    ${isMobile && !isOpen ? '-translate-x-full' : ''}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      
      <div id="communication-sidebar" className={sidebarClasses} dir="ltr">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">תפעול שוטף</h2>
            )}
            <div className="flex items-center gap-2">
              {!isMobile && externalCollapsed === undefined && (
                <button
                  onClick={() => setInternalCollapsed(!internalCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                  title={collapsed ? 'הרחב סרגל' : 'צמצם סרגל'}
                >
                  {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="flex gap-1 p-2">
              {[
                { key: 'chat', icon: MessageCircle, label: 'צ׳אט' },
                { key: 'whatsapp', icon: Phone, label: 'WhatsApp' },
                { key: 'calendar', icon: Calendar, label: 'לוח שנה' },
                { key: 'notifications', icon: Bell, label: 'התראות' },
                { key: 'ai', icon: Bot, label: 'AI' },
                { key: 'portals', icon: ExternalLink, label: 'פורטלים' },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
          
          {collapsed && (
            <div className="flex flex-col gap-1 p-2">
              {[
                { key: 'chat', icon: MessageCircle, label: 'צ׳אט' },
                { key: 'whatsapp', icon: Phone, label: 'WhatsApp' },
                { key: 'calendar', icon: Calendar, label: 'לוח שנה' },
                { key: 'notifications', icon: Bell, label: 'התראות' },
                { key: 'ai', icon: Bot, label: 'AI' },
                { key: 'portals', icon: ExternalLink, label: 'פורטלים' },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`p-3 rounded-lg transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    title={tab.label}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Tab Content */}
        {!collapsed && renderTabContent()}
      </div>
    </>
  );
}