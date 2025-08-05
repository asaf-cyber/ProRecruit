'use client';

import { useState, useRef, useEffect } from 'react';
import { Shield, Smartphone, Key, ArrowLeft } from 'lucide-react';

interface TwoFactorAuthProps {
  onVerify: (code: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  userEmail: string;
}

export function TwoFactorAuth({ onVerify, onBack, isLoading, userEmail }: TwoFactorAuthProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'app'>('sms');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (newCode.every(digit => digit !== '') && index === 5) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      setError('נא להזין קוד בן 6 ספרות');
      return;
    }

    setError('');
    try {
      await onVerify(codeToVerify);
    } catch (error) {
      setError('קוד שגוי, נא לנסות שוב');
      // Clear the code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const resendCode = () => {
    // Mock resend functionality
    alert('נשלח קוד חדש');
    setCode(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">אימות דו-שלבי</h2>
        <p className="text-gray-600">נשלח קוד אימות ל-{userEmail}</p>
        {userEmail === 'asaf@titans.global' && (
          <p className="text-sm text-blue-600 mt-1">(SMS נשלח ל-0528512263)</p>
        )}
      </div>

      {/* Verification Method Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setVerificationMethod('sms')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            verificationMethod === 'sms'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Smartphone className="w-4 h-4 inline ml-2" />
          SMS
        </button>
        <button
          onClick={() => setVerificationMethod('app')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            verificationMethod === 'app'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Key className="w-4 h-4 inline ml-2" />
          אפליקציה
        </button>
      </div>

      {/* Code Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
          הזן את הקוד בן 6 הספרות
        </label>
        <div className="flex justify-center space-x-2 space-x-reverse">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-colors text-lg font-semibold"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={() => handleSubmit()}
        disabled={isLoading || code.some(digit => digit === '')}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium mb-4"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>מאמת...</span>
          </div>
        ) : (
          'אמת קוד'
        )}
      </button>

      {/* Resend Code */}
      <div className="text-center mb-4">
        <button
          onClick={resendCode}
          className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
        >
          שלח קוד חדש
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full flex items-center justify-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>חזור להתחברות</span>
      </button>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">הוראות:</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• הקוד נשלח לכתובת הדואל שלך</li>
          <li>• הקוד תקף ל-10 דקות</li>
          <li>• אם לא קיבלת את הקוד, בדוק את תיקיית הספאם</li>
        </ul>
      </div>
    </div>
  );
} 