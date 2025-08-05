'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  User,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'agent';
  timestamp: Date;
  isRead: boolean;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export function ClientChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! איך אני יכול לעזור לך היום?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 60000),
      isRead: true
    },
    {
      id: '2',
      text: 'שלום! אני מעוניין לדעת על השירותים שלכם לגיוס עובדים',
      sender: 'client',
      timestamp: new Date(Date.now() - 30000),
      isRead: true
    },
    {
      id: '3',
      text: 'בשמחה! אנחנו מציעים שירותי גיוס מקיפים לכל סוגי התפקידים. איזה תפקיד אתם מחפשים?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 15000),
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agent: Agent = {
    id: '1',
    name: 'שרה כהן',
    role: 'מנהלת גיוס',
    avatar: '/avatars/sarah.jpg',
    isOnline: true
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'client',
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'תודה על ההודעה! אני אבדוק את הפרטים ואחזור אליך בהקדם.',
        sender: 'agent',
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            {agent.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Video className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className={`flex items-center mt-1 text-xs ${
                message.sender === 'client' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <Clock className="w-3 h-3 ml-1" />
                {formatTime(message.timestamp)}
                {message.sender === 'client' && (
                  <span className="mr-2">
                    {message.isRead ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">כותב...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2 space-x-reverse">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="הקלד הודעה..."
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button className="absolute left-2 bottom-2 p-1 rounded hover:bg-gray-100 transition-colors">
              <Smile className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 