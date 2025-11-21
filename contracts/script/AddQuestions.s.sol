// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2.sol";

contract AddQuestions is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address triviaGameAddress = vm.envAddress("TRIVIA_GAME_V2_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);

        TriviaGameV2 triviaGame = TriviaGameV2(triviaGameAddress);

        // Question 1: What is Celo?
        triviaGame.addQuestion(
            "What is Celo?",
            [
                "A mobile-first blockchain platform",
                "A cryptocurrency exchange",
                "A digital wallet app",
                "A mining hardware company"
            ],
            0, // Correct answer: index 0
            "Basics"
        );

        // Question 2: Celo's native stablecoin
        triviaGame.addQuestion(
            "What is Celo's native stablecoin pegged to the US Dollar?",
            [
                "USDT",
                "USDC",
                "cUSD",
                "DAI"
            ],
            2, // Correct answer: cUSD
            "Stablecoins"
        );

        // Question 3: Celo's consensus mechanism
        triviaGame.addQuestion(
            "What consensus mechanism does Celo use?",
            [
                "Proof of Work",
                "Proof of Stake",
                "Delegated Proof of Stake",
                "Proof of Authority"
            ],
            1, // Correct answer: Proof of Stake
            "Technology"
        );

        // Question 4: Celo's mission
        triviaGame.addQuestion(
            "What is Celo's primary mission?",
            [
                "To create the fastest blockchain",
                "To build financial tools accessible to anyone with a mobile phone",
                "To replace all traditional banks",
                "To mine Bitcoin more efficiently"
            ],
            1, // Correct answer: Financial inclusion
            "Mission"
        );

        // Question 5: Celo validators
        triviaGame.addQuestion(
            "What do Celo validators do?",
            [
                "Mine new blocks",
                "Secure the network and validate transactions",
                "Create new tokens",
                "Manage user accounts"
            ],
            1, // Correct answer: Secure and validate
            "Technology"
        );

        // Question 6: Celo's carbon negative status
        triviaGame.addQuestion(
            "What makes Celo unique in terms of environmental impact?",
            [
                "It uses solar power",
                "It is carbon negative",
                "It doesn't use electricity",
                "It plants trees"
            ],
            1, // Correct answer: Carbon negative
            "Sustainability"
        );

        // Question 7: Celo mobile verification
        triviaGame.addQuestion(
            "How does Celo enable easy wallet recovery?",
            [
                "Email verification",
                "Phone number mapping to wallet addresses",
                "Fingerprint scanning",
                "Face recognition"
            ],
            1, // Correct answer: Phone number mapping
            "Features"
        );

        // Question 8: Celo governance token
        triviaGame.addQuestion(
            "What is Celo's governance token called?",
            [
                "CELO",
                "CEL",
                "CGOV",
                "CUSD"
            ],
            0, // Correct answer: CELO
            "Tokens"
        );

        // Question 9: Celo transaction fees
        triviaGame.addQuestion(
            "What can be used to pay for transaction fees on Celo?",
            [
                "Only CELO tokens",
                "Only cUSD",
                "Any Celo stablecoin or CELO",
                "Bitcoin"
            ],
            2, // Correct answer: Any stablecoin or CELO
            "Features"
        );

        // Question 10: Celo's EVM compatibility
        triviaGame.addQuestion(
            "Is Celo compatible with Ethereum smart contracts?",
            [
                "No, completely different",
                "Yes, it's EVM compatible",
                "Only partially compatible",
                "It uses a different programming language"
            ],
            1, // Correct answer: EVM compatible
            "Technology"
        );

        // Question 11: MiniPay
        triviaGame.addQuestion(
            "What is MiniPay?",
            [
                "A Celo mining pool",
                "A mobile wallet built on Celo",
                "A payment gateway",
                "A stablecoin"
            ],
            1, // Correct answer: Mobile wallet
            "Ecosystem"
        );

        // Question 12: Celo Reserve
        triviaGame.addQuestion(
            "What backs Celo stablecoins?",
            [
                "US Dollar reserves in banks",
                "Gold reserves",
                "A diversified crypto reserve",
                "Nothing, they are algorithmic"
            ],
            2, // Correct answer: Diversified crypto reserve
            "Stablecoins"
        );

        // Question 13: Celo block time
        triviaGame.addQuestion(
            "What is the approximate block time on Celo?",
            [
                "1 second",
                "5 seconds",
                "15 seconds",
                "1 minute"
            ],
            1, // Correct answer: 5 seconds
            "Technology"
        );

        // Question 14: Celo Alliance
        triviaGame.addQuestion(
            "What is the Celo Alliance for Prosperity?",
            [
                "A mining consortium",
                "A coalition of organizations building on Celo",
                "A charity foundation",
                "A validator group"
            ],
            1, // Correct answer: Coalition of organizations
            "Ecosystem"
        );

        // Question 15: Celo's focus
        triviaGame.addQuestion(
            "Which region is Celo particularly focused on serving?",
            [
                "North America only",
                "Europe only",
                "Global, with emphasis on emerging markets",
                "Asia only"
            ],
            2, // Correct answer: Global with emphasis on emerging markets
            "Mission"
        );

        console.log("Added 15 questions successfully!");
        console.log("Total questions:", triviaGame.getQuestionCount());

        vm.stopBroadcast();
    }
}
