# 🎮 TriviaGameV2Simple - Updated Guide

## ✅ What's Updated

✨ **10 Questions Per Game** - Increased from 5 to 10 questions  
✨ **5 Minute Time Limit** - Increased from 2.5 to 5 minutes  
✨ **Update Questions** - Owner can now update existing questions  
✨ **Automatic Games** - No createGame function needed (automatic)  
✨ **Owner-Only Control** - Only owner can add/update questions  

---

## 🎯 Game Parameters

| Parameter | Value |
|-----------|-------|
| Questions Per Game | **10** (updated from 5) |
| Time Limit | **5 minutes** (updated from 2.5) |
| Entry Fee | 0.1 cUSD |
| Max Players | 10 |
| Prize Split | 80% / 15% / 5% |

---

## 🔐 Owner-Only Functions

### Add Single Question
```solidity
function addQuestion(
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,      // 0-3
    string memory category
) external onlyOwner
```

### Add Multiple Questions (Gas Efficient)
```solidity
function addQuestions(
    string[] memory questionTexts,
    string[4][] memory options,
    uint8[] memory correctAnswers,
    string[] memory categories
) external onlyOwner
```

### Update Existing Question
```solidity
function updateQuestion(
    uint256 questionId,
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,
    string memory category,
    bool isActive              // Enable/disable question
) external onlyOwner
```

### Force Complete Game (For Stuck Games)
```solidity
function forceCompleteGame() external onlyOwner
```

---

## 🚀 Quick Deploy

### Step 1: Deploy Contract

```bash
cd contracts

forge script script/DeployTriviaGameV2Simple.s.sol:DeployTriviaGameV2Simple \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast \
  --verify

# Save address
export TRIVIA_GAME_V2_ADDRESS=<deployed_address>
```

### Step 2: Add Questions

You need at least **10 questions** for the game to work.

```bash
# Add initial questions
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

**Note:** The AddQuestions script needs to be updated to add at least 10 questions (currently has 15, which is perfect!)

---

## 🎮 How It Works

### Player Flow

1. **Join Game**
   - Call `joinGame()`
   - Pay 0.1 cUSD
   - Get 10 random questions assigned
   - Timer starts (5 minutes)

2. **Answer Questions**
   - Frontend fetches questions via `getPlayerQuestions()`
   - Player has 5 minutes to answer all 10
   - Submit via `submitAnswers([0,1,2,3,0,1,2,3,0,1])`

3. **Get Results**
   - Contract calculates score (0-10)
   - Ranks players by score, then time
   - Top 3 get prizes when all players finish

4. **New Game Starts**
   - Automatically after current game completes
   - No manual intervention needed

---

## 📝 Example Usage

### Add a Question (Owner Only)

```bash
cast send $TRIVIA_GAME_V2_ADDRESS \
  "addQuestion(string,string[4],uint8,string)" \
  "What is Celo?" \
  '["A blockchain","A wallet","A token","A dApp"]' \
  0 \
  "Basics" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

### Update a Question (Owner Only)

```bash
cast send $TRIVIA_GAME_V2_ADDRESS \
  "updateQuestion(uint256,string,string[4],uint8,string,bool)" \
  0 \
  "What is Celo's mission?" \
  '["Fast transactions","Financial inclusion","Mining","Trading"]' \
  1 \
  "Mission" \
  true \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

### Disable a Question (Owner Only)

```bash
# Set isActive to false
cast send $TRIVIA_GAME_V2_ADDRESS \
  "updateQuestion(uint256,string,string[4],uint8,string,bool)" \
  5 \
  "Old question text" \
  '["A","B","C","D"]' \
  0 \
  "Category" \
  false \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

---

## 🧪 Testing

### Check Question Count

```bash
cast call $TRIVIA_GAME_V2_ADDRESS \
  "getQuestionCount()" \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

**Must return at least 10 (in decimal) for game to work!**

### Join Game

```bash
# 1. Approve cUSD
cast send 0x765DE816845861e75A25fCA122bb6898B8B1282a \
  "approve(address,uint256)" \
  $TRIVIA_GAME_V2_ADDRESS \
  100000000000000000 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# 2. Join
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

**Should return 10 question IDs!**

### Submit Answers

```bash
# Submit 10 answers (0-3 for each)
cast send $TRIVIA_GAME_V2_ADDRESS \
  "submitAnswers(uint8[])" \
  "[0,1,2,3,0,1,2,3,0,1]" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

---

## 📊 Game Economics

### With 10 Players

- **Total Pool:** 1 cUSD (10 × 0.1)
- **1st Place:** 0.8 cUSD (80%)
- **2nd Place:** 0.15 cUSD (15%)
- **3rd Place:** 0.05 cUSD (5%)

### Scoring

- **Perfect Score:** 10/10
- **Ranking:** By score (higher better), then time (faster better)
- **Example:** 
  - Player A: 8/10 in 3 minutes → Rank 2
  - Player B: 8/10 in 2 minutes → Rank 1 (same score, faster time)
  - Player C: 7/10 in 1 minute → Rank 3 (lower score)

---

## 🔒 Security & Access Control

### Owner-Only Functions ✅

- `addQuestion()` - Only owner
- `addQuestions()` - Only owner
- `updateQuestion()` - Only owner
- `forceCompleteGame()` - Only owner

### Public Functions ✅

- `joinGame()` - Anyone (with 0.1 cUSD)
- `submitAnswers()` - Only players who joined
- All view functions - Anyone

### Automatic Functions ✅

- `_createNewGame()` - Called automatically after game completes
- `_completeGame()` - Called automatically when all players finish
- `_assignRandomQuestions()` - Called automatically when player joins

---

## ⚠️ Important Notes

### Minimum Questions Required

- **At least 10 active questions** must exist for game to work
- Contract checks this when player tries to join
- Add more questions for better randomization

### Time Management

- **5 minutes** from when questions are assigned
- Timer starts immediately after joining
- Late submissions are rejected

### Game Lifecycle

1. Game created automatically (in constructor)
2. Players join (up to 10)
3. Each player gets 10 random questions
4. Players submit answers within 5 minutes
5. When all finish, game auto-completes
6. Prizes distributed automatically
7. New game starts automatically

**No manual intervention needed!** 🎉

---

## 🎨 Frontend Integration

### Updated Hook Example

```typescript
export function useTriviaGameV2() {
  const { address } = useAccount();
  
  // Get player's 10 questions
  const { data: questionIds } = useContractRead({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'getPlayerQuestions',
    args: [address],
  });
  
  // Load all 10 questions
  const questions = questionIds?.map(id => 
    useContractRead({
      address: CONTRACTS.triviaGameV2.address,
      abi: CONTRACTS.triviaGameV2.abi,
      functionName: 'getQuestion',
      args: [id],
    })
  );
  
  // Submit 10 answers
  const { write: submitAnswers } = useContractWrite({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'submitAnswers',
  });
  
  return { questionIds, questions, submitAnswers };
}
```

---

## 📋 Deployment Checklist

- [ ] Deploy TriviaGameV2Simple
- [ ] Verify contract on Celoscan
- [ ] Add at least 10 questions (15+ recommended)
- [ ] Test joining game
- [ ] Verify 10 questions are assigned
- [ ] Test submitting 10 answers
- [ ] Test complete game flow
- [ ] Update frontend
- [ ] Test on mobile

---

## 🚀 Next Steps

1. ✅ Deploy contract
2. ✅ Add 15+ questions (script provided)
3. ✅ Test with multiple accounts
4. ✅ Update frontend for 10 questions
5. ✅ Update UI for 5-minute timer
6. ✅ Test complete flow
7. ✅ Add more questions over time

---

## 📞 Troubleshooting

### "Not enough questions"
- Need at least 10 active questions
- Run AddQuestions script
- Check: `getQuestionCount()` returns ≥ 10

### "Invalid answer count"
- Must submit exactly 10 answers
- Array must be `[0-3, 0-3, 0-3, 0-3, 0-3, 0-3, 0-3, 0-3, 0-3, 0-3]`

### "Time expired"
- You have 5 minutes from joining
- Submit faster or join new game

### "Only owner can add questions"
- Only deployer can add/update questions
- Use correct private key

---

**Your trivia game now has 10 questions per session with 5 minutes to answer! 🎉**
