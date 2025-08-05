'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { CVDatabaseHeader } from '@/components/cv-database/cv-database-header';
import { CVUploadArea } from '@/components/cv-database/cv-upload-area';
import { CVAdvancedFilters } from '@/components/cv-database/cv-advanced-filters';
import { CVSmartTable } from '@/components/cv-database/cv-smart-table';
import { CVDocumentManager } from '@/components/cv-database/cv-document-manager';
import { CVReferralTracker } from '@/components/cv-database/cv-referral-tracker';
import { useResponsive } from '@/hooks/use-responsive';
import { Filter, X } from 'lucide-react';

export default function CVDatabasePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'database' | 'documents' | 'referrals'>('database');
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <MainLayout>
      <div className="space-y-4 md:space-y-6">
        <CVDatabaseHeader />
        
        <CVUploadArea />
        
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className={`flex ${isMobile ? 'space-x-4' : 'space-x-8'} space-x-reverse px-4 md:px-6 overflow-x-auto scrollbar-hide`}>
              <button
                onClick={() => setActiveTab('database')}
                className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === 'database'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                מאגר מועמדים
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                ניהול מסמכים
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === 'referrals'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                מעקב הפניות
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'database' && (
          <div className="space-y-4">
            {/* Mobile Filters Toggle */}
            {isMobile && (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter size={16} />
                  <span className="text-sm">סינון מתקדם</span>
                </button>
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Filters Modal/Drawer */}
            {isMobile && showFilters && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}>
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl max-h-[80vh] overflow-y-auto transform transition-transform duration-300">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">סינון מתקדם</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <CVAdvancedFilters
                      selectedSkills={selectedSkills}
                      onSkillsChange={setSelectedSkills}
                      selectedExperience={selectedExperience}
                      onExperienceChange={setSelectedExperience}
                      selectedLocation={selectedLocation}
                      onLocationChange={setSelectedLocation}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Layout */}
            <div className={`${isMobile ? '' : 'flex gap-6'}`}>
              {/* Advanced Filters Sidebar - Desktop Only */}
              {!isMobile && (
                <div className={`${showFilters ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
                  <CVAdvancedFilters
                    selectedSkills={selectedSkills}
                    onSkillsChange={setSelectedSkills}
                    selectedExperience={selectedExperience}
                    onExperienceChange={setSelectedExperience}
                    selectedLocation={selectedLocation}
                    onLocationChange={setSelectedLocation}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </div>
              )}
              
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Desktop Filters Toggle */}
                {!isMobile && (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Filter size={16} />
                      <span>סינון מתקדם</span>
                      <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <CVSmartTable
                    skills={selectedSkills}
                    experience={selectedExperience}
                    location={selectedLocation}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && <CVDocumentManager />}
        {activeTab === 'referrals' && <CVReferralTracker />}
      </div>
    </MainLayout>
  );
} 