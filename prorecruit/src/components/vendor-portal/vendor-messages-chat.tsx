'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  FileText, 
  Image, 
  Download,
  User,
  Clock
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'vendor' | 'company';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    size: number;
  }[];
}

export function VendorMessagesChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'company',
      senderName: 'שרה כהן',
      content: 'שלום! האם תוכל לספק עדכון על התקדמות הפרויקט?',
      timestamp: '2024-01-15 10:30',
      attachments: [
        { name: 'project-requirements.pdf', type: 'pdf', size: 1024000 }
      ]
    },
    {
      id: 2,
      sender: 'vendor',
      senderName: 'דוד כהן',
      content: 'שלום שרה! כן, הפרויקט מתקדם יפה. סיימתי את המודול הראשון ואני עובד על השני.',
      timestamp: '2024-01-15 11:15'
    },
    {
      id: 3,
      sender: 'vendor',
      senderName: 'דוד כהן',
      content: 'הנה דוח התקדמות מפורט',
      timestamp: '2024-01-15 11:16',
      attachments: [
        { name: 'progress-report.docx', type: 'docx', size: 512000 },
        { name: 'screenshot.png', type: 'image', size: 204800 }
      ]
    },
    {
      id: 4,
      sender: 'company',
      senderName: 'שרה כהן',
      content: 'מעולה! תודה על העדכון. האם יש משהו שאתה צריך מאיתנו?',
      timestamp: '2024-01-15 14:20'
    },
    {
      id: 5,
      sender: 'vendor',
      senderName: 'דוד כהן',
      content: 'כן, אני צריך גישה למסד הנתונים כדי לבדוק כמה דברים. האם תוכלי לספק הרשאות?',
      timestamp: '2024-01-15 15:45'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFiles.length > 0) {
      const attachments = selectedFiles.map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.name.split('.').pop() || 'file',
        size: file.size
      }));

      const message: Message = {
        id: messages.length + 1,
        sender: 'vendor',
        senderName: 'דוד כהן',
        content: newMessage,
        timestamp: new Date().toLocaleString('he-IL'),
        attachments: attachments.length > 0 ? attachments : undefined
      };

      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">צ&apos;אט עם הצוות</h3>
            <p className="text-sm text-gray-500">שרה כהן, דוד לוי, מיכל רוזן</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'vendor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2 space-x-reverse mb-1">
                <span className="text-xs font-medium">
                  {message.senderName}
                </span>
                <span className="text-xs opacity-75">
                  {message.timestamp}
                </span>
              </div>
              
              <p className="text-sm mb-2">{message.content}</p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-1">
                  {message.attachments.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 space-x-reverse p-2 rounded ${
                        message.sender === 'vendor'
                          ? 'bg-blue-700 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      {getFileIcon(file.type)}
                      <span className="text-xs truncate">{file.name}</span>
                      <span className="text-xs opacity-75">
                        ({formatFileSize(file.size)})
                      </span>
                      <button className="text-xs hover:underline">
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mb-3 space-y-2">
            <p className="text-sm font-medium text-gray-700">קבצים שנבחרו:</p>
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getFileIcon(file.type)}
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end space-x-2 space-x-reverse">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="הקלד הודעה..."
              rows={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <Paperclip className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </label>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && selectedFiles.length === 0}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 