import { useEffect, useState } from 'react';

export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if window.ethereum exists (injected provider)
    const checkMiniPay = () => {
      // MiniPay injects window.ethereum
      if (typeof window !== 'undefined' && window.ethereum) {
        // Check for MiniPay-specific properties
        const provider = window.ethereum as any;

        // MiniPay detection
        const isMiniPayEnv =
          provider.isMiniPay ||
          provider.isOperaMini ||
          window.navigator.userAgent.includes('MiniPay') ||
          window.navigator.userAgent.includes('Opera Mini');

        setIsMiniPay(isMiniPayEnv);
      }
      setIsLoading(false);
    };

    checkMiniPay();
  }, []);

  return { isMiniPay, isLoading };
}