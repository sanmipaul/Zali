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
