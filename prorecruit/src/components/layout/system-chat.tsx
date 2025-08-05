'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Users,
  User,
  Clock,
  Check,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  timestamp: string;
  type: 'text' | 'system' | 'notification';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isOwn: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'general' | 'hr' | 'management' | 'candidates';
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export function SystemChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'ברוכים הבאים למערכת ההודעות החדשה!',
      sender: {
        id: 'system',
        name: 'מערכת',
        role: 'מערכת'
      },
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'system',
      status: 'read',
      isOwn: false
    },
    {
      id: '2', 
      text: 'מועמד חדש הגיש מועמדות למשרת מפתח Full Stack',
      sender: {
        id: 'hr-bot',
        name: 'HR Bot',
        role: 'בוט גיוס'
      },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: 'notification',
      status: 'read',
      isOwn: false
    },
    {
      id: '3',
      text: 'תודה על העדכון! אני אבדוק את המועמד',
      sender: {
        id: 'current-user',
        name: 'אסף מנהל',
        role: 'מגייס'
      },
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: 'text',
      status: 'read',
      isOwn: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: 'general',
      name: 'כללי',
      type: 'general',
      unreadCount: 0,
      lastMessage: 'תודה על העדכון! אני אבדוק את המועמד',
      lastMessageTime: '15:30'
    },
    {
      id: 'hr',
      name: 'משאבי אנוש',
      type: 'hr',
      unreadCount: 2,
      lastMessage: 'יש 3 מועמדים חדשים לבדיקה',
      lastMessageTime: '14:45'
    },
    {
      id: 'management',
      name: 'הנהלה',
      type: 'management',
      unreadCount: 1,
      lastMessage: 'אישור תקציב לגיוס נוסף',
      lastMessageTime: '12:20'
    },
    {
      id: 'candidates',
      name: 'מועמדים',
      type: 'candidates',
      unreadCount: 0,
      lastMessage: 'עדכון סטטוס ראיון',
      lastMessageTime: '11:15'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: 'current-user',
        name: 'אסף מנהל',
        role: 'מגייס'
      },
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending',
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate sending
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 1000);

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 2000);
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-gray-500" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'notification':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Rooms List */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="p-3">
          <div className="flex items-center mb-3">
            <Users size={16} className="text-gray-600 dark:text-gray-400 ml-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">חדרי צ'אט</h3>
          </div>
          <div className="space-y-1">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`w-full text-right p-2 rounded-lg transition-colors ${
                  activeRoom === room.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{room.name}</span>
                      {room.unreadCount > 0 && (
                        <span className="mr-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                    {room.lastMessage && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                        {room.lastMessage}
                      </p>
                    )}
                  </div>
                  {room.lastMessageTime && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {room.lastMessageTime}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-sm ${message.isOwn ? 'order-2' : 'order-1'}`}>
              {/* Sender info */}
              {!message.isOwn && (
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-2">
                    <User size={12} className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {message.sender.name} • {message.sender.role}
                  </span>
                </div>
              )}
              
              {/* Message bubble */}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.type === 'system' || message.type === 'notification'
                    ? getMessageTypeColor(message.type)
                    : message.isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                
                {/* Timestamp and status */}
                <div className={`flex items-center justify-end mt-1 text-xs ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <span className="ml-1">
                    {new Date(message.timestamp).toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {message.isOwn && getMessageStatusIcon(message.status)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Paperclip size={18} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="הקלד הודעה..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile size={18} />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}