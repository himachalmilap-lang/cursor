import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, fetchMe, user } = useAuth();
  useEffect(() => {
    if (token && !user) fetchMe();
  }, [token, user, fetchMe]);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}