// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {SimpleTriviaGame} from "../src/SimpleTriviaGame.sol";

contract AddQuestions is Script {
    // Your deployed contract
    SimpleTriviaGame game = SimpleTriviaGame(0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d);

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        console.log("Adding questions to SimpleTriviaGame...");

        // Question 6: DeFi
        string[] memory opts6 = new string[](4);
        opts6[0] = "Decentralized Finance";
        opts6[1] = "Digital Finance";
        opts6[2] = "Distributed Finance";
        opts6[3] = "Direct Finance";
        game.addQuestion("What does DeFi stand for?", opts6, 0, 100000);
        console.log("Added Q6: DeFi meaning");

        // Question 7: MetaMask
        string[] memory opts7 = new string[](4);
        opts7[0] = "Chrome extension";
        opts7[1] = "Crypto wallet";
        opts7[2] = "NFT marketplace";
        opts7[3] = "Exchange platform";
        game.addQuestion("What is MetaMask?", opts7, 1, 100000);
        console.log("Added Q7: MetaMask");

        // Question 8: Gas fees
        string[] memory opts8 = new string[](4);
        opts8[0] = "Staking rewards";
        opts8[1] = "Transaction fees";
        opts8[2] = "Token burns";
        opts8[3] = "Mining rewards";
        game.addQuestion("What are gas fees?", opts8, 1, 100000);
        console.log("Added Q8: Gas fees");

        // Question 9: Smart contracts
        string[] memory opts9 = new string[](4);
        opts9[0] = "Legal documents";
        opts9[1] = "Self-executing code";
        opts9[2] = "Trading algorithms";
        opts9[3] = "Wallet apps";
        game.addQuestion("What are smart contracts?", opts9, 1, 100000);
        console.log("Added Q9: Smart contracts");

        // Question 10: Wallet seed phrase
        string[] memory opts10 = new string[](4);
        opts10[0] = "Password";
        opts10[1] = "Recovery phrase";
        opts10[2] = "Username";
        opts10[3] = "Email";
        game.addQuestion("What is a seed phrase used for?", opts10, 1, 100000);
        console.log("Added Q10: Seed phrase");

        // Question 11: ERC-20
        string[] memory opts11 = new string[](4);
        opts11[0] = "NFT standard";
        opts11[1] = "Token standard";
        opts11[2] = "Wallet type";
        opts11[3] = "Chain protocol";
        game.addQuestion("What is ERC-20?", opts11, 1, 100000);
        console.log("Added Q11: ERC-20");

        // Question 12: NFT
        string[] memory opts12 = new string[](4);
        opts12[0] = "Network File Transfer";
        opts12[1] = "Non-Fungible Token";
        opts12[2] = "New Finance Technology";
        opts12[3] = "Node Function Test";
        game.addQuestion("What does NFT stand for?", opts12, 1, 100000);
        console.log("Added Q12: NFT");

        // Question 13: Base founder
        string[] memory opts13 = new string[](4);
        opts13[0] = "Vitalik Buterin";
        opts13[1] = "Jesse Pollak";
        opts13[2] = "Brian Armstrong";
        opts13[3] = "Satoshi Nakamoto";
        game.addQuestion("Who leads the Base team?", opts13, 1, 100000);
        console.log("Added Q13: Base founder");

        // Question 14: Layer 2 benefit
        string[] memory opts14 = new string[](4);
        opts14[0] = "More centralized";
        opts14[1] = "Lower fees, faster";
        opts14[2] = "Different blockchain";
        opts14[3] = "No smart contracts";
        game.addQuestion("What's the main benefit of Layer 2?", opts14, 1, 100000);
        console.log("Added Q14: L2 benefits");

        // Question 15: Blockchain immutability
        string[] memory opts15 = new string[](4);
        opts15[0] = "Can be edited";
        opts15[1] = "Cannot be changed";
        opts15[2] = "Only admins edit";
        opts15[3] = "Editable by vote";
        game.addQuestion("What does immutable mean?", opts15, 1, 100000);
        console.log("Added Q15: Immutability");

        // Question 16: Mainnet vs Testnet
        string[] memory opts16 = new string[](4);
        opts16[0] = "No difference";
        opts16[1] = "Testnet uses fake money";
        opts16[2] = "Mainnet is slower";
        opts16[3] = "Testnet is private";
        game.addQuestion("What's the difference between mainnet and testnet?", opts16, 1, 100000);
        console.log("Added Q16: Mainnet vs Testnet");

        // Question 17: Web3
        string[] memory opts17 = new string[](4);
        opts17[0] = "New internet version";
        opts17[1] = "Decentralized web";
        opts17[2] = "Faster internet";
        opts17[3] = "Mobile internet";
        game.addQuestion("What is Web3?", opts17, 1, 100000);
        console.log("Added Q17: Web3");

        // Question 18: DAO
        string[] memory opts18 = new string[](4);
        opts18[0] = "Database Access Object";
        opts18[1] = "Decentralized Autonomous Organization";
        opts18[2] = "Digital Asset Operation";
        opts18[3] = "Distributed Application Overlay";
        game.addQuestion("What does DAO stand for?", opts18, 1, 100000);
        console.log("Added Q18: DAO");

        // Question 19: Private key
        string[] memory opts19 = new string[](4);
        opts19[0] = "Share with everyone";
        opts19[1] = "Never share it";
        opts19[2] = "Post on social media";
        opts19[3] = "Email to support";
        game.addQuestion("Should you share your private key?", opts19, 1, 100000);
        console.log("Added Q19: Private key security");

        // Question 20: Staking
        string[] memory opts20 = new string[](4);
        opts20[0] = "Selling crypto";
        opts20[1] = "Locking crypto for rewards";
        opts20[2] = "Trading frequently";
        opts20[3] = "Mining Bitcoin";
        game.addQuestion("What is staking?", opts20, 1, 100000);
        console.log("Added Q20: Staking");

        // Question 21: Base mainnet ID
        string[] memory opts21 = new string[](4);
        opts21[0] = "1";
        opts21[1] = "8453";
        opts21[2] = "137";
        opts21[3] = "56";
        game.addQuestion("What is Base Mainnet chain ID?", opts21, 1, 100000);
        console.log("Added Q21: Base chain ID");

        // Question 22: USDC decimals
        string[] memory opts22 = new string[](4);
        opts22[0] = "18";
        opts22[1] = "6";
        opts22[2] = "8";
        opts22[3] = "2";
        game.addQuestion("How many decimals does USDC have?", opts22, 1, 100000);
        console.log("Added Q22: USDC decimals");

        // Question 23: Liquidity
        string[] memory opts23 = new string[](4);
        opts23[0] = "Token supply";
        opts23[1] = "Available funds for trading";
        opts23[2] = "Mining difficulty";
        opts23[3] = "Network speed";
        game.addQuestion("What is liquidity in crypto?", opts23, 1, 100000);
        console.log("Added Q23: Liquidity");

        // Question 24: Cold wallet
        string[] memory opts24 = new string[](4);
        opts24[0] = "Offline storage";
        opts24[1] = "Online wallet";
        opts24[2] = "Exchange account";
        opts24[3] = "Mobile app";
        game.addQuestion("What is a cold wallet?", opts24, 0, 100000);
        console.log("Added Q24: Cold wallet");

        // Question 25: Slippage
        string[] memory opts25 = new string[](4);
        opts25[0] = "Transaction fee";
        opts25[1] = "Price difference in trade";
        opts25[2] = "Gas cost";
        opts25[3] = "Staking reward";
        game.addQuestion("What is slippage?", opts25, 1, 100000);
        console.log("Added Q25: Slippage");

        vm.stopBroadcast();

        console.log("\n========================================");
        console.log("SUCCESS! Added 20 new questions!");
        console.log("========================================");
        console.log("Total questions now: 25");
        console.log("Contract: 0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d");
        console.log("View on BaseScan:");
        console.log("https://basescan.org/address/0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d");
        console.log("========================================");
    }
}
