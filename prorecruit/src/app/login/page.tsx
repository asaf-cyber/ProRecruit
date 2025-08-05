'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { LoginBackground } from '@/components/auth/login-background';
import { CompanyLogo } from '@/components/auth/company-logo';
import { TwoFactorAuth } from '@/components/auth/two-factor-auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call - in real app this would be an actual API call
      const response = await mockLoginAPI(email, password);
      
      if (response.success && response.user) {
        // Check if user requires 2FA
        if (requiresTwoFactor(response.user.role)) {
          setUserEmail(email);
          setUserRole(response.user.role);
          setShowTwoFactor(true);
          
          // Send actual SMS for real users
          if (email === 'asaf@titans.global') {
            await sendRealSMS('0528512263');
          }
        } else {
          // Route user directly
          routeUserByRole(response.user.role);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorVerify = async (code: string) => {
    setIsLoading(true);
    
    try {
      // Mock 2FA verification - in real app this would verify the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      if (code.length === 6) {
        routeUserByRole(userRole);
      } else {
        throw new Error('קוד שגוי');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendRealSMS = async (phoneNumber: string) => {
    try {
      // In real implementation, this would call Twilio or similar SMS service
      console.log(`Sending SMS to: ${phoneNumber}`);
      
      // Mock SMS sending - replace with actual SMS service
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: 'קוד אימות ProRecruit: 123456'
        }),
      });
      
      if (response.ok) {
        console.log('SMS sent successfully');
      } else {
        console.log('SMS sending failed, using mock');
      }
    } catch (error) {
      console.log('SMS service not available, using mock');
    }
  };

  const requiresTwoFactor = (role: string) => {
    // Temporarily disabled 2FA for all users
    return false;
    
    // Original logic (commented out):
    // Admin and financial roles require 2FA
    // return ['admin', 'finance'].includes(role);
  };

  const routeUserByRole = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/executive-dashboard');
        break;
      case 'recruiter':
        router.push('/candidates');
        break;
      case 'client':
        router.push('/client-portal');
        break;
      case 'vendor':
        router.push('/vendor-portal');
        break;
      case 'candidate':
        router.push('/candidate-portal');
        break;
      default:
        router.push('/');
    }
  };

  // Mock API function - replace with real API call
  const mockLoginAPI = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app this would come from your backend
    const mockUsers = {
      'admin@prorecruit.co.il': { role: 'admin', name: 'מנהל מערכת' },
      'recruiter@prorecruit.co.il': { role: 'recruiter', name: 'מגייס' },
      'client@company.com': { role: 'client', name: 'לקוח' },
      'vendor@vendor.com': { role: 'vendor', name: 'ספק' },
      'candidate@email.com': { role: 'candidate', name: 'מועמד' },
      'asaf@titans.global': { role: 'admin', name: 'אסף - מנהל מערכת' }
    };

    const user = mockUsers[email as keyof typeof mockUsers];
    
    if (user && password === 'password123' || (email === 'asaf@titans.global' && password === 'Aa123456')) {
      return {
        success: true,
        user: {
          email,
          role: user.role,
          name: user.name
        }
      };
    } else {
      return {
        success: false,
        message: 'פרטי התחברות שגויים'
      };
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Background */}
      <LoginBackground />
      
      {/* Login Form Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Company Logo */}
          <div className="text-center mb-8">
            <CompanyLogo />
          </div>
          
          {/* Login Form or Two Factor Auth */}
          {showTwoFactor ? (
            <TwoFactorAuth
              onVerify={handleTwoFactorVerify}
              onBack={() => setShowTwoFactor(false)}
              isLoading={isLoading}
              userEmail={userEmail}
            />
          ) : (
            <LoginForm 
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
} 