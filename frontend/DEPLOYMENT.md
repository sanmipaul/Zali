# Zali Frontend Deployment Guide

This guide provides comprehensive instructions for deploying the Zali frontend application to production.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
- [Domain Setup](#domain-setup)
- [Monitoring Setup](#monitoring-setup)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Overview

The Zali frontend is a Next.js 14 application built with React 18 and TypeScript. It features:

- **Framework**: Next.js 14.1.0 with App Router
- **Blockchain Integration**: Web3 functionality via WalletConnect and Wagmi
- **Styling**: Tailwind CSS 4.0
- **Testing**: Jest for unit tests, Playwright for E2E tests
- **Monitoring**: Sentry for error tracking
- **Analytics**: Mixpanel for user analytics

### Deployment Options

This guide covers deployment to:
1. **Vercel** (Recommended) - Optimized for Next.js applications
2. **Netlify** - Alternative serverless platform
3. **Custom Server** - Self-hosted deployment options
4. **Docker** - Containerized deployment

## Prerequisites

Before deploying, ensure you have:

### Required Accounts
- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Deployment platform account (Vercel, Netlify, etc.)
- [ ] WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))
- [ ] Sentry account for error monitoring ([Sign up](https://sentry.io))
- [ ] Mixpanel account for analytics ([Sign up](https://mixpanel.com))

### Required Services
- [ ] The Graph subgraph deployed and accessible
- [ ] Smart contracts deployed on Base network
- [ ] RPC endpoint (Alchemy, Infura, or custom)
- [ ] Domain name (for custom domains)

### Development Tools
- Node.js 18.x or later
- npm or yarn package manager
- Git CLI

### Build Verification
Before deploying, verify the build locally:

```bash
cd frontend
npm install
npm run build
npm run start
```

Visit `http://localhost:3000` to verify the production build works correctly.

## Environment Variables

All environment variables must be set in your deployment platform. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### Required Variables

#### Blockchain Configuration

```bash
# The Graph Subgraph URL for querying blockchain data
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/query/your-subgraph-id/zali-trivia/v1.0.0

# Main Zali contract address on Base network
NEXT_PUBLIC_CONTRACT_ADDRESS=0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d

# USDC token contract address on Base
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Base network chain ID
NEXT_PUBLIC_CHAIN_ID=8453

# Network name
NEXT_PUBLIC_NETWORK_NAME=base
```

#### Web3 Wallet Configuration

```bash
# WalletConnect Project ID (Get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

#### RPC Configuration

```bash
# RPC endpoint for Base network
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# Alchemy API key (optional, for enhanced RPC)
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id_here
```

#### Feature Flags

```bash
# Enable/disable subgraph data fetching
NEXT_PUBLIC_USE_SUBGRAPH=true

# Enable/disable query caching
NEXT_PUBLIC_ENABLE_CACHING=true
```

### Optional Variables

#### Monitoring (Sentry)

```bash
# Sentry DSN for error tracking
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Sentry environment (production, staging, etc.)
SENTRY_ENVIRONMENT=production

# Sentry release version (typically set automatically by CI/CD)
SENTRY_RELEASE=your-release-version
```

#### Analytics (Mixpanel)

```bash
# Mixpanel project token
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
```

### Environment Variable Setup by Platform

See the [Deployment Platforms](#deployment-platforms) section for platform-specific instructions on setting environment variables.
