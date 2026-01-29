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

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers optimal performance.

#### Quick Deploy

1. **Connect Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm install -g vercel

   # Login to Vercel
   vercel login
   ```

2. **Import Project**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git repository
   - Choose the `frontend` directory as the root

3. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Root Directory: `frontend`

4. **Set Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables from the [Environment Variables](#environment-variables) section
   - Set variables for Production, Preview, and Development environments

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Vercel CLI Deployment

```bash
# Navigate to frontend directory
cd frontend

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

#### Custom Domain on Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to provision (automatic)

### Netlify

Netlify is an alternative serverless platform with excellent Next.js support.

#### Deploy via Netlify UI

1. **Connect Repository**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git provider and select repository

2. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: .next
   ```

3. **Add netlify.toml Configuration**
   Create `frontend/netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
     base = "frontend"

   [build.environment]
     NODE_VERSION = "18"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all required variables from the [Environment Variables](#environment-variables) section

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://your-site.netlify.app`

#### Netlify CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
cd frontend
netlify init

# Deploy to production
netlify deploy --prod

# Deploy to preview
netlify deploy
```

### Docker Deployment

Deploy using Docker containers for maximum portability.

#### Docker Setup

1. **Create Dockerfile** (see `frontend/Dockerfile`)

2. **Create .dockerignore**
   ```
   node_modules
   .next
   .git
   .env.local
   npm-debug.log
   ```

3. **Build Docker Image**
   ```bash
   cd frontend
   docker build -t zali-frontend:latest .
   ```

4. **Run Container Locally**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SUBGRAPH_URL=your_value \
     -e NEXT_PUBLIC_CONTRACT_ADDRESS=your_value \
     -e NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_value \
     zali-frontend:latest
   ```

5. **Push to Container Registry**
   ```bash
   # Tag for registry
   docker tag zali-frontend:latest your-registry.com/zali-frontend:latest

   # Push to registry
   docker push your-registry.com/zali-frontend:latest
   ```

#### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    env_file:
      - ./frontend/.env.production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Domain Setup

### DNS Configuration

Configure your domain's DNS records to point to your deployment:

#### For Vercel

1. Add domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: A
   Name: @ (or subdomain)
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### For Netlify

1. Add domain in Netlify dashboard
2. Configure DNS records:
   ```
   Type: A
   Name: @ (or subdomain)
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

#### For Custom Server

1. Point A record to your server IP:
   ```
   Type: A
   Name: @
   Value: your.server.ip.address
   ```

2. Add CNAME for www subdomain:
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

### SSL/TLS Certificate

#### Automatic (Vercel/Netlify)
- SSL certificates are automatically provisioned and renewed
- No manual configuration required

#### Manual (Custom Server)

Use Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot

# Obtain certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificate files will be at:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem

# Set up auto-renewal
sudo certbot renew --dry-run
```

### Testing Domain Configuration

```bash
# Test DNS propagation
nslookup yourdomain.com

# Test SSL certificate
curl -I https://yourdomain.com

# Check SSL certificate details
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```
