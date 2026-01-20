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

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant W as Wallet
    participant B as Blockchain
    participant C as Contract

    U->>F: Click "Play Game"
    F->>W: Request wallet connection
    W->>F: Return wallet address
    F->>F: Update user state
    U->>F: Select game to join
    F->>W: Request transaction signature (joinGame)
    W->>B: Send signed transaction
    B->>C: Execute joinGame function
    C->>B: Emit events
    B->>F: Transaction confirmed
    F->>B: Query game state
    B->>F: Return updated state
    F->>U: Display game UI
    U->>F: Answer questions
    F->>W: Submit answers (if applicable)
    W->>B: Send transaction
    B->>C: Process answers/rewards
    C->>B: Distribute rewards
    B->>F: Confirmation
    F->>U: Show results
```