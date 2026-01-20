# Architecture Diagrams

This document contains visual architecture diagrams for the Zali project to help new contributors understand the system.

## System Architecture

```mermaid
graph TB
    subgraph "User Layer"
        U[User with MiniPay Wallet]
        U --> U1[Connect Wallet]
        U --> U2[Play Trivia]
        U --> U3[Claim Rewards]
    end
    
    subgraph "Frontend Layer"
        N[Next.js App]
        N --> N1[Pages: Home, Play, Faucet]
        N --> N2[Components: QuestionCard, Timer]
        W[Wagmi Web3 Provider]
        W --> W1[Wallet Connection]
        W --> W2[Contract Interactions]
        Z[Zustand Store]
        Z --> Z1[Auth Slice]
        Z --> Z2[Game Slice]
        Z --> Z3[UI Slice]
        C[React Contexts]
        C --> C1[AuthContext]
        C --> C2[AutoFaucetContext]
    end
    
    subgraph "Contract Layer"
        SC[SimpleTriviaGame Contract]
        SC --> SC1[addQuestion]
        SC --> SC2[submitAnswer]
        SC --> SC3[getQuestion]
        M[MockVRFCoordinator]
        M --> M1[Randomness for Future]
    end
    
    subgraph "Blockchain Layer"
        BC[Celo Network]
        BC --> BC1[Transaction Processing]
        BC --> BC2[State Storage]
        USDC[USDC Token Contract]
        USDC --> USDC1[Transfer Rewards]
    end
    
    U --> N
    N --> W
    N --> Z
    N --> C
    W --> SC
    SC --> M
    SC --> BC
    SC --> USDC
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User (MiniPay)
    participant F as Frontend (Next.js)
    participant W as Wagmi Provider
    participant SC as SimpleTriviaGame Contract
    participant V as VRF Coordinator
    participant B as Celo Blockchain

    U->>F: Click "Play Now" or "Claim cUSD"
    F->>W: Request Wallet Connection
    W->>U: Prompt MiniPay Connection
    U->>W: Approve Connection
    W->>F: Return Wallet Address & Balance
    F->>SC: Fetch Available Questions
    SC->>F: Return Question IDs & Metadata
    F->>SC: Get Specific Question Details
    SC->>F: Return Question Text, Options, Reward
    F->>U: Display Question with Timer
    U->>F: Select Answer Option
    F->>W: Prepare Transaction (submitAnswer)
    W->>U: Request Signature via MiniPay
    U->>W: Sign Transaction
    W->>SC: Submit Signed Transaction
    SC->>B: Validate & Execute Transaction
    B->>SC: Confirm Execution
    SC->>W: Emit AnswerSubmitted Event
    W->>F: Update UI with Result
    F->>U: Show Correct/Incorrect & Reward Amount
    F->>Z: Update User Score in Store
    Z->>F: Persist Score Locally
```

## Smart Contract Interactions

```mermaid
stateDiagram-v2
    [*] --> Connected: Wallet Connected via MiniPay
    Connected --> Approved: Approve USDC Spending
    Approved --> Playing: Fetch Question from Contract
    Playing --> Submitted: Submit Answer Transaction
    Submitted --> Checking: Contract Validates Answer
    Checking --> Correct: If selectedOption == correctOption
    Checking --> Incorrect: If selectedOption != correctOption
    Correct --> Rewarded: Transfer USDC Reward
    Incorrect --> NoReward: No Transfer
    Rewarded --> ScoreUpdated: Increment userScores
    NoReward --> ScoreUpdated: No Score Change
    ScoreUpdated --> [*]: Ready for Next Question
    note right of Connected : User connects MiniPay wallet
    note right of Approved : Frontend calls approve on USDC
    note right of Playing : Call getQuestion(questionId)
    note right of Submitted : Call submitAnswer(questionId, option)
    note right of Checking : On-chain validation
    note right of Rewarded : safeTransfer to user
    note right of ScoreUpdated : Update mapping
```

## Component Hierarchy

```mermaid
graph TD
    A[Root App] --> B[AppKitProvider (WalletConnect)]
    A --> C[AuthProvider (Wallet Auth)]
    A --> D[AutoFaucetProvider (Faucet Logic)]
    B --> E[Layout (Main Structure)]
    E --> F[Navbar (Navigation)]
    E --> G[Main Content (Pages)]
    G --> H[Home Page (/)]
    G --> I[Play Page (/play)]
    G --> J[Faucet Page (/faucet)]
    H --> K[Hero Section (Welcome)]
    H --> L[Features Section (How It Works)]
    H --> M[Stats Section (Game Stats)]
    I --> N[QuestionCard (Question Display)]
    I --> O[Timer (Countdown)]
    I --> P[ProgressBar (Game Progress)]
    I --> Q[RewardCard (Reward Display)]
    J --> R[FaucetPrompt (Claim Interface)]
    J --> S[QuickRewards (Reward Options)]
    N --> T[Option Buttons (A/B/C/D)]
    Q --> U[RewardItem (Individual Reward)]
    F --> V[SignOutButton (Logout)]
    F --> W[Leaderboard (Top Players)]
    W --> X[PointsHistory (User History)]
```

## State Management

```mermaid
graph TD
    subgraph "Zustand Store"
        S[Root Store]
        S --> A[Auth Slice]
        S --> G[Game Slice]
        S --> U[UI Slice]
        A --> A1[user]
        A --> A2[isAuthenticated]
        G --> G1[currentQuestion]
        G --> G2[score]
        G --> G3[gameState]
        U --> U1[theme]
        U --> U2[notifications]
        U --> U3[loading]
    end
    
    subgraph "React Contexts"
        C[AuthContext]
        C --> C1[signIn/signOut]
        C --> C2[isLoading]
        C --> C3[error]
        F[AutoFaucetContext]
        F --> F1[faucetBalance]
        F --> F2[claimStatus]
    end
    
    subgraph "Persistence"
        P[Zustand Persist]
        P --> P1[auth.user]
        P --> P2[ui.theme]
        P --> P3[ui.notifications]
    end
```

```mermaid
graph TB
    subgraph "User Layer"
        U[User with MiniPay Wallet]
        U --> U1[Connect Wallet]
        U --> U2[Play Trivia]
        U --> U3[Claim Rewards]
    end
    
    subgraph "Frontend Layer"
        N[Next.js App]
        N --> N1[Pages: Home, Play, Faucet]
        N --> N2[Components: QuestionCard, Timer]
        W[Wagmi Web3 Provider]
        W --> W1[Wallet Connection]
        W --> W2[Contract Interactions]
        Z[Zustand Store]
        Z --> Z1[Auth Slice]
        Z --> Z2[Game Slice]
        Z --> Z3[UI Slice]
        C[React Contexts]
        C --> C1[AuthContext]
        C --> C2[AutoFaucetContext]
    end
    
    subgraph "Contract Layer"
        SC[SimpleTriviaGame Contract]
        SC --> SC1[addQuestion]
        SC --> SC2[submitAnswer]
        SC --> SC3[getQuestion]
        M[MockVRFCoordinator]
        M --> M1[Randomness for Future]
    end
    
    subgraph "Blockchain Layer"
        BC[Celo Network]
        BC --> BC1[Transaction Processing]
        BC --> BC2[State Storage]
        USDC[USDC Token Contract]
        USDC --> USDC1[Transfer Rewards]
    end
    
    U --> N
    N --> W
    N --> Z
    N --> C
    W --> SC
    SC --> M
    SC --> BC
    SC --> USDC
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User (MiniPay)
    participant F as Frontend (Next.js)
    participant W as Wagmi Provider
    participant SC as SimpleTriviaGame Contract
    participant V as VRF Coordinator
    participant B as Celo Blockchain

    U->>F: Click "Play Now" or "Claim cUSD"
    F->>W: Request Wallet Connection
    W->>U: Prompt MiniPay Connection
    U->>W: Approve Connection
    W->>F: Return Wallet Address & Balance
    F->>SC: Fetch Available Questions
    SC->>F: Return Question IDs & Metadata
    F->>SC: Get Specific Question Details
    SC->>F: Return Question Text, Options, Reward
    F->>U: Display Question with Timer
    U->>F: Select Answer Option
    F->>W: Prepare Transaction (submitAnswer)
    W->>U: Request Signature via MiniPay
    U->>W: Sign Transaction
    W->>SC: Submit Signed Transaction
    SC->>B: Validate & Execute Transaction
    B->>SC: Confirm Execution
    SC->>W: Emit AnswerSubmitted Event
    W->>F: Update UI with Result
    F->>U: Show Correct/Incorrect & Reward Amount
    F->>Z: Update User Score in Store
    Z->>F: Persist Score Locally
```

## Smart Contract Interactions

```mermaid
stateDiagram-v2
    [*] --> Connected: Wallet Connected via MiniPay
    Connected --> Approved: Approve USDC Spending
    Approved --> Playing: Fetch Question from Contract
    Playing --> Submitted: Submit Answer Transaction
    Submitted --> Checking: Contract Validates Answer
    Checking --> Correct: If selectedOption == correctOption
    Checking --> Incorrect: If selectedOption != correctOption
    Correct --> Rewarded: Transfer USDC Reward
    Incorrect --> NoReward: No Transfer
    Rewarded --> ScoreUpdated: Increment userScores
    NoReward --> ScoreUpdated: No Score Change
    ScoreUpdated --> [*]: Ready for Next Question
    note right of Connected : User connects MiniPay wallet
    note right of Approved : Frontend calls approve on USDC
    note right of Playing : Call getQuestion(questionId)
    note right of Submitted : Call submitAnswer(questionId, option)
    note right of Checking : On-chain validation
    note right of Rewarded : safeTransfer to user
    note right of ScoreUpdated : Update mapping
```

## Component Hierarchy

```mermaid
graph TD
    A[Root App] --> B[AppKitProvider (WalletConnect)]
    A --> C[AuthProvider (Wallet Auth)]
    A --> D[AutoFaucetProvider (Faucet Logic)]
    B --> E[Layout (Main Structure)]
    E --> F[Navbar (Navigation)]
    E --> G[Main Content (Pages)]
    G --> H[Home Page (/)]
    G --> I[Play Page (/play)]
    G --> J[Faucet Page (/faucet)]
    H --> K[Hero Section (Welcome)]
    H --> L[Features Section (How It Works)]
    H --> M[Stats Section (Game Stats)]
    I --> N[QuestionCard (Question Display)]
    I --> O[Timer (Countdown)]
    I --> P[ProgressBar (Game Progress)]
    I --> Q[RewardCard (Reward Display)]
    J --> R[FaucetPrompt (Claim Interface)]
    J --> S[QuickRewards (Reward Options)]
    N --> T[Option Buttons (A/B/C/D)]
    Q --> U[RewardItem (Individual Reward)]
    F --> V[SignOutButton (Logout)]
    F --> W[Leaderboard (Top Players)]
    W --> X[PointsHistory (User History)]
```

## State Management

```mermaid
graph TD
    subgraph "Zustand Store"
        S[Root Store]
        S --> A[Auth Slice]
        S --> G[Game Slice]
        S --> U[UI Slice]
        A --> A1[user]
        A --> A2[isAuthenticated]
        G --> G1[currentQuestion]
        G --> G2[score]
        G --> G3[gameState]
        U --> U1[theme]
        U --> U2[notifications]
        U --> U3[loading]
    end
    
    subgraph "React Contexts"
        C[AuthContext]
        C --> C1[signIn/signOut]
        C --> C2[isLoading]
        C --> C3[error]
        F[AutoFaucetContext]
        F --> F1[faucetBalance]
        F --> F2[claimStatus]
    end
    
    subgraph "Persistence"
        P[Zustand Persist]
        P --> P1[auth.user]
        P --> P2[ui.theme]
        P --> P3[ui.notifications]
    end
```

## Keeping Diagrams Updated

To ensure these diagrams remain accurate as the codebase evolves:

1. **Review on Major Changes**: Update diagrams when adding new features, refactoring components, or changing data flows.
2. **Code Reviews**: Include diagram updates in pull request reviews for architectural changes.
3. **Documentation PRs**: Treat diagram updates as part of documentation maintenance.
4. **Automated Checks**: Consider adding CI checks to validate diagram syntax (Mermaid can be linted).

### Tools Used
- **Mermaid.js**: For creating diagrams embedded in Markdown
- **GitHub**: For hosting and rendering diagrams
- **VS Code**: For editing and previewing diagrams
```

## Keeping Diagrams Updated

When making changes to the codebase, please update these diagrams accordingly:

- **System Architecture**: Update when adding new services, layers, or external dependencies
- **Data Flow**: Modify when user interaction flows change or new API endpoints are added
- **Smart Contract Interactions**: Update when contract functions or logic change
- **Component Hierarchy**: Reflect when new components are added or hierarchy changes
- **State Management**: Update when new slices, contexts, or state properties are introduced

Use Mermaid.js for consistency and ensure diagrams remain readable and accurate.

## Development Workflow

```mermaid
graph LR
    A[Developer] --> B[Edit Code]
    B --> C[Run Tests]
    C --> D[Deploy Contracts]
    D --> E[Update Frontend]
    E --> F[Build & Deploy]
    F --> G[Update Diagrams]
    G --> H[Commit Changes]
    H --> I[Push to Repo]
    I --> J[Create PR]
    J --> K[Code Review]
    K --> L[Merge]
    L --> M[Deploy to Prod]
```

## Tech Stack Overview

```mermaid
mindmap
  root((Zali Tech Stack))
    Smart Contracts
      Solidity
      Foundry
      OpenZeppelin
      Chainlink VRF
    Frontend
      Next.js
      React
      TypeScript
      Wagmi
      TailwindCSS
    Blockchain
      Celo Network
      USDC Token
      MiniPay
    Tools
      Mermaid.js
      Excalidraw
      draw.io
```