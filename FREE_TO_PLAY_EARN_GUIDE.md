# 🎮 Free-to-Play, Earn CELO - Complete Guide

## ✨ New Model: Play for FREE, Earn CELO!

### Before (Pay-to-Play)
- ❌ Pay 0.1 cUSD to play
- ❌ Barrier to entry
- ❌ Limited accessibility

### After (Free-to-Play, Earn) ✅
- ✅ **100% FREE** - No payment required
- ✅ **Earn CELO/cUSD** - Get paid for playing
- ✅ **Instant rewards** - Paid immediately after each game
- ✅ **MiniPay integration** - Seamless mobile experience
- ✅ **Weekly bonuses** - Top 10 players get extra rewards

---

## 💰 Earning Structure

### Instant Rewards (Paid After Each Game)

| Performance | Reward | Example |
|-------------|--------|---------|
| **Per Correct Answer** | 0.01 cUSD | 7/10 = 0.07 cUSD |
| **Perfect Score Bonus** | 0.05 cUSD | 10/10 = extra 0.05 cUSD |
| **Speed Bonus** | Up to 0.02 cUSD | Fast completion = more |

### Example Earnings

#### Scenario 1: Average Player
- **Score:** 7/10 correct
- **Time:** 4 minutes
- **Earnings:**
  - Base: 7 × 0.01 = 0.07 cUSD
  - Speed: ~0.01 cUSD
  - **Total: ~0.08 cUSD**

#### Scenario 2: Good Player
- **Score:** 9/10 correct
- **Time:** 3 minutes
- **Earnings:**
  - Base: 9 × 0.01 = 0.09 cUSD
  - Speed: ~0.015 cUSD
  - **Total: ~0.105 cUSD**

#### Scenario 3: Perfect Player
- **Score:** 10/10 correct
- **Time:** 2 minutes
- **Earnings:**
  - Base: 10 × 0.01 = 0.10 cUSD
  - Perfect Bonus: 0.05 cUSD
  - Speed: ~0.02 cUSD
  - **Total: ~0.17 cUSD** 🎉

### Weekly Rewards (Top 10 Leaderboard)

Additional rewards for top performers:
- 1st: 40% of weekly pool
- 2nd: 25%
- 3rd: 15%
- 4th: 10%
- 5th: 5%
- 6th-10th: 2.5%, 1%, 0.5%, 0.5%, 0.5%

---

## 🎮 How It Works

### 1. Register Username (Free, One-Time)
```
registerUsername("YourUsername")
```
- No payment required
- 3-20 characters
- Alphanumeric + underscore

### 2. Start Game (Free!)
```
startGame()
```
- **No payment required!**
- Get 10 random questions via Chainlink VRF
- Timer starts (5 minutes)

### 3. Answer Questions
```
submitAnswers(sessionId, [0,1,2,3,0,1,2,3,0,1])
```
- Answer within 5 minutes
- Faster = more speed bonus

### 4. Get Paid Instantly!
```
Automatic payment after submission
```
- Rewards sent to your wallet immediately
- No waiting, no claiming needed
- Visible in MiniPay instantly

### 5. Climb Leaderboard
```
Automatic ranking update
```
- Compete for top 100
- Top 10 get weekly bonuses

---

## 📱 MiniPay Integration

### Why MiniPay?

✅ **Mobile-First** - Perfect for on-the-go gaming  
✅ **Instant Payments** - See earnings immediately  
✅ **Stablecoin Support** - cUSD rewards  
✅ **Easy Onboarding** - Google account + phone number  
✅ **No Gas Fees** - Fee abstraction built-in  

### Setup MiniPay

1. **Install MiniPay**
   - [Android](https://play.google.com/store/apps/details?id=com.opera.minipay)
   - [iOS](https://apps.apple.com/de/app/minipay-easy-global-wallet/id6504087257?l=en-GB)

2. **Create Account**
   - Sign up with Google
   - Verify phone number

3. **Enable Testnet** (for testing)
   - Settings → About → Tap Version 7 times
   - Developer Settings → Use Testnet

4. **Play & Earn!**
   - Open trivia game in MiniPay
   - Play for free
   - Earn cUSD instantly

---

## 🔧 Smart Contract Changes

### Removed
- ❌ `PLAY_FEE` - No more payment required
- ❌ Payment check in `startGame()`
- ❌ Fee collection logic

### Added
- ✅ `REWARD_PER_CORRECT_ANSWER` - 0.01 cUSD
- ✅ `PERFECT_SCORE_BONUS` - 0.05 cUSD
- ✅ `SPEED_BONUS_REWARD` - Up to 0.02 cUSD
- ✅ `_calculateReward()` - Reward calculation
- ✅ `fundRewards()` - Owner funds contract
- ✅ `getContractBalance()` - Monitor funds
- ✅ `emergencyWithdraw()` - Safety function

### Updated
- 🔄 `startGame()` - Now free, no payment
- 🔄 `submitAnswers()` - Pays rewards instantly
- 🔄 `weeklyRewardPool` - Renamed from `rewardPool`

---

## 💡 Economics & Sustainability

### Funding the Rewards

The contract owner needs to fund the contract with cUSD:

```solidity
// Owner funds contract with 100 cUSD
fundRewards(100 * 10**18)
```

### Reward Calculation

```
Per Game Reward = 
  (Correct × 0.01) + 
  (Perfect Bonus: 0.05 if 10/10) + 
  (Speed Bonus: up to 0.02)

Max per game: 0.17 cUSD
Min per game: 0 cUSD (0/10 correct)
Average: ~0.08 cUSD (7/10 correct)
```

### Funding Requirements

**Example: 1000 games/week**
- Average reward: 0.08 cUSD
- Total needed: 80 cUSD
- Weekly bonus pool: 20 cUSD
- **Total funding: ~100 cUSD/week**

### Revenue Sources (Optional)

To sustain the model, consider:
1. **Sponsorships** - Brands sponsor questions
2. **Ads** - Optional ads between games
3. **Premium Features** - Cosmetics, badges
4. **Grants** - Celo ecosystem grants
5. **Donations** - Community support

---

## 🚀 Deployment

### Step 1: Deploy Contract

```bash
cd contracts

forge script script/DeployTriviaGameV2.s.sol:DeployTriviaGameV2 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

### Step 2: Fund Contract

```bash
# Approve cUSD
cast send 0x765DE816845861e75A25fCA122bb6898B8B1282a \
  "approve(address,uint256)" \
  $CONTRACT_ADDRESS \
  100000000000000000000 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY

# Fund with 100 cUSD
cast send $CONTRACT_ADDRESS \
  "fundRewards(uint256)" \
  100000000000000000000 \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --private-key $PRIVATE_KEY
```

### Step 3: Add Questions

```bash
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast
```

### Step 4: Test in MiniPay

1. Enable developer mode in MiniPay
2. Load your app URL
3. Register username
4. Play for free
5. Earn cUSD!

---

## 📱 Frontend Integration

### Hide "Connect Wallet" in MiniPay

```typescript
useEffect(() => {
  if (window.ethereum && window.ethereum.isMiniPay) {
    setHideConnectBtn(true);
    connect({ connector: injected({ target: "metaMask" }) });
  }
}, []);
```

### Show Earnings After Game

```typescript
const { data: session } = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: ABI,
  functionName: 'getSession',
  args: [address, sessionId],
});

// Calculate reward
const reward = calculateReward(
  session.correctCount,
  session.score
);

// Show to user
<div>
  You earned: {formatEther(reward)} cUSD! 🎉
</div>
```

### Real-Time Balance Updates

```typescript
const { data: balance } = useBalance({
  address: address,
  token: cUSD_ADDRESS,
  watch: true, // Real-time updates
});
```

---

## 🎯 User Experience Flow

### First-Time User

1. **Open App in MiniPay**
   - No wallet connection needed
   - Automatic detection

2. **Register Username**
   - Free, one-time
   - Choose unique name

3. **Start First Game**
   - No payment required
   - Get 10 questions

4. **Answer Questions**
   - 5 minutes to complete
   - Try to be fast for bonus

5. **Get Paid!**
   - Instant cUSD to wallet
   - See balance in MiniPay
   - Play again immediately

### Returning User

1. **Open App**
   - Already registered
   - See stats & rank

2. **Play Game**
   - One tap to start
   - Free every time

3. **Earn More**
   - Accumulate earnings
   - Climb leaderboard
   - Compete for weekly bonus

---

## 📊 Monitoring & Management

### Check Contract Balance

```bash
cast call $CONTRACT_ADDRESS \
  "getContractBalance()" \
  --rpc-url https://alfajores-forno.celo-testnet.org
```

### Monitor Reward Distribution

```typescript
// Track total rewards paid
const totalRewardsPaid = sessions.reduce((sum, session) => {
  return sum + calculateReward(session.correctCount, session.score);
}, 0);
```

### Refill When Low

```bash
# Check balance
balance=$(cast call $CONTRACT_ADDRESS "getContractBalance()")

# If low, refill
if [ $balance -lt 10000000000000000000 ]; then
  cast send $CONTRACT_ADDRESS "fundRewards(uint256)" 50000000000000000000
fi
```

---

## 🔐 Security

✅ **No User Payments** - No risk of losing money  
✅ **Instant Rewards** - Automatic, no claiming  
✅ **Owner-Funded** - Contract must be funded  
✅ **Emergency Withdraw** - Owner can recover funds  
✅ **ReentrancyGuard** - Protected transfers  
✅ **Chainlink VRF** - Fair randomness  

---

## 🎉 Benefits

### For Players
- ✅ **100% Free** - No barrier to entry
- ✅ **Earn Money** - Get paid to play
- ✅ **Instant Payouts** - No waiting
- ✅ **Mobile-Friendly** - MiniPay integration
- ✅ **Fair & Fun** - Skill-based rewards

### For Platform
- ✅ **Mass Adoption** - No payment barrier
- ✅ **High Engagement** - Play-to-earn model
- ✅ **Viral Growth** - Easy to share
- ✅ **MiniPay Ecosystem** - Celo integration
- ✅ **Sustainable** - Multiple revenue options

---

## 📋 Checklist

- [ ] Deploy TriviaGameV2 contract
- [ ] Add to Chainlink VRF subscription
- [ ] Fund contract with cUSD (100+ recommended)
- [ ] Add 10+ questions
- [ ] Test in MiniPay developer mode
- [ ] Verify instant rewards work
- [ ] Test on actual mobile device
- [ ] Monitor contract balance
- [ ] Set up refill alerts
- [ ] Launch!

---

**Your trivia game is now FREE to play with instant CELO/cUSD earnings! 🎮💰**

Players can earn while learning about Celo, with seamless MiniPay integration for the best mobile experience!
