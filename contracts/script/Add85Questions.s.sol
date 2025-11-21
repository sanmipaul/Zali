// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2.sol";

contract Add85Questions is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address triviaGameAddress = vm.envAddress("TRIVIA_GAME_V2_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);

        TriviaGameV2 triviaGame = TriviaGameV2(payable(triviaGameAddress));

        console.log("Current questions:", triviaGame.getQuestionCount());
        console.log("Adding questions in batches...");

        // Prepare arrays for batch adding
        string[] memory questionTexts = new string[](20);
        string[4][] memory optionsArray = new string[4][](20);
        uint8[] memory correctAnswers = new uint8[](20);
        string[] memory categories = new string[](20);

        // Batch 1: Questions 16-35 (20 questions)
        questionTexts[0] = "What programming language is primarily used for Celo smart contracts?";
        optionsArray[0] = ["Python", "JavaScript", "Solidity", "Rust"];
        correctAnswers[0] = 2;
        categories[0] = "Development";

        questionTexts[1] = "What is the Celo Reserve?";
        optionsArray[1] = ["A backup blockchain", "A pool of assets backing stablecoins", "A validator fund", "A development grant program"];
        correctAnswers[1] = 1;
        categories[1] = "Stablecoins";

        questionTexts[2] = "Can you send Celo transactions using just a phone number?";
        optionsArray[2] = ["No, only wallet addresses work", "Yes, through phone number mapping", "Only with special apps", "Only for small amounts"];
        correctAnswers[2] = 1;
        categories[2] = "Features";

        questionTexts[3] = "What is Valora?";
        optionsArray[3] = ["A Celo validator", "A mobile wallet for Celo", "A stablecoin", "A blockchain explorer"];
        correctAnswers[3] = 1;
        categories[3] = "Ecosystem";

        questionTexts[4] = "How many stablecoins does Celo support?";
        optionsArray[4] = ["Only 1 (cUSD)", "2 (cUSD and cEUR)", "Multiple including cUSD, cEUR, cREAL", "None"];
        correctAnswers[4] = 2;
        categories[4] = "Stablecoins";

        questionTexts[5] = "What is a blockchain?";
        optionsArray[5] = ["A type of database", "A distributed ledger technology", "A cryptocurrency", "A mining algorithm"];
        correctAnswers[5] = 1;
        categories[5] = "Blockchain";

        questionTexts[6] = "What is a smart contract?";
        optionsArray[6] = ["A legal document", "Self-executing code on the blockchain", "A type of cryptocurrency", "A wallet application"];
        correctAnswers[6] = 1;
        categories[6] = "Blockchain";

        questionTexts[7] = "What does 'decentralized' mean in blockchain?";
        optionsArray[7] = ["Controlled by one company", "No single point of control", "Faster transactions", "Lower fees"];
        correctAnswers[7] = 1;
        categories[7] = "Blockchain";

        questionTexts[8] = "What is a cryptocurrency wallet?";
        optionsArray[8] = ["A physical wallet for cash", "Software that stores private keys", "A bank account", "A credit card"];
        correctAnswers[8] = 1;
        categories[8] = "Crypto";

        questionTexts[9] = "What is a private key?";
        optionsArray[9] = ["A password for your email", "A secret code that controls your crypto", "A public address", "A transaction ID"];
        correctAnswers[9] = 1;
        categories[9] = "Security";

        questionTexts[10] = "What is gas in blockchain terms?";
        optionsArray[10] = ["Fuel for cars", "Fee for executing transactions", "A type of cryptocurrency", "Mining reward"];
        correctAnswers[10] = 1;
        categories[10] = "Blockchain";

        questionTexts[11] = "What is a token?";
        optionsArray[11] = ["A physical coin", "A digital asset on a blockchain", "A password", "A wallet address"];
        correctAnswers[11] = 1;
        categories[11] = "Crypto";

        questionTexts[12] = "What does DeFi stand for?";
        optionsArray[12] = ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"];
        correctAnswers[12] = 1;
        categories[12] = "DeFi";

        questionTexts[13] = "What is a stablecoin?";
        optionsArray[13] = ["A very old cryptocurrency", "A cryptocurrency pegged to a stable asset", "A coin that never changes price", "A government-issued digital currency"];
        correctAnswers[13] = 1;
        categories[13] = "Crypto";

        questionTexts[14] = "What is mining in cryptocurrency?";
        optionsArray[14] = ["Digging for physical coins", "Validating transactions and creating new blocks", "Buying cryptocurrency", "Trading on exchanges"];
        correctAnswers[14] = 1;
        categories[14] = "Blockchain";

        questionTexts[15] = "What is a blockchain explorer?";
        optionsArray[15] = ["A mining tool", "A tool to view blockchain transactions", "A wallet app", "A trading platform"];
        correctAnswers[15] = 1;
        categories[15] = "Tools";

        questionTexts[16] = "What does NFT stand for?";
        optionsArray[16] = ["New Financial Token", "Non-Fungible Token", "Network File Transfer", "National Finance Technology"];
        correctAnswers[16] = 1;
        categories[16] = "Crypto";

        questionTexts[17] = "What is a DAO?";
        optionsArray[17] = ["Digital Asset Organization", "Decentralized Autonomous Organization", "Distributed Application Operation", "Data Access Object"];
        correctAnswers[17] = 1;
        categories[17] = "Blockchain";

        questionTexts[18] = "What is the purpose of a blockchain consensus mechanism?";
        optionsArray[18] = ["To mine coins", "To agree on the state of the blockchain", "To create wallets", "To set prices"];
        correctAnswers[18] = 1;
        categories[18] = "Blockchain";

        questionTexts[19] = "What is a dApp?";
        optionsArray[19] = ["A mobile app", "A decentralized application", "A data application", "A download app"];
        correctAnswers[19] = 1;
        categories[19] = "Development";

        // Add batch using the batch function
        triviaGame.addQuestions(questionTexts, optionsArray, correctAnswers, categories);

        console.log("Added 20 questions successfully!");
        console.log("Total questions now:", triviaGame.getQuestionCount());

        vm.stopBroadcast();
    }
}
