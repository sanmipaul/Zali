// Node.js script to add questions to SimpleTriviaGame
// Run: node addQuestions.js

const { ethers } = require('ethers');
require('dotenv').config();

const CONTRACT_ADDRESS = '0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = 'https://mainnet.base.org';

const CONTRACT_ABI = [
  "function addQuestion(string memory _questionText, string[] memory _options, uint256 _correctOption, uint256 _rewardAmount) external",
  "function questionId() external view returns (uint256)"
];

const questions = [
  {
    text: "What does DeFi stand for?",
    options: ["Decentralized Finance", "Digital Finance", "Distributed Finance", "Direct Finance"],
    correct: 0
  },
  {
    text: "What is MetaMask?",
    options: ["Chrome extension", "Crypto wallet", "NFT marketplace", "Exchange platform"],
    correct: 1
  },
  {
    text: "What are gas fees?",
    options: ["Staking rewards", "Transaction fees", "Token burns", "Mining rewards"],
    correct: 1
  },
  {
    text: "What are smart contracts?",
    options: ["Legal documents", "Self-executing code", "Trading algorithms", "Wallet apps"],
    correct: 1
  },
  {
    text: "What is a seed phrase used for?",
    options: ["Password", "Recovery phrase", "Username", "Email"],
    correct: 1
  },
  {
    text: "What is ERC-20?",
    options: ["NFT standard", "Token standard", "Wallet type", "Chain protocol"],
    correct: 1
  },
  {
    text: "What does NFT stand for?",
    options: ["Network File Transfer", "Non-Fungible Token", "New Finance Technology", "Node Function Test"],
    correct: 1
  },
  {
    text: "Who leads the Base team?",
    options: ["Vitalik Buterin", "Jesse Pollak", "Brian Armstrong", "Satoshi Nakamoto"],
    correct: 1
  },
  {
    text: "What's the main benefit of Layer 2?",
    options: ["More centralized", "Lower fees and faster", "Different blockchain", "No smart contracts"],
    correct: 1
  },
  {
    text: "What does immutable mean?",
    options: ["Can be edited", "Cannot be changed", "Only admins edit", "Editable by vote"],
    correct: 1
  },
  {
    text: "What's the difference between mainnet and testnet?",
    options: ["No difference", "Testnet uses fake money", "Mainnet is slower", "Testnet is private"],
    correct: 1
  },
  {
    text: "What is Web3?",
    options: ["New internet version", "Decentralized web", "Faster internet", "Mobile internet"],
    correct: 1
  },
  {
    text: "What does DAO stand for?",
    options: ["Database Access Object", "Decentralized Autonomous Organization", "Digital Asset Operation", "Distributed Application"],
    correct: 1
  },
  {
    text: "Should you share your private key?",
    options: ["Share with friends", "Never share it", "Post on social media", "Email to support"],
    correct: 1
  },
  {
    text: "What is staking?",
    options: ["Selling crypto", "Locking crypto for rewards", "Trading frequently", "Mining Bitcoin"],
    correct: 1
  },
  {
    text: "What is Base Mainnet chain ID?",
    options: ["1", "8453", "137", "56"],
    correct: 1
  },
  {
    text: "How many decimals does USDC have?",
    options: ["18", "6", "8", "2"],
    correct: 1
  },
  {
    text: "What is liquidity?",
    options: ["Token supply", "Available funds for trading", "Mining difficulty", "Network speed"],
    correct: 1
  },
  {
    text: "What is a cold wallet?",
    options: ["Offline storage", "Online wallet", "Exchange account", "Mobile app"],
    correct: 0
  },
  {
    text: "What is slippage?",
    options: ["Transaction fee", "Price difference in trade", "Gas cost", "Staking reward"],
    correct: 1
  }
];

async function main() {
  console.log('🚀 Adding 20 questions to SimpleTriviaGame...\n');

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  // Check current question count
  const currentCount = await contract.questionId();
  console.log(`Current questions: ${currentCount}\n`);

  let successCount = 0;
  const REWARD = 100000; // 0.1 USDC

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    try {
      console.log(`Adding Q${i + 6}: ${q.text}`);

      const tx = await contract.addQuestion(
        q.text,
        q.options,
        q.correct,
        REWARD,
        { gasLimit: 500000 }
      );

      console.log(`  Tx: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`  ✅ Confirmed! Gas used: ${receipt.gasUsed}\n`);

      successCount++;

      // Wait 2 seconds between transactions
      if (i < questions.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`  ❌ Failed: ${error.message}\n`);
    }
  }

  const finalCount = await contract.questionId();
  console.log('========================================');
  console.log(`✅ SUCCESS! Added ${successCount} questions`);
  console.log(`Total questions now: ${finalCount}`);
  console.log('========================================');
  console.log('View contract: https://basescan.org/address/' + CONTRACT_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
