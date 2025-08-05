'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Save, 
  Bookmark,
  Brain,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Clock
} from 'lucide-react';

interface CVAdvancedFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  selectedExperience: string;
  onExperienceChange: (experience: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CVAdvancedFilters({
  selectedSkills,
  onSkillsChange,
  selectedExperience,
  onExperienceChange,
  selectedLocation,
  onLocationChange,
  searchQuery,
  onSearchChange
}: CVAdvancedFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<string[]>([]);
  const [filterName, setFilterName] = useState('');
  const [showSaveFilter, setShowSaveFilter] = useState(false);

  // AI-extracted skills from uploaded CVs
  const availableSkills = [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C#',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
    'Redis', 'Kafka', 'RabbitMQ', 'GraphQL', 'REST API', 'Microservices',
    'CI/CD', 'Jenkins', 'GitLab', 'GitHub Actions', 'Terraform', 'Ansible',
    'Machine Learning', 'Data Science', 'DevOps', 'Agile', 'Scrum'
  ];

  const experienceLevels = [
    { value: 'all', label: 'כל הרמות' },
    { value: 'junior', label: 'ג\'וניור (1-3 שנים)' },
    { value: 'mid', label: 'ביניים (3-5 שנים)' },
    { value: 'senior', label: 'סניור (5+ שנים)' },
    { value: 'lead', label: 'Lead/Architect' }
  ];

  const locations = [
    { value: 'all', label: 'כל המיקומים' },
    { value: 'tel-aviv', label: 'תל אביב' },
    { value: 'jerusalem', label: 'ירושלים' },
    { value: 'haifa', label: 'חיפה' },
    { value: 'beer-sheva', label: 'באר שבע' },
    { value: 'remote', label: 'עבודה מרחוק' },
    { value: 'hybrid', label: 'היברידי' }
  ];

  const savedFilterPresets = [
    { name: 'Full Stack Developers', skills: ['React', 'Node.js', 'TypeScript'] },
    { name: 'DevOps Engineers', skills: ['Docker', 'Kubernetes', 'AWS'] },
    { name: 'Data Scientists', skills: ['Python', 'Machine Learning', 'Data Science'] },
    { name: 'Frontend Developers', skills: ['React', 'JavaScript', 'TypeScript'] }
  ];

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const clearAllFilters = () => {
    onSkillsChange([]);
    onExperienceChange('all');
    onLocationChange('all');
    onSearchChange('');
  };

  const saveCurrentFilter = () => {
    if (filterName.trim()) {
      const newFilter = {
        name: filterName,
        skills: selectedSkills,
        experience: selectedExperience,
        location: selectedLocation,
        searchQuery
      };
      setSavedFilters([...savedFilters, filterName]);
      setFilterName('');
      setShowSaveFilter(false);
    }
  };

  const loadFilterPreset = (preset: typeof savedFilterPresets[0]) => {
    onSkillsChange(preset.skills);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          סינון מתקדם
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          <X className="w-4 h-4 mr-1" />
          נקה הכל
        </button>
      </div>

      {/* Semantic Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          חיפוש סמנטי
        </label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="לדוגמה: מפתח עם ניסיון במערכות ענן מבוזרות..."
            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 flex items-center">
          <Brain className="w-3 h-3 mr-1" />
          AI מבין את כוונת החיפוש שלך
        </p>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          רמת ניסיון
        </label>
        <select
          value={selectedExperience}
          onChange={(e) => onExperienceChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {experienceLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          מיקום
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {locations.map(location => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>

      {/* AI-Extracted Skills */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Code className="w-4 h-4 mr-1" />
          כישורים (AI-חולצו)
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {availableSkills.map(skill => (
            <label key={skill} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Saved Filter Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Bookmark className="w-4 h-4 mr-1" />
          פילטרים שמורים
        </label>
        <div className="space-y-2">
          {savedFilterPresets.map(preset => (
            <button
              key={preset.name}
              onClick={() => loadFilterPreset(preset)}
              className="w-full text-right p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Save Current Filter */}
      <div className="border-t pt-4">
        {!showSaveFilter ? (
          <button
            onClick={() => setShowSaveFilter(true)}
            className="w-full flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>שמור פילטר נוכחי</span>
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="שם הפילטר..."
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={saveCurrentFilter}
                className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                שמור
              </button>
              <button
                onClick={() => setShowSaveFilter(false)}
                className="flex-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(selectedSkills.length > 0 || selectedExperience !== 'all' || selectedLocation !== 'all' || searchQuery) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">פילטרים פעילים:</h4>
          <div className="space-y-1">
            {searchQuery && (
              <div className="text-xs text-blue-700">חיפוש: "{searchQuery}"</div>
            )}
            {selectedExperience !== 'all' && (
              <div className="text-xs text-blue-700">
                ניסיון: {experienceLevels.find(l => l.value === selectedExperience)?.label}
              </div>
            )}
            {selectedLocation !== 'all' && (
              <div className="text-xs text-blue-700">
                מיקום: {locations.find(l => l.value === selectedLocation)?.label}
              </div>
            )}
            {selectedSkills.length > 0 && (
              <div className="text-xs text-blue-700">
                כישורים: {selectedSkills.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 