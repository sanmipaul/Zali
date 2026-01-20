'use client';

import { useEffect, useState } from 'react';

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize AppKit on client side
    if (typeof window !== 'undefined') {
      try {
        // Force AppKit to recognize the connection state
        const checkConnection = () => {
          if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
              .then((accounts: string[]) => {
                if (accounts.length > 0) {
                  // Trigger a state update to ensure wagmi recognizes the connection
                  window.dispatchEvent(new Event('ethereum#accountsChanged'));
                }
              })
              .catch(console.warn);
          }
        };
        
        // Check immediately and after a short delay
        checkConnection();
        setTimeout(checkConnection, 1000);
      } catch (error) {
        console.warn('Failed to initialize wallet connection check:', error);
      }
    }
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
}