'use client';

import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import {
  MessageCircle,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Search,
  Plus,
  Users,
  Settings,
  Bell,
  Archive,
  Star,
  Trash2,
  MoreHorizontal,
  Edit,
  Reply,
  Forward,
  Download,
  Image,
  File,
  Mic,
  Camera,
  Globe,
  Shield,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  Zap,
  Bot,
  Filter,
  Hash,
  AtSign,
  PhoneCall,
  VideoIcon,
  UserPlus,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: string;
  department: string;
  role: string;
  phoneNumber?: string;
  whatsappConnected: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'video' | 'system' | 'whatsapp';
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: {
    messageId: string;
    content: string;
    senderName: string;
  };
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    users: string[];
    count: number;
  }>;
  mentions?: string[];
  whatsappData?: {
    phoneNumber: string;
    messageId: string;
    status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  };
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'channel' | 'whatsapp_group';
  description?: string;
  avatar?: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  createdBy: string;
  settings: {
    notifications: boolean;
    archived: boolean;
    starred: boolean;
    allowWhatsApp: boolean;
    autoTranslate: boolean;
    readReceipts: boolean;
  };
  whatsappGroup?: {
    groupId: string;
    inviteLink: string;
    adminPhone: string;
  };
}

interface WhatsAppIntegration {
  connected: boolean;
  businessNumber: string;
  apiKey: string;
  webhookUrl: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  messagesSent: number;
  messagesReceived: number;
  lastSync: string;
  templates: Array<{
    id: string;
    name: string;
    content: string;
    language: string;
    status: 'approved' | 'pending' | 'rejected';
  }>;
}

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [currentUser] = useState<ChatUser>({
    id: 'current-user',
    name: 'משתמש נוכחי',
    email: 'current@company.com',
    status: 'online',
    department: 'משאבי אנוש',
    role: 'מנהל גיוס',
    whatsappConnected: true
  });

  // UI States
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showWhatsAppPanel, setShowWhatsAppPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // WhatsApp Integration
  const [whatsappIntegration, setWhatsappIntegration] = useState<WhatsAppIntegration>({
    connected: true,
    businessNumber: '+972-50-123-4567',
    apiKey: 'wa_key_12345',
    webhookUrl: 'https://prorecruit.com/webhook/whatsapp',
    verificationStatus: 'verified',
    messagesSent: 1247,
    messagesReceived: 892,
    lastSync: '2024-01-20T10:30:00Z',
    templates: [
      {
        id: 'template1',
        name: 'ברוכים הבאים למועמד',
        content: 'שלום {{name}}, תודה על הגשת המועמדות ל{{position}}. נחזור אליך בקרוב.',
        language: 'he',
        status: 'approved'
      },
      {
        id: 'template2',
        name: 'זימון לראיון',
        content: 'שלום {{name}}, אנו מזמינים אותך לראיון ב{{date}} ב{{time}}. מיקום: {{location}}',
        language: 'he',
        status: 'approved'
      }
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom);
    }
  }, [selectedRoom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatData = async () => {
    // Mock data
    const mockUsers: ChatUser[] = [
      {
        id: 'user1',
        name: 'שרה כהן',
        email: 'sarah@company.com',
        status: 'online',
        department: 'משאבי אנוש',
        role: 'מנהלת גיוס',
        phoneNumber: '+972-50-111-2222',
        whatsappConnected: true
      },
      {
        id: 'user2',
        name: 'דוד לוי',
        email: 'david@company.com',
        status: 'away',
        department: 'פיתוח',
        role: 'Tech Lead',
        phoneNumber: '+972-50-333-4444',
        whatsappConnected: false
      },
      {
        id: 'user3',
        name: 'מיכל אברהם',
        email: 'michal@company.com',
        status: 'online',
        department: 'עיצוב',
        role: 'UX Designer',
        phoneNumber: '+972-50-555-6666',
        whatsappConnected: true
      }
    ];

    const mockRooms: ChatRoom[] = [
      {
        id: 'room1',
        name: 'צוות משאבי אנוש',
        type: 'group',
        description: 'קבוצת העבודה של צוות משאבי אנוש',
        participants: [mockUsers[0], currentUser],
        unreadCount: 3,
        createdAt: '2024-01-01T00:00:00Z',
        createdBy: currentUser.id,
        settings: {
          notifications: true,
          archived: false,
          starred: true,
          allowWhatsApp: true,
          autoTranslate: false,
          readReceipts: true
        },
        lastMessage: {
          id: 'msg1',
          senderId: 'user1',
          senderName: 'שרה כהן',
          content: 'מי יכול לעזור עם הראיון מחר?',
          type: 'text',
          timestamp: '2024-01-20T09:30:00Z',
          status: 'read'
        }
      },
      {
        id: 'room2',
        name: 'שרה כהן',
        type: 'direct',
        participants: [mockUsers[0], currentUser],
        unreadCount: 0,
        createdAt: '2024-01-15T00:00:00Z',
        createdBy: currentUser.id,
        settings: {
          notifications: true,
          archived: false,
          starred: false,
          allowWhatsApp: true,
          autoTranslate: false,
          readReceipts: true
        },
        lastMessage: {
          id: 'msg2',
          senderId: currentUser.id,
          senderName: currentUser.name,
          content: 'בסדר, נדבר מחר',
          type: 'text',
          timestamp: '2024-01-19T16:45:00Z',
          status: 'read'
        }
      },
      {
        id: 'room3',
        name: 'WhatsApp - מועמדים',
        type: 'whatsapp_group',
        description: 'קבוצה לתיאום עם מועמדים',
        participants: mockUsers,
        unreadCount: 5,
        createdAt: '2024-01-10T00:00:00Z',
        createdBy: currentUser.id,
        settings: {
          notifications: true,
          archived: false,
          starred: false,
          allowWhatsApp: true,
          autoTranslate: true,
          readReceipts: true
        },
        whatsappGroup: {
          groupId: 'wa_group_123',
          inviteLink: 'https://chat.whatsapp.com/invite123',
          adminPhone: '+972-50-123-4567'
        },
        lastMessage: {
          id: 'msg3',
          senderId: 'external1',
          senderName: 'יוני מועמד',
          content: 'תודה על ההזדמנות, אשמח להגיע לראיון',
          type: 'whatsapp',
          timestamp: '2024-01-20T11:15:00Z',
          status: 'delivered',
          whatsappData: {
            phoneNumber: '+972-50-777-8888',
            messageId: 'wa_msg_456',
            status: 'delivered'
          }
        }
      }
    ];

    setUsers(mockUsers);
    setRooms(mockRooms);
  };

  const loadMessages = async (roomId: string) => {
    // Mock messages for selected room
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg1',
        senderId: 'user1',
        senderName: 'שרה כהן',
        content: 'שלום! איך מתקדם עם המועמד החדש?',
        type: 'text',
        timestamp: '2024-01-20T09:00:00Z',
        status: 'read'
      },
      {
        id: 'msg2',
        senderId: currentUser.id,
        senderName: currentUser.name,
        content: 'הכל בסדר, הוא יגיע לראיון מחר ב-10:00',
        type: 'text',
        timestamp: '2024-01-20T09:05:00Z',
        status: 'read'
      },
      {
        id: 'msg3',
        senderId: 'user1',
        senderName: 'שרה כהן',
        content: 'מעולה! שלחתי לו הודעת WhatsApp עם הפרטים',
        type: 'whatsapp',
        timestamp: '2024-01-20T09:30:00Z',
        status: 'read',
        whatsappData: {
          phoneNumber: '+972-50-777-8888',
          messageId: 'wa_msg_789',
          status: 'delivered'
        }
      }
    ];

    setMessages(mockMessages);
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedRoom) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: messageInput,
      type: 'text',
      timestamp: new Date().toISOString(),
      status: 'sending',
      ...(replyingTo && {
        replyTo: {
          messageId: replyingTo.id,
          content: replyingTo.content,
          senderName: replyingTo.senderName
        }
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
    setReplyingTo(null);

    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 1000);
  };

  const sendWhatsAppMessage = async (phoneNumber: string, template: string, variables: Record<string, string>) => {
    // Mock WhatsApp API call
    console.log('Sending WhatsApp message:', { phoneNumber, template, variables });
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: template.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match),
      type: 'whatsapp',
      timestamp: new Date().toISOString(),
      status: 'sending',
      whatsappData: {
        phoneNumber,
        messageId: `wa_${Date.now()}`,
        status: 'pending'
      }
    };

    if (selectedRoom) {
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const getStatusIcon = (status: ChatMessage['status']) => {
    switch (status) {
      case 'sending': return <Clock size={12} className="text-gray-400" />;
      case 'sent': return <Check size={12} className="text-gray-400" />;
      case 'delivered': return <CheckCheck size={12} className="text-gray-400" />;
      case 'read': return <CheckCheck size={12} className="text-blue-500" />;
      default: return null;
    }
  };

  const getUserStatusColor = (status: ChatUser['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchQuery === '' || 
      room.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'unread' && room.unreadCount > 0) ||
      (selectedFilter === 'starred' && room.settings.starred) ||
      (selectedFilter === 'whatsapp' && (room.type === 'whatsapp_group' || room.settings.allowWhatsApp));

    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="h-[calc(100vh-6rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex">
        {/* Left Sidebar - Chat List */}
        <div className="w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 dark:text-white">צ'אט פנימי</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">WhatsApp Integration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWhatsAppPanel(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="WhatsApp Settings"
                >
                  <Phone size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Settings size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש שיחות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {[
                { key: 'all', label: 'הכל', icon: MessageCircle },
                { key: 'unread', label: 'לא נקראו', icon: Bell },
                { key: 'starred', label: 'מועדפים', icon: Star },
                { key: 'whatsapp', label: 'WhatsApp', icon: Phone }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <filter.icon size={12} />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Rooms List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedRoom === room.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                      {room.type === 'whatsapp_group' ? (
                        <Phone size={20} />
                      ) : room.type === 'group' ? (
                        <Users size={20} />
                      ) : (
                        room.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    {room.type === 'direct' && room.participants[0].status === 'online' && (
                      <div className={`absolute bottom-0 left-0 w-4 h-4 rounded-full border-2 border-white ${getUserStatusColor(room.participants[0].status)}`}></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{room.name}</h3>
                      <div className="flex items-center gap-1">
                        {room.type === 'whatsapp_group' && <Phone size={12} className="text-green-500" />}
                        {room.settings.starred && <Star size={12} className="text-yellow-500" />}
                        {room.unreadCount > 0 && (
                          <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {room.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    {room.lastMessage && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {room.lastMessage.type === 'whatsapp' && '📱 '}
                          {room.lastMessage.content}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatTime(room.lastMessage.timestamp)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Chat */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowUserList(true)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              שיחה חדשה
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        {selectedRoom ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {rooms.find(r => r.id === selectedRoom)?.type === 'whatsapp_group' ? (
                      <Phone size={16} />
                    ) : (
                      rooms.find(r => r.id === selectedRoom)?.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {rooms.find(r => r.id === selectedRoom)?.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rooms.find(r => r.id === selectedRoom)?.type === 'direct' 
                        ? rooms.find(r => r.id === selectedRoom)?.participants[0].status === 'online' ? 'מחובר' : 'לא מחובר'
                        : `${rooms.find(r => r.id === selectedRoom)?.participants.length} משתתפים`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <PhoneCall size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <VideoIcon size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Search size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.senderId === currentUser.id ? 'order-1' : ''
                  }`}>
                    {message.senderId !== currentUser.id && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                          {message.senderName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{message.senderName}</span>
                      </div>
                    )}
                    
                    {message.replyTo && (
                      <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-r-2 border-blue-500">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{message.replyTo.senderName}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{message.replyTo.content}</div>
                      </div>
                    )}
                    
                    <div className={`relative p-3 rounded-lg ${
                      message.senderId === currentUser.id
                        ? message.type === 'whatsapp'
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      {message.type === 'whatsapp' && (
                        <div className="flex items-center gap-1 mb-1">
                          <Phone size={12} />
                          <span className="text-xs">WhatsApp</span>
                        </div>
                      )}
                      
                      <div className="text-sm">{message.content}</div>
                      
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        {message.senderId === currentUser.id && getStatusIcon(message.status)}
                      </div>
                      
                      {message.edited && (
                        <div className="text-xs opacity-70 mt-1">ערוך</div>
                      )}
                    </div>
                    
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {message.reactions.map((reaction, index) => (
                          <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                            <span className="text-xs">{reaction.emoji}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{reaction.count}</span>
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {replyingTo && (
                <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-r-2 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">משיב ל-{replyingTo.senderName}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{replyingTo.content}</div>
                    </div>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    <Paperclip size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    <Image size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="הקלד הודעה..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  >
                    <Smile size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-1 rounded transition-colors ${
                      isRecording ? 'bg-red-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Mic size={16} className={isRecording ? 'text-white' : 'text-gray-600 dark:text-gray-400'} />
                  </button>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">בחר שיחה להתחלה</h3>
              <p className="text-gray-600 dark:text-gray-400">בחר שיחה מהרשימה או התחל שיחה חדשה</p>
            </div>
          </div>
        )}

        {/* WhatsApp Integration Panel */}
        {showWhatsAppPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                      <Phone size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">אינטגרציית WhatsApp</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ניהול חיבור ותבניות WhatsApp Business</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWhatsAppPanel(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Connection Status */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCheck size={20} className="text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-900 dark:text-green-100">מחובר לWhatsApp Business</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      מאומת
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700 dark:text-green-300">מספר עסק:</span>
                      <div className="font-medium text-green-900 dark:text-green-100">{whatsappIntegration.businessNumber}</div>
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300">סנכרון אחרון:</span>
                      <div className="font-medium text-green-900 dark:text-green-100">
                        {new Date(whatsappIntegration.lastSync).toLocaleString('he-IL')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {whatsappIntegration.messagesSent.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">הודעות נשלחו</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {whatsappIntegration.messagesReceived.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">הודעות התקבלו</div>
                  </div>
                </div>

                {/* Message Templates */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">תבניות הודעות</h3>
                  <div className="space-y-3">
                    {whatsappIntegration.templates.map((template) => (
                      <div key={template.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            template.status === 'approved' 
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                              : template.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                          }`}>
                            {template.status === 'approved' ? 'מאושר' : template.status === 'pending' ? 'ממתין' : 'נדחה'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.content}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // Mock template usage
                              sendWhatsAppMessage('+972-50-999-0000', template.content, {
                                name: 'יוני מועמד',
                                position: 'מפתח Full Stack',
                                date: '22/01/2024',
                                time: '10:00',
                                location: 'משרדי החברה'
                              });
                            }}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            שלח עכשיו
                          </button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            ערוך תבנית
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus size={16} />
                    תבנית חדשה
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Settings size={16} />
                    הגדרות API
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download size={16} />
                    ייצא דוח
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}