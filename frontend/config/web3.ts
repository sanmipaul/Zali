import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Base Sepolia configuration
const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.base.org'] },
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://sepolia.basescan.org'
    },
  },
  testnet: true,
}

// Base Mainnet
const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://mainnet.base.org'] },
    default: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org'
    },
  },
  testnet: false,
}

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [baseSepolia, base],
  projectId,
  ssr: true
})

// 3. Configure the modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseSepolia, base],
  projectId,
  metadata: {
    name: 'Base Knowledge Quest',
    description: 'Test your knowledge and earn ETH rewards on Base',
    url: 'https://basequest.app',
    icons: ['https://basequest.app/icon.png']
  },
  features: {
    analytics: false,
    email: false,
    socials: []
  },
  enableWalletConnect: true,
  enableInjected: true,
  enableCoinbase: true
})

export const config = wagmiAdapter.wagmiConfig
