# 🏆 TriviaLeaderboard - Complete Guide

## 🌟 New Game Flow

### Before (Round-Based)
- Wait for 10 players to join
- Play together in a round
- Game ends, wait for next round
- Limited gameplay opportunities

### After (Continuous Leaderboard) ✅
- **Play anytime** - No waiting for others
- **Unlimited games** - Play as much as you want
- **Climb the leaderboard** - Compete for top 100
- **Weekly rewards** - Top 10 players get cUSD prizes
- **Username system** - Build your reputation

---

## 🎮 How It Works

### 1. Register Username (One-Time)
```
Player → registerUsername("CoolPlayer123")
```
- Required before playing
- 3-20 characters
- Alphanumeric + underscore only
- Unique across all players
- Can update later (costs 0.01 cUSD)

### 2. Start Game (Anytime)
```
Player → startGame() → Pay 0.1 cUSD
```
- Get 10 random questions
- Timer starts (5 minutes)
- 90% of fee goes to reward pool
- 10% for contract maintenance

### 3. Answer Questions
```
Player → submitAnswers([0,1,2,3,0,1,2,3,0,1])
```
- Submit within 5 minutes
- Score = (Correct × 10) + Speed Bonus
- Speed Bonus: 0-5 points (faster = more)
- Stats updated automatically

### 4. Climb Leaderboard
```
Automatic after each game
```
- Leaderboard updates in real-time
- Top 100 players shown
- Ranked by total score
- Your rank visible anytime

### 5. Weekly Rewards
```
Owner → distributeRewards() (every 7 days)
```
- Top 10 players get rewards
- Prizes from accumulated pool
- Distribution: 40%, 25%, 15%, 10%, 5%, 2.5%, 1%, 0.5%, 0.5%, 0.5%

---

## 📊 Scoring System

### Base Points
- **Correct Answer:** 10 points
- **Wrong Answer:** 0 points
- **Perfect Game:** 100 points (10 × 10)

### Speed Bonus
- **Instant (0 sec):** +5 points
- **Mid-time (150 sec):** +2.5 points
- **Time limit (300 sec):** +0 points
- **Formula:** `(timeRemaining / timeLimit) × 5`

### Example Scores
| Correct | Time | Base | Bonus | Total |
|---------|------|------|-------|-------|
| 10/10 | 60s | 100 | 4 | **104** |
| 10/10 | 180s | 100 | 2 | **102** |
| 8/10 | 90s | 80 | 3.5 | **83.5** |
| 5/10 | 240s | 50 | 1 | **51** |

---

## 🏆 Leaderboard & Rewards

### Leaderboard
- **Size:** Top 100 players
- **Ranking:** By total score (all games combined)
- **Updates:** Real-time after each game
- **Visibility:** Public, anyone can view

### Weekly Rewards (Top 10)
| Rank | Percentage | Example (100 cUSD pool) |
|------|-----------|------------------------|
| 1st | 40% | 40 cUSD |
| 2nd | 25% | 25 cUSD |
| 3rd | 15% | 15 cUSD |
| 4th | 10% | 10 cUSD |
| 5th | 5% | 5 cUSD |
| 6th | 2.5% | 2.5 cUSD |
| 7th | 1% | 1 cUSD |
| 8th | 0.5% | 0.5 cUSD |
| 9th | 0.5% | 0.5 cUSD |
| 10th | 0.5% | 0.5 cUSD |

### Reward Pool Growth
- **Play Fee:** 0.1 cUSD per game
- **To Pool:** 90% (0.09 cUSD)
- **Example:** 1000 games = 90 cUSD pool
- **Distribution:** Every 7 days

---

## 📝 Smart Contract Functions

### Player Functions

```solidity
// Register username (required once)
function registerUsername(string memory username) external

// Update username (costs 0.01 cUSD)
function updateUsername(string memory newUsername) external

// Start a new game (costs 0.1 cUSD)
function startGame() external returns (uint256 sessionId)

// Submit answers
function submitAnswers(uint256 sessionId, uint8[] calldata answers) external
```

### View Functions

```solidity
// Get player info
function getPlayerInfo(address player) external view returns (
    string memory username,
    uint256 totalScore,
    uint256 gamesPlayed,
    uint256 correctAnswers,
    uint256 totalQuestions,
    uint256 bestScore,
    uint256 rank
)

// Get leaderboard
function getLeaderboard(uint256 count) external view returns (
    address[] memory addresses,
    string[] memory usernames,
    uint256[] memory scores
)

// Get session details
function getSession(address player, uint256 sessionId) external view returns (
    uint256[] memory questionIds,
    uint8[] memory answers,
    uint8 correctCount,
    uint256 score,
    uint256 startTime,
    uint256 endTime,
    bool completed
)

// Check username availability
function isUsernameAvailable(string memory username) external view returns (bool)
```

### Owner Functions

```solidity
// Add question
function addQuestion(
    string memory questionText,
    string[4] memory options,
    uint8 correctAnswer,
    string memory category
) external onlyOwner

// Batch add questions
function addQuestions(...) external onlyOwner

// Update question
function updateQuestion(...) external onlyOwner

// Distribute weekly rewards
function distributeRewards() external onlyOwner
```

---

## 🚀 Deployment

### Step 1: Deploy Contract

```bash
cd contracts

forge script script/DeployTriviaLeaderboard.s.sol:DeployTriviaLeaderboard \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast \
  --verify

export TRIVIA_LEADERBOARD_ADDRESS=<deployed_address>
```

### Step 2: Add Questions

```bash
# Add at least 10 questions
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

### Step 3: Test Flow

```bash
# 1. Register username
cast send $TRIVIA_LEADERBOARD_ADDRESS \
  "registerUsername(string)" \
  "TestPlayer" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# 2. Approve cUSD
cast send 0x765DE816845861e75A25fCA122bb6898B8B1282a \
  "approve(address,uint256)" \
  $TRIVIA_LEADERBOARD_ADDRESS \
  1000000000000000000 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# 3. Start game
cast send $TRIVIA_LEADERBOARD_ADDRESS \
  "startGame()" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# 4. Get questions
cast call $TRIVIA_LEADERBOARD_ADDRESS \
  "getSession(address,uint256)" \
  $YOUR_ADDRESS 0 \
  --rpc-url https://alfajores-forno.celo-testnet.org

# 5. Submit answers
cast send $TRIVIA_LEADERBOARD_ADDRESS \
  "submitAnswers(uint256,uint8[])" \
  0 "[0,1,2,3,0,1,2,3,0,1]" \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# 6. Check leaderboard
cast call $TRIVIA_LEADERBOARD_ADDRESS \
  "getLeaderboard(uint256)" 10 \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

---

## 🎨 Frontend Integration

### Register Username

```typescript
const { write: registerUsername } = useContractWrite({
  address: CONTRACTS.triviaLeaderboard.address,
  abi: CONTRACTS.triviaLeaderboard.abi,
  functionName: 'registerUsername',
});

// Usage
await registerUsername({ args: [username] });
```

### Start Game

```typescript
const { write: startGame } = useContractWrite({
  address: CONTRACTS.triviaLeaderboard.address,
  abi: CONTRACTS.triviaLeaderboard.abi,
  functionName: 'startGame',
});

// Usage
const tx = await startGame();
// Get sessionId from event or transaction receipt
```

### Get Leaderboard

```typescript
const { data: leaderboard } = useContractRead({
  address: CONTRACTS.triviaLeaderboard.address,
  abi: CONTRACTS.triviaLeaderboard.abi,
  functionName: 'getLeaderboard',
  args: [10], // Top 10
  watch: true, // Real-time updates
});
```

### Get Player Stats

```typescript
const { data: playerInfo } = useContractRead({
  address: CONTRACTS.triviaLeaderboard.address,
  abi: CONTRACTS.triviaLeaderboard.abi,
  functionName: 'getPlayerInfo',
  args: [address],
  watch: true,
});

// playerInfo = [username, totalScore, gamesPlayed, correctAnswers, totalQuestions, bestScore, rank]
```

---

## 📱 UI Components Needed

### 1. Username Registration Page
- Input field for username
- Validation (3-20 chars, alphanumeric + _)
- Check availability
- Register button

### 2. Leaderboard Page
- Top 100 players table
- Columns: Rank, Username, Score, Games Played
- Highlight current user
- Real-time updates

### 3. Game Page
- 10 questions display
- Timer (5 minutes countdown)
- Answer selection
- Submit button
- Score display after completion

### 4. Profile Page
- Username
- Total score
- Games played
- Accuracy rate
- Best score
- Current rank
- Game history

### 5. Home/Dashboard
- Quick stats
- Current rank
- Play button
- Leaderboard preview (top 10)
- Reward pool size
- Next reward distribution

---

## 🔐 Security Features

✅ **Username Validation** - Prevents invalid characters  
✅ **Unique Usernames** - No duplicates allowed  
✅ **ReentrancyGuard** - Prevents reentrancy attacks  
✅ **Owner-Only** - Question management restricted  
✅ **Time Limits** - Enforced by contract  
✅ **On-Chain Scoring** - Tamper-proof  

---

## 💡 Game Strategy Tips

### For Players

1. **Play Regularly** - More games = more total score
2. **Answer Quickly** - Speed bonus can make a difference
3. **Accuracy Matters** - 10 points per correct answer
4. **Aim for Top 10** - Weekly rewards are significant
5. **Track Your Rank** - Monitor progress

### For Growth

1. **Add More Questions** - Better variety
2. **Promote Leaderboard** - Competitive spirit
3. **Weekly Highlights** - Announce winners
4. **Social Features** - Share scores
5. **Tournaments** - Special events

---

## 📊 Analytics to Track

- Total players registered
- Total games played
- Average score per game
- Reward pool size
- Top player streaks
- Most active players
- Question difficulty (by accuracy rate)

---

## 🚀 Launch Checklist

- [ ] Deploy TriviaLeaderboard contract
- [ ] Verify on Celoscan
- [ ] Add 20+ questions
- [ ] Test username registration
- [ ] Test game flow
- [ ] Test leaderboard updates
- [ ] Build frontend UI
- [ ] Test on mobile
- [ ] Create promotional materials
- [ ] Launch!

---

**Your trivia game is now a continuous, competitive experience with leaderboards and rewards! 🎉**
