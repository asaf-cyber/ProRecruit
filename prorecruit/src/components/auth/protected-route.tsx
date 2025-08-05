'use client';

import { ReactNode } from 'react';
import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions = [], 
  fallback 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    if (!isLoading && isAuthenticated && user) {
      // Check role requirement
      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate page based on user role
        redirectByRole(user.role);
        return;
      }

      // Check permissions requirement
      if (requiredPermissions.length > 0) {
        const hasPermission = requiredPermissions.some(permission => 
          user.permissions.includes('*') || user.permissions.includes(permission)
        );
        
        if (!hasPermission) {
          // Redirect to unauthorized page or dashboard
          redirectByRole(user.role);
          return;
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, requiredPermissions, router]);

  const redirectByRole = (role: string) => {
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  // Show fallback or redirect if not authenticated
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">מעביר לדף התחברות...</p>
        </div>
      </div>
    );
  }

  // Check role and permissions
  if (user) {
    if (requiredRole && user.role !== requiredRole) {
      return fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">אין לך הרשאה לגשת לעמוד זה</p>
          </div>
        </div>
      );
    }

    if (requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some(permission => 
        user.permissions.includes('*') || user.permissions.includes(permission)
      );
      
      if (!hasPermission) {
        return fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600">אין לך הרשאה לגשת לעמוד זה</p>
            </div>
          </div>
        );
      }
    }
  }

  // Render children if all checks pass
  return <>{children}</>;
}

// Convenience components for specific roles
export function AdminRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function RecruiterRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="recruiter" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ClientRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="client" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function VendorRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="vendor" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function CandidateRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="candidate" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
} 