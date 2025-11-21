# 🚀 TriviaGameV2Simple - Quick Start Guide

## ✨ What Changed?

Instead of manually creating games, the new contract:

✅ **Stores questions on-chain** - All trivia questions in the smart contract  
✅ **Random question selection** - Each player gets 5 random questions  
✅ **Automatic game management** - New games start automatically  
✅ **On-chain scoring** - Contract validates answers and calculates scores  
✅ **Fair ranking** - Sorted by score, then completion time  
✅ **Continuous gameplay** - No downtime between games  

---

## 🎯 Quick Deploy (3 Steps)

### Step 1: Deploy Contract

```bash
cd contracts

# Deploy
forge script script/DeployTriviaGameV2Simple.s.sol:DeployTriviaGameV2Simple \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast \
  --verify

# Save the address
export TRIVIA_GAME_V2_ADDRESS=<your_deployed_address>
```

### Step 2: Add Questions

```bash
# Add 15 Celo trivia questions
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

### Step 3: Update Frontend

Update `frontend/.env.local`:
```env
NEXT_PUBLIC_TRIVIA_GAME_ADDRESS=<your_deployed_address>
```

**Done! Your game is ready! 🎉**

---

## 🎮 How It Works

### Player Journey

1. **Join Game** (`joinGame()`)
   - Pay 0.1 cUSD entry fee
   - Contract assigns 5 random questions
   - Timer starts (2.5 minutes)

2. **Get Questions** (`getPlayerQuestions()`)
   - Frontend fetches assigned question IDs
   - Loads question details (text, options, category)
   - Shows questions to player

3. **Answer Questions** (`submitAnswers([0,1,2,3,0])`)
   - Player submits answers (0-3 for each question)
   - Contract calculates score on-chain
   - Stores completion time

4. **Win Prizes** (automatic)
   - When all players finish, game completes
   - Top 3 get prizes: 80%, 15%, 5%
   - New game starts immediately

---

## 📝 Key Functions

### For Players

```solidity
// Join current game (costs 0.1 cUSD)
function joinGame() external

// Get your assigned question IDs
function getPlayerQuestions(address player) 
    external view returns (uint256[])

// Get question details (without showing answer!)
function getQuestion(uint256 questionId) 
    external view returns (
        string memory questionText,
        string[4] memory options,
        string memory category
    )

// Submit your answers (array of 0-3)
function submitAnswers(uint8[] calldata answers) external

// Check your session status
function getPlayerSession(address player) 
    external view returns (
        uint256[] memory questionIds,
        uint8[] memory answers,
        uint8 score,
        uint256 startTime,
        uint256 endTime,
        bool completed
    )

// Get current game info
function getCurrentGameInfo() 
    external view returns (
        uint256 gameId,
        GameState state,
        uint256 prizePool,
        uint256 playerCount,
        uint256 maxPlayers
    )
```

### For Owner

```solidity
// Add single question
function addQuestion(
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,
    string memory category
) external onlyOwner

// Add multiple questions (gas efficient)
function addQuestions(
    string[] memory questionTexts,
    string[4][] memory options,
    uint8[] memory correctAnswers,
    string[] memory categories
) external onlyOwner

// Force complete stuck game
function forceCompleteGame() external onlyOwner
```

---

## 🧪 Testing Commands

### Check Questions

```bash
# Get question count
cast call $TRIVIA_GAME_V2_ADDRESS \
  "getQuestionCount()" \
  --rpc-url https://alfajores-forno.celo-testnet.org

# Get question details (question ID 0)
cast call $TRIVIA_GAME_V2_ADDRESS \
  "getQuestion(uint256)" 0 \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

### Join Game

```bash
# Approve cUSD
cast send 0x765DE816845861e75A25fCA122bb6898B8B1282a \
  "approve(address,uint256)" \
  $TRIVIA_GAME_V2_ADDRESS \
  100000000000000000 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# Join game
cast send $TRIVIA_GAME_V2_ADDRESS \
  "joinGame()" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

### Get Your Questions

```bash
cast call $TRIVIA_GAME_V2_ADDRESS \
  "getPlayerQuestions(address)" \
  $YOUR_ADDRESS \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

### Submit Answers

```bash
# Example: answers [0,1,2,3,0] for 5 questions
cast send $TRIVIA_GAME_V2_ADDRESS \
  "submitAnswers(uint8[])" \
  "[0,1,2,3,0]" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

---

## 🎨 Frontend Integration Example

```typescript
// hooks/useTriviaGameV2.ts
import { useContractRead, useContractWrite } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';

export function useTriviaGameV2() {
  const { address } = useAccount();
  
  // Get current game info
  const { data: gameInfo } = useContractRead({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'getCurrentGameInfo',
  });
  
  // Join game
  const { write: joinGame, isLoading: joining } = useContractWrite({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'joinGame',
  });
  
  // Get player's questions
  const { data: questionIds } = useContractRead({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'getPlayerQuestions',
    args: [address],
    enabled: !!address,
  });
  
  // Submit answers
  const { write: submitAnswers } = useContractWrite({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'submitAnswers',
  });
  
  return {
    gameInfo,
    joinGame,
    joining,
    questionIds,
    submitAnswers,
  };
}
```

---

## 📊 Game Economics

| Parameter | Value |
|-----------|-------|
| Entry Fee | 0.1 cUSD |
| 1st Place | 80% of pool |
| 2nd Place | 15% of pool |
| 3rd Place | 5% of pool |
| Max Players | 10 |
| Questions | 5 random |
| Time Limit | 2.5 minutes |

**Example:** 10 players = 1 cUSD pool
- 1st: 0.8 cUSD
- 2nd: 0.15 cUSD
- 3rd: 0.05 cUSD

---

## 🔐 Security Features

✅ **ReentrancyGuard** - Prevents reentrancy attacks  
✅ **Access Control** - Only owner can add questions  
✅ **Time Limits** - Enforced by contract  
✅ **On-Chain Validation** - All answers validated on-chain  
✅ **Pseudo-Random** - Uses block data for randomness  

---

## 🆚 Comparison: Old vs New

| Feature | Old Contract | New Contract |
|---------|-------------|--------------|
| Game Creation | Manual by owner | Automatic |
| Questions | Off-chain | On-chain |
| Question Selection | Frontend | Smart contract (random) |
| Answer Validation | Off-chain | On-chain |
| Scoring | Off-chain | On-chain |
| Game Flow | Manual start/end | Automatic |
| Randomness | None | Pseudo-random |

---

## 🚀 Deployment Checklist

- [ ] Deploy TriviaGameV2Simple contract
- [ ] Verify contract on Celoscan
- [ ] Add initial questions (15 provided)
- [ ] Test joining game
- [ ] Test getting questions
- [ ] Test submitting answers
- [ ] Update frontend contract address
- [ ] Update frontend to use new functions
- [ ] Test complete game flow
- [ ] Deploy frontend

---

## 📞 Troubleshooting

### "Not enough questions"
- Add at least 5 questions to the contract
- Run the AddQuestions script

### "Already joined"
- Each address can only join once per game
- Wait for game to complete or use different address

### "Time expired"
- You have 2.5 minutes from when questions are assigned
- Submit answers faster or join a new game

### "Questions not assigned yet"
- Questions are assigned immediately when you join
- Check `getPlayerQuestions()` to verify

### "Game not accepting players"
- Current game might be full or completed
- New game starts automatically after completion

---

## 🎯 Next Steps

1. ✅ Deploy contract
2. ✅ Add questions
3. ✅ Test with multiple accounts
4. ✅ Update frontend
5. ✅ Add more questions over time
6. ✅ Monitor game sessions
7. ✅ Collect feedback

---

## 📚 Additional Resources

- **Full Guide:** `TRIVIA_GAME_V2_GUIDE.md`
- **Contract Code:** `contracts/src/TriviaGameV2Simple.sol`
- **Questions Script:** `contracts/script/AddQuestions.s.sol`
- **Deploy Script:** `contracts/script/DeployTriviaGameV2Simple.s.sol`

---

**Your trivia game is now fully automated and on-chain! 🎉**

No more manual game creation - just deploy, add questions, and let players enjoy! 🚀
