'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export function LoginForm({ onLogin, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return;
    }

    if (!isValidEmail(email)) {
      setError('נא להזין כתובת דואל תקינה');
      return;
    }

    try {
      await onLogin(email, password);
    } catch (error) {
      setError('פרטי התחברות שגויים');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail || !isValidEmail(forgotEmail)) {
      setError('נא להזין כתובת דואל תקינה');
      return;
    }

    // Mock forgot password functionality
    setError('');
    alert(`נשלח קישור לאיפוס סיסמה לכתובת: ${forgotEmail}`);
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (showForgotPassword) {
    return (
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">שכחתי סיסמה</h2>
          <p className="text-gray-600">הזן את כתובת הדואל שלך ונשלח לך קישור לאיפוס הסיסמה</p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
              כתובת דואל
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="forgot-email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="הזן כתובת דואל"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 space-x-reverse text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex space-x-3 space-x-reverse">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              חזור
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              שלח קישור
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">התחברות למערכת</h2>
        <p className="text-gray-600">הזן את פרטי ההתחברות שלך</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
            כתובת דואל
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              placeholder="הזן כתובת דואל"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-right">
            סיסמה
          </label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              placeholder="הזן סיסמה"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 space-x-reverse text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>מתחבר...</span>
            </div>
          ) : (
            'התחבר'
          )}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            שכחתי סיסמה
          </button>
        </div>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2 text-center">פרטי התחברות לדוגמה:</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <div><strong>מנהל מערכת:</strong> asaf@titans.global</div>
          <div><strong>סיסמה:</strong> Aa123456</div>
          <div className="border-t border-gray-200 mt-2 pt-2">
            <div><strong>מנהל:</strong> admin@prorecruit.co.il</div>
            <div><strong>מגייס:</strong> recruiter@prorecruit.co.il</div>
            <div><strong>לקוח:</strong> client@company.com</div>
            <div><strong>ספק:</strong> vendor@vendor.com</div>
            <div><strong>מועמד:</strong> candidate@email.com</div>
            <div className="text-center mt-2"><strong>סיסמה לכולם:</strong> password123</div>
          </div>
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              ⚠️ אימות דו-שלבי מושבת זמנית
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 