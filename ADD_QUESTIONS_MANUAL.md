# Add Questions to Contract - Manual Method

Since the script is having RPC issues, let's add questions directly via BaseScan (faster and more reliable).

## Method: Use BaseScan Write Contract

### Step 1: Go to Contract Write Page
https://basescan.org/address/0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d#writeContract

### Step 2: Connect Your Wallet
- Click "Connect to Web3"
- Select MetaMask (or your wallet)
- Make sure you're on Base Mainnet

### Step 3: Use addQuestion Function

**Function parameters:**
- `_questionText` (string): The question
- `_options` (string[]): Array of 4 answer choices
- `_correctOption` (uint256): Index of correct answer (0-3)
- `_rewardAmount` (uint256): 100000 (0.1 USDC)

---

## 20 Questions to Add (Copy-Paste Ready)

### Question 6
```
_questionText: What does DeFi stand for?
_options: ["Decentralized Finance","Digital Finance","Distributed Finance","Direct Finance"]
_correctOption: 0
_rewardAmount: 100000
```

### Question 7
```
_questionText: What is MetaMask?
_options: ["Chrome extension","Crypto wallet","NFT marketplace","Exchange platform"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 8
```
_questionText: What are gas fees?
_options: ["Staking rewards","Transaction fees","Token burns","Mining rewards"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 9
```
_questionText: What are smart contracts?
_options: ["Legal documents","Self-executing code","Trading algorithms","Wallet apps"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 10
```
_questionText: What is a seed phrase used for?
_options: ["Password","Recovery phrase","Username","Email"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 11
```
_questionText: What is ERC-20?
_options: ["NFT standard","Token standard","Wallet type","Chain protocol"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 12
```
_questionText: What does NFT stand for?
_options: ["Network File Transfer","Non-Fungible Token","New Finance Technology","Node Function Test"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 13
```
_questionText: Who leads the Base team?
_options: ["Vitalik Buterin","Jesse Pollak","Brian Armstrong","Satoshi Nakamoto"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 14
```
_questionText: What's the main benefit of Layer 2?
_options: ["More centralized","Lower fees and faster transactions","Different blockchain","No smart contracts"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 15
```
_questionText: What does immutable mean in blockchain?
_options: ["Can be edited","Cannot be changed","Only admins can edit","Editable by community vote"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 16
```
_questionText: What's the difference between mainnet and testnet?
_options: ["No difference","Testnet uses fake money for testing","Mainnet is slower","Testnet is private"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 17
```
_questionText: What is Web3?
_options: ["Third version of internet","Decentralized web","Faster internet","Mobile-first internet"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 18
```
_questionText: What does DAO stand for?
_options: ["Database Access Object","Decentralized Autonomous Organization","Digital Asset Operation","Distributed Application Overlay"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 19
```
_questionText: Should you share your private key?
_options: ["Share with trusted friends","Never share it with anyone","Post on social media","Email to support team"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 20
```
_questionText: What is staking in crypto?
_options: ["Selling your crypto","Locking crypto to earn rewards","Trading frequently","Mining Bitcoin"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 21
```
_questionText: What is Base Mainnet chain ID?
_options: ["1","8453","137","56"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 22
```
_questionText: How many decimals does USDC have?
_options: ["18","6","8","2"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 23
```
_questionText: What is liquidity in crypto?
_options: ["Total token supply","Available funds for trading","Mining difficulty","Network speed"]
_correctOption: 1
_rewardAmount: 100000
```

### Question 24
```
_questionText: What is a cold wallet?
_options: ["Offline crypto storage","Online wallet","Exchange account","Mobile wallet app"]
_correctOption: 0
_rewardAmount: 100000
```

### Question 25
```
_questionText: What is slippage in trading?
_options: ["Transaction fee","Price difference during trade execution","Gas cost","Staking reward percentage"]
_correctOption: 1
_rewardAmount: 100000
```

---

## Tips for Adding Questions

1. **Add questions in batches** - Do 5 at a time, then take a break
2. **Each transaction costs gas** - About $0.01-0.02 per question
3. **Total cost**: ~$0.20-0.40 for all 20 questions
4. **Time**: About 10-15 minutes total

## After Adding Questions

Once you've added all 20 questions:
1. Contract will have 25 total questions
2. More variety = more user engagement
3. More plays = more fees = higher ranking!

---

**Let me know once you've added them and we'll move to the next critical tasks!**
