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
