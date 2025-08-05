'use client';

import { useState } from 'react';
import { 
  X, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  MessageSquare, 
  Bot, 
  Mail,
  Phone,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Send,
  Paperclip,
  Search
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'system' | 'whatsapp' | 'ai';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  sender?: string;
  avatar?: string;
  priority?: 'high' | 'medium' | 'low';
}

export function NotificationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'system' | 'whatsapp' | 'ai'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  // Mock messages data
  const messages: Message[] = [
    {
      id: '1',
      type: 'user',
      title: 'הודעה מיוסי גולדברג',
      content: 'היי, יש לי מועמד מעולה למשרת Full Stack. אשמח לדבר איתך',
      timestamp: '2024-01-20T10:30:00',
      read: false,
      sender: 'יוסי גולדברג',
      priority: 'high'
    },
    {
      id: '2',
      type: 'system',
      title: 'ראיון מתוכנן בעוד שעה',
      content: 'תזכורת: ראיון עם דוד כהן למשרת Frontend Developer בשעה 14:00',
      timestamp: '2024-01-20T13:00:00',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'whatsapp',
      title: 'WhatsApp מדוד כהן',
      content: 'תודה על ההזדמנות! אני מאוד מתרגש לקראת הראיון',
      timestamp: '2024-01-20T09:15:00',
      read: true,
      sender: 'דוד כהן'
    },
    {
      id: '4',
      type: 'user',
      title: 'שרה כהן שיתפה מועמד',
      content: 'שיתפתי איתך פרופיל של מועמד חדש למשרת DevOps',
      timestamp: '2024-01-20T08:45:00',
      read: true,
      sender: 'שרה כהן'
    },
    {
      id: '5',
      type: 'system',
      title: 'דוח שבועי מוכן',
      content: 'הדוח השבועי של פעילות הגיוס מוכן לצפייה',
      timestamp: '2024-01-19T18:00:00',
      read: true
    }
  ];

  const systemMessages = messages.filter(m => m.type === 'system');
  const userMessages = messages.filter(m => m.type === 'user');
  const whatsappMessages = messages.filter(m => m.type === 'whatsapp');

  const unreadCount = messages.filter(m => !m.read).length;

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User size={16} />;
      case 'system':
        return <Bell size={16} />;
      case 'whatsapp':
        return <MessageSquare size={16} />;
      case 'ai':
        return <Bot size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `לפני ${minutes} דקות`;
    } else if (hours < 24) {
      return `לפני ${hours} שעות`;
    } else {
      return date.toLocaleDateString('he-IL');
    }
  };

  const renderMessages = (messageList: Message[]) => {
    const filteredMessages = messageList.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-2">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
              message.read 
                ? 'bg-white border-gray-200 hover:border-blue-300' 
                : 'bg-blue-50 border-blue-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className={`p-2 rounded-full ${getPriorityColor(message.priority)}`}>
                  {getMessageIcon(message.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{message.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                  {message.sender && (
                    <p className="text-xs text-gray-500 mt-2">מאת: {message.sender}</p>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAIChat = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Bot size={24} className="text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">AI Assistant למערכת הגיוס</h4>
              <p className="text-sm text-gray-600 mt-1">
                שלום! אני כאן לעזור לך עם כל שאלה על המערכת. אני יכול:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• לחפש מועמדים לפי קריטריונים</li>
                <li>• לספק נתונים וסטטיסטיקות</li>
                <li>• לעזור בניהול משימות</li>
                <li>• לענות על שאלות טכניות</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample AI Responses */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">שאלה:</span> כמה מועמדים יש במערכת למשרות Full Stack?
          </p>
          <p className="text-sm text-gray-900 mt-2">
            <span className="font-medium">תשובה:</span> במערכת יש כרגע 47 מועמדים פעילים למשרות Full Stack. 
            מתוכם: 12 בשלב ראיון, 8 קיבלו הצעה, ו-27 בשלבי סינון ראשוניים.
          </p>
        </div>
      </div>

      {/* AI Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="text"
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            placeholder="שאל אותי כל דבר על המערכת..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                // Send AI message
                setAiMessage('');
              }
            }}
          />
          <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Send size={16} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Paperclip size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center space-x-2 space-x-reverse ${
          unreadCount > 0 ? 'animate-pulse' : ''
        }`}
      >
        <Bell size={20} />
        <span>הודעות</span>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {unreadCount}
          </span>
        )}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Notification Bar */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-40 transition-all duration-300 ${
        isOpen ? 'h-96' : 'h-0 overflow-hidden'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h2 className="text-lg font-semibold text-gray-900">מרכז הודעות</h2>
              
              {/* Tabs */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <User size={16} />
                    <span>הודעות ({userMessages.length})</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('system')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'system'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bell size={16} />
                    <span>מערכת ({systemMessages.length})</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'whatsapp'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <MessageSquare size={16} />
                    <span>WhatsApp ({whatsappMessages.length})</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bot size={16} />
                    <span>AI Assistant</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              {/* Search */}
              {activeTab !== 'ai' && (
                <div className="relative">
                  <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חיפוש..."
                    className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'messages' && renderMessages(userMessages)}
            {activeTab === 'system' && renderMessages(systemMessages)}
            {activeTab === 'whatsapp' && renderMessages(whatsappMessages)}
            {activeTab === 'ai' && renderAIChat()}
          </div>
        </div>
      </div>

      {/* Overlay to dim background when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}