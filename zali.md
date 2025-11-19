# 📘 **Celo Knowledge Quest — Complete Build Instructions**

**Updated for Celo MiniPay Hackathon with Prediction Market Feature**

*A comprehensive technical specification for building the complete project with all features.*

---

## **Executive Summary**

Build **Celo Knowledge Quest** — a mobile-first, educational play-to-earn trivia game with an integrated prediction market, specifically designed for Celo MiniPay. Players learn about the Celo ecosystem, earn cUSD rewards, and can bet on other players' outcomes.

**Unique Selling Points:**
- ✅ Educational focus (Learn about Celo while earning)
- ✅ Hybrid Play-to-Earn + Prediction Market
- ✅ MiniPay-optimized mobile experience
- ✅ Real cUSD rewards with automatic payouts
- ✅ On-chain leaderboards and social features

**Target Categories:** Play-to-Earn Games + Educational Games + Prediction Markets

---

# 🎯 **1. Project Overview**

## **1.1 Core Features**

### **Trivia Game (Play-to-Earn)**
- Players claim 10 test cUSD from faucet (one-time)
- Join trivia rounds with 0.05 cUSD entry fee
- Answer 5 Celo-focused questions in 60 seconds
- Top 3 players split prize pool (80% / 15% / 5%)
- Educational explanations after each answer

### **Prediction Market (NEW)**
- After completing a game, players can predict next round's winners
- Place bets (0.01-0.1 cUSD) on specific players or positions
- Correct predictions earn 2x-3x returns
- Creates engagement loop: Play → Predict → Earn → Repeat

### **MiniPay Integration**
- Seamless wallet connection (implicit inside MiniPay)
- Custom fee currency (cUSD) for all transactions
- Mobile-optimized UI (responsive, touch-friendly)
- Tested via ngrok tunnel during development

### **Social Features**
- On-chain leaderboard (total winnings, games won)
- Referral system (5% of entry fee to referrer)
- Social sharing (share scores with referral links)
- Achievement tracking

---

## **1.2 Tech Stack**

**Blockchain:**
- Solidity ^0.8.20 (OpenZeppelin contracts)
- Foundry (development, testing, deployment)
- Celo Alfajores Testnet (Chain ID: 44787)

**Frontend:**
- Next.js 16.0.3 (App Router)
- React 19 + TypeScript 5
- Wagmi 2.19.4 + Viem 2.39.3 (REQUIRED for MiniPay)
- RainbowKit 2.2.9 (wallet connection)
- Tailwind CSS 4.x
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- JSON-based question database
- Server-side game logic

**Testing:**
- Foundry tests (smart contracts)
- ngrok tunnel (MiniPay testing)

---

# 🗂 **2. Project Structure**

```
/home/debby/Desktop/DEBY/Hacks/Zali/
├── contracts/                          # Foundry project
│   ├── src/
│   │   ├── Faucet.sol                 # ✅ DEPLOYED
│   │   ├── TriviaGame.sol             # ✅ DEPLOYED (needs update)
│   │   └── PredictionMarket.sol       # ❌ NEW - TO BUILD
│   ├── test/
│   │   ├── Faucet.t.sol               # ✅ COMPLETE
│   │   ├── TriviaGame.t.sol           # ✅ COMPLETE
│   │   └── PredictionMarket.t.sol     # ❌ NEW - TO BUILD
│   ├── script/
│   │   └── Deploy.s.sol               # ⚠️ UPDATE NEEDED
│   ├── lib/                            # Dependencies
│   ├── foundry.toml                   # Configuration
│   └── .env                           # Environment variables
│
├── frontend/                           # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # ⚠️ Home page (needs customization)
│   │   │   ├── layout.tsx             # ✅ Root layout
│   │   │   ├── globals.css            # ✅ Global styles
│   │   │   ├── faucet/
│   │   │   │   └── page.tsx           # ✅ COMPLETE
│   │   │   ├── play/
│   │   │   │   └── page.tsx           # ⚠️ UI done, needs blockchain
│   │   │   ├── create/
│   │   │   │   └── page.tsx           # ⚠️ UI done, needs blockchain
│   │   │   ├── game/
│   │   │   │   └── [id]/page.tsx      # ❌ NEW - Gameplay interface
│   │   │   ├── results/
│   │   │   │   └── [id]/page.tsx      # ❌ NEW - Results page
│   │   │   ├── predict/
│   │   │   │   └── [roundId]/page.tsx # ❌ NEW - Prediction UI
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx           # ❌ NEW - Leaderboard
│   │   │   └── api/
│   │   │       ├── questions/
│   │   │       │   └── route.ts       # ❌ NEW - Fetch questions
│   │   │       ├── session/
│   │   │       │   └── route.ts       # ❌ NEW - Save game results
│   │   │       └── leaderboard/
│   │   │           └── route.ts       # ❌ NEW - Fetch leaderboard
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # ✅ COMPLETE
│   │   │   ├── QuestionCard.tsx       # ❌ NEW
│   │   │   ├── Timer.tsx              # ❌ NEW
│   │   │   ├── PredictionCard.tsx     # ❌ NEW
│   │   │   ├── LeaderboardTable.tsx   # ❌ NEW
│   │   │   └── MiniPayDetector.tsx    # ❌ NEW - MiniPay detection
│   │   ├── config/
│   │   │   ├── contracts.ts           # ⚠️ UPDATE - Add PredictionMarket
│   │   │   └── web3.ts                # ⚠️ UPDATE - MiniPay optimization
│   │   ├── hooks/
│   │   │   ├── useContract.ts         # ⚠️ UPDATE - Add prediction hooks
│   │   │   └── useMiniPay.ts          # ❌ NEW - MiniPay detection
│   │   └── lib/
│   │       └── utils.ts               # ❌ NEW - Helper functions
│   ├── public/
│   │   └── questions.json             # ❌ NEW - 100 Celo questions
│   ├── package.json                   # ⚠️ UPDATE - Add dependencies
│   ├── tsconfig.json                  # ✅ COMPLETE
│   ├── next.config.ts                 # ✅ COMPLETE
│   ├── tailwind.config.ts             # ✅ COMPLETE
│   └── .env.local                     # ❌ NEW - Environment variables
│
├── README.md                           # ⚠️ UPDATE - Add features
├── zali.md                            # 📄 THIS FILE
└── .gitignore                         # ✅ COMPLETE
```

**Legend:**
- ✅ Complete
- ⚠️ Needs updates
- ❌ Not started

---

# 🔐 **3. Smart Contract Requirements**

## **3.1 Faucet.sol** ✅

**Status:** DEPLOYED at `0x707ECcbbFa9073F1e5A5675F22473956FE36FC8d`

**Purpose:** Distribute 10 test cUSD to new users (one-time claim)

**No changes needed** — already production-ready.

---

## **3.2 TriviaGame.sol** ⚠️

**Status:** DEPLOYED at `0x90C9Ba691DA6a027bf8cC173ea5171c29b3f3673`

**Current State:** Production-ready but needs minor updates

### **Updates Needed:**

1. **Reduce Entry Fee:** 0.1 → 0.05 cUSD (more accessible)
2. **Add Referral Tracking:**
   ```solidity
   mapping(address => address) public referrers;
   mapping(address => uint256) public referralCount;

   function joinGameWithReferral(
       uint256 gameId,
       address referrer
   ) public nonReentrant {
       // Existing join logic

       // New: Referral bonus (5% of entry fee)
       if (referrer != address(0) && referrer != msg.sender) {
           referrers[msg.sender] = referrer;
           referralCount[referrer]++;
           uint256 bonus = ENTRY_FEE * 5 / 100;
           cUSDToken.transfer(referrer, bonus);
       }
   }
   ```

3. **Add Leaderboard Data:**
   ```solidity
   mapping(address => uint256) public totalWinnings;
   mapping(address => uint256) public gamesWon;
   mapping(address => uint256) public gamesPlayed;

   // Update in completeGame function
   function completeGame(
       uint256 gameId,
       address[] calldata winners
   ) external onlyOwner {
       // Existing completion logic

       // New: Update leaderboard stats
       for (uint i = 0; i < winners.length; i++) {
           gamesWon[winners[i]]++;
       }
   }

   // View functions
   function getPlayerStats(address player) external view returns (
       uint256 winnings,
       uint256 wins,
       uint256 played
   ) {
       return (
           totalWinnings[player],
           gamesWon[player],
           gamesPlayed[player]
       );
   }
   ```

### **New Events:**
```solidity
event ReferralRewardPaid(
    address indexed referrer,
    address indexed player,
    uint256 amount
);
event LeaderboardUpdated(
    address indexed player,
    uint256 totalWinnings,
    uint256 gamesWon
);
```

---

## **3.3 PredictionMarket.sol** ❌ NEW

**Purpose:** Allow players to bet on game outcomes and earn rewards for correct predictions

### **Complete Contract Specification:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title PredictionMarket
 * @notice Allows players to bet on trivia game winners
 * @dev Integrates with TriviaGame.sol for round data
 */
contract PredictionMarket is Ownable, ReentrancyGuard {
    IERC20 public immutable cUSDToken;

    // Betting limits
    uint256 public constant MIN_BET = 0.01e18;    // 0.01 cUSD
    uint256 public constant MAX_BET = 0.1e18;     // 0.1 cUSD

    // Prediction types
    enum PredictionType {
        WinnerAddress,   // Bet on specific player
        TopThree         // Bet on player finishing top 3
    }

    // Prediction structure
    struct Prediction {
        uint256 roundId;
        address predictor;
        PredictionType predType;
        address predictedWinner;
        uint256 betAmount;
        bool settled;
        bool won;
        uint256 payout;
    }

    // Round prediction pool
    struct RoundPool {
        uint256 totalPool;
        uint256 totalPredictions;
        bool settled;
        address[] winners;
    }

    // State variables
    mapping(uint256 => Prediction[]) public roundPredictions;
    mapping(uint256 => RoundPool) public roundPools;
    mapping(address => uint256[]) public userPredictions;

    // Events
    event PredictionPlaced(
        uint256 indexed roundId,
        address indexed predictor,
        address predictedWinner,
        uint256 betAmount,
        PredictionType predType
    );

    event PredictionSettled(
        uint256 indexed roundId,
        address indexed predictor,
        bool won,
        uint256 payout
    );

    event RoundSettled(
        uint256 indexed roundId,
        address[] winners,
        uint256 totalPayout
    );

    constructor(address _cUSDToken) Ownable(msg.sender) {
        require(_cUSDToken != address(0), "Invalid token address");
        cUSDToken = IERC20(_cUSDToken);
    }

    /**
     * @notice Place a prediction on a game round
     * @param roundId The trivia game round ID
     * @param predictedWinner Address of predicted winner
     * @param betAmount Amount to bet (between MIN_BET and MAX_BET)
     * @param predType Type of prediction (winner or top 3)
     */
    function placePrediction(
        uint256 roundId,
        address predictedWinner,
        uint256 betAmount,
        PredictionType predType
    ) external nonReentrant {
        require(betAmount >= MIN_BET, "Bet too low");
        require(betAmount <= MAX_BET, "Bet too high");
        require(predictedWinner != address(0), "Invalid prediction");
        require(!roundPools[roundId].settled, "Round already settled");

        // Transfer bet amount
        require(
            cUSDToken.transferFrom(msg.sender, address(this), betAmount),
            "Transfer failed"
        );

        // Create prediction
        Prediction memory prediction = Prediction({
            roundId: roundId,
            predictor: msg.sender,
            predType: predType,
            predictedWinner: predictedWinner,
            betAmount: betAmount,
            settled: false,
            won: false,
            payout: 0
        });

        roundPredictions[roundId].push(prediction);
        userPredictions[msg.sender].push(roundId);

        // Update pool
        roundPools[roundId].totalPool += betAmount;
        roundPools[roundId].totalPredictions++;

        emit PredictionPlaced(
            roundId,
            msg.sender,
            predictedWinner,
            betAmount,
            predType
        );
    }

    /**
     * @notice Settle predictions after round completes
     * @param roundId The completed round ID
     * @param winners Array of winning addresses
     */
    function settlePredictions(
        uint256 roundId,
        address[] calldata winners
    ) external onlyOwner {
        require(!roundPools[roundId].settled, "Already settled");
        require(winners.length > 0, "No winners");

        RoundPool storage pool = roundPools[roundId];
        pool.winners = winners;
        pool.settled = true;

        Prediction[] storage predictions = roundPredictions[roundId];
        uint256 totalPayout = 0;

        // Calculate and distribute payouts
        for (uint256 i = 0; i < predictions.length; i++) {
            Prediction storage pred = predictions[i];
            pred.settled = true;

            if (pred.predType == PredictionType.WinnerAddress) {
                // Check if predicted the #1 winner
                if (winners.length > 0 && pred.predictedWinner == winners[0]) {
                    pred.won = true;
                    pred.payout = pred.betAmount * 3; // 3x return
                }
            } else if (pred.predType == PredictionType.TopThree) {
                // Check if predicted player finished top 3
                for (uint256 j = 0; j < winners.length && j < 3; j++) {
                    if (pred.predictedWinner == winners[j]) {
                        pred.won = true;
                        pred.payout = pred.betAmount * 2; // 2x return
                        break;
                    }
                }
            }

            // Transfer payout if won
            if (pred.won && pred.payout > 0) {
                cUSDToken.transfer(pred.predictor, pred.payout);
                totalPayout += pred.payout;

                emit PredictionSettled(
                    roundId,
                    pred.predictor,
                    true,
                    pred.payout
                );
            } else {
                emit PredictionSettled(roundId, pred.predictor, false, 0);
            }
        }

        emit RoundSettled(roundId, winners, totalPayout);
    }

    /**
     * @notice Get all predictions for a round
     */
    function getRoundPredictions(
        uint256 roundId
    ) external view returns (Prediction[] memory) {
        return roundPredictions[roundId];
    }

    /**
     * @notice Get user's prediction history
     */
    function getUserPredictionRounds(
        address user
    ) external view returns (uint256[] memory) {
        return userPredictions[user];
    }

    /**
     * @notice Get round pool info
     */
    function getRoundPool(
        uint256 roundId
    ) external view returns (
        uint256 totalPool,
        uint256 totalPredictions,
        bool settled,
        address[] memory winners
    ) {
        RoundPool memory pool = roundPools[roundId];
        return (
            pool.totalPool,
            pool.totalPredictions,
            pool.settled,
            pool.winners
        );
    }

    /**
     * @notice Owner emergency withdrawal
     */
    function withdrawTokens(
        uint256 amount
    ) external onlyOwner {
        require(
            cUSDToken.transfer(msg.sender, amount),
            "Transfer failed"
        );
    }

    /**
     * @notice Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return cUSDToken.balanceOf(address(this));
    }
}
```

### **Test Requirements (PredictionMarket.t.sol):**

```solidity
// Required test cases:

1. testPlacePrediction() - User can place valid prediction
2. testRejectLowBet() - Rejects bets below MIN_BET
3. testRejectHighBet() - Rejects bets above MAX_BET
4. testSettleWinningPrediction() - Correct payouts for winners
5. testSettleLosingPrediction() - No payout for incorrect predictions
6. testMultiplePredictions() - Multiple users can bet on same round
7. testPreventDoubleSettle() - Cannot settle same round twice
8. testWinnerPredictionPayout() - 3x payout for exact winner
9. testTopThreePredictionPayout() - 2x payout for top 3
10. testRoundPoolTracking() - Pool stats tracked correctly
```

---

# 🌐 **4. MiniPay Integration Requirements**

## **4.1 MiniPay Detection**

Create `/frontend/src/hooks/useMiniPay.ts`:

```typescript
import { useEffect, useState } from 'react';

export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if window.ethereum exists (injected provider)
    const checkMiniPay = () => {
      // MiniPay injects window.ethereum
      if (typeof window !== 'undefined' && window.ethereum) {
        // Check for MiniPay-specific properties
        const provider = window.ethereum as any;

        // MiniPay detection
        const isMiniPayEnv =
          provider.isMiniPay ||
          provider.isOperaMini ||
          window.navigator.userAgent.includes('MiniPay');

        setIsMiniPay(isMiniPayEnv);
      }
      setIsLoading(false);
    };

    checkMiniPay();
  }, []);

  return { isMiniPay, isLoading };
}
```

## **4.2 Web3 Configuration Updates**

Update `/frontend/config/web3.ts`:

```typescript
import { http, createConfig } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// MiniPay-optimized configuration
export const config = createConfig({
  chains: [celoAlfajores, celo],
  connectors: [
    injected(), // MiniPay uses injected connector
  ],
  transports: {
    [celoAlfajores.id]: http(),
    [celo.id]: http(),
  },
});

// Helper to prepare transaction with feeCurrency
export function prepareMiniPayTransaction(tx: any) {
  return {
    ...tx,
    // MiniPay requires feeCurrency for cUSD gas payments
    feeCurrency: '0x765DE816845861e75A25fCA122bb6898B8B1282a', // cUSD address
    // Use legacy transaction type (not EIP-1559)
    type: 'legacy' as const,
  };
}
```

## **4.3 Conditional Wallet Button**

Update `/frontend/src/components/Navbar.tsx`:

```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMiniPay } from '@/hooks/useMiniPay';

export function Navbar() {
  const { isMiniPay, isLoading } = useMiniPay();

  return (
    <nav>
      {/* Other nav items */}

      {/* Only show connect button outside MiniPay */}
      {!isLoading && !isMiniPay && (
        <ConnectButton />
      )}

      {isMiniPay && (
        <div className="text-sm text-green-600">
          ✓ Connected via MiniPay
        </div>
      )}
    </nav>
  );
}
```

## **4.4 Transaction Handling**

Example for joining game with MiniPay support:

```typescript
import { useWriteContract } from 'wagmi';
import { prepareMiniPayTransaction } from '@/config/web3';
import { useMiniPay } from '@/hooks/useMiniPay';

export function useJoinGame() {
  const { writeContract } = useWriteContract();
  const { isMiniPay } = useMiniPay();

  const joinGame = async (gameId: number) => {
    const tx = {
      address: TRIVIA_GAME_ADDRESS,
      abi: TRIVIA_GAME_ABI,
      functionName: 'joinGame',
      args: [gameId],
    };

    // Apply MiniPay-specific transaction formatting
    const finalTx = isMiniPay ? prepareMiniPayTransaction(tx) : tx;

    await writeContract(finalTx);
  };

  return { joinGame };
}
```

## **4.5 Testing with ngrok**

### **Setup:**

1. Install ngrok: `npm install -g ngrok`
2. Start dev server: `cd frontend && npm run dev`
3. Create tunnel: `ngrok http 3000 --domain=your-static-domain.ngrok-free.app`
4. Open MiniPay app → Compass icon → Enter ngrok URL

### **Environment Variables (.env.local):**

```env
# Development
NEXT_PUBLIC_NGROK_URL=https://your-domain.ngrok-free.app

# Production
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

---

# 🖥 **5. Frontend Implementation**

## **5.1 Questions Database**

Create `/frontend/public/questions.json` with 100 Celo-focused questions:

```json
[
  {
    "id": 1,
    "category": "Celo Basics",
    "difficulty": "easy",
    "question": "What makes Celo unique among Layer 1 blockchains?",
    "options": [
      "Mobile-first design with phone number addresses",
      "Proof of Work consensus",
      "NFT marketplace focus",
      "No smart contract support"
    ],
    "correctIndex": 0,
    "explanation": "Celo is designed mobile-first, allowing users to send crypto using phone numbers instead of complex wallet addresses. This makes it accessible to billions of mobile users worldwide."
  },
  {
    "id": 2,
    "category": "Celo Basics",
    "difficulty": "easy",
    "question": "Which stablecoin on Celo is pegged to the US Dollar?",
    "options": ["cEUR", "cUSD", "CELO", "cREAL"],
    "correctIndex": 1,
    "explanation": "cUSD (Celo Dollar) is Celo's stablecoin pegged to the US Dollar, enabling stable-value transactions on the network."
  },
  {
    "id": 3,
    "category": "DeFi Concepts",
    "difficulty": "medium",
    "question": "What is the purpose of a liquidity pool in DeFi?",
    "options": [
      "To store passwords securely",
      "To mine new cryptocurrencies",
      "To enable decentralized trading without order books",
      "To validate blockchain transactions"
    ],
    "correctIndex": 2,
    "explanation": "Liquidity pools allow decentralized exchanges (DEXs) to facilitate trading without traditional order books, using automated market makers (AMMs) instead."
  },
  {
    "id": 4,
    "category": "Celo Ecosystem",
    "difficulty": "medium",
    "question": "What is MiniPay?",
    "options": [
      "A Celo mining tool",
      "A stablecoin wallet with built-in dApp discovery",
      "A gas fee reduction mechanism",
      "A smart contract language"
    ],
    "correctIndex": 1,
    "explanation": "MiniPay is a lightweight stablecoin wallet integrated into Opera Mini with a built-in discovery page for dApps, making crypto accessible to millions of users."
  },
  {
    "id": 5,
    "category": "Blockchain Security",
    "difficulty": "easy",
    "question": "What should you NEVER share with anyone?",
    "options": [
      "Your wallet address",
      "Your private key/seed phrase",
      "Transaction hashes",
      "Your cUSD balance"
    ],
    "correctIndex": 1,
    "explanation": "Your private key or seed phrase gives complete access to your wallet. Never share it with anyone - legitimate services will NEVER ask for it."
  }
  // ... 95 more questions covering all categories
]
```

**Question Categories (20 each):**
1. Celo Basics
2. DeFi Concepts
3. Celo Ecosystem
4. Blockchain Security
5. Real-World Use Cases

## **5.2 API Routes**

### **GET /api/questions/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/../../public/questions.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = parseInt(searchParams.get('count') || '5');

  // Shuffle and select random questions
  const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // Remove correct answers from response (client shouldn't see them)
  const questions = selected.map(({ correctIndex, explanation, ...q }) => q);

  return NextResponse.json({
    questions,
    gameId: Date.now() // Temporary game ID
  });
}
```

### **POST /api/session/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/../../public/questions.json';

interface Answer {
  questionId: number;
  selectedIndex: number;
  timeSpent: number;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { gameId, answers, playerAddress } = body as {
    gameId: number;
    answers: Answer[];
    playerAddress: string;
  };

  // Calculate score
  let correctCount = 0;
  let totalTimeBonus = 0;

  const results = answers.map(answer => {
    const question = questionsData.find(q => q.id === answer.questionId);
    if (!question) return null;

    const isCorrect = question.correctIndex === answer.selectedIndex;
    if (isCorrect) {
      correctCount++;
      // Time bonus: faster answers get more points
      const timeBonus = Math.max(0, 10 - answer.timeSpent);
      totalTimeBonus += timeBonus;
    }

    return {
      questionId: answer.questionId,
      correct: isCorrect,
      correctAnswer: question.correctIndex,
      explanation: question.explanation,
    };
  });

  const score = correctCount * 100 + totalTimeBonus;

  // TODO: Save to database
  // TODO: Determine if player is in top 3
  // TODO: Trigger smart contract payout if round complete

  return NextResponse.json({
    score,
    correctCount,
    totalQuestions: answers.length,
    results,
    gameId,
  });
}
```

### **GET /api/leaderboard/route.ts**

```typescript
import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { celoAlfajores } from 'viem/chains';
import { TRIVIA_GAME_ADDRESS, TRIVIA_GAME_ABI } from '@/config/contracts';

export async function GET() {
  const client = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
  });

  // Fetch on-chain leaderboard data
  // This is a simplified example - you'd need to implement proper indexing

  try {
    // Get top players (this would require event indexing in production)
    const mockLeaderboard = [
      { address: '0x123...', totalWinnings: 1000, gamesWon: 5, gamesPlayed: 10 },
      // ... more players
    ];

    return NextResponse.json({ leaderboard: mockLeaderboard });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
```

## **5.3 New Pages**

### **Game Page: `/app/game/[id]/page.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch questions
    fetch('/api/questions?count=5')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setIsLoading(false);
      });
  }, []);

  const handleAnswer = (questionId: number, selectedIndex: number, timeSpent: number) => {
    setAnswers([...answers, { questionId, selectedIndex, timeSpent }]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60); // Reset timer for next question
    } else {
      // Game complete - submit answers
      submitGame();
    }
  };

  const submitGame = async () => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId,
        answers,
        playerAddress: '0x...', // Get from wallet
      }),
    });

    const result = await response.json();
    router.push(`/results/${gameId}?score=${result.score}`);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Timer timeLeft={timeLeft} totalTime={60} />

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
}
```

### **Results Page: `/app/results/[id]/page.tsx`**

```typescript
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const gameId = params.id as string;
  const score = parseInt(searchParams.get('score') || '0');
  const [showPrediction, setShowPrediction] = useState(false);

  const isWinner = score >= 400; // Example threshold

  useEffect(() => {
    if (isWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isWinner]);

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isWinner ? '🎉 Congratulations!' : 'Good Try!'}
          </h1>

          <div className="text-6xl font-bold text-green-600 mb-2">
            {score}
          </div>
          <p className="text-gray-600 mb-6">points</p>

          {isWinner && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold">
                💰 You earned 0.12 cUSD!
              </p>
              <p className="text-sm text-green-600 mt-1">
                Prize sent to your wallet
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => router.push('/play')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
            >
              Play Again
            </button>

            <button
              onClick={() => setShowPrediction(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              🔮 Predict Next Round & Earn
            </button>

            <button
              onClick={() => router.push('/leaderboard')}
              className="w-full border-2 border-gray-300 py-3 rounded-lg font-semibold"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### **Prediction Page: `/app/predict/[roundId]/page.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useWriteContract, useReadContract } from 'wagmi';
import { PREDICTION_MARKET_ADDRESS, PREDICTION_MARKET_ABI } from '@/config/contracts';

export default function PredictionPage() {
  const params = useParams();
  const roundId = params.roundId as string;

  const [betAmount, setBetAmount] = useState('0.05');
  const [predictionType, setPredictionType] = useState<0 | 1>(0); // 0 = Winner, 1 = Top3
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const { writeContract } = useWriteContract();

  const placePrediction = async () => {
    await writeContract({
      address: PREDICTION_MARKET_ADDRESS,
      abi: PREDICTION_MARKET_ABI,
      functionName: 'placePrediction',
      args: [
        BigInt(roundId),
        selectedPlayer,
        BigInt(parseFloat(betAmount) * 1e18),
        predictionType,
      ],
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Place Your Prediction</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Prediction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPredictionType(0)}
                className={`py-3 rounded-lg font-semibold ${
                  predictionType === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Winner (3x)
              </button>
              <button
                onClick={() => setPredictionType(1)}
                className={`py-3 rounded-lg font-semibold ${
                  predictionType === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Top 3 (2x)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Bet Amount (cUSD)
            </label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0.01"
              max="0.1"
              step="0.01"
              className="w-full px-4 py-3 border-2 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Min: 0.01 cUSD | Max: 0.1 cUSD
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Player
            </label>
            {/* Player list - fetch from API/contract */}
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg"
            >
              <option value="">Choose a player...</option>
              <option value="0x123...">Player 1 (Score: 450)</option>
              <option value="0x456...">Player 2 (Score: 380)</option>
            </select>
          </div>

          <button
            onClick={placePrediction}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg"
          >
            Place Prediction
          </button>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Potential Return:</strong>{' '}
              {(parseFloat(betAmount) * (predictionType === 0 ? 3 : 2)).toFixed(2)} cUSD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## **5.4 Required Components**

### **QuestionCard.tsx**

```typescript
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  onAnswer: (questionId: number, selectedIndex: number, timeSpent: number) => void;
  timeLeft: number;
}

export default function QuestionCard({ question, onAnswer, timeLeft }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [startTime] = useState(Date.now());

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Add slight delay for visual feedback
    setTimeout(() => {
      onAnswer(question.id, index, timeSpent);
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={selectedIndex !== null}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all
              ${selectedIndex === index
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-50 border-gray-200 hover:border-blue-300'
              }
              ${selectedIndex !== null && selectedIndex !== index ? 'opacity-50' : ''}
            `}
          >
            <span className="font-semibold mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### **Timer.tsx**

```typescript
import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function Timer({ timeLeft, totalTime }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100;

  const getColor = () => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className="text-2xl font-bold">{timeLeft}s</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

---

# 📅 **6. 11-Day Build Plan**

## **Phase 1: Core Completion (Days 1-3)**

### **Day 1: Smart Contracts Update**
- [ ] Update TriviaGame.sol (reduce entry fee, add referral system, leaderboard)
- [ ] Write PredictionMarket.sol
- [ ] Write comprehensive tests for PredictionMarket
- [ ] Update deployment script
- [ ] Deploy updated contracts to Alfajores
- [ ] Update frontend contract configs

**Deliverables:**
- ✅ PredictionMarket.sol deployed
- ✅ Updated TriviaGame.sol deployed
- ✅ All tests passing
- ✅ Contract addresses in frontend config

### **Day 2: Questions & API**
- [ ] Create 100 Celo-focused questions in questions.json
- [ ] Implement /api/questions endpoint
- [ ] Implement /api/session endpoint
- [ ] Implement /api/leaderboard endpoint
- [ ] Test all API endpoints

**Deliverables:**
- ✅ questions.json with 100 questions
- ✅ All API routes functional
- ✅ Endpoint testing complete

### **Day 3: Gameplay Pages**
- [ ] Build QuestionCard component
- [ ] Build Timer component
- [ ] Complete /game/[id]/page.tsx
- [ ] Complete /results/[id]/page.tsx
- [ ] Test complete gameplay flow

**Deliverables:**
- ✅ Gameplay interface complete
- ✅ Results page complete
- ✅ Full user flow works end-to-end

---

## **Phase 2: Prediction Market (Days 4-5)**

### **Day 4: Prediction Frontend**
- [ ] Create PredictionCard component
- [ ] Build /predict/[roundId]/page.tsx
- [ ] Implement usePrediction hook
- [ ] Add prediction to contract config
- [ ] Test prediction placing

**Deliverables:**
- ✅ Prediction UI complete
- ✅ Prediction contract integration working
- ✅ Can place and view predictions

### **Day 5: Play & Create Integration**
- [ ] Complete /play blockchain integration (fetch games from contract)
- [ ] Complete /create blockchain integration (create games on-chain)
- [ ] Add "Join Game" transaction flow
- [ ] Test full game creation and joining

**Deliverables:**
- ✅ Play page shows real blockchain data
- ✅ Create page submits to contract
- ✅ Users can create and join games

---

## **Phase 3: MiniPay Integration (Days 6-7)**

### **Day 6: MiniPay Setup**
- [ ] Create useMiniPay hook
- [ ] Update web3 config for MiniPay
- [ ] Add feeCurrency to all transactions
- [ ] Update Navbar with conditional wallet button
- [ ] Test MiniPay detection

**Deliverables:**
- ✅ MiniPay detection working
- ✅ Transactions use feeCurrency
- ✅ Conditional UI based on environment

### **Day 7: MiniPay Testing**
- [ ] Set up ngrok tunnel
- [ ] Test complete flow in MiniPay app
- [ ] Test faucet claim in MiniPay
- [ ] Test game joining in MiniPay
- [ ] Test prediction placing in MiniPay
- [ ] Fix any MiniPay-specific issues

**Deliverables:**
- ✅ Full app works in MiniPay
- ✅ All transactions successful
- ✅ No MiniPay-specific bugs

---

## **Phase 4: Polish & Features (Days 8-9)**

### **Day 8: UX Polish**
- [ ] Add Framer Motion animations
- [ ] Add page transitions
- [ ] Add loading skeletons
- [ ] Add success/error toast notifications
- [ ] Add haptic feedback (mobile vibration)
- [ ] Optimize mobile layout
- [ ] Add social sharing

**Deliverables:**
- ✅ Smooth animations throughout
- ✅ Professional loading states
- ✅ Mobile-optimized experience
- ✅ Share functionality works

### **Day 9: Leaderboard & Social**
- [ ] Build LeaderboardTable component
- [ ] Complete /leaderboard/page.tsx
- [ ] Implement on-chain leaderboard fetching
- [ ] Add referral link generation
- [ ] Test referral system
- [ ] Update home page with branding

**Deliverables:**
- ✅ Leaderboard displays correctly
- ✅ Referral system functional
- ✅ Home page customized

---

## **Phase 5: Deploy & Document (Days 10-11)**

### **Day 10: Deployment**
- [ ] Deploy frontend to Vercel
- [ ] Configure environment variables
- [ ] Test production deployment
- [ ] Verify all features work in production
- [ ] Test in MiniPay with production URL
- [ ] Fix any production issues

**Deliverables:**
- ✅ Production app live
- ✅ All features working
- ✅ MiniPay compatible

### **Day 11: Documentation & Demo**
- [ ] Update README.md
- [ ] Add setup instructions
- [ ] Create architecture diagram
- [ ] Record 4-minute demo video
- [ ] Submit to hackathon
- [ ] Share on social media

**Deliverables:**
- ✅ Complete documentation
- ✅ Professional demo video
- ✅ Hackathon submission complete

---

# ✅ **7. Master Build Checklist**

## **Smart Contracts** (Day 1)

### **TriviaGame.sol Updates:**
- [ ] Reduce ENTRY_FEE from 0.1e18 to 0.05e18
- [ ] Add referral system (mapping + function)
- [ ] Add leaderboard tracking (totalWinnings, gamesWon, gamesPlayed)
- [ ] Add getPlayerStats view function
- [ ] Add new events (ReferralRewardPaid, LeaderboardUpdated)
- [ ] Update tests to cover new features
- [ ] Deploy updated contract
- [ ] Verify on Celoscan

### **PredictionMarket.sol:**
- [ ] Write complete contract (see spec above)
- [ ] Add MIN_BET and MAX_BET constants
- [ ] Implement placePrediction function
- [ ] Implement settlePredictions function
- [ ] Add all view functions
- [ ] Write comprehensive tests (10+ test cases)
- [ ] Deploy to Alfajores
- [ ] Verify on Celoscan

### **Deployment:**
- [ ] Update Deploy.s.sol script
- [ ] Deploy Faucet (if not already)
- [ ] Deploy TriviaGame (updated)
- [ ] Deploy PredictionMarket
- [ ] Save all contract addresses
- [ ] Verify all contracts on Celoscan
- [ ] Fund Faucet with cUSD

---

## **Backend** (Day 2)

### **Questions Database:**
- [ ] Create /frontend/public/questions.json
- [ ] Write 20 "Celo Basics" questions (easy)
- [ ] Write 20 "DeFi Concepts" questions (medium)
- [ ] Write 20 "Celo Ecosystem" questions (medium)
- [ ] Write 20 "Blockchain Security" questions (easy)
- [ ] Write 20 "Real-World Use Cases" questions (medium)
- [ ] Add explanations to all answers
- [ ] Validate JSON structure

### **API Routes:**
- [ ] Implement /api/questions/route.ts
  - [ ] Random question selection
  - [ ] Remove answers from response
  - [ ] Add count parameter
- [ ] Implement /api/session/route.ts
  - [ ] Score calculation
  - [ ] Time bonus logic
  - [ ] Return results with explanations
- [ ] Implement /api/leaderboard/route.ts
  - [ ] Fetch on-chain data
  - [ ] Format response
  - [ ] Handle errors
- [ ] Test all endpoints with Postman/curl

---

## **Frontend - Configuration** (Day 1 & 6)

### **Contract Config:**
- [ ] Update /frontend/config/contracts.ts
  - [ ] Add PredictionMarket ABI
  - [ ] Add PredictionMarket address
  - [ ] Update TriviaGame ABI if changed
  - [ ] Add contract addresses for all chains

### **Web3 Config:**
- [ ] Update /frontend/config/web3.ts
  - [ ] Add prepareMiniPayTransaction helper
  - [ ] Configure feeCurrency for cUSD
  - [ ] Set transaction type to 'legacy'
  - [ ] Configure chains (celoAlfajores, celo)

### **MiniPay Integration:**
- [ ] Create /frontend/src/hooks/useMiniPay.ts
  - [ ] Detect window.ethereum
  - [ ] Check for MiniPay-specific properties
  - [ ] Return isMiniPay and isLoading
- [ ] Update all transaction calls to use feeCurrency
- [ ] Test MiniPay detection

---

## **Frontend - Components** (Days 3-4 & 8)

### **Gameplay Components:**
- [ ] Create QuestionCard.tsx
  - [ ] Display question and options
  - [ ] Handle answer selection
  - [ ] Visual feedback on selection
  - [ ] Disable after answer
- [ ] Create Timer.tsx
  - [ ] Countdown display
  - [ ] Progress bar
  - [ ] Color changes (green → yellow → red)
  - [ ] Smooth animations

### **Prediction Components:**
- [ ] Create PredictionCard.tsx
  - [ ] Display round info
  - [ ] Player selection
  - [ ] Bet amount input
  - [ ] Prediction type selector
  - [ ] Submit button

### **Social Components:**
- [ ] Create LeaderboardTable.tsx
  - [ ] Player rankings
  - [ ] Total winnings display
  - [ ] Games won/played
  - [ ] Responsive design
- [ ] Update Navbar.tsx
  - [ ] Add MiniPay detection
  - [ ] Conditional wallet button
  - [ ] MiniPay status indicator
  - [ ] Mobile responsive

---

## **Frontend - Pages** (Days 3-5 & 9)

### **Home Page (/):**
- [ ] Remove default Next.js content
- [ ] Add Celo Knowledge Quest branding
- [ ] Add hero section
- [ ] Add "How to Play" section
- [ ] Add feature highlights
- [ ] Add CTA buttons (Play Now, Learn More)
- [ ] Add statistics (total players, total prizes)

### **Faucet Page (/faucet):**
- [ ] ✅ Already complete
- [ ] Test claim functionality
- [ ] Verify one-claim enforcement

### **Play Page (/play):**
- [ ] Replace mock data with blockchain queries
- [ ] Fetch active games from TriviaGame contract
- [ ] Display game cards (title, entry fee, prize pool, players)
- [ ] Implement "Join Game" transaction
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add tabs (Active, My Games, Completed)

### **Create Page (/create):**
- [ ] Connect form to TriviaGame.createGame
- [ ] Add transaction confirmation
- [ ] Add loading states
- [ ] Add success/error messages
- [ ] Redirect to /play after creation

### **Game Page (/game/[id]):**
- [ ] Fetch questions from /api/questions
- [ ] Implement question flow (5 questions)
- [ ] Add Timer component
- [ ] Track user answers
- [ ] Submit to /api/session on completion
- [ ] Redirect to /results with score

### **Results Page (/results/[id]):**
- [ ] Display score prominently
- [ ] Show correct/incorrect count
- [ ] Display prize amount if winner
- [ ] Show answer explanations
- [ ] Add confetti animation for winners
- [ ] Add "Play Again" button
- [ ] Add "Predict Next Round" button
- [ ] Add social sharing

### **Prediction Page (/predict/[roundId]):**
- [ ] Display round information
- [ ] Fetch current players
- [ ] Implement prediction type selection
- [ ] Implement bet amount input
- [ ] Call PredictionMarket.placePrediction
- [ ] Show potential returns
- [ ] Add confirmation modal
- [ ] Add loading/success states

### **Leaderboard Page (/leaderboard):**
- [ ] Fetch leaderboard from /api/leaderboard
- [ ] Display LeaderboardTable component
- [ ] Add filtering (All Time, This Week, This Month)
- [ ] Add pagination if needed
- [ ] Highlight current user
- [ ] Add refresh button

---

## **Frontend - Hooks** (Days 4-5)

### **useContract.ts Updates:**
- [ ] Add usePrediction hook
  - [ ] placePrediction function
  - [ ] getRoundPredictions function
  - [ ] getUserPredictions function
  - [ ] settlePredictions function (owner)
- [ ] Update useTriviaGame hook
  - [ ] Add joinGameWithReferral function
  - [ ] Add getPlayerStats function
  - [ ] Add getLeaderboard function
- [ ] Test all hooks

---

## **UX/UI Polish** (Day 8)

### **Animations:**
- [ ] Install framer-motion
- [ ] Add page transitions
- [ ] Add question reveal animations
- [ ] Add prize counter animation
- [ ] Add smooth scroll
- [ ] Add button hover effects

### **Loading States:**
- [ ] Add loading skeletons for game cards
- [ ] Add loading spinners for transactions
- [ ] Add progress indicators for multi-step flows
- [ ] Add shimmer effects

### **Feedback:**
- [ ] Install react-hot-toast
- [ ] Add success toasts (claim, join, win)
- [ ] Add error toasts (transaction failed)
- [ ] Add info toasts (helpful tips)
- [ ] Add haptic feedback (if mobile)

### **Mobile Optimization:**
- [ ] Test on mobile devices
- [ ] Ensure tap targets >= 44px
- [ ] Test touch interactions
- [ ] Verify responsive layouts
- [ ] Test in landscape mode
- [ ] Optimize font sizes (>= 16px)

### **Social Features:**
- [ ] Add share buttons (Twitter, Telegram)
- [ ] Generate share images (score cards)
- [ ] Add referral link generator
- [ ] Add copy-to-clipboard functionality
- [ ] Test social sharing

---

## **MiniPay Testing** (Day 7)

### **Setup:**
- [ ] Install ngrok (`npm install -g ngrok`)
- [ ] Get static ngrok domain (ngrok.com)
- [ ] Configure ngrok with auth token
- [ ] Start dev server (`npm run dev`)
- [ ] Create tunnel (`ngrok http 3000 --domain=...`)

### **Testing in MiniPay:**
- [ ] Open MiniPay app
- [ ] Navigate to Compass icon
- [ ] Enter ngrok URL
- [ ] Test wallet connection (should be implicit)
- [ ] Test faucet claim
- [ ] Test game joining
- [ ] Test gameplay flow
- [ ] Test prediction placing
- [ ] Test all transactions
- [ ] Verify feeCurrency is working
- [ ] Check for any errors

### **Issues to Check:**
- [ ] Wallet connect button hidden
- [ ] Transactions using cUSD for fees
- [ ] No EIP-1559 properties
- [ ] Layout works on mobile
- [ ] Touch targets large enough
- [ ] No console errors
- [ ] Transaction confirmations work

---

## **Deployment** (Day 10)

### **Frontend Deployment:**
- [ ] Create Vercel account (if needed)
- [ ] Connect GitHub repo to Vercel
- [ ] Configure build settings
- [ ] Add environment variables:
  - [ ] NEXT_PUBLIC_CUSD_ADDRESS
  - [ ] NEXT_PUBLIC_FAUCET_ADDRESS
  - [ ] NEXT_PUBLIC_TRIVIA_ADDRESS
  - [ ] NEXT_PUBLIC_PREDICTION_ADDRESS
  - [ ] NEXT_PUBLIC_CHAIN_ID=44787
  - [ ] NEXT_PUBLIC_APP_URL
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test production app

### **Production Testing:**
- [ ] Test all pages load
- [ ] Test wallet connection
- [ ] Test faucet claim
- [ ] Test game creation
- [ ] Test game joining
- [ ] Test gameplay
- [ ] Test predictions
- [ ] Test leaderboard
- [ ] Test in MiniPay with production URL
- [ ] Verify all contracts accessible
- [ ] Check for console errors
- [ ] Test on multiple devices

### **Domain (Optional):**
- [ ] Purchase custom domain
- [ ] Configure DNS in Vercel
- [ ] Test custom domain
- [ ] Update all links

---

## **Documentation** (Day 11)

### **README.md:**
- [ ] Add project title and tagline
- [ ] Add demo link and video
- [ ] Add features list
- [ ] Add screenshots
- [ ] Add tech stack
- [ ] Add architecture diagram
- [ ] Add setup instructions
  - [ ] Prerequisites
  - [ ] Installation steps
  - [ ] Environment variables
  - [ ] Running locally
  - [ ] Testing
- [ ] Add deployment instructions
- [ ] Add contract addresses
- [ ] Add team info
- [ ] Add license

### **Demo Video (MAX 4 minutes):**
- [ ] Write script (see section 5.5)
- [ ] Record screen (Loom, OBS, etc.)
- [ ] Show mobile interface
- [ ] Demonstrate key features:
  - [ ] Faucet claim
  - [ ] Game joining
  - [ ] Gameplay (answer questions)
  - [ ] Results and prizes
  - [ ] Prediction market
  - [ ] Leaderboard
- [ ] Add voiceover/captions
- [ ] Edit and polish
- [ ] Upload to YouTube
- [ ] Add to README

### **Architecture Diagram:**
- [ ] Create visual diagram (Excalidraw, Figma)
- [ ] Show:
  - [ ] User → Frontend
  - [ ] Frontend → Smart Contracts
  - [ ] Frontend → API Routes
  - [ ] API Routes → Questions DB
  - [ ] Smart Contracts on Celo
- [ ] Add to README

---

## **Hackathon Submission** (Day 11)

### **Submission Requirements:**
- [ ] ✅ DApp deployed (Vercel)
- [ ] ✅ Smart contracts on Celo (testnet or mainnet)
- [ ] ✅ Smooth user experience
- [ ] ✅ GitHub repo with code
- [ ] ✅ README with setup guide
- [ ] ✅ Demo video (max 4 min)

### **Submission Checklist:**
- [ ] Production URL works
- [ ] GitHub repo is public
- [ ] README is comprehensive
- [ ] Demo video uploaded
- [ ] All features functional
- [ ] No critical bugs
- [ ] Mobile-optimized
- [ ] MiniPay compatible

### **Submit:**
- [ ] Fill out submission form
- [ ] Include all required links
- [ ] Add demo video URL
- [ ] Add GitHub URL
- [ ] Add deployed app URL
- [ ] Add contract addresses
- [ ] Add description
- [ ] Submit before deadline (Nov 30, 00:00)

---

## **Post-Submission** (Optional)

### **Marketing:**
- [ ] Tweet about project
- [ ] Share in Celo Discord
- [ ] Share in relevant Telegram groups
- [ ] Post on LinkedIn
- [ ] Write blog post about experience

### **Improvements (if time):**
- [ ] Add more questions (200+)
- [ ] Add question difficulty levels
- [ ] Add tournament mode
- [ ] Add NFT badges
- [ ] Add more stablecoins (cEUR, cREAL)
- [ ] Add multiplayer real-time mode

---

# 🎬 **8. Demo Video Script (4 minutes)**

### **Structure:**

**0:00-0:30 — The Hook**
```
[Open with mobile screen recording]

"What if you could learn about blockchain while earning real money?

Meet Celo Knowledge Quest - the only trivia game where education
meets play-to-earn meets prediction markets.

[Show smooth gameplay montage]

Built for Celo MiniPay. Built for everyone."
```

**0:30-1:30 — The Problem & Solution**
```
[Show statistics]

"73% of people want to learn about crypto but find traditional
education boring.

[Show old-school crypto course]

And traditional trivia games? No real rewards.

[Show generic trivia app]

We combined both.

[Screen recording: Open app in MiniPay]

Claim free test tokens from our faucet...
[Tap claim button, show transaction]

Join a trivia round for just 0.05 cUSD...
[Show game selection, join game]

Answer questions about the Celo ecosystem...
[Show 2-3 questions being answered]

And win real cUSD prizes - paid automatically to your wallet.
[Show results screen with prize]"
```

**1:30-2:30 — Unique Features**
```
"But here's what makes us different:

[Show prediction market interface]

After playing, predict the next round's winners and earn even more.

[Place a prediction]

Correct predictions? 2-3x your bet.

[Show leaderboard]

Compete on-chain - total winnings tracked forever.

[Show referral link]

Invite friends, earn 5% of their entry fees.

[Show educational explanation]

Every answer teaches you something new about Celo, DeFi,
and blockchain."
```

**2:30-3:15 — The Tech**
```
"Built with:

[Show code snippets]

Three Solidity smart contracts:
- Faucet for free tokens
- TriviaGame for rounds and prizes
- PredictionMarket for betting

[Show frontend]

Next.js frontend optimized for mobile.
Wagmi and Viem for MiniPay compatibility.
100% responsive, smooth animations.

[Show contract on explorer]

Deployed on Celo Alfajores testnet.
Fully verified and open source."
```

**3:15-4:00 — Impact & CTA**
```
"Why it matters:

[Show map of Celo regions]

Celo serves emerging markets where financial education is critical.

Celo Knowledge Quest makes that education fun, rewarding, and accessible.

[Show features checklist]

✓ Learn about Celo ecosystem
✓ Earn real cUSD rewards
✓ Predict and earn more
✓ Mobile-first for MiniPay
✓ 100% on-chain and transparent

[Show QR code and URL]

Try it now: [your-url]

Celo Knowledge Quest - Learn. Play. Earn.

[End with logo]"
```

---

# 🏆 **9. Success Criteria**

## **Minimum Viable Product (Top 30 - $100)**
- [ ] Working faucet
- [ ] Game creation and joining
- [ ] Basic gameplay (5 questions)
- [ ] Prize distribution
- [ ] Deployed and accessible
- [ ] Demo video

## **Competitive Product (Top 6 - $500)**
- [ ] Everything in MVP
- [ ] **+ Prediction market feature**
- [ ] **+ Educational Celo-focused content**
- [ ] **+ MiniPay optimization**
- [ ] **+ On-chain leaderboard**
- [ ] **+ Referral system**
- [ ] **+ Polished UX (animations, loading states)**
- [ ] **+ Social sharing**
- [ ] **+ Professional demo video**
- [ ] **+ Comprehensive documentation**

---

# 🚀 **10. Final Notes**

## **Time Management:**
- Focus on **completion over perfection**
- Days 1-5: Core functionality (no shortcuts)
- Days 6-9: Differentiation (prediction market, polish)
- Days 10-11: Deployment and demo

## **Risk Mitigation:**
- If behind schedule, **skip leaderboard** (nice-to-have)
- Prediction market is **critical** - don't skip
- MiniPay compatibility is **critical** - don't skip
- Demo video is **critical** - allocate full day

## **Support Resources:**
- Celo Discord: https://discord.gg/celo
- Wagmi Docs: https://wagmi.sh
- RainbowKit Docs: https://rainbowkit.com
- Foundry Book: https://book.getfoundry.sh

## **Judging Reminder:**
Your project will be judged on:
1. **Innovation** (25%) - Prediction market hybrid + educational focus
2. **Impact** (25%) - Real educational value for Celo onboarding
3. **Technical Depth** (20%) - 3 smart contracts + advanced features
4. **User Experience** (20%) - Mobile-first, smooth, polished
5. **Documentation** (10%) - Clear setup guide + demo video

---

**You've got this! Build something amazing! 🚀**

---

*Last Updated: November 19, 2024*
*Target: Celo MiniPay Hackathon (Deadline: November 30, 2024)*
