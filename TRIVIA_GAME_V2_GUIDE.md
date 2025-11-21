# 🎮 TriviaGameV2 - Deployment & Setup Guide

## 🌟 New Features

TriviaGameV2 is a complete redesign with:

✅ **On-Chain Questions** - All questions stored on the blockchain  
✅ **Chainlink VRF** - Provably random question selection  
✅ **Automatic Game Management** - No manual game creation needed  
✅ **On-Chain Answer Validation** - Scores calculated by smart contract  
✅ **Continuous Games** - New game starts automatically after completion  
✅ **Fair Ranking** - Sorted by score, then by completion time  

---

## 📋 Prerequisites

### 1. Chainlink VRF Setup

**Important:** Celo doesn't have native Chainlink VRF support yet. You have two options:

#### Option A: Use Chainlink VRF on Celo (If Available)
1. Get VRF Coordinator address for Celo Alfajores
2. Create a VRF subscription at https://vrf.chain.link
3. Fund your subscription with LINK tokens
4. Get your subscription ID and key hash

#### Option B: Use Alternative Randomness (Simpler for MVP)
For MVP/testing, you can modify the contract to use block hash-based randomness instead of Chainlink VRF. See "Alternative Randomness" section below.

---

## 🚀 Deployment Steps

### Step 1: Update VRF Configuration

Edit `contracts/script/DeployTriviaGameV2.s.sol`:

```solidity
// Update these values:
address constant VRF_COORDINATOR = 0xYourVRFCoordinatorAddress;
uint64 constant SUBSCRIPTION_ID = YourSubscriptionID;
bytes32 constant KEY_HASH = 0xYourKeyHash;
```

### Step 2: Deploy Contract

```bash
cd contracts

# Deploy TriviaGameV2
forge script script/DeployTriviaGameV2.s.sol:DeployTriviaGameV2 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast \
  --verify

# Save the deployed address
export TRIVIA_GAME_V2_ADDRESS=<deployed_address>
```

### Step 3: Add Questions

```bash
# Add initial questions
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

### Step 4: Add Contract to VRF Subscription

1. Go to https://vrf.chain.link
2. Find your subscription
3. Add your deployed contract address as a consumer

---

## 🎯 How It Works

### User Flow

1. **Join Game**
   - User calls `joinGame()`
   - Pays 0.1 cUSD entry fee
   - Contract requests random numbers from Chainlink VRF
   
2. **Get Questions**
   - Chainlink VRF returns random numbers
   - Contract assigns 5 random questions to user
   - Frontend fetches questions using `getPlayerQuestions()`
   
3. **Answer Questions**
   - User has 2.5 minutes to answer
   - Submits answers via `submitAnswers([0,1,2,3,0])`
   - Contract calculates score on-chain
   
4. **Win Prizes**
   - When all players finish, game auto-completes
   - Top 3 players get prizes (80%, 15%, 5%)
   - New game starts automatically

---

## 📝 Contract Functions

### For Players

```solidity
// Join current game
function joinGame() external

// Get your assigned questions
function getPlayerQuestions(address player) external view returns (uint256[])

// Get question details (without answer!)
function getQuestion(uint256 questionId) external view returns (
    string memory questionText,
    string[4] memory options,
    string memory category
)

// Submit your answers (0-3 for each question)
function submitAnswers(uint8[] calldata answers) external

// Check your session
function getPlayerSession(address player) external view returns (
    uint256[] memory questionIds,
    uint8[] memory answers,
    uint8 score,
    uint256 startTime,
    uint256 endTime,
    bool completed
)

// Get current game info
function getCurrentGameInfo() external view returns (
    uint256 gameId,
    GameState state,
    uint256 prizePool,
    uint256 playerCount,
    uint256 maxPlayers
)
```

### For Owner

```solidity
// Add new question
function addQuestion(
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,
    string memory category
) external onlyOwner

// Update existing question
function updateQuestion(
    uint256 questionId,
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,
    bool isActive
) external onlyOwner
```

---

## 🔄 Alternative Randomness (Without Chainlink VRF)

If Chainlink VRF isn't available on Celo, you can use this simpler version:

### Modified Contract (Pseudo-Random)

Replace the VRF parts with:

```solidity
// Remove VRF inheritance and constructor params
// Add this function instead:

function _assignRandomQuestions(address _player) internal {
    Game storage game = games[currentGameId];
    PlayerSession storage session = game.sessions[_player];
    
    uint256[] memory selectedQuestions = new uint256[](QUESTIONS_PER_GAME);
    uint256 activeQuestionCount = _getActiveQuestionCount();
    
    // Use block hash for randomness (not production-grade but works for MVP)
    bytes32 randomHash = keccak256(abi.encodePacked(
        block.timestamp,
        block.prevrandao,
        _player,
        game.players.length
    ));
    
    for (uint256 i = 0; i < QUESTIONS_PER_GAME; i++) {
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(randomHash, i))) % activeQuestionCount;
        uint256 questionId = _getActiveQuestionAtIndex(randomIndex);
        selectedQuestions[i] = questionId;
    }
    
    session.player = _player;
    session.questionIds = selectedQuestions;
    session.startTime = block.timestamp;
    
    emit QuestionsAssigned(currentGameId, _player, selectedQuestions);
}

// Call this in joinGame() instead of _requestRandomQuestions
function joinGame() external nonReentrant {
    // ... existing checks ...
    
    game.players.push(msg.sender);
    game.hasJoined[msg.sender] = true;
    game.prizePool += ENTRY_FEE;
    
    emit PlayerJoined(currentGameId, msg.sender);
    
    // Assign questions immediately (no VRF needed)
    _assignRandomQuestions(msg.sender);
}
```

---

## 🧪 Testing

### Test Question Addition

```bash
cast call $TRIVIA_GAME_V2_ADDRESS \
  "getQuestionCount()" \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

### Test Joining Game

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

---

## 🎨 Frontend Integration

### Update Contract Config

```typescript
// frontend/src/config/contracts.ts
export const CONTRACTS = {
  triviaGameV2: {
    address: 'YOUR_DEPLOYED_ADDRESS' as `0x${string}`,
    abi: TRIVIA_GAME_V2_ABI, // Import from compiled contract
  },
  // ... other contracts
}
```

### Create Hooks

```typescript
// frontend/src/hooks/useTriviaGameV2.ts
export function useTriviaGameV2() {
  // Join game
  const { write: joinGame } = useContractWrite({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'joinGame',
  });
  
  // Get questions
  const { data: questions } = useContractRead({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'getPlayerQuestions',
    args: [address],
  });
  
  // Submit answers
  const { write: submitAnswers } = useContractWrite({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'submitAnswers',
  });
  
  return { joinGame, questions, submitAnswers };
}
```

---

## 📊 Game Economics

- **Entry Fee:** 0.1 cUSD
- **Prize Distribution:**
  - 1st Place: 80% of prize pool
  - 2nd Place: 15% of prize pool
  - 3rd Place: 5% of prize pool
- **Max Players:** 10 per game
- **Time Limit:** 2.5 minutes (150 seconds)
- **Questions:** 5 random questions per player

---

## 🔐 Security Considerations

1. **Randomness:** Chainlink VRF provides verifiable randomness
2. **Answer Validation:** All validation happens on-chain
3. **Time Limits:** Enforced by smart contract
4. **Reentrancy Protection:** ReentrancyGuard on all state-changing functions
5. **Access Control:** Only owner can add/update questions

---

## 🚀 Next Steps

1. ✅ Deploy TriviaGameV2 contract
2. ✅ Add initial questions (15 provided)
3. ✅ Update frontend to use new contract
4. ✅ Test complete flow
5. ✅ Add more questions over time
6. ✅ Monitor game sessions
7. ✅ Collect user feedback

---

## 📞 Support

If you encounter issues:
1. Check contract is deployed correctly
2. Verify VRF subscription is funded
3. Ensure questions are added
4. Check user has cUSD for entry fee
5. Verify cUSD approval

---

**This new design eliminates the need for manual game creation and provides a fully automated, fair, and transparent trivia experience! 🎉**
