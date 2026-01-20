# Architecture Diagrams

This document contains visual architecture diagrams for the Zali Web3 Trivia Game.

## Table of Contents

- [System Architecture](#system-architecture)
- [Data Flow](#data-flow)
- [Smart Contract Interactions](#smart-contract-interactions)
- [Component Hierarchy](#component-hierarchy)
- [State Management](#state-management)
- [Deployment Architecture](#deployment-architecture)
- [Tools Used for Diagrams](#tools-used-for-diagrams)

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
        K[Contexts<br/>AuthContext, etc.]
    end
    
    subgraph "Blockchain Layer"
        D
        E
        L[VRF Coordinator<br/>For Randomness]
    end
    
    subgraph "Development Tools"
        M[Foundry<br/>Testing]
        N[Hardhat<br/>Deployment]
        O[Next.js Dev Server]
    end
    
    B --> H
    B --> I
    B --> J
    B --> K
    E --> L
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

## Smart Contract Interactions

```mermaid
flowchart TD
    A[User Action] --> B{Action Type}
    B -->|Create Game| C[createGame<br/>Only Owner]
    B -->|Join Game| D[joinGame<br/>Pay Entry Fee]
    B -->|Start Game| E[startGame<br/>Owner/Admin]
    B -->|Submit Answer| F[submitAnswer<br/>During Game]
    B -->|End Game| G[endGame<br/>Auto/Manual]
    B -->|Claim Reward| H[claimReward<br/>Winner]
    B -->|Withdraw| I[withdrawTokens<br/>Owner]
    
    C --> J[TriviaGame Contract]
    D --> J
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J
    
    J --> K[Events Emitted]
    K --> L[GameCreated]
    K --> M[PlayerJoined]
    K --> N[GameStarted]
    K --> O[AnswerSubmitted]
    K --> P[GameEnded]
    K --> Q[RewardClaimed]
    
    J --> R[State Changes]
    R --> S[Game Struct Updated]
    R --> T[Player Balances Updated]
    R --> U[Prize Pool Updated]
```

## Component Hierarchy

```mermaid
graph TD
    A[App<br/>layout.tsx] --> B[Providers<br/>providers.tsx]
    B --> C[Page Components]
    
    C --> D[Home Page<br/>page.tsx]
    C --> E[Play Page<br/>play/page.tsx]
    C --> F[Create Page<br/>create/page.tsx]
    C --> G[Leaderboard Page<br/>leaderboard/page.tsx]
    C --> H[Faucet Page<br/>faucet/page.tsx]
    
    A --> I[Shared Components]
    I --> J[Navbar<br/>Navbar.tsx]
    I --> K[Error Boundaries<br/>ErrorBoundary.tsx<br/>ContractErrorBoundary.tsx<br/>WalletErrorBoundary.tsx]
    I --> L[Auth Components<br/>AuthGuard.tsx<br/>SignOutButton.tsx]
    
    D --> M[Game Components]
    M --> N[QuestionCard.tsx]
    M --> O[Timer.tsx]
    M --> P[ProgressBar.tsx]
    M --> Q[RewardCard.tsx]
    M --> R[QuickRewards.tsx]
    
    I --> S[Utility Components]
    S --> T[SkipNavLink.tsx]
    S --> U[ErrorDisplay.tsx]
    S --> V[FaucetPrompt.tsx]
    S --> W[PointsHistory.tsx]
    S --> X[Leaderboard.tsx]
    S --> Y[GameDebugger.tsx]
    S --> Z[VRFFulfillment.tsx]
    
    S --> AA[Skeletons<br/>skeletons/]
```

## State Management

```mermaid
graph TD
    A[Zustand Store<br/>store/index.ts] --> B[Auth Slice<br/>authSlice.ts]
    A --> C[Game Slice<br/>gameSlice.ts]
    A --> D[UI Slice<br/>uiSlice.ts]
    
    B --> E[User Authentication State]
    B --> F[Wallet Connection]
    B --> G[User Profile]
    
    C --> H[Game State<br/>Current Game]
    C --> I[Player Status]
    C --> J[Questions & Answers]
    C --> K[Rewards & Points]
    
    D --> L[UI State<br/>Loading States]
    D --> M[Modal States]
    D --> N[Error States]
    
    O[React Contexts] --> P[AuthContext.tsx<br/>Authentication Logic]
    O --> Q[AutoFaucetContext.tsx<br/>Faucet Automation]
    
    R[Components] --> S[useStore Hooks<br/>Zustand Hooks]
    R --> T[useContext Hooks<br/>React Contexts]
    
    S --> A
    T --> O
```

## Tools Used for Diagrams

- **Mermaid.js**: For creating diagrams directly in Markdown
- **GitHub**: For rendering Mermaid diagrams in README and docs
- **Draw.io/Excalidraw**: Alternative tools for more complex diagrams if needed

## Maintenance Notes

These diagrams should be kept updated as the codebase evolves:

- Update system architecture when adding new services or layers
- Modify data flow diagrams for new user interactions or API changes
- Expand component hierarchy as new components are added
- Update state management diagrams when new slices or contexts are introduced
- Review diagrams during major refactoring or architectural changes

Last updated: January 20, 2026

## Deployment Architecture

```mermaid
graph TD
    A[Vercel<br/>Frontend Hosting] --> B[Next.js App<br/>Static + SSR]
    C[Base Mainnet<br/>Smart Contracts] --> D[SimpleTriviaGame.sol<br/>Deployed]
    C --> E[Faucet.sol<br/>Deployed]
    
    F[GitHub<br/>Repository] --> G[CI/CD Pipeline]
    G --> H[Automated Tests<br/>Foundry]
    G --> I[Build & Deploy<br/>Vercel]
    G --> J[Contract Deployment<br/>Scripts]
    
    K[User] --> L[vercel.app<br/>Domain]
    L --> B
    B --> M[Base RPC<br/>Blockchain Interaction]
    M --> D
    M --> E
```