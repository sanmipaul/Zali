import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: true,
    address: '0x1234567890123456789012345678901234567890',
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
}));

// Mock framer-motion for testing
jest.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock AppKit
jest.mock('@reown/appkit/react', () => ({
  useAppKit: () => ({
    open: jest.fn(),
  }),
}));

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    const { getByText } = render(<Navbar />);
    
    // Check if logo is rendered
    expect(getByText('🎓 Zali')).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Play')).toBeInTheDocument();
    expect(getByText('Rewards')).toBeInTheDocument();
    expect(getByText('Leaderboard')).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    const { queryByText, getByRole, getByText } = render(<Navbar />);
    
    // Menu should be closed by default
    expect(queryByText('Connect Wallet')).not.toBeInTheDocument();
    
    // Click menu button
    const menuButton = getByRole('button', { name: /open menu/i });
    menuButton.click();
    
    // Menu should be open
    expect(getByText('Connect Wallet')).toBeInTheDocument();
    
    // Click menu button again to close
    menuButton.click();
    
    // Menu should be closed
    expect(queryByText('Connect Wallet')).not.toBeInTheDocument();
  });

  it('shows connected wallet address when connected', () => {
    const { getByText, getByRole } = render(<Navbar />);
    
    // Open mobile menu to see wallet address
    const menuButton = getByRole('button', { name: /open menu/i });
    menuButton.click();
    
    // Check if wallet address is displayed (shortened)
    expect(getByText('0x1234...7890')).toBeInTheDocument();
  });

  it('calls disconnect when sign out button is clicked', () => {
    const mockDisconnect = jest.fn();
    require('wagmi').useDisconnect.mockReturnValue({ disconnect: mockDisconnect });
    
    const { getByText, getByRole } = render(<Navbar />);
    
    // Open mobile menu
    const menuButton = getByRole('button', { name: /open menu/i });
    menuButton.click();
    
    // Click sign out button
    const signOutButton = getByText('Sign out');
    signOutButton.click();
    
    // Check if disconnect was called
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
