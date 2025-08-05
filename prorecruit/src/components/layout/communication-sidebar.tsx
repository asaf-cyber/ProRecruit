'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Bot, 
  X,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  Users,
  Send,
  Paperclip,
  Smile,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SystemChat } from './system-chat';
import { WhatsAppViewer } from './whatsapp-viewer';
import { CalendarIntegration } from './calendar-integration';
import { AIAssistant } from './ai-assistant';

type SidebarTab = 'chat' | 'whatsapp' | 'calendar' | 'ai';

export function CommunicationSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>('ai');
  const [isMinimized, setIsMinimized] = useState(false);
  const [notifications, setNotifications] = useState({
    chat: 3,
    whatsapp: 7,
    calendar: 2,
    ai: 0
  });

  const tabs = [
    {
      id: 'chat' as const,
      label: 'הודעות מערכת',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      notifications: notifications.chat
    },
    {
      id: 'whatsapp' as const,
      label: 'WhatsApp',
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
      notifications: notifications.whatsapp
    },
    {
      id: 'calendar' as const,
      label: 'יומן',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      notifications: notifications.calendar
    },
    {
      id: 'ai' as const,
      label: 'עוזר AI',
      icon: Bot,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
      notifications: notifications.ai
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <SystemChat />;
      case 'whatsapp':
        return <WhatsAppViewer />;
      case 'calendar':
        return <CalendarIntegration />;
      case 'ai':
        return <AIAssistant />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isOpen ? 'left-80' : 'left-0'
        } bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg shadow-lg`}
      >
        <MessageSquare size={20} />
        {(notifications.chat + notifications.whatsapp + notifications.calendar) > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.chat + notifications.whatsapp + notifications.calendar}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMinimized ? 'w-16' : 'w-80'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isMinimized && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              מרכז תקשורת
            </h2>
          )}
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex ${isMinimized ? 'flex-col' : 'flex-row'} border-b border-gray-200 dark:border-gray-700`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${tab.color} ${tab.bgColor}`
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${isMinimized ? 'justify-center' : 'justify-center'}`}
                title={isMinimized ? tab.label : undefined}
              >
                <div className="flex items-center">
                  <Icon size={16} className={isMinimized ? '' : 'ml-2'} />
                  {!isMinimized && <span>{tab.label}</span>}
                </div>
                
                {tab.notifications > 0 && (
                  <span className={`absolute ${isMinimized ? '-top-1 -right-1' : 'top-1 right-2'} bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center`}>
                    {tab.notifications}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="flex-1 overflow-hidden">
            {renderTabContent()}
          </div>
        )}

        {/* Footer */}
        {!isMinimized && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>מרכז תקשורת ProRecruitment</span>
              <button className="p-1 hover:text-gray-700 dark:hover:text-gray-200">
                <Settings size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}