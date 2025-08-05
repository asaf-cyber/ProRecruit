'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  User, 
  MessageSquare, 
  Phone, 
  Mail,
  FileText,
  Image,
  Download,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'candidate' | 'recruiter' | 'system';
  timestamp: string;
  attachments?: Attachment[];
  read: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'other';
  size: string;
  url: string;
}

interface ChatContact {
  id: string;
  name: string;
  title: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export function CandidateMessages() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - in real app this would come from API
  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'מיכל גולדברג',
      title: 'מגייסת בכירה',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'שלום דוד! שמחתי על הראיון הראשוני. הצוות התרשם מאוד מהכישורים שלך.',
      lastMessageTime: '14:30',
      unreadCount: 2,
      online: true
    },
    {
      id: '2',
      name: 'שרה לוי',
      title: 'מנהלת פיתוח - TechCorp',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'הראיון הטכני נקבע ליום שלישי, 15 בינואר בשעה 14:00',
      lastMessageTime: '09:15',
      unreadCount: 0,
      online: false
    },
    {
      id: '3',
      name: 'דן כהן',
      title: 'מנהל טכני - StartupXYZ',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'תודה על השליחה. נחזור אליך בקרוב עם עדכון',
      lastMessageTime: 'אתמול',
      unreadCount: 1,
      online: true
    }
  ];

  const mockMessages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        content: 'שלום דוד! שמחתי על הראיון הראשוני. הצוות התרשם מאוד מהכישורים שלך.',
        sender: 'recruiter',
        timestamp: '14:30',
        read: true
      },
      {
        id: '2',
        content: 'תודה רבה מיכל! שמחתי מאוד על ההזדמנות. מתי נדע על השלב הבא?',
        sender: 'candidate',
        timestamp: '14:32',
        read: true
      },
      {
        id: '3',
        content: 'הראיון הטכני הבא יתקיים ביום שלישי, 15 בינואר בשעה 14:00. האם זה מתאים לך?',
        sender: 'recruiter',
        timestamp: '14:35',
        read: false
      },
      {
        id: '4',
        content: 'כן, זה מתאים לי מאוד! אודה לך אם תוכלי לשלוח לי פרטים נוספים על ההכנה הנדרשת.',
        sender: 'candidate',
        timestamp: '14:37',
        read: false
      }
    ],
    '2': [
      {
        id: '1',
        content: 'הראיון הטכני נקבע ליום שלישי, 15 בינואר בשעה 14:00',
        sender: 'recruiter',
        timestamp: '09:15',
        read: true
      },
      {
        id: '2',
        content: 'תודה! אודה לך אם תוכלי לשלוח לי את הקישור ל-Zoom',
        sender: 'candidate',
        timestamp: '09:20',
        read: true
      },
      {
        id: '3',
        content: 'כמובן! הקישור: https://zoom.us/j/123456789',
        sender: 'recruiter',
        timestamp: '09:22',
        read: true
      }
    ],
    '3': [
      {
        id: '1',
        content: 'תודה על השליחה. נחזור אליך בקרוב עם עדכון',
        sender: 'recruiter',
        timestamp: 'אתמול',
        read: false
      }
    ]
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedContact) {
      setMessages(mockMessages[selectedContact.id] || []);
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'candidate',
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const attachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      url: URL.createObjectURL(file)
    };

    const message: Message = {
      id: Date.now().toString(),
      content: `העלה קובץ: ${file.name}`,
      sender: 'candidate',
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      attachments: [attachment],
      read: false
    };

    setMessages(prev => [...prev, message]);
    setShowAttachmentModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">הודעות</h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש במגעים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                selectedContact?.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.title}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
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
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    {selectedContact.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-600">{selectedContact.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.sender === 'candidate' 
                      ? 'bg-blue-600 text-white' 
                      : message.sender === 'system'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-white text-gray-900 border border-gray-200'
                  } rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center space-x-2 space-x-reverse bg-gray-100 bg-opacity-20 rounded p-2"
                          >
                            {getAttachmentIcon(attachment.type)}
                            <span className="text-xs truncate">{attachment.name}</span>
                            <button className="text-xs hover:underline">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${
                      message.sender === 'candidate' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end space-x-3 space-x-reverse">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="הקלד הודעה..."
                    rows={1}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setShowAttachmentModal(true)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">בחר מגע כדי להתחיל שיחה</p>
            </div>
          </div>
        )}
      </div>

      {/* Attachment Modal */}
      {showAttachmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">צרף קובץ</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                גרור קובץ לכאן או לחץ לבחירה
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                בחר קובץ
              </button>
            </div>
            
            <div className="flex space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowAttachmentModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 