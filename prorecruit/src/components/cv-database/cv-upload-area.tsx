'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Brain,
  Loader,
  X,
  Download
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'parsing' | 'completed' | 'error';
  progress: number;
  parsedData?: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: string;
    education: string;
  };
  error?: string;
}

export function CVUploadArea() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and parsing process
    newFiles.forEach((file, index) => {
      simulateUploadProcess(file.id, index);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  const simulateUploadProcess = (fileId: string, index: number) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === 'uploading') {
          const newProgress = file.progress + 20;
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            return { ...file, progress: 100, status: 'parsing' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);

    // Simulate AI parsing
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            status: 'completed',
            parsedData: {
              name: 'דוד לוי',
              email: 'david.levy@email.com',
              phone: '050-1234567',
              skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
              experience: '5 שנים בפיתוח Full Stack',
              education: 'תואר ראשון במדעי המחשב'
            }
          };
        }
        return file;
      }));
    }, 3000 + (index * 1000));
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'parsing':
        return <Brain className="w-5 h-5 text-purple-600 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'מעלה קובץ...';
      case 'parsing':
        return 'מנתח עם AI...';
      case 'completed':
        return 'הושלם בהצלחה';
      case 'error':
        return 'שגיאה בעיבוד';
      default:
        return 'ממתין';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragActive ? 'שחרר לכאן את הקבצים' : 'גרור קורות חיים לכאן או לחץ לבחירה'}
            </h3>
            <p className="text-gray-600">
              תמיכה בקבצי PDF, DOC, DOCX ו-TXT
            </p>
            <p className="text-sm text-gray-500 mt-2">
              המערכת תנתח אוטומטית את הקובץ עם AI ותחלץ את כל המידע הרלוונטי
            </p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">קבצים שהועלו</h3>
          
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getStatusIcon(file.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-sm text-gray-600">
                      {getStatusText(file.status)}
                    </span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {file.status === 'uploading' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}

                {/* Parsed Data */}
                {file.status === 'completed' && file.parsedData && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2">מידע שחולץ:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">שם:</span> {file.parsedData.name}
                      </div>
                      <div>
                        <span className="font-medium">אימייל:</span> {file.parsedData.email}
                      </div>
                      <div>
                        <span className="font-medium">טלפון:</span> {file.parsedData.phone}
                      </div>
                      <div>
                        <span className="font-medium">ניסיון:</span> {file.parsedData.experience}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">כישורים:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {file.parsedData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2 space-x-reverse">
                      <button className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>הורד קובץ אחיד</span>
                      </button>
                      <button className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        <span>צור סיכום ללקוח</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {file.status === 'error' && file.error && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-800 text-sm">{file.error}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      {uploadedFiles.some(f => f.status === 'completed') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">תובנות AI</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">מועמדים דומים</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">12</div>
              <div className="text-xs text-blue-600">נמצאו במאגר</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-900">משרות מתאימות</div>
              <div className="text-2xl font-bold text-green-600 mt-1">8</div>
              <div className="text-xs text-green-600">משרות פתוחות</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-900">ציון התאמה</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">92%</div>
              <div className="text-xs text-purple-600">למשרות רלוונטיות</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 