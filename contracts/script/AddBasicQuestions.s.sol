// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2.sol";

contract AddBasicQuestions is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address triviaGameAddress = 0x31D785d1866E0345f134606df75046f565f62Ec1;
        
        vm.startBroadcast(deployerPrivateKey);

        TriviaGameV2 triviaGame = TriviaGameV2(payable(triviaGameAddress));

        // Add 15 basic questions to test the game
        
        triviaGame.addQuestion(
            "What is Celo?",
            ["A mobile-first blockchain platform", "A cryptocurrency exchange", "A digital wallet app", "A mining hardware company"],
            0, "Basics"
        );

        triviaGame.addQuestion(
            "What is Celo's native stablecoin pegged to the US Dollar?",
            ["USDT", "USDC", "cUSD", "DAI"],
            2, "Stablecoins"
        );

        triviaGame.addQuestion(
            "What consensus mechanism does Celo use?",
            ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"],
            1, "Technology"
        );

        triviaGame.addQuestion(
            "What is Celo's primary mission?",
            ["To create the fastest blockchain", "To build financial tools accessible to anyone with a mobile phone", "To replace all traditional banks", "To mine Bitcoin more efficiently"],
            1, "Mission"
        );

        triviaGame.addQuestion(
            "What do Celo validators do?",
            ["Mine new blocks", "Secure the network and validate transactions", "Create new tokens", "Manage user accounts"],
            1, "Technology"
        );

        triviaGame.addQuestion(
            "What makes Celo unique in terms of environmental impact?",
            ["It uses solar power", "It is carbon negative", "It doesn't use electricity", "It plants trees"],
            1, "Sustainability"
        );

        triviaGame.addQuestion(
            "How does Celo enable easy wallet recovery?",
            ["Email verification", "Phone number mapping to wallet addresses", "Fingerprint scanning", "Face recognition"],
            1, "Features"
        );

        triviaGame.addQuestion(
            "What is Celo's governance token called?",
            ["CELO", "CEL", "CGOV", "CUSD"],
            0, "Tokens"
        );

        triviaGame.addQuestion(
            "What can be used to pay for transaction fees on Celo?",
            ["Only CELO tokens", "Only cUSD", "Any Celo stablecoin or CELO", "Bitcoin"],
            2, "Features"
        );

        triviaGame.addQuestion(
            "Is Celo compatible with Ethereum smart contracts?",
            ["No, completely different", "Yes, it's EVM compatible", "Only partially compatible", "It uses a different programming language"],
            1, "Technology"
        );

        triviaGame.addQuestion(
            "What is MiniPay?",
            ["A Celo mining pool", "A mobile wallet built on Celo", "A payment gateway", "A stablecoin"],
            1, "Ecosystem"
        );

        triviaGame.addQuestion(
            "What backs Celo stablecoins?",
            ["US Dollar reserves in banks", "Gold reserves", "A diversified crypto reserve", "Nothing, they are algorithmic"],
            2, "Stablecoins"
        );

        triviaGame.addQuestion(
            "What is a blockchain?",
            ["A type of database", "A distributed ledger technology", "A cryptocurrency", "A mining algorithm"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What is a smart contract?",
            ["A legal document", "Self-executing code on the blockchain", "A type of cryptocurrency", "A wallet application"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What does 'decentralized' mean in blockchain?",
            ["Controlled by one company", "No single point of control", "Faster transactions", "Lower fees"],
            1, "Blockchain"
        );

        console.log("Successfully added 15 basic questions!");
        console.log("Total questions in contract:", triviaGame.getQuestionCount());

        vm.stopBroadcast();
    }
}