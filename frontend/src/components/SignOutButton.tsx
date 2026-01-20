'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignOutButton({ className = '' }: { className?: string }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className={`px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md ${className} ${
        isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isSigningOut ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
