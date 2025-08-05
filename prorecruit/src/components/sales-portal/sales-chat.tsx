'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile,
  Search,
  Filter,
  User,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  Phone,
  Video,
  Mail
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'recruiter' | 'ai';
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  isRead: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  status: 'available' | 'busy' | 'away';
}

export function SalesChat() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);

  // Mock data for contacts
  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'שרה לוי',
      role: 'מגייסת בכירה',
      avatar: 'SL',
      lastMessage: 'האם יש עדכון על המועמד למשרת Full-Stack?',
      lastMessageTime: '14:30',
      unreadCount: 2,
      isOnline: true,
      status: 'available'
    },
    {
      id: '2',
      name: 'מיכאל כהן',
      role: 'מנהל גיוס',
      avatar: 'MC',
      lastMessage: 'הלקוח רוצה לדעת מתי נוכל להתחיל את התהליך',
      lastMessageTime: '12:15',
      unreadCount: 0,
      isOnline: false,
      status: 'busy'
    },
    {
      id: '3',
      name: 'דוד רוזנברג',
      role: 'מגייס',
      avatar: 'DR',
      lastMessage: 'שלחתי את הפרופיל של המועמד ללקוח',
      lastMessageTime: '10:45',
      unreadCount: 1,
      isOnline: true,
      status: 'available'
    }
  ];

  // Mock data for messages
  const messages: ChatMessage[] = [
    {
      id: '1',
      sender: 'recruiter',
      senderName: 'שרה לוי',
      message: 'שלום דן, האם יש עדכון על המועמד למשרת Full-Stack אצל לקוח ABC?',
      timestamp: '14:30',
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      sender: 'user',
      senderName: 'דן כהן',
      message: 'שלום שרה, כן! המועמד עבר את השלב הראשון והלקוח מאוד מרוצה. הם רוצים לקיים ראיון נוסף השבוע.',
      timestamp: '14:32',
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      sender: 'recruiter',
      senderName: 'שרה לוי',
      message: 'מעולה! מתי הראיון?',
      timestamp: '14:33',
      type: 'text',
      isRead: false
    },
    {
      id: '4',
      sender: 'user',
      senderName: 'דן כהן',
      message: 'ביום רביעי בשעה 15:00. אני אעדכן אותך אחרי הראיון.',
      timestamp: '14:35',
      type: 'text',
      isRead: false
    }
  ];

  const getStatusColor = (status: ChatContact['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ChatContact['status']) => {
    switch (status) {
      case 'available': return 'זמין';
      case 'busy': return 'עסוק';
      case 'away': return 'לא זמין';
      default: return 'לא ידוע';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    !searchQuery || 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">צ'אט ותקשורת</h1>
          <p className="text-gray-600">תקשורת עם צוות הגיוס ומועמדים</p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button 
            onClick={() => setShowAIChat(!showAIChat)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>צ'אט AI</span>
          </button>
        </div>
      </div>

      <div className="flex h-[600px] bg-white rounded-lg border border-gray-200">
        {/* Contacts Sidebar */}
        <div className="w-80 border-l border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש אנשי קשר..."
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedContact?.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{contact.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                  </div>
                  
                  {contact.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{selectedContact.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500">{selectedContact.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedContact.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedContact.isOnline ? 'מחובר' : 'לא מחובר'}
                    </span>
                    
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : msg.sender === 'ai'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <span className="text-xs font-medium">{msg.senderName}</span>
                        <span className="text-xs opacity-75">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Smile className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="הקלד הודעה..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={1}
                    />
                  </div>
                  
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">בחר איש קשר</h3>
                <p className="mt-1 text-sm text-gray-500">
                  בחר איש קשר מהרשימה כדי להתחיל שיחה.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">צ'אט AI</h2>
                    <p className="text-sm text-gray-500">שאל שאלות על לקוחות, מועמדים ומצב פיננסי</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIChat(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 bg-purple-600 text-white rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-xs font-medium">AI Assistant</span>
                      <span className="text-xs opacity-75">עכשיו</span>
                    </div>
                    <p className="text-sm">שלום! אני כאן כדי לעזור לך עם שאלות על לקוחות, מועמדים ומצב פיננסי. מה תרצה לדעת?</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 bg-blue-600 text-white rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-xs font-medium">דן כהן</span>
                      <span className="text-xs opacity-75">עכשיו</span>
                    </div>
                    <p className="text-sm">מה הסטטוס של מועמד רוני לוי?</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 bg-purple-600 text-white rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-xs font-medium">AI Assistant</span>
                      <span className="text-xs opacity-75">עכשיו</span>
                    </div>
                    <p className="text-sm">רוני לוי נמצא בשלב הראיון השני אצל לקוח ABC. הראיון מתוכנן ליום רביעי בשעה 15:00. הלקוח מאוד מרוצה מהמועמד עד כה.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="שאל שאלה..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 