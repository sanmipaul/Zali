// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.ethereum
const mockEthereum = {
  isMetaMask: true,
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
};

global.ethereum = mockEthereum;

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => Promise.resolve()),
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock next-auth/react if it exists
try {
  jest.mock('next-auth/react', () => ({
    useSession: () => ({
      data: null,
      status: 'unauthenticated',
    }),
    signIn: jest.fn(),
    signOut: jest.fn(),
  }));
} catch (error) {
  console.warn('next-auth/react mock failed to load:', error);
}

// Mock @tanstack/react-query
try {
  jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: jest.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    })),
    useMutation: jest.fn(() => ({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
    })),
  }));
} catch (error) {
  console.warn('@tanstack/react-query mock failed to load:', error);
}

// Mock web3-related modules
try {
  jest.mock('@celo/contractkit', () => ({
    newKit: jest.fn(() => ({
      setFeeCurrency: jest.fn().mockResolvedValue(undefined),
      getTotalBalance: jest.fn().mockResolvedValue({
        CELO: '1000000000000000000',
        cUSD: '2000000000000000000',
        cEUR: '0',
      }),
    })),
    newKitFromWeb3: jest.fn(() => ({
      setFeeCurrency: jest.fn().mockResolvedValue(undefined),
      getTotalBalance: jest.fn().mockResolvedValue({
        CELO: '1000000000000000000',
        cUSD: '2000000000000000000',
        cEUR: '0',
      }),
    })),
  }));
} catch (error) {
  console.warn('@celo/contractkit mock failed to load:', error);
}

// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: mockEthereum,
  writable: true,
});
