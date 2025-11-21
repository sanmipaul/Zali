// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2.sol";

contract AddMoreQuestions is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address triviaGameAddress = vm.envAddress("TRIVIA_GAME_V2_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);

        TriviaGameV2 triviaGame = TriviaGameV2(payable(triviaGameAddress));

        console.log("Current question count:", triviaGame.getQuestionCount());
        console.log("Adding 85 more questions to reach 100 total...");

        // BLOCKCHAIN FUNDAMENTALS (Questions 16-35)

        triviaGame.addQuestion(
            "What programming language is primarily used for Celo smart contracts?",
            ["Python", "JavaScript", "Solidity", "Rust"],
            2, "Development"
        );

        triviaGame.addQuestion(
            "What is the Celo Reserve?",
            ["A backup blockchain", "A pool of assets backing stablecoins", "A validator fund", "A development grant program"],
            1, "Stablecoins"
        );

        triviaGame.addQuestion(
            "Can you send Celo transactions using just a phone number?",
            ["No, only wallet addresses work", "Yes, through phone number mapping", "Only with special apps", "Only for small amounts"],
            1, "Features"
        );

        triviaGame.addQuestion(
            "What is Valora?",
            ["A Celo validator", "A mobile wallet for Celo", "A stablecoin", "A blockchain explorer"],
            1, "Ecosystem"
        );

        triviaGame.addQuestion(
            "How many stablecoins does Celo support?",
            ["Only 1 (cUSD)", "2 (cUSD and cEUR)", "Multiple including cUSD, cEUR, cREAL", "None"],
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

        triviaGame.addQuestion(
            "What is a cryptocurrency wallet?",
            ["A physical wallet for cash", "Software that stores private keys", "A bank account", "A credit card"],
            1, "Crypto"
        );

        triviaGame.addQuestion(
            "What is a private key?",
            ["A password for your email", "A secret code that controls your crypto", "A public address", "A transaction ID"],
            1, "Security"
        );

        triviaGame.addQuestion(
            "What is gas in blockchain terms?",
            ["Fuel for cars", "Fee for executing transactions", "A type of cryptocurrency", "Mining reward"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What is a token?",
            ["A physical coin", "A digital asset on a blockchain", "A password", "A wallet address"],
            1, "Crypto"
        );

        triviaGame.addQuestion(
            "What does DeFi stand for?",
            ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
            1, "DeFi"
        );

        triviaGame.addQuestion(
            "What is a stablecoin?",
            ["A very old cryptocurrency", "A cryptocurrency pegged to a stable asset", "A coin that never changes price", "A government-issued digital currency"],
            1, "Crypto"
        );

        triviaGame.addQuestion(
            "What is mining in cryptocurrency?",
            ["Digging for physical coins", "Validating transactions and creating new blocks", "Buying cryptocurrency", "Trading on exchanges"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What is a blockchain explorer?",
            ["A mining tool", "A tool to view blockchain transactions", "A wallet app", "A trading platform"],
            1, "Tools"
        );

        triviaGame.addQuestion(
            "What does NFT stand for?",
            ["New Financial Token", "Non-Fungible Token", "Network File Transfer", "National Finance Technology"],
            1, "Crypto"
        );

        triviaGame.addQuestion(
            "What is a DAO?",
            ["Digital Asset Organization", "Decentralized Autonomous Organization", "Distributed Application Operation", "Data Access Object"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What is the purpose of a blockchain consensus mechanism?",
            ["To mine coins", "To agree on the state of the blockchain", "To create wallets", "To set prices"],
            1, "Blockchain"
        );

        triviaGame.addQuestion(
            "What is a dApp?",
            ["A mobile app", "A decentralized application", "A data application", "A download app"],
            1, "Development"
        );

        console.log("Batch 1 complete (20 questions added)");
        console.log("Current total:", triviaGame.getQuestionCount());

        vm.stopBroadcast();
    }
}
