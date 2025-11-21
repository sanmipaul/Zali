# 🏆 TriviaLeaderboard - Quick Summary

## ✨ What Changed?

### Old Design (Round-Based)
- ❌ Wait for 10 players
- ❌ Fixed game rounds
- ❌ Limited play opportunities
- ❌ No persistent identity

### New Design (Leaderboard) ✅
- ✅ **Play anytime** - No waiting
- ✅ **Unlimited games** - Play as much as you want
- ✅ **Username system** - Build reputation
- ✅ **Leaderboard** - Top 100 players
- ✅ **Weekly rewards** - Top 10 get prizes
- ✅ **Continuous competition** - Always active

---

## 🎮 Player Flow

```
1. Register Username (one-time)
   ↓
2. Start Game (pay 0.1 cUSD)
   ↓
3. Answer 10 Questions (5 minutes)
   ↓
4. Get Score (points + speed bonus)
   ↓
5. Climb Leaderboard
   ↓
6. Repeat & Compete!
```

---

## 📊 Key Features

### Username System
- **Register:** 3-20 characters, alphanumeric + underscore
- **Unique:** No duplicates
- **Update:** Costs 0.01 cUSD (prevents spam)
- **Persistent:** Builds reputation

### Scoring
- **Base:** 10 points per correct answer
- **Speed Bonus:** 0-5 points (faster = more)
- **Total Score:** Accumulates across all games
- **Best Score:** Tracks personal best

### Leaderboard
- **Size:** Top 100 players
- **Ranking:** By total score
- **Real-time:** Updates after each game
- **Public:** Anyone can view

### Rewards
- **Pool:** 90% of all play fees
- **Distribution:** Weekly (every 7 days)
- **Winners:** Top 10 players
- **Split:** 40%, 25%, 15%, 10%, 5%, 2.5%, 1%, 0.5%, 0.5%, 0.5%

---

## 💰 Economics

### Per Game
- **Play Fee:** 0.1 cUSD
- **To Reward Pool:** 0.09 cUSD (90%)
- **To Contract:** 0.01 cUSD (10%)

### Example Reward Pool
- **1000 games/week:** 90 cUSD pool
- **1st place:** 36 cUSD
- **2nd place:** 22.5 cUSD
- **3rd place:** 13.5 cUSD

---

## 🚀 Quick Deploy

```bash
# 1. Deploy
forge script script/DeployTriviaLeaderboard.s.sol:DeployTriviaLeaderboard \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast

# 2. Add questions
forge script script/AddQuestions.s.sol:AddQuestions \
  --rpc-url https://alfajores-forno.celo-testnet.org \
  --broadcast

# 3. Done! Players can start playing
```

---

## 📱 Frontend Needs

### New Pages
1. **Username Registration** - One-time setup
2. **Leaderboard** - Top 100 players
3. **Profile** - Player stats & history
4. **Game** - 10 questions (existing, update for new contract)

### New Components
- Username input & validation
- Leaderboard table
- Player stats card
- Rank badge
- Reward pool display

---

## 🎯 Benefits

### For Players
- ✅ Play anytime, no waiting
- ✅ Build reputation with username
- ✅ Compete for top spots
- ✅ Win weekly rewards
- ✅ Track progress & stats

### For Platform
- ✅ Continuous engagement
- ✅ Competitive dynamics
- ✅ Growing reward pool
- ✅ Social features (usernames)
- ✅ Viral potential (leaderboard)

---

## 📋 Checklist

- [ ] Deploy TriviaLeaderboard contract
- [ ] Add 10+ questions
- [ ] Build username registration UI
- [ ] Build leaderboard UI
- [ ] Update game page for new contract
- [ ] Build profile page
- [ ] Test complete flow
- [ ] Launch!

---

**See `LEADERBOARD_GAME_GUIDE.md` for complete documentation! 🚀**
