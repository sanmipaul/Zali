
# **CeloTrivia – Web3 Mobile Trivia Game**

A mobile-first, tokenized trivia game built for the Celo ecosystem.
Players claim free test cUSD, join trivia rounds, answer questions, and instantly win real cUSD rewards on-chain.

---

## 📱 **Overview**

CeloTrivia is a fun, lightweight Web3 game designed to showcase:

* **Seamless MiniPay wallet integration**
* **Fast on-chain transactions**
* **Real token rewards (test cUSD)**
* **Smooth mobile gameplay**
* **Secure, simple blockchain architecture**

Players can:

1. Connect their MiniPay wallet
2. Claim **10 test cUSD** once
3. Join trivia rounds using a **0.1 cUSD entry fee**
4. Answer timed trivia questions
5. Win rewards paid automatically via smart contracts

No staking. No long setup. Just **tap → play → win**.

---

# 🚀 **Live Demo**

(Provide once deployed)

* **Frontend:** [https://yourapp.vercel.app](https://yourapp.vercel.app)
* **Celo Alfajores Contract Addresses:**

  * Faucet: `0x...`
  * TriviaGame: `0x...`
* **Demo Video:** (Link after recording)

---

# 🧠 **Features**

### 🌐 **Wallet Integration**

* Uses **MiniPay** for frictionless onboarding
* Instant balance updates
* Gasless feel (fast/cheap Celo txs)

### 💰 **One-Time Faucet Claim**

* Each player receives **10 test cUSD** once
* Enforced by smart contract
* Secure against multiple claims

### 🕹 **Trivia Gameplay**

* 3–5 timed questions per round
* Multiple-choice
* Responsive, mobile-first UI
* Questions served from backend API

### 🎁 **Reward Distribution**

* Entry fee = **0.1 cUSD**
* Prize pool = all entry fees in the round
* Winner (or top 3) receives payout automatically
* Distributed via **TriviaGame.sol**

### 🏆 **Leaderboard**

* Track top winners
* Stored in backend (optional)

### 📱 **Built for Mobile**

* Optimized UI
* Large tap targets
* Smooth animations
* Minimal steps to play

---

# 🏗 **Architecture**

## High-Level Flow

```
MiniPay Wallet → Faucet Claim → Lobby → Pay Entry Fee → Play Trivia → Off-chain Scoring → On-chain Reward Payout
```

## System Diagram

```
+------------------+      +------------------+     +----------------------+
|  Frontend (Next) | <--> | Backend (API)    | <-> | Questions Database   |
+------------------+      +------------------+     +----------------------+
         |                          |
         |                          |
         v                          v
+------------------+      +------------------+
|  Faucet.sol      |      | TriviaGame.sol   |
+------------------+      +------------------+
```

---

# 🧩 **Tech Stack**

### **Smart Contracts**

* Solidity
* Hardhat
* cUSD ERC20
* Celo Alfajores testnet

### **Frontend**

* Next.js 14 (App Router)
* React
* TypeScript
* Composer Kit

### **Backend**

* Next.js API Routes
* Storage: JSON or Supabase

---

# 📦 **Project Structure**

```
celo-trivia/
  ├── contracts/
  │    ├── Faucet.sol
  │    ├── TriviaGame.sol
  ├── frontend/
  │    ├── app/
  │    ├── components/
  │    ├── lib/
  ├── database/
  │    └── questions.json
  ├── scripts/
  ├── hardhat.config.js
  ├── README.md
```

---

# 🔐 **Smart Contracts**

### **Faucet.sol**

Provides a one-time 10 cUSD claim per user.

Key functions:

```solidity
function claim() external;
function refill(uint amount) external onlyOwner;
```

### **TriviaGame.sol**

Manages rounds, entry fees, and payouts.

Key functions:

```solidity
function joinRound(uint256 roundId) external;
function payoutWinners(uint256 roundId, address[] winners) external onlyOwner;
```

---

# 🔧 **Setup & Installation**

## 1️⃣ Clone the Repo

```bash
git clone https://github.com/yourname/celo-trivia.git
cd celo-trivia
```

## 2️⃣ Install Dependencies

### Smart Contracts

```bash
cd contracts
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# ⚙ **Environment Variables**

Create a `.env` file in `/frontend`:

```
NEXT_PUBLIC_CUSD_ADDRESS=0x...
NEXT_PUBLIC_FAUCET_ADDRESS=0x...
NEXT_PUBLIC_TRIVIA_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=44787
```

---

# 🧪 **Testing Smart Contracts**

Run Hardhat tests:

```bash
npx hardhat test
```

---

# 🚀 **Deploy Contracts**

```bash
npx hardhat run scripts/deploy_faucet.js --network alfajores
npx hardhat run scripts/deploy_trivia.js --network alfajores
```

Copy contract addresses → `/frontend/lib/contracts.ts`.

---

# 🖥 **Run Frontend Locally**

```bash
npm run dev
```

View at:

```
http://localhost:3000
```

---

# 🌐 **Deploy Frontend**

Deploy using **Vercel**:

```bash
vercel --prod
```

Add environment variables on Vercel.

---

# 📄 **API Endpoints**

### `GET /api/questions`

Returns 5 random trivia questions.

### `POST /api/session`

Receives answers, computes score, selects winner.

### `POST /api/payout`

Triggers payout via TriviaGame contract.

---

# 🧭 **Gameplay Logic**

### 1. User connects MiniPay

Balance fetched in real time.

### 2. User claims faucet

Smart contract enforces one claim only.

### 3. User enters round

0.1 cUSD deducted.

### 4. Trivia starts

Questions fetched via API.

### 5. Answers submitted

Backend calculates score.

### 6. Winner selected

Backend triggers payout.

### 7. User sees result screen

Reward info + transaction link.

---

# 🎨 **UI/UX Features**

* Mobile-first layout
* Large buttons
* Smooth animations
* Question timer
* Progress bar
* Skeleton loading states
* Toast notifications

---

# 📈 **Leaderboard (Optional)**

Track:

* Wallet address
* Wins
* Total earnings

Store in DB.

---

# 🛡 **Security Notes**

* Faucet uses strict one-claim mapping
* TriviaGame holds only prize pool funds
* Payouts owner-restricted
* No on-chain randomness
* Rates gas usage

---

# 🎥 **Demo Video Instructions**

Your 4-minute demo should include:

1. Opening the webapp in MiniPay
2. Connecting wallet
3. Claiming faucet
4. Joining a round
5. Playing trivia
6. Winning rewards
7. Showing transaction hash
8. Summarizing architecture

---

# 🏆 **Why This Project Stands Out**

* Perfect match for hackathon theme
* Fast onboarding
* Fun gameplay
* Real rewards
* Lightweight smart contracts
* Clean mobile UX
* Fully documented

---

# 🤝 **Contributing**

Feel free to fork, open issues, or submit pull requests.

---

# 📜 **License**

MIT License © 2025

---

---
