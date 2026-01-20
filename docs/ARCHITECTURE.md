# Architecture Diagrams

This document contains visual architecture diagrams for the Zali Web3 Trivia Game.

## Table of Contents

- [System Architecture](#system-architecture)
- [Data Flow](#data-flow)
- [Smart Contract Interactions](#smart-contract-interactions)
- [Component Hierarchy](#component-hierarchy)
- [State Management](#state-management)

## System Architecture

```mermaid
graph TB
    A[User] --> B[Frontend<br/>Next.js App]
    B --> C[Web3 Wallet<br/>MetaMask/Coinbase]
    C --> D[Base Network<br/>Blockchain]
    D --> E[Smart Contracts<br/>SimpleTriviaGame.sol<br/>Faucet.sol]
    B --> F[Backend APIs<br/>Next.js API Routes]
    F --> G[Database<br/>Optional]
    
    subgraph "Frontend Layer"
        B
        H[Components<br/>UI Elements]
        I[Hooks<br/>useContract, etc.]
        J[Store<br/>Zustand]
    end
    
    subgraph "Blockchain Layer"
        D
        E
    end
    
    B --> H
    B --> I
    B --> J
```