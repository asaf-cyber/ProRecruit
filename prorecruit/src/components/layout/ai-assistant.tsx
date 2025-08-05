'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Paperclip, 
  Mic, 
  MicOff,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Users,
  MessageSquare,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

interface AIMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'suggestion' | 'insight' | 'analysis';
  isTyping?: boolean;
  attachments?: string[];
  rating?: 'positive' | 'negative';
}

interface AIInsight {
  id: string;
  type: 'recruitment' | 'performance' | 'trend' | 'suggestion';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  icon: React.ComponentType<any>;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      text: 'שלום! אני העוזר החכם של ProRecruitment. אני כאן לעזור לך עם כל מה שקשור לתהליכי הגיוס, ניתוח מועמדים והתייעלות בעבודה. איך אוכל לעזור?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTab, setCurrentTab] = useState<'chat' | 'insights' | 'suggestions'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'איך אוכל לשפר את תהליך הגיוס?',
    'נתח לי את הביצועים השבועיים',
    'איזה מועמדים מומלצים לראיון?',
    'צור לי דוח גיוס לחודש',
    'עזור לי לכתוב הודעת WhatsApp למועמד',
    'איך אוכל לזהות מועמדים איכותיים?'
  ];

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'performance',
      title: 'שיפור משמעותי בזמני תגובה',
      description: 'זמן התגובה הממוצע למועמדים ירד ב-35% השבוע. המשך כך!',
      priority: 'high',
      actionable: false,
      icon: TrendingUp
    },
    {
      id: '2', 
      type: 'suggestion',
      title: 'מועמדים מחכים למשוב',
      description: '3 מועמדים מחכים למשוב מעל 48 שעות. מומלץ לטפל בהם היום.',
      priority: 'high',
      actionable: true,
      icon: Target
    },
    {
      id: '3',
      type: 'trend',
      title: 'עליה בבקשות לעבודה היברידית',
      description: '70% מהמועמדים החדשים מבקשים אפשרות לעבודה היברידית.',
      priority: 'medium',
      actionable: true,
      icon: BarChart3
    },
    {
      id: '4',
      type: 'recruitment',
      title: 'LinkedIn הכי יעיל השבוע',
      description: 'LinkedIn הביא 60% מהמועמדים האיכותיים השבוע.',
      priority: 'low',
      actionable: false,
      icon: Users
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

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('ביצועים') || lowerInput.includes('נתח')) {
      return 'מבוסס על הנתונים שלך השבוע:\n\n📈 25 מועמדים חדשים\n⏱️ זמן תגובה ממוצע: 4.2 שעות\n✅ 8 ראיונות נקבעו\n🎯 שיעור המרה: 32%\n\nהביצועים שלך משתפרים! המלצתי להתמקד במועמדי ה-LinkedIn שמציגים את התוצאות הטובות ביותר.';
    }
    
    if (lowerInput.includes('מועמד') || lowerInput.includes('ראיון')) {
      return 'מבוסס על הניתוח שלי, הנה המועמדים המובילים לראיון השבוע:\n\n🌟 דוד כהן - Full Stack Developer (התאמה 95%)\n🌟 מיכל ישראלי - Frontend Developer (התאמה 88%)\n🌟 יוסי גולדברג - Backend Developer (התאמה 92%)\n\nכולם עם ניסיון רלוונטי ומיומנויות מתאימות למשרות הפתוחות שלך.';
    }
    
    if (lowerInput.includes('הודעה') || lowerInput.includes('whatsapp')) {
      return 'הנה תבנית הודעת WhatsApp מקצועית:\n\n"שלום [שם המועמד],\n\nתודה על המועמדות שלך למשרת [תפקיד]. אשמח לקבוע איתך שיחת היכרות קצרה.\n\nמתי נוח לך השבוע? \n\nבהצלחה,\n[השם שלך]"\n\nהאם תרצה שאתאים את ההודעה למועמד ספציפי?';
    }
    
    if (lowerInput.includes('שיפור') || lowerInput.includes('טיפ')) {
      return 'הנה כמה טיפים לשיפור תהליך הגיוס:\n\n🎯 התגוב למועמדים תוך 24 שעות\n📋 השתמש בשאלונים סטנדרטיים לסינון\n💬 שמור על קשר קבוע עם מועמדים פוטנציאליים\n📊 עקוב אחר מטריקות ביצועים\n🤝 בנה רשת קשרים עם מועמדים איכותיים\n\nאיזה תחום תרצה לפתח יותר?';
    }
    
    return 'אני כאן לעזור! אוכל לסייע לך עם ניתוח מועמדים, כתיבת הודעות, תכנון ראיונות, ניתוח ביצועים ועוד. איך בדיוק אוכל לעזור?';
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const handleRateMessage = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const renderChatTab = () => (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-sm ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'ai' && (
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-2">
                    <Bot size={12} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    עוזר AI • ProRecruitment
                  </span>
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <button
                        onClick={() => copyToClipboard(message.text)}
                        className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                        title="העתק"
                      >
                        <Copy size={10} />
                      </button>
                      <button
                        onClick={() => handleRateMessage(message.id, 'positive')}
                        className={`p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded ${
                          message.rating === 'positive' ? 'text-green-600' : ''
                        }`}
                        title="שימושי"
                      >
                        <ThumbsUp size={10} />
                      </button>
                      <button
                        onClick={() => handleRateMessage(message.id, 'negative')}
                        className={`p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded ${
                          message.rating === 'negative' ? 'text-red-600' : ''
                        }`}
                        title="לא שימושי"
                      >
                        <ThumbsDown size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

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

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">הצעות מהירות:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion)}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

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
              placeholder="שאל את העוזר החכם..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
          </div>
          
          <button
            onClick={() => setIsListening(!isListening)}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );

  const renderInsightsTab = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">תובנות AI</h4>
        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
          <RefreshCw size={14} />
        </button>
      </div>

      {aiInsights.map((insight) => {
        const IconComponent = insight.icon;
        return (
          <div
            key={insight.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${getPriorityColor(insight.priority)}`}>
                  <IconComponent size={16} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    {insight.title}
                  </h5>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(insight.priority)}`}>
                    {insight.priority === 'high' ? 'גבוה' : 
                     insight.priority === 'medium' ? 'בינוני' : 'נמוך'}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {insight.description}
            </p>
            
            {insight.actionable && (
              <button className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                פעל עכשיו
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSuggestionsTab = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">הצעות חכמות</h4>
      
      {quickSuggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentTab('chat');
            handleQuickSuggestion(suggestion);
          }}
          className="w-full p-3 text-right bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <div className="flex items-center">
            <Lightbulb size={16} className="text-orange-500 ml-2" />
            <span className="text-sm text-gray-900 dark:text-white">{suggestion}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-2">
              <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">עוזר AI</h3>
              <p className="text-xs text-orange-600 dark:text-orange-400">מחובר ופעיל</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
              <Settings size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse">
          {[
            { id: 'chat', label: 'צ\'אט', icon: MessageSquare },
            { id: 'insights', label: 'תובנות', icon: Sparkles },
            { id: 'suggestions', label: 'הצעות', icon: Lightbulb }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  currentTab === tab.id
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={12} className="ml-1" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {currentTab === 'chat' && renderChatTab()}
      {currentTab === 'insights' && renderInsightsTab()}
      {currentTab === 'suggestions' && renderSuggestionsTab()}

      {/* Status Bar */}
      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-xs text-orange-700 dark:text-orange-400">
          <Zap size={12} className="mr-1 animate-pulse" />
          עוזר AI פעיל • נתונים מעודכנים בזמן אמת
        </div>
      </div>
    </div>
  );
}