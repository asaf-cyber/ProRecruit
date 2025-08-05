'use client';

import { useState } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  FileText,
  Eye,
  ExternalLink,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    name: string;
    type: 'pdf' | 'doc' | 'docx' | 'image';
    url: string;
    size?: string;
    uploadDate?: string;
    candidateName: string;
  } | null;
}

export function FileViewerModal({ isOpen, onClose, file }: FileViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // Mock total pages

  if (!isOpen || !file) return null;

  const handleDownload = () => {
    // Create a download link
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: file.name,
        text: `קובץ של ${file.candidateName}`,
        url: file.url
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(file.url);
      alert('קישור הקובץ הועתק ללוח');
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'image':
        return <Eye className="w-6 h-6 text-green-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  const renderFileContent = () => {
    if (file.type === 'pdf') {
      return (
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* Mock PDF Viewer */}
          <div 
            className="bg-white mx-auto shadow-lg transition-transform"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              width: '210mm',
              minHeight: '297mm',
              maxWidth: '100%'
            }}
          >
            <div className="p-8 text-right" dir="rtl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">PR</span>
                  </div>
                  <div className="text-left">
                    <h1 className="text-2xl font-bold text-gray-900">ProRecruitment</h1>
                    <p className="text-gray-600">Solutions Ltd.</p>
                  </div>
                </div>
                <hr className="border-blue-600 border-2" />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-600 mb-2">קורות חיים</h2>
                <h3 className="text-lg font-semibold text-gray-900">{file.candidateName}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">פרטים אישיים</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>דוא"ל: candidate@email.com</p>
                    <p>טלפון: 050-123-4567</p>
                    <p>כתובת: תל אביב, ישראל</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">תקציר מקצועי</h4>
                  <p className="text-sm text-gray-700">
                    מפתח תוכנה מנוסה עם 5+ שנות ניסיון בפיתוח אפליקציות web ו-mobile. 
                    מתמחה בטכנולוגיות React, Node.js ו-Python. ניסיון בהובלת צוותים ופרויקטים מורכבים.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">ניסיון תעסוקתי</h4>
                  <div className="space-y-3">
                    <div className="border-r-2 border-blue-300 pr-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-500">2021 - נוכחי</span>
                        <h5 className="font-medium text-gray-800">Senior Developer</h5>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">TechCorp Ltd.</p>
                      <p className="text-xs text-gray-600">פיתוח והובלת פרויקטים מורכבים בסביבת cloud</p>
                    </div>
                    
                    <div className="border-r-2 border-blue-300 pr-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-500">2019 - 2021</span>
                        <h5 className="font-medium text-gray-800">Full Stack Developer</h5>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">StartupXYZ</p>
                      <p className="text-xs text-gray-600">בניית מוצר מאפס בטכנולוגיות מתקדמות</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">השכלה</h4>
                  <div className="border-r-2 border-blue-300 pr-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-gray-500">2015 - 2018</span>
                      <h5 className="font-medium text-gray-800">תואר ראשון במדעי המחשב</h5>
                    </div>
                    <p className="text-sm text-gray-600">אוניברסיטת תל אביב</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">מיומנויות טכניות</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker'].map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-300 text-center">
                <p className="text-xs text-gray-500">
                  נוצר במערכת ProRecruitment • {new Date().toLocaleDateString('he-IL')}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (file.type === 'image') {
      return (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg min-h-96">
          <img 
            src={file.url} 
            alt={file.name}
            className="max-w-full max-h-full object-contain transition-transform"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
            }}
          />
        </div>
      );
    }

    // For DOC/DOCX files
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-96">
        <div className="bg-white mx-auto p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-600">תצוגה מקדימה של מסמך Word</p>
            <p className="text-sm text-gray-500 mt-2">{file.name}</p>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>תוכן המסמך יוצג כאן...</p>
            <p>במימוש מלא, כאן יוצג תוכן המסמך האמיתי.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white dark:bg-gray-900 rounded-xl overflow-hidden ${isFullscreen ? 'w-full h-full' : 'max-w-7xl w-full max-h-[95vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            {getFileIcon()}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{file.name}</h3>
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                <span>{file.candidateName}</span>
                {file.size && <span>{file.size}</span>}
                {file.uploadDate && <span>הועלה: {file.uploadDate}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 space-x-reverse bg-white dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={zoomOut}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                title="הקטן"
              >
                <ZoomOut size={16} />
              </button>
              <span className="px-2 text-sm font-medium">{zoom}%</span>
              <button
                onClick={zoomIn}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                title="הגדל"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Page Navigation (for PDF) */}
            {file.type === 'pdf' && (
              <div className="flex items-center space-x-1 space-x-reverse bg-white dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded disabled:opacity-50"
                  title="עמוד קודם"
                >
                  <ArrowRight size={16} />
                </button>
                <span className="px-2 text-sm font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded disabled:opacity-50"
                  title="עמוד הבא"
                >
                  <ArrowLeft size={16} />
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <button
              onClick={rotate}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="סובב"
            >
              <RotateCw size={16} />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isFullscreen ? "צא ממסך מלא" : "מסך מלא"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="הורד"
            >
              <Download size={16} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="הדפס"
            >
              <Printer size={16} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="שתף"
            >
              <Share2 size={16} />
            </button>

            <button
              onClick={() => window.open(file.url, '_blank')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="פתח בחלון חדש"
            >
              <ExternalLink size={16} />
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-500"
              title="סגור"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`overflow-auto ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'max-h-[80vh]'} p-4`}>
          {renderFileContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            מצב צפייה: {zoom}% • {isFullscreen ? 'מסך מלא' : 'חלון'}
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd>
            <span className="text-xs text-gray-500">לסגירה</span>
          </div>
        </div>
      </div>
    </div>
  );
}