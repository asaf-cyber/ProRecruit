'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  File,
  Upload,
  Eye
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
}

interface CandidateFilesProps {
  candidateId: string;
}

export function CandidateFiles({ candidateId }: CandidateFilesProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock files data
  const files: FileItem[] = [
    {
      id: '1',
      name: 'מסמך זהות.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'שרה כהן'
    },
    {
      id: '2',
      name: 'תעודת בגרות.jpg',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-16',
      uploadedBy: 'דוד לוי'
    },
    {
      id: '3',
      name: 'מכתב המלצה.docx',
      type: 'document',
      size: '456 KB',
      uploadDate: '2024-01-17',
      uploadedBy: 'מיכל ישראלי'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText size={20} className="text-red-500" />;
      case 'image':
        return <Image size={20} className="text-green-500" />;
      case 'document':
        return <File size={20} className="text-blue-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Here you would typically upload to backend
      console.log('Uploading file:', selectedFile);
      setShowUploadModal(false);
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">קבצים</h3>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Upload size={16} className="ml-2" />
          העלה קובץ חדש
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">העלה קובץ חדש</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">גרור קובץ לכאן או לחץ לבחירה</p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2 cursor-pointer"
                >
                  בחר קובץ
                </label>
              </div>
              
              {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <FileText size={20} className="text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                העלה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  קובץ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  גודל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך העלאה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  הועלה על ידי
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.type.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(file.uploadDate).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.uploadedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-1 rounded hover:bg-gray-100" title="צפייה">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100" title="הורדה">
                        <Download size={16} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100" title="מחיקה">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {files.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין קבצים עדיין</h3>
          <p className="mt-1 text-sm text-gray-500">העלה קובץ ראשון כדי להתחיל.</p>
        </div>
      )}
    </div>
  );
} 